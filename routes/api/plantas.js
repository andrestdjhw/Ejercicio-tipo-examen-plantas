var express= require('express');
var router= express.Router();


function initPlantas(db){
    
    var plantasColl = db.collection('plantas');
    router.get('/', (req, res, next)=>{
        res.status(200).json({"api":"1"});
    });

    return router;
}

module.exports = initPlantas;