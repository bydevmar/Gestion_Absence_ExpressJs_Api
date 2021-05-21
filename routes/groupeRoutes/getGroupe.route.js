const express = require("express");
const router = express.Router();

const Groupe = require("../../models/Groupe.model");

router.get('/api/groupes/', (req,res)=>{
    Groupe.find({})
    .then( (groupex) => {
        res.send({ 
            status : "OK",
            details : groupex.filter(groupe => groupe.deleted == false)
        });
    }).catch((err)=>{
        res.send({
            status : "ERROR",
            details : err
        });
    });
});

module.exports = router;