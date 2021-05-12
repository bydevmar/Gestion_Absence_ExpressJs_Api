const express = require("express");
const router = express.Router();

const Absence = require("../models/Absences.model");
const absenceSchema = require('../helpers/absences.validator')
router.get('/api/absences/',(req,res)=>{
    Absence.find({}).then( (absences) => {
        res.send(absences);
    });
});

router.post('/api/absences/',async(req,res)=>{
    await absenceSchema.validateAsync(req.body).then(()=>{
        Absence.create(req.body)
        .then((absence)=>{
            res.send(absence);
        })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
});

router.put('/api/absences/:id',async(req,res)=>{
    await absenceSchema.validateAsync(req.body).then(()=>{
        Absence.findOneAndUpdate( { _id : req.params.id } , req.body)
        .then(()=>{
            Absence.findOne( { _id : req.params.id } )
            .then((absences)=>{
                res.send(absences);
        })
    })
    }).catch((err)=>{
        res.send(err.details[0].message)
    })
})

router.delete("/api/absences/:id", (req,res) => {
    Absence.findOne( { _id : req.params.id } ).then((absence)=>{
        absence.delete().then((delabsence)=>{
            res.send(delabsence);
        })
    })
});

module.exports = router;