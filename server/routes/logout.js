

"use strict";
require('dotenv').config();
const express = require("express");
const db = require('../db');
const bcrypt = require("bcrypt");
const session = require('express-session');
const cookieParser = require("cookie-parser");


const logout = new express.Router();

logout.post('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie('userId') 
    return res.json({ msg: 'logging you out' })

  });
  

module.exports = logout;