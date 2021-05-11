const express = require("express");
const router = express.Router();



const Niveau = require("../models/Niveaux");

//Get all Niveaux 
router.get('/api/niveaux/',(req,res)=>{
    Niveau.find({}).then( (niveaux) => {
        res.send(niveaux);
    });
});

//Create new Niveau 
router.post('/api/niveaux/',(req,res)=>{
    Niveau.create(req.body)
    .then((niveau)=>{
        res.send(niveau);
    })
    .catch((err)=>{
        res.send(err.message);
    })
});

router.put('/api/niveaux/:id',(req,res)=>{
    Niveau.findOneAndUpdate( { _id : req.params.id } , req.body)
    .then(()=>{
        Niveau.findOne( { _id : req.params.id } )
        .then((niveau)=>{
            res.send(niveau);
        })
    })
})

//delete users
router.delete("/api/niveaux/:id", (req,res) => {
    Niveau.findOne( { _id : req.params.id } )
    .then((niveau)=>{
        niveau.delete().then((delniveau)=>{
            res.send(delniveau);
        })
    })
});


module.exports = router;