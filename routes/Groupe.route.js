const express = require("express");
const router = express.Router();

const Groupe = require("../models/Groupes.model");
const groupeSchema = require('../helpers/groupe.validator')

router.get('/api/groupes/',(req,res)=>{
    Groupe.find({}).then( (groupes) => {
        res.send(groupes);
    });
});

router.post('/api/groupes',async(req,res)=>{
    await niveauSchema.validateAsync(req.body).then(()=>{
        Groupe.create(req.body)
        .then((groupe)=>{
            res.send(groupe);
        })
        .catch((err)=>{
            res.send(err.message);
        })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
    
});

router.put('/api/groupes/:id',async(req,res)=>{
    await niveauSchema.validateAsync(req.body).then(()=>{
        Groupe.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
        Groupe.findOne( { _id : req.params.id } )
        .then((groupe)=>{
            res.send(groupe);
        })
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
    
})

router.delete("/api/groupes/:id", (req,res) => {
    Groupe.findOne( { _id : req.params.id } ).then((groupe)=>{
        groupe.delete().then((delgroupe)=>{
            res.send(delgroupe);
        })
    })
});

module.exports = router;