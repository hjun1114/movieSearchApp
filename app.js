var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");


app.get("/", function(req, res){
  res.render("home");
});

app.get("/results", function(req, res){
  var searchedValue = req.query.searchValue;
  request("http://omdbapi.com/?s=" + searchedValue, function(error, response, body){
    if(!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body) // we get the body object as string, so have to parse it and store in a variable
      res.render("search", {parsedData: parsedData});
    }
  });
});

//
// HOW TO MAKE API CALL IN EXPRESS ROUTES
//
// 1. Set up a route in traditional way - app.get("/", function(req, res){ });
// 2. Use Request.js to call API - request("API URL", function(error, response, body){ });
//  -  It is important to remember 3 parameteres passed by request : error, response, and body.
// 3. Put a logic inside the request call back function: if there is no error and get a status code of 200 (good code),
//    parse it in a variable and render it.
//  - if (!error && response.statusCode == 200){
//      var results = JSON.parse(body)
//      res.send(results);
//    }

app.listen(3000, function() {
  console.log('App has started on port 3000');
});
