const express = require("express");
const router = express.Router();

const Affectation = require("../models/Affectations.model");

router.get('/api/affectations/',(req,res)=>{
    Affectation.find({}).then( (affectations) => {
        res.send(affectations);
    });
});

router.post('/api/affectations/',(req,res)=>{
    Affectation.create(req.body)
    .then((affectation)=>{
        res.send(affectation);
    })
    .catch((err)=>{
        res.send(err.message);
    })
});

router.put('/api/affectations/:id',(req,res)=>{
    Affectation.findOneAndUpdate( { _id : req.params.id } , req.body)
    .then(()=>{
        Affectation.findOne( { _id : req.params.id } )
        .then((affectation)=>{
            res.send(affectation);
        })
    })
})

router.delete("/api/affectations/:id", (req,res) => {
    Affectation.findOne( { _id : req.params.id } ).then((affectation)=>{
        affectation.delete().then((delaffectation)=>{
            res.send(delaffectation);
        })
    })
});

module.exports = router;