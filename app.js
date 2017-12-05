var express					= require("express"),
	mongoose				= require("mongoose"),
	bodyParser				= require("body-parser"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongooe	= require("passport-local-mongoose");

// var promise = mongoose.connect('mongodb://localhost/auth_login', 
// {useMongoClient: true});

var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

// app.use(require("express-session")({
//     secret: "Monkey biz is the secret handle for today",
//     resave: false,
//     saveUninitialized: false
// }));

//Routes
app.get("/", function(req, res){
    res.render("home");
});


app.listen(process.env.PORT || 3000, function() {
    console.log("This server is up and running");
});