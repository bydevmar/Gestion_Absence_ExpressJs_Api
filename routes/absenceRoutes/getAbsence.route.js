const express = require("express");
const router = express.Router();

const Absence = require("../../models/Absences.model");

router.get('/api/absences/', (req,res)=>{
    Absence.find({})
    .then( (absences) => {
        res.send({ 
            status : "OK",
            details : absences.filter(absence => absence.deleted == false)
        });
    }).catch((err)=>{
        res.send({
            status : "ERROR",
            details : err
        });
    });
});

module.exports = router;