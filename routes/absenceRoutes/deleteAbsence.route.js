const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.delete("/api/absences/:id_g/:id_n", (req,res) => {
    Utilisateur.findById(req.params.id_g)
    .then((utilisateur)=>{
        if(utilisateur.type == "Gestionnaire"){
            Absence.findById(req.params.id_n)
            .then((absence)=>{
                if(absence.deleted == true){
                    return res.send({
                        status : "ERROR",
                        message : "absence deja supprimé!"
                    });
                }
                absence.delete()
                .then((delabsence)=>{
                    res.status(400).send({
                        status : "OK",
                        message : "absence supprimé avec succès!",
                        details : delabsence
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