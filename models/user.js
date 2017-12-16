var mongoose =require("mongoose");

var UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	username: String,
	password: String,
	confirmpw:String,
	gender: Boolean
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);