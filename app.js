var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')
const port = process.env.PORT || 3000;
var path = require('path')
var bodyParser = require('body-parser');


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

http.listen(port, function(){
    console.log("server works")
})