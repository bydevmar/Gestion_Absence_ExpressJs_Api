const express = require("express");
const router = express.Router();

const Utilisateur = require("../models/Utilisateurs.model");
const utilisateurSchema = require('../helpers/utilisateur.validator')

router.get('/api/utilisateurs/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g).then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Utilisateur.find({}).then( (utilisateurs) => {
                res.send({
                    status : "OK",
                    result : utilisateurs
                });
            });
        }
        else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    })
});

router.post('/api/utilisateurs/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g).then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            await utilisateurSchema.validateAsync(req.body).then(()=>{
                Utilisateur.create(req.body)
                .then((utilisateur)=>{
                    res.send({
                        status : "OK",
                        result : utilisateur
                    });
            })
            }).catch((err)=>{
                res.send({
                    status : "OK",
                    message : err.details[0].message
                });
            })
        }
        else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    })
    
});

router.put('/api/utilisateurs/:id',async (req,res)=>{
    await utilisateurSchema.validateAsync(req.body).then(()=>{
        Utilisateur.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
        Utilisateur.findOne( { _id : req.params.id } )
        .then((utilisateur)=>{
            res.send(utilisateur);
        })
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
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