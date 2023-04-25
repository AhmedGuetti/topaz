"use strict";
require('dotenv').config();
const express = require("express");
const db = require('../../server/db');
const bcrypt = require("bcrypt");

const register = new express.Router()


register.post('/register',async (req,res,next)=>{
    const FIRST_NAME    =   req.body.FIRST_NAME;
    const LAST_NAME     =   req.body.LAST_NAME;
    const USERNAME      =   req.body.USERNAME;
    const PASSWORD      =   req.body.PASSWORD;
    const MID           =   req.body.MID;
    console.log(req.body);
    try{
      const resUsers = await db.query(`SELECT * FROM STUDENT WHERE username = $1`,[USERNAME]);
       if(resUsers.rows.length != 0){
        res.status(401).json(resUsers);
        return;
       } 
    } catch(err){
        console.log(err);
    }
    try{
        const pass = bcrypt.hashSync(PASSWORD, 10);
        const result = await db.query(`INSERT INTO STUDENT(first_name,  last_name , username, password, major_id) VALUES
            ($1, $2, $3, $4, $5);`,[FIRST_NAME, LAST_NAME, USERNAME, pass, MID]);
    res.status(200).send(result);
    }catch(err){
        console.log(err);
    }
    next();
})
module.exports = register;