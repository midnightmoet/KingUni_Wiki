const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Model = mongoose.model;
const Schema = mongoose.Schema;
const { String, ObjectId, Number, Boolean } = Schema.Types;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username is required!"],
		unique: [true, "Username is already taken!"],
	},
	password: {
		type: String,
		required: [true, "Password is required!"],
	},
	articles: {
		type: [{ type: ObjectId, ref: "Article" }],
	},
});

userSchema.methods = {
	checkPassword: function (password) {
		return bcrypt.compare(password, this.password);
	},
};

userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				next(err);
				return;
			}

			bcrypt.hash(this.password, salt, (err, hash) => {
				if (err) {
					next(err);
					return;
				}
				this.password = hash;
				next();
			});
		});
		return;
	}
	next();
});

module.exports = new Model("User", userSchema);
