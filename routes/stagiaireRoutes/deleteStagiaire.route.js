const express = require("express");
const router = express.Router();

const Stagiaire = require("../../models/Stagiaire.model");
const Utilisateur = require("../../models/Utilisateur.model");
const stagiaireSchema = require('../../helpers/stagiaire.validator')

router.delete("/api/stagiaires/:id_g/:id_n", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Stagiaire.findById(req.params.id_n)
            .then((stagiaire)=>{
                if(stagiaire.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "stagiaire deja supprimé!"
                    });
                }
                stagiaire.delete()
                .then((delstagiaire)=>{
                    res.status(400).send({
                        status : "OK",
                        message : "stagiaire supprimé avec succès!",
                        details : delstagiaire
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