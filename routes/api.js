var express= require('express');
var router= express.Router();


function initApi(db){
    var plantasRouter = require('./api/plantas')(db);
    router.use('/plantas', plantasRoutes);
    return router;
}

module.exports = initApi;