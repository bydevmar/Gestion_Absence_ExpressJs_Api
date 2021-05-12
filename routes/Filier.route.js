const express = require("express");
const router = express.Router();

const Filier = require("../models/Filiers.model");


router.get('/api/filiers/',(req,res)=>{
    Filier.find({}).then( (filiers) => {
        res.send(filiers);
    });
});


router.post('/api/filiers/',(req,res)=>{
    Filier.create(req.body)
    .then((filier)=>{
        res.send(filier);
    })
    .catch((err)=>{
        res.send(err.message);
    });
});


router.put('/api/filiers/:id',(req,res)=>{
    Filier.findOneAndUpdate( { _id : req.params.id } , req.body)
    .then(()=>{
        Filier.findOne( { _id : req.params.id } )
        .then((filier)=>{
            res.send(filier);
        })
    })
})


router.delete("/api/filiers/:id", (req,res) => {
    Filier.findOne( { _id : req.params.id } )
    .then((filier)=>{
        filier.delete().then((delfilier)=>{
            res.send(delfilier);
        })
    })
});


module.exports = router;