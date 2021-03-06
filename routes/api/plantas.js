var express= require('express');
var router= express.Router();
var ObjectID =  require('mongodb').ObjectID;

function initPlantas(db){
    
    var plantasColl = db.collection('plantas');
    router.get('/', (req, res, next)=>{


        plantasColl.find().toArray((err, plantas)=>{
            if(err){
                console.log(err);
                return res.status(404).json({"Error": "Error al extraer plantas de la base de Datos"});
            }
            return res.status(200).json(plantas);
        });
    });//get all
    router.get('/:id', (req, res, next)=>{
        var id = new ObjectID(req.params.id);
        plantasColl.findOne({"_id": id} ,(err, doc)=>{
            if(err){
                console.log(err);
                return res.status(404).json({"error": "No se puede obtener planta"});
            }
            return res.status(200).json(doc);
        });// findOne
    });// /:id

    router.post('/', (req, res, next)=>{
        var newPlanta = Object.assign(
            {}, 
            {
                "nombre": "",
                "tipo": "",
                "taxonomoa": "",
                "uso": "",
                "fechaCreated":new Date().getTime(),
                "views": 0,
                "likes": 0
            },
             req.body
            );
            plantasColl.insertOne(newPlanta, (err, rslt)=>{
               if(err){
                   console.log(err);
                   return res.status(404).json({"Error" : "No se pudo agregar nueva planta"});
               }
               if(rslt.ops.length==0){
                   console.log(rslt);
                   return res.status(404).json({"Error" : "No se pudo agregar nueva planta"});

               }
               return res.status(200).json(rslt.ops[0]); 
            });
    });//post

    return router;
}

module.exports = initPlantas;