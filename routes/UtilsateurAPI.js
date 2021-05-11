const express = require("express");
const router = express.Router();

const Utilisateur = require("../models/Utilisateurs");

router.get('/api/utilisateurs/',(req,res)=>{
    Utilisateur.find({}).then( (utilisateurs) => {
        res.send(utilisateurs);
    });
});

router.post('/api/utilisateurs',(req,res)=>{
    Utilisateur.create(req.body)
    .then((utilisateur)=>{
        res.send(utilisateur);
    })
    .catch((err)=>{
        res.send(err.message);
    })
});

router.put('/api/utilisateurs/:id',(req,res)=>{
    Utilisateur.findOneAndUpdate( { _id : req.params.id } , req.body)
    .then(()=>{
        Utilisateur.findOne( { _id : req.params.id } )
        .then((utilisateur)=>{
            res.send(utilisateur);
        })
    })
})

router.delete("/api/utilisateurs/:id", (req,res) => {
    Utilisateur.findOne( { _id : req.params.id } ).then((utilisateur)=>{
        utilisateur.delete().then((delutilisateur)=>{
            res.send(delutilisateur);
        })
    })
});


module.exports = router;