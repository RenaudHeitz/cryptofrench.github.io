const express = require('express')
const ejs = require('ejs')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db, Server = require('mongodb').Server ,
assert = require('assert');
var cleaner = require("./function/cleanPreview.js");
app.locals.cleaner = require("./function/cleanPreview.js");

app.engine
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handle the index page
app.get('/', function (req, res) {
        res.render('index',{result_err : null });
        })


// Function that get the tags from the index page

app.post('/', function (req, res) {
         // get the tags
         let tag = req.body.tag
         tag = tag.replace(/\s+/g, '');
         // Split tags
         tags=  tag.split(',');
         
         
         // Variables
         var user = 'steemit';
         var password = 'steemit';
         
         var account = [];
         var url = [];
         var title = [];
         var date = [];
         var stop = 0;
         var limit = 30;
         
         console.log(tags)
                    // connect to the BDD
                  MongoClient.connect('mongodb://'+user+':'+password+'@mongo1.steemdata.com:27017/SteemData',{native_parser:true}, function(err,db){
                                      if(err){
                                      console.log("Auth Failed")
                                      }
                                      var collection = db.collection("Posts");
                                      
                                      // bdd query options
                                      var options = {
                                      "limit": limit,
                                      "maxTimeMS" : 7000,
                                      "sort": { "created": -1 }
                                      };
                                      console.log("Connected ")
                                      
                                      
                                      var collection = db.collection("Posts");
                                      // search on the BDD the tags
                                      collection.find({"tags":{ $all: tags }},options).toArray(function(err, data) {
                                                                                                           if (err) {
                                                                                                            console.log(err);
                                                                                                            res.render('index', {result_err : 1});
                                                                                                           }

                                                                                                            /*console.log(data[1]['body']);
                                                                                                            console.log(cleaner.strip(data[1]['body']));*/


                                                                                                            console.log("Render");
                                                                                                            // Display the results on page.ejs
                                                                                                            res.render('result', {tag : tags, data : data});
                                                                                                            db.close()

                                                                                                           });
                                      
                                      
                                      })
                                        
         
         
                                                
                                                
         })
                            


app.listen(process.env.PORT || 3000);


