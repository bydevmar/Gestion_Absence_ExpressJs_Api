const express = require("express");
const mongoose = require('mongoose');
const utilisateurRoutes = require('./routes/UtilsateurAPI');
const NiveauAPI = require('./routes/NiveauAPI');


//set up express app
const app = express();

const port = 3001 || process.env.port
app.listen(port ,()=>{
    console.log(`app connected to ${port}`);
});

//middleware 
app.use(express.json());


app.use(utilisateurRoutes);
app.use(niveauxRoutes);


//connect to mongoDB
const url = "mongodb://localhost/GestionAbsence"
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise;