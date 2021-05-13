const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absences.model");
const Utilisateur = require("../../models/Utilisateurs.model");
const absenceSchema = require('../../helpers/absences.validator')

router.post('/api/absences/:id_g',(req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async(utilisateur)=>{
        if(utilisateur.type == "Gestionnaire" || utilisateur.type == "Formateur"){
            await absenceSchema.validateAsync(req.body)
            .then(()=>{
                Absence.create(req.body)
                .then((absence)=>{
                    res.send({
                        status : "OK",
                        message : "absence ajouté avec succès!",
                        details : absence
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

module.exports = router;