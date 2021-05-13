const express = require("express");
const router = express.Router();

const Groupe = require("../../models/Groupes.model");
const Utilisateur = require("../../models/Utilisateurs.model");

router.delete("/api/groupes/:id_g/:id_n", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Groupe.findById(req.params.id_n)
            .then((groupe)=>{
                if(groupe.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "groupe deja supprimé!"
                    });
                }
                groupe.delete()
                .then((delgroupe)=>{
                    res.status(400).send({
                        status : "OK",
                        message : "groupe supprimé avec succès!",
                        details : delgroupe
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