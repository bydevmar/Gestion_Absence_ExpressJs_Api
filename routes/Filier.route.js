const express = require("express");
const router = express.Router();

const Filier = require("../models/Filiers.model");
const filierSchema = require("../helpers/filier.validator");


router.get('/api/filiers/',(req,res)=>{
    Filier.find({}).then( (filiers) => {
        res.send(filiers);
    });
});


router.post('/api/filiers/',async(req,res)=>{
    await filierSchema.validateAsync(req.body).then(()=>{
        Filier.create(req.body)
        .then((filier)=>{
            res.send(filier);
        });
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
});


router.put('/api/filiers/:id',async(req,res)=>{
    await filierSchema.validateAsync(req.body).then(()=>{
        Filier.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
        Filier.findOne( { _id : req.params.id } )
        .then((filier)=>{
            res.send(filier);
        })
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
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