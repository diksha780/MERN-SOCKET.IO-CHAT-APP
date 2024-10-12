const mongoose = require("mongoose");
// create Users model

// import bcrypt dependency
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    // user data contains:
    // name, email, password, user picture
    name: { type: String, require: true },
    //   require means this field is compulsary for the user
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    pic: {
      type: String,

      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// ..2******* create matchPassowrd functon
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//...1***  also when a new user is registered, its password should not be stored as plane
// text in the database, but in the encrypted form,
// so write loig to encrypt in decrypt the password in userModel.js file
// 1
userSchema.pre("save", async function (next) {
  // pre means before saving
  if (!this.isModified) {
    // if current password is not modified then move on to next means dont run the code after it
    next();
  }
  // 3 otherwise, generate a new password
  // we create a new salt
  //4  install bcrypt dependecy => npm i bcrypt
  // import it
  const salt = await bcrypt.genSalt(10);
  // the higher the number, more strong salt will be generated

  this.password = await bcrypt.hash(this.password, salt);

  // now add funtionality to match password in userController.js
});

const User = mongoose.model("User", userSchema);
module.exports = User;
