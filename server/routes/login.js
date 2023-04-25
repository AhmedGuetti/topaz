"use strict";
require('dotenv').config();
const express = require("express");
const db = require('../db');
const bcrypt = require("bcrypt");
const session = require('express-session');
const cookieParser = require("cookie-parser");


const login = new express.Router();


login.use(session({
    key: "userId",
    secret: "J4cA7keX@b",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 60 * 24,
      sameSite: 'None',
    },
    })
);

login.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });
login.post('/login', async (req,res) => {
    const USERNAME      =   req.body.USERNAME;
    const PASSWORD      =   req.body.PASSWORD;

    try{
        const resUsers = await db.query(`SELECT * FROM STUDENT WHERE username = $1`,[USERNAME]);
        if(resUsers.rows.length == 0)
                res.status(404).send({ message: "User doesn't exist" });
        else {
            const isMatch = await bcrypt.compare(PASSWORD, resUsers.rows[0].password);
            // return 400 if password does not match
            if (!isMatch) 
                res.status(404).send({ message: "Wrong username/password combination!" });
            else {
                req.session.user = resUsers;
                res.status(200).send(resUsers);
            }
        }
    } catch(err){
        console.log(err);
    }

   
});

module.exports = login;