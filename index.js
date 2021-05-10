const express = require("express");
const mongoose = require('mongoose');


//set up express app
const app = express();

const port = 3001 || process.env.port
app.listen(port ,()=>{
    console.log(`app connected to ${port}`);
});

//middleware 
app.use(express.json());

//connect to mongoDB
const url = "mongodb://127.0.0.1/GestionAbsence"
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("mongodb is connected!!");
});