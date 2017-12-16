var express					= require("express"),
	mongoose				= require("mongoose"),
	bodyParser				= require("body-parser"),
	User					= require("./models/user"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose	= require("passport-local-mongoose");

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
// var userSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    description: String
// });

// var User = mongoose.model("User", UserSchema);

// User.create(
//      {
// 	     name: "Jennifer", 
// 	     email: "emerald@gmail.com",
// 	     username: "Demure",
// 		 password: "password",
// 		 confirmpw: "password"   
//      },
//      function(err, User){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED User ");
//           console.log(User);
//       }
//     });

//Routes
app.get("/", function(req, res){
    res.render("home");
});

//CREATE - add new user to DB
app.post("/signup", function(req, res){
    // get data from form and add maybe create a membership list page?
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;
    var newUser = {name: name, email: email, username: username, password: password, confirmpw:confirm};
    // Create a new user and save to DB
    User.create(newUser, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("signup");
        } else {
            //redirect back to membership page?
            res.redirect("/members");
        }
    });
});
// app.post("/register", function(req, res){
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render('register');
//         }
//         passport.authenticate("local")(req, res, function(){
//            res.redirect("/secret");
//         });
//     });
// });

app.get("/home", function(req, res){
    res.render("home");
});//for testing only

app.get("/signup", function(req, res){
	res.render("signup");
});

//new user signup
app.post("/signup", function(req, res){
	User.signup(new User({name: req.body.name}, {email:req.body.email}, {username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('/members', {member:newuserinfo});
		} else {
			console.log("sign up failed");
		}

	});
});

app.get("/login", function(req, res){
	res.render("login");
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/members",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/members", function(req, res){
    User.find({}, function(err, allusers){
        if(err){
            console.log(err);
        }else{
            res.render("members", {users:allusers});
        }
    });
});

app.get("/logout", function(req, res){
	res.render("logout");
});
// app.get("/members", function(req, res){
//     var name = req.body.name;
//     var email = req.body.email;
// 	res.render(name + " -- " + email);
// });


app.listen(process.env.PORT || 3000, function() {
    console.log("This server is up and running");
});

