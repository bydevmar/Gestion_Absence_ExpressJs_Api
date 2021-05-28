const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

const utilisateur_Routes = require('./routes/UilisateurRoutes/index');
const niveau_Routes= require('./routes/NiveauRoutes');
const absence_Routes = require('./routes/AbsenceRoutes');
const affectation_Routes = require('./routes/AffectationRoutes');
const stagiaire_Routes = require('./routes/StagiaireRoutes');
const filier_Routes = require('./routes/FilierRoutes');
const groupe_Routes  = require('./routes/GroupeRoutes');


//set up express app
const app = express();

const port = 3001 || process.env.PORT
app.listen(port ,()=>{
    console.log(`app connected to ${port}`);
});

//middleware 
app.use(express.json());

app.use(cors())
//routes
const routes = [ 
    utilisateur_Routes,  niveau_Routes ,
    absence_Routes , affectation_Routes ,
    stagiaire_Routes , filier_Routes 
];

app.use(routes);


//connect to mongoDB
const url = "mongodb://localhost/GestionAbsence"
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise;
