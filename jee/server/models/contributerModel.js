const mongoose = require("mongoose");

const contributeSechema = mongoose.Schema({
  username:{
    type:String,
    // required:true
  },
  kind:{
    type:String,
    required:true
  },
  statement:{
    type:String,
    required:true
  },
  question:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"todo"
  },
  questionImage:{
    data:Buffer,
    contentType:String,
  },
  option:[{
    type:String,
  }],
  answer:{
    type:String,
    required:true
  },
  solutionImage:{
    data:Buffer,
    contentType:String,
  },
  tags:[{
    type:String,
    required:true
  }],
})

module.exports= mongoose.model("problem",contributeSechema);