require('dotenv').config();
const express = require('express');
const cors = require('cors');

// import custom routes
const header = require('./middlware/header');
const majors = require('./api/majors');
const subjects = require('./api/subjects');
const filieres = require('./api/filieres');
const regles = require('./api/regles');
const fuzzy = require('./routes/fuzzy');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const note = require('./api/note');
const student = require('./api/student');




// initialize express aplication
const app = express();
const port = process.env.PORT || 3001;


// init middleware 
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
;
app.use(express.urlencoded({ extended: true}));
app.options('*',cors());
app.use(header);



// init custom middleware
app.use(majors);
app.use(filieres);
app.use(subjects);
app.use(regles);
app.use(fuzzy);
app.use(login);
app.use(logout);
app.use(register);
app.use(note);
app.use(student);

// app.use(notesanonyme);






// Listening to the port 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})