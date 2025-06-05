const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:"User"
  },
  token:{
    type:String,
  },
  markedQuestion:{
    type:Array
  },
  solvedQuestion:{
    type:Array
  },
  tagsSolved:{
    type:Array
  },
  friends:{
    type:Array
  },
  friendCount:{
    type: Number,
    default: 0
  },
  school:{
    type: String
  },
  DOB:{
    type: String
  },
  Rating:{
    type: String
  }
})

module.exports= mongoose.model("user",signupSchema);
