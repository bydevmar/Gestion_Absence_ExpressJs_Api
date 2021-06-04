const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveau.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.delete("/api/niveaux/:id_admin/:id_n", (req,res) => {
    Utilisateur.findById(req.params.id_admin)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Niveau.findById(req.params.id_n)
            .then((niveau)=>{
                if(niveau.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "niveau deja supprimé!"
                    });
                }
                niveau.delete()
                .then((delniveau)=>{
                    res.send({
                        status : "OK",
                        message : "niveau supprimé avec succès!",
                        details : delniveau
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