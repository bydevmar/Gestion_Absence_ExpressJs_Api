const express = require("express");
const router = express.Router();

const Groupe = require("../../models/Groupe.model");
const Utilisateur = require("../../models/Utilisateur.model");

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
                    res.send({
                        status : "OK",
                        message : "groupe supprimé avec succès!",
                        details : delgroupe
                    });
                })
            }).catch(()=>{
                res.send({
                    status : "ERROR",
                    message : "aucun compte corresponde!"
                });
            })
        }
        else{
            res.send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.send({
            status : "ERROR",
            message : "administrateur non trouvable!"
        });
    })
});

module.exports = router;