"use strict";
require('dotenv').config();
const express = require("express");
const db = require('../db');
const format = require('pg-format');

const note = new express.Router()



note.post('/notes/:username/',async (req,res,next)=>{
    const sid = Object.keys(req.body);
    const note = Object.values(req.body);
    let result = [];
    let major = '';
    for (let i = 0; i < sid.length; i++) {
        let row = [];
        row.push(req.params.username);
        if(sid[i] == 'mid'){
            major = note[i];
        }else{
            row.push(sid[i]);
            row.push(note[i]); 
            result.push(row);
        }
    }
    console.log(result);
    
   try{
    //console.log(format(`INSERT INTO MARK(USERNAME , SUBID, NOTE) VALUES %L;`, result));
    const resNotes = await db.query(format(`INSERT INTO mark(username , subject_id, note ) VALUES %L;`, result));
    res.status(200).send(resNotes);
    } catch(err){
        console.log(err);
    }
    next();
});



module.exports = note;