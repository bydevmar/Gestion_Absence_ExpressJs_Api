const express = require("express");
const router = express.Router();

const Stagiaire = require("../models/Stagiaires.model");

router.get('/api/stagiaires/',(req,res)=>{
    Stagiaire.find({}).then( (stagiaires) => {
        res.send(stagiaires);
    });
});

router.post('/api/stagiaires/',(req,res)=>{
    Stagiaire.create(req.body)
    .then((stagiaire)=>{
        res.send(stagiaire);
    })
    .catch((err)=>{
        res.send(err.message);
    })
});

router.put('/api/stagiaires/:id',(req,res)=>{
    Stagiaire.findOneAndUpdate( { _id : req.params.id } , req.body)
    .then(()=>{
        Stagiaire.findOne( { _id : req.params.id } )
        .then((stagiaire)=>{
            res.send(stagiaire);
        })
    })
})

router.delete("/api/stagiaires/:id", (req,res) => {
    Stagiaire.findOne( { _id : req.params.id } ).then((stagiaire)=>{
        stagiaire.delete().then((delstagiaire)=>{
            res.send(delstagiaire);
        })
    })
});

module.exports = router;