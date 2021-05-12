const express = require("express");
const router = express.Router();

const Utilisateur = require("../models/Utilisateurs.model");
const utilisateurSchema = require('../helpers/utilisateur.validator')

router.get('/api/utilisateurs/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Utilisateur.find({})
            .then((utilisateurs)=>{
                res.send({
                    status : "OK",
                    result : utilisateurs.filter(user  => user.deleted == true)
                });
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
                    details : err
                });
            })
        }
        else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
});

router.post('/api/utilisateurs/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            await utilisateurSchema.validateAsync(req.body)
            .then(()=>{
                Utilisateur.create(req.body)
                .then((utilisateur)=>{
                    res.send({
                        status : "OK",
                        message : "utilisateur ajouté avec succès!",
                        details : utilisateur
                    });
            })
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
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
    }).catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
});

router.put('/api/utilisateurs/:id_g/:id_u',async (req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
            await utilisateurSchema.validateAsync(req.body)
            .then((result)=>{
                Utilisateur.updateOne({ _id : req.params.id_u } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "utilisateur modifié avec succès!",
                        details : result
                    });
                })
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
                    message : err.details[0].message
                })
            })
        }else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
})

router.delete("/api/utilisateurs/:id_g/:id_u", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Utilisateur.findById(req.params.id_u)
            .then((utilisateur)=>{
                if(utilisateur.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "Utilisateur deja supprimé!"
                    });
                }
                utilisateur.delete()
                .then((deleteduser)=>{
                    res.status(400).send({
                        status : "ERROR",
                        message : "Utilisateur supprimé avec succès!",
                        details : deleteduser
                    });
                })
            }).catch(()=>{
                res.status(400).send({
                    status : "ERROR",
                    message : "aucun compte corresponde!"
                });
            })
        }
        else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "administrateur non trouvable!"
        });
    })
});

module.exports = router;