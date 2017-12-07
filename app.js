var express					= require("express"),
	mongoose				= require("mongoose"),
	bodyParser				= require("body-parser"),
	// User					= require("./models/user"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongooe	= require("passport-local-mongoose");

var app = express();

var promise = mongoose.connect('mongodb://localhost/basic_login', 
{useMongoClient: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use('public', express.static(__dirname + 'public'));

// app.use(require("express-session")({
//     secret: "Monkey biz is the secret handle for today",
//     resave: false,
//     saveUninitialized: false
// }));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var User = mongoose.model("User", campgroundSchema);

User.create(
     {
	     name: "Joe", 
	     email: "joe@gmail.com",
	     username: "JoJoe",
		 password: "password",
		 confirmpw: "password"   
     },
     function(err, User){
      if(err){
          console.log(err);
      } else {
          console.log("NEWLY CREATED CAMPGROUND: ");
          console.log(User);
      }
    });

//Routes
app.get("/", function(req, res){
    res.render("home");
});

//CREATE - add new user to DB
app.post("/users", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpw = req.body.confirm;
    var newCampground = {name: name, email: email, username: username, password: password, confirmpw:confirm};
    // Create a new campground and save to DB
    User.create(newUser, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/users");
        }
    });
});

// app.post("/users", function(req,res) {
// 	// body...
// });
app.get("/home2", function(req, res){
    res.render("home2");
});//for testing only

app.get("/signup", function(req, res){
	res.render("signup");
});

app.post("/signup", function(req, res){
	User.signup(new User({name: req.body.name}, {email:req.body.email}, {username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('secret');
		} else {
			console.log(User);
		}

	});
});
app.get("/login", function(req, res){
	res.render("login");
});

// app.post("/login", )
app.get("/logout", function(req, res){
	res.render("logout");
});
app.get("/secret", function(req, res){
	res.render("secret");
});


app.listen(process.env.PORT || 3000, function() {
    console.log("This server is up and running");
});