const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveau.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.get('/api/niveaux/:id_admin', (req, res) => {
    Utilisateur
        .findById(req.params.id_admin)
        .then(utilisateur => {
            if (utilisateur.type == "Gestionnaire") {
                Niveau
                    .find({})
                    .then(niveaux => {
                        res.send({
                            status: "OK",
                            details: niveaux
                                .filter(niveau => niveau.deleted == false)
                        });
                    })
                    .catch(error => {
                        res.send({
                            status: "ERROR",
                            details: error,
                            message :"error lors de vérification de niveaux!"

                        })
                    })
            }
        }).catch(error => {
            res.send({
                status: "ERROR",
                details: "Error lors la vérifications d'utilisateur!"
            })
        })
});

module.exports = router;