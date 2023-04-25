"use strict";
require('dotenv').config();
const express = require("express");
const db = require('../db');
const format = require('pg-format');


const regle = new express.Router()
regle.get('/regle', (req, res)=>{
    res.send("404 cannot use GET method on this page");
});



// Get all majors
regle.get('/regles/:mid/:filiere', async (req, res,next) => {
    try {
        const mid = req.params.mid;
        const filiere = req.params.filiere;
        const dbregle = await db.query('SELECT Mathmatiques,Physiques,Result FROM regles WHERE major_id=$1 AND filiere_id=$2',[mid, filiere]);
        res.status(200).json({
            status: "succes",
            results: dbregle.rows.length,
            data:{
                regles: dbregle.rows,
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});


regle.post('/regle/:mid',async (req,res,next)=>{
    const sid = Object.keys(req.body);
    const rules = ['MID',...sid];
    const regle = Object.values(req.body);
    console.log(sid);
    console.log(regle);
    let result = [];
    for (let i = 0; i < sid.length; i++) {
        let row = [];
        row.push(req.params.mid);
        row.push(sid[i]);
        row.push(regle[i]); 
        result.push(row);
    }
    console.log(result);
    
   try{
    console.log(format(`INSERT INTO REGLE (%I) VALUES %L;`, rules,result));
    const resNotes = await db.query(format(`INSERT INTO REGLE (%I) VALUES %L;`, sid,result));
    res.status(200).send(resNotes);        
    } catch(err){
        console.log(err);
    }
    next();
});



module.exports = regle;