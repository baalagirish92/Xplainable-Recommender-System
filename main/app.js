var express = require('express');
var app = express()


const request = require('request');
const path = require('path');
const  fs = require('fs')

var cors = require("cors");

app.use(cors());
// app.use(express.static("public"));

app.get('/*', function(req,res) {
  console.log(req.url)
  if(req.url == '/')
    res.sendFile(path.join(__dirname, 'index.html'));   
  else if (req.url.indexOf('/Recommendation_db1_v3.html') != -1) {
    res.sendFile(path.join(__dirname, 'Recommendation_db1_v3.html'));  
  } 
  else  {
    res.sendFile(path.join(__dirname, '/' + req.url));  
  }  
})

const port = process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

  app.listen(port ,function(){
    console.log("Started on PORT ", port);
})
