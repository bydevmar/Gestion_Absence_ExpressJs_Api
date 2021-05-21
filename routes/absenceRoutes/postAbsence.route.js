const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absence.model");
const Utilisateur = require("../../models/Utilisateur.model");
const Stagiaire = require("../../models/Stagiaire.model");
const Affectation = require("../../models/Affectation.model");
const absenceSchema = require('../../helpers/Absence.validator')

router.post('/api/absences', (req, res) => {
    absenceSchema.validateAsync(req.body)
        .then(() => {
            Utilisateur.findById(req.body.formateur)
                .then(async (user) => {
                    if (user.type == "Formateur") {
                        Stagiaire.findById(req.body.stagiaire).populate("groupe")
                            .then((stagiaire) => {
                                Affectation.findOne({ "groupe": stagiaire.groupe._id, "formateur": req.body.formateur })
                                    .then((affectation) => {
                                        if (affectation != null) {
                                            Absence.create(req.body)//check if "absence" already exists later 
                                                .then((absence) => {
                                                    res.send({
                                                        status: "OK",
                                                        message: "absence ajouté avec succès!",
                                                        details: absence
                                                    });
                                                })
                                        } else {
                                            res.send({
                                                status: "ERROR",
                                                message: "Vous pouvez pas marquer l'absence à ce groupe!"
                                            });
                                        }

                                    })
                                    .catch(() => {
                                        res.send({
                                            status: "ERROR",
                                            message: "Erreur lors de marquages d'absence!"
                                        });
                                    })
                            }).catch(() => {
                                res.send({
                                    status: "ERROR",
                                    message: "Aucun stagiaire avec ce ID!"
                                });
                            })
                    }
                }).catch(() => {
                    res.send({
                        status: "ERROR",
                        message: "Erreur lors de vérifications de votre identité!"
                    });
                })

        })
})









/*   .then(() => {
       Absence.create(req.body)
           .then((absence) => {
               res.send({
                   status: "OK",
                   message: "absence ajouté avec succès!",
                   details: absence
               });
           })
   }).catch((err) => {
       res.send({
           status: "ERROR",
           message: err.details[0].message
       });
   })
}
 
}).catch(() => {
res.status(400).send({
   status: "ERROR",
   message: "aucun compte corresponde!"
});
})*/

module.exports = router;