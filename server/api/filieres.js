"use strict"
const express = require("express");
const db = require("../db");
const filieres = new express.Router;


// Get all filieres
filieres.get('/filieres', async (req, res,next) => {
    try {
        const dbfiliere = await db.query('SELECT * FROM filieres');
        res.status(200).json({
            status: "succes",
            results: dbfiliere.rows.length,
            data:{
                filieres: dbfiliere.rows,
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Get a filiere by ID
filieres.get('/filieres/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const dbfiliere = await db.query('SELECT * FROM filieres WHERE filiere_id = $1', [id]);
        res.status(200).json({
            status: "succes",
            data:{
                filiere: dbfiliere.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Add a new filiere
filieres.post('/filieres', async (req, res, next) => {
    const { filiere_name } = req.body;
    try {
        const dbfiliere = await db.query('INSERT INTO filieres (filiere_name) VALUES ($1) RETURNING *', [filiere_name]);
        res.status(200).json({
            status: "succes",
            data:{
                filiere: dbfiliere.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Update a filiere by ID
filieres.put('/filieres/:id', async (req, res, next) => {
    const id = req.params.id;
    const { filiere_name } = req.body;
    try {
        const dbfiliere = await db.query('UPDATE filieres SET filiere_name = $1 WHERE filiere_id = $2 RETURNING *', [filiere_name, id]);
        res.status(200).json({
            status: "succes",
            data:{
                filiere: dbfiliere.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});

// Delete a filiere by ID
filieres.delete('/filieres/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM filieres WHERE filiere_id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    next();
});


module.exports = filieres;


