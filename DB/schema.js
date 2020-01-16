var mongoose = require('mongoose');

var Bodega = mongoose.Schema;
var ObjectId = Bodega.ObjectId;
var Bodega = new Bodega({
    cantidad:Number,
    codigo:String,
    nombre:String,
    provedor:String,
    costo:Number,
    venta:Number

},{collection:'bodega'})



module.exports.Bodega = Bodega;
