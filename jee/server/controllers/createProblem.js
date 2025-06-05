const problem = require("../models/contributerModel");

exports.createProblem = async(req,res)=>{
  try{
    
    const {username,question,answer,solutionImage,tags,questionImage,kind,statement,todo,option}=req.body;
    const data = {username,question,answer,solutionImage,tags,questionImage,kind,statement,todo,option};
   console.log(data);
    const response=await problem.create(data);
    res.status(200).json({
      success:true,
      data:response,
      message:"Problem Sent Successfully"
    })
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      data:err.message,
      message:"Failed!!!"
    })
  }
};