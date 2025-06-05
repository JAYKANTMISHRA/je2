const problem = require("../models/contributerModel");

exports.updateProblem = async(req,res)=>{
  try{
    const {id}  =req.params;
    const {
      username,question,answer,solutionImage,tags,questionImage,status,option
    }=req.body;
    const data = {username,question,answer,solutionImage,tags,questionImage,option,status};
    const response=await problem.findByIdAndUpdate({_id:id},data);
    res.status(200).json({
      success:true,
      data:response,
      message:"Problem Sent Successfully"
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      data:err.message,
      message:"Failed!!!"
    })
  }
};