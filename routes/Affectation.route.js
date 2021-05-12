const express = require("express");
const router = express.Router();

const Affectation = require("../models/Affectations.model");
const affectationSchema = require("../helpers/affectation.validator");

router.get('/api/affectations/',(req,res)=>{
    Affectation.find({}).then( (affectations) => {
        res.send(affectations);
    });
});

router.post('/api/affectations/',async(req,res)=>{
    await affectationSchema.validateAsync(req.body).then(()=>{
        Affectation.create(req.body)
        .then((affectation)=>{
        res.send(affectation);
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
});

router.put('/api/affectations/:id',async(req,res)=>{
    await affectationSchema.validateAsync(req.body).then(()=>{
        Affectation.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
            Affectation.findOne( { _id : req.params.id } )
            .then((affectation)=>{
                res.send(affectation);
            })
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
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