"use strict"
const express = require("express");
const db = require("../db");
const student = new express.Router;


student.get('/student/:username',async (req, res, next)=>{
    try{
        console.log(req.params.username);
        const resStudent = await db.query("SELECT *  FROM student where username = $1;",
            [req.params.username]);
        console.log(resStudent);
        res.status(200).json({
            status: "succes",
            results: resStudent.rows.length,
            data:{
                student: resStudent.rows,
            }
        })
    } catch(err){
        console.log(err);
    }
    next();
});
module.exports = student;