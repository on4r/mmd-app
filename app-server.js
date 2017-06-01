require("env2")(".env");
var request     = require("request");
var express     = require("express");
var bodyParser  = require("body-parser");
var path        = require("path");
var app         = express();

app.set("port", (process.env.PORT || 61009));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Send API Request to TMDB via app-server, to hide API-Key
app.get("/search/:string", function(req, res) {
  var response = res;
  var requestUrl = "https://api.themoviedb.org/3/search/movie/?query=" + req.params.string + "&language=de&api_key=" + process.env.TMDB_API_KEY;
  request(requestUrl, function(err, res, body) {
    response.send(body);
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(app.get("port"), function() {
  console.log("App-Server started. Listening on Port " + app.get("port"));
});
