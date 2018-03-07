const express = require('express');
const bodyParser=require("body-parser");
const path=require("path");
const app = express();
const mongoose=require("mongoose");
const uri=require("./uri");

mongoose.connect(uri);

var Schema=mongoose.Schema;

var teamSchema=new Schema({
	name:String,
	case:String,
	info:String
});

var team=mongoose.model('team', teamSchema);

//serve up the home page!
app.get('/', function(req, res){
	console.log("Served home page.");
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search', function(req, res){
	console.log("Served search page.");
	res.sendFile(path.join(__dirname, 'search.html'));
});

app.get('/search/search', function(req, res){
	
});

//serve a table
app.get('/table', function(req, res){
	team.find({}).then((data)=>{
		res.send(data);
	});
});

app.listen(5000);

console.log("App listening on port 5000.");