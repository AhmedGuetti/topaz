"use strict"
const express = require("express");
const db = require("../db");
const subjects = new express.Router;


// Get all subjects
subjects.get('/subjects', async (req, res,next) => {
    try {
        const dbsubject = await db.query('SELECT * FROM subjects');
        res.status(200).json({
            status: "succes",
            results: dbsubject.rows.length,
            data:{
                subjects: dbsubject.rows,
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});


// Get subject by major

subjects.get('/subjects/:mid',async (req, res, next)=>{
    const mid = req.params.mid;
    try{
        const dbsubject = await db.query("SELECT subjects.subject_id, subject_name, coeff  FROM subjects, exams where exams.major_id = $1 AND subjects.subject_id = exams.subject_id;",[mid]);
        res.status(200).json({
            status: "succes",
            results: dbsubject.rows.length,
            data:{
                subject: dbsubject.rows,
            }
        })
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    next();
});




// Add a new subject
subjects.post('/subjects', async (req, res, next) => {
    const { subject_name } = req.body;
    try {
        const dbsubject = await db.query('INSERT INTO subjects (subject_name) VALUES ($1) RETURNING *', [subject_name]);
        res.status(200).json({
            status: "succes",
            data:{
                subject: dbsubject.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Update a subject by ID
subjects.put('/subjects/:id', async (req, res, next) => {
    const id = req.params.id;
    const { subject_name } = req.body;
    try {
        const dbsubject = await db.query('UPDATE subjects SET subject_name = $1 WHERE subject_id = $2 RETURNING *', [subject_name, id]);
        res.status(200).json({
            status: "succes",
            data:{
                subject: dbsubject.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Delete a subject by ID
subjects.delete('/subjects/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM subjects WHERE subject_id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});


module.exports = subjects;


