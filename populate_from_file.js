const mongoose=require("mongoose");
const uri=require("./uri");
const fileName=process.argv[2];
const fs=require("fs");
const path=require("path");
const fileText=fs.readFileSync(path.join(__dirname, fileName), 'utf8');

mongoose.connect(uri);

var Schema=mongoose.Schema;

var teamSchema=new Schema({
	name:String,
	case:String,
	info:String
});

var team=mongoose.model('team', teamSchema);

var info=fileText.split("\n");

info.forEach(function(el){
	var devide=el.indexOf('   ');
	var team_case=[el.slice(0, devide), el.slice(devide, el.length)];

	if(!team_case[0] || !team_case[1]){
		console.log(`${el} is formated incorrectly`);
		return;
	}

	team_case[0]=team_case[0].trim();
	team_case[1]=team_case[1].trim();

	team.create({
		name:team_case[0],
		case:team_case[1],
		info:"none"
	}).then((data) => {
		console.log(data.name);
	});
});


