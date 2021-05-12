const express = require("express");
const mongoose = require('mongoose');

const utilisateur_routes = require('./routes/utilisateurRoutes/index');
const niveau_routes = require('./routes/niveauRoutes/index');
/*
    const niveau_route = require('./routes/Niveau.route');
    const filier_route = require('./routes/Filier.route');
    const groupe_route = require('./routes/Groupe.route');
    const stagiaire_route = require('./routes/Stagiaire.route');
    const affectation_route = require('./routes/Affectation.route');
    const absence_route = require('./routes/Absence.route');
*/

//set up express app
const app = express();

const port = 3001 || process.env.PORT
app.listen(port ,()=>{
    console.log(`app connected to ${port}`);
});

//middleware 
app.use(express.json());

//routes
const routes = [ 
                utilisateur_routes , niveau_routes
            ];
app.use(routes);


//connect to mongoDB
const url = "mongodb://localhost/GestionAbsence"
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise;
