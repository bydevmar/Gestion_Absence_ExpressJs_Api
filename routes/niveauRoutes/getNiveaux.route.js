const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveaux.model");

router.get('/api/niveaux/', (req,res)=>{
    Niveau.find({})
    .then( (niveaux) => {
        res.send({ 
            status : "OK",
            details : niveaux.filter(niveau => niveau.deleted == false)
        });
    }).catch((err)=>{
        res.send({
            status : "ERROR",
            details : err
        });
    });
});

module.exports = router;