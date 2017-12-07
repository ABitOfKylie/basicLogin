var mongoose =require("mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	username: String,
	password: String,
	confirmpw:String
});

module.exports = mongoose.model("User", userSchema);