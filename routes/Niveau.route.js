const express = require("express");
const router = express.Router();

const Niveau = require("../models/Niveaux.model");
const niveauSchema = require("../helpers/niveaux.validator");

router.get('/api/niveaux/', (req,res)=>{
    Niveau.find({}).then( (niveaux) => {
        res.send(niveaux);
    });
});

router.post('/api/niveaux/',async(req,res)=>{
    await niveauSchema.validateAsync(req.body).then(()=>{
        Niveau.create(req.body)
        .then((niveau)=>{
        res.send(niveau);
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
});

router.put('/api/niveaux/:id',async (req,res)=>{
    await niveauSchema.validateAsync(req.body).then(()=>{
        Niveau.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
            Niveau.findOne( { _id : req.params.id } )
            .then((niveau)=>{
                res.send(niveau);
            })
        })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
})

router.delete("/api/niveaux/:id", (req,res) => {
    Niveau.findOne( { _id : req.params.id } )
    .then((niveau)=>{
        niveau.delete().then((delniveau)=>{
            res.send(delniveau);
        })
    })
});

module.exports = router;