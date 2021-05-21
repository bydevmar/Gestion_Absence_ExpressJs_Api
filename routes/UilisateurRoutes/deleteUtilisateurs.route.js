const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateurs.model");

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
                        status : "OK",
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