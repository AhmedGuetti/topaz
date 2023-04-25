"use strict"
const express = require("express");
const db = require("../db");
const majors = new express.Router;


// Get all majors
majors.get('/majors', async (req, res,next) => {
    try {
        const dbmajor = await db.query('SELECT * FROM majors');
        res.status(200).json({
            status: "succes",
            results: dbmajor.rows.length,
            data:{
                majors: dbmajor.rows,
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Get a major by ID
majors.get('/majors/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const dbmajor = await db.query('SELECT * FROM majors WHERE major_id = $1', [id]);
        res.status(200).json({
            status: "succes",
            data:{
                major: dbmajor.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Add a new major
majors.post('/majors', async (req, res, next) => {
    const { major_name } = req.body;
    try {
        const dbmajor = await db.query('INSERT INTO majors (major_name) VALUES ($1) RETURNING *', [major_name]);
        res.status(200).json({
            status: "succes",
            data:{
                major: dbmajor.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Update a major by ID
majors.put('/majors/:id', async (req, res, next) => {
    const id = req.params.id;
    const { major_name } = req.body;
    try {
        const dbmajor = await db.query('UPDATE majors SET major_name = $1 WHERE major_id = $2 RETURNING *', [major_name, id]);
        res.status(200).json({
            status: "succes",
            data:{
                major: dbmajor.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Delete a major by ID
majors.delete('/majors/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM majors WHERE major_id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});


module.exports = majors;


