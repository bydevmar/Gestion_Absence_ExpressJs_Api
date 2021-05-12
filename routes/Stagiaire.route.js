const express = require("express");
const router = express.Router();

const Stagiaire = require("../models/Stagiaires.model");
const stagiaireSchema = require("../helpers/stagiaire.validator");

router.get('/api/stagiaires/',(req,res)=>{
    Stagiaire.find({}).then( (stagiaires) => {
        res.send(stagiaires);
    });
});

router.post('/api/stagiaires/',async(req,res)=>{
    await stagiaireSchema.validateAsync(req.body).then((result)=>{
        Stagiaire.create(req.body)
        .then((stagiaire)=>{
        res.send(stagiaire);
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
});

router.put('/api/stagiaires/:id',async(req,res)=>{
    await stagiaireSchema.validateAsync(req.body).then(()=>{
        Stagiaire.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
        Stagiaire.findOne( { _id : req.params.id } )
        .then((stagiaire)=>{
            res.send(stagiaire);
        })
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
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