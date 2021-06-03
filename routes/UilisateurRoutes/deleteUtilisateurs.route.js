const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateur.model");

router.delete("/api/utilisateurs/:id_g/:id_u", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Utilisateur.findById(req.params.id_u)
            .then((utilisateur)=>{
                if(utilisateur.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "Utilisateur n'exist pas!"
                    });
                }
                utilisateur.delete()
                .then((deleteduser)=>{
                    res.send({
                        status : "OK",
                        message : "Utilisateur supprimé avec succès!",
                        details : deleteduser
                    });
                }).catch(()=>{
                    res.send({
                        status : "ERROR",
                        message : "error lors de la suppression!"
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