var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)
const port = process.env.PORT || 3000;
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;

var esquema = require('./DB/schema')
mongoose.connect(
    "mongodb://localhost:27017/crud",
    { useNewUrlParser: true ,useUnifiedTopology: true}
);

var db = mongoose.createConnection('mongodb://localhost:27017/crud',
{ useNewUrlParser: true ,useUnifiedTopology: true})


app.set('views',path.join(__dirname,"public/views"));
app.set("view engine","pug");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        limit:"50mb",
        extended:true,
        paramenterLimit:1000000
    })
)

var crud = require("./rutas/crud")
app.use("/",crud)

const tienda = io.of('/crud');

tienda.on('connection',function(socket){
    var coneccion =  db.model('Bodega',esquema.Bodega)
    coneccion.find({},function(err,doc){
        if(err) console.error(err)
        socket.emit('tiendita',{doc})
    })
    /*const escucha = tienda.watch();
    escucha.on('change',(change)=>{
      tienda.find({},function(err,doc){
        if(err) console.error(err);
        socket.emit('tiendita',{doc})
      })
    })*/
})
http.listen(port, function(){
    console.log("server works")
})