const express = require("express");
const mongoose = require('mongoose');
const utilisateurRoutes = require('./routes/UtilsateurAPI');
const niveauAPI = require('./routes/NiveauAPI');
const filierAPI = require('./routes/FilierAPI');
const groupeAPI = require('./routes/GroupeAPI');
const stagiaireAPI = require('./routes/StagiaireAPI');
const affectationAPI = require('./routes/AffectationAPI');


//set up express app
const app = express();

const port = 3001 || process.env.port
app.listen(port ,()=>{
    console.log(`app connected to ${port}`);
});

//middleware 
app.use(express.json());


app.use(utilisateurRoutes);
app.use(niveauAPI);
app.use(filierAPI);
app.use(groupeAPI);
app.use(stagiaireAPI);
app.use(affectationAPI);


//connect to mongoDB
const url = "mongodb://localhost/GestionAbsence"
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise;