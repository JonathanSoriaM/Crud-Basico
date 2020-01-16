var express = require('express')
var router = express.Router();
mongoose = require('mongoose');

var esquema = require('../DB/schema')
mongoose.connect(
    "mongodb://localhost:27017/crud",
    { useNewUrlParser: true ,useUnifiedTopology: true}
);

var db = mongoose.createConnection('mongodb://localhost:27017/crud',
{ useNewUrlParser: true ,useUnifiedTopology: true})


router.route('/crud')
    .get(function(req,res,next){
        res.render('crud')
    })
    .post(function(req,res,next){
        const {cantidad,codigo,nombre,provedor,costo,venta} = req.body;
        var Producto = db.model('Bodega',esquema.Bodega)
        Producto.findOne({codigo:codigo},function(err,doc){
            if(err) console.error(err);
            if(doc){
                console.log(doc)
                Producto.findOneAndUpdate({id:doc._id},{sinc:{cantidad:cantidad}},function(err,doc){
                    if(err) console.error(err)
                    res.status(200).send('ok')
                })
            }
            else{
                var NuevoProducto = Producto({
                    cantidad:cantidad,
                    codigo:codigo,
                    nombre:nombre,
                    provedor:provedor,
                    costo:costo,
                    venta:venta
                })
                NuevoProducto.save(function(err,doc){
                    if(err) console.error(err)
                    res.status(200).send('ok')
                })
            }
        })
    }) 


module.exports = router;