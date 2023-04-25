"use strict";
require('dotenv').config();
const express = require("express");
const db = require('../db');


const fuzzy = new express.Router();

class Fuzzy{
    constructor(Cons){
        this.Cons = Cons;
    }
    func(point1, point2, x){
        let res = {
            a: 0,
            b: 0
        }
        res.a = (point1.y-point2.y)/(point1.x-point2.x);
        res.b = point1.y-res.a * point1.x;
       return res.a*x+res.b;
    }
    subject(x){
        if(this.Cons == null || x < 0) return null;
        if(x == 0){
            return {
                Null: 1,
                Faible: 0,
                Moyen: 0,
                ABien: 0,
                Bien:0,
            };
        }
        if (x >= 0 && x <= this.Cons[0])
        return {
            Null: 0,
            Faible: 1,
            Moyen: 0,
            ABien: 0,
            Bien:0,
        };
        else if (x > this.Cons[0] && x < this.Cons[1])
        return {
            Null: 1,
            Faible: this.func({x:this.Cons[0],y:1},{x:this.Cons[1],y:0},x),
            Moyen:  this.func({x:this.Cons[0],y:0},{x:this.Cons[1],y:1},x),
            ABien: 0,
            Bien:0,
        };
        else if (x >= this.Cons[1] && x <= this.Cons[2])
        return {
            Null: 0,
            Faible: 0,
            Moyen: 1,
            ABien: 0,
            Bien:0,
        };
        else if (x > this.Cons[2] && x < this.Cons[3])
        return {
            Null: 0,
            Faible: 0,
            Moyen: this.func({x:this.Cons[2],y:1},{x:this.Cons[3],y:0},x),
            ABien: this.func({x:this.Cons[2],y:0},{x:this.Cons[3],y:1},x),
            Bien:0,
        };
        else if (x >= this.Cons[3] && x <= this.Cons[4])
        return {
            Null: 0,
            Faible: 0,
            Moyen: 0,
            ABien: 1,
            Bien:0,
        };
        else if (x > this.Cons[4] && x < this.Cons[5])
        return {
            Null: 0,
            Faible: 0,
            Moyen: 0,
            ABien: this.func({x:this.Cons[4],y:1},{x:this.Cons[5],y:0},x),
            Bien: this.func({x:this.Cons[4],y:0},{x:this.Cons[5],y:1},x),
        };
        else
        return {
            Null: 0,
            Faible: 0,
            Moyen: 0,
            ABien: 0,
            Bien:1,
        };
    }
}

fuzzy.post('/fuzzy/:mid/:filiere', async (req, res, next)=>{

    const mid = req.params.mid;
    const filiere = req.params.filiere;
    const { math, physic } = req.body;
    const fuzzyMath = new Fuzzy([6,10,13,15,16,18]);
    const fuzzyPhysic = new Fuzzy([6,10,13,15,16,18]);

    try{
        const dbregle = await db.query('SELECT (Mathmatiques,Physiques,Result) FROM regles WHERE major_id=$1 AND filiere_id=$2', [mid, filiere]);

        let matha = fuzzyMath.subject(math);
        let physica = fuzzyPhysic.subject(physic);

        let preRes = [];
        dbregle.rows.forEach((rule, key)=>{
            let weight = Math.min(matha[rule.mathmatiques.trim()], physica[rule.physiques.trim()]);
            
            if(rule.result.trim() == 'A.Bien')preRes[key] = {ABien: weight};
            else if(rule.result.trim() == 'Moyen')preRes[key] = {Moyen: weight};
            else if(rule.result.trim() == 'Bien')preRes[key] = {Bien: weight};
            else if(rule.result.trim() == 'Faible')preRes[key] = {Faible: weight};
            else if(rule.result.trim() == 'Null')preRes[key] = {Null: weight};
            } 
        );
        let ABien = 0;
        let Moyen = 0;
        let Bien = 0;
        let Faible = 0;
        let Null = 0;

        preRes.forEach((result)=>{
            const resKey = Object.keys(result)[0];
            const resVal = Object.values(result)[0];
            if (result && resKey && resVal) {
                if(resKey == 'ABien') ABien += resVal;
                else if(resKey == 'Moyen') Moyen += resVal;
                else if(resKey == 'Faible') Faible += resVal;
                else if(resKey == 'Bien') Bien += resVal;
                else if(resKey == 'Null') Null += resVal;
            }
        });

        var perc = 0;
        if((ABien+Moyen+Faible+Bien) == 0 || Null != 0) perc = 0;
        else perc = (ABien*75+Moyen*50+Faible*25+Bien*100)/(ABien+Moyen+Faible+Bien);
        res.status(200).json({
            status: "success",
            data:{
                result: perc
            }
        });

    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
    next();
});


module.exports = fuzzy;