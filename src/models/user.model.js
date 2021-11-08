const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: true },
  // roles: [{ type: String, required: true }],
});

// - name
// - email
// - password
// - profile_photo_url
// - roles

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return nxt();
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.method.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);