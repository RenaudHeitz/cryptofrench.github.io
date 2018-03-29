const express = require('express')
const ejs = require('ejs')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const Promise = require('promise');
const MongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db, Server = require('mongodb').Server ,
assert = require('assert');
app.engine
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', function (req, res) {
        res.render('index');
        })



app.post('/', function (req, res) {
         // get the tags
         let tag = req.body.tag
         tag = tag.replace(/\s+/g, '');
         // Split tags
         tags=  tag.split(',');
         
         var user = 'steemit';
         var password = 'steemit';
         
         var account = [];
         var url = [];
         var title = [];
         var date = [];
         var stop = 0;
         var limit = 30;
         console.log(tags)
       //  let promiseGetData = new Promise(function(resolve,reject){
                  MongoClient.connect('mongodb://'+user+':'+password+'@mongo1.steemdata.com:27017/SteemData',{native_parser:true}, function(err,db){
                                      if(err){
                                      console.log("Auth Failed")
                                      //return;
                                      }
                                      var collection = db.collection("Posts");
                                      
                                      
                                      var options = {
                                      "limit": limit,
                                      
                                      "sort": { "created": -1 }
                                      };
                                      console.log("Connected ")
                                      
                                      
                                      var collection = db.collection("Posts");
                                      
                                      collection.find({"tags":{ $all: tags }},options).toArray(function(err, data) {
                                                                                                           if (err) {
                                                                                                           console.log(err);
                                                                                                           }
                                                                                                            console.log("la " + data.length);
                                                                                               //console.log(data[0]);
                                                                                                            res.render('page', {tag : tags, data : data});
                                                                                                            db.close()

                                                                                                           });
                                      
                                      
                                      })
                                        
         
         
                                                
                                                
         })
                            


app.listen(3000, function () {
           console.log('Example app listening on port 3000!')
           })

