const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filier.model");

router.get('/api/filiers/', (req,res)=>{
    Filier.find({})
    .then( (filiers) => {
        res.send({ 
            status : "OK",
            details : filiers.filter(filier => filier.deleted == false)
        });
    }).catch((err)=>{
        res.send({
            status : "ERROR",
            details : err
        });
    });
});

module.exports = router;