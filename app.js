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
app.use(express.static("public"));
// app.use('public', express.static(__dirname + 'public'));


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
app.get("/home2", function(req, res){
    res.render("home2");
});
app.get("/signup", function(req, res){
	res.render("signup");
});
app.get("/login", function(req, res){
	res.render("login");
});
app.get("/logout", function(req, res){
	res.render("logout");
});
app.get("/secret", function(req, res){
	res.render("secret");
});


app.listen(process.env.PORT || 3000, function() {
    console.log("This server is up and running");
});