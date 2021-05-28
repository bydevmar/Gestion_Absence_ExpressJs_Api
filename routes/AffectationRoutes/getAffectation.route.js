const express = require("express");
const router = express.Router();

const Affectation = require("../../models/Affectation.model");

router.get('/api/affectations/', (req,res)=>{
    Affectation.find({})
    .then( (affectationx) => {
        res.send({ 
            status : "OK",
            details : affectationx.filter(affectation => affectation.deleted == false)
        });
    }).catch((err)=>{
        res.send({
            status : "ERROR",
            details : err
        });
    });
});

module.exports = router;