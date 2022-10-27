const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add your username"],
  },
  email: {
    type: String,
    required: [true, "please add your email"],
    unique: true,
  },
  password:{
    type:String,
    minlength:[5, 'password should be more than five words...'],
    required:[true, 'please provide your password']
  }
});

User.methods.comparePassword = async function(userpassword){
  const isCorrect = await bcrypt.compare(userpassword,this.password)
  return isCorrect
}


module.exports = mongoose.model('users', User);