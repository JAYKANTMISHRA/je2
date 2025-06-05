const contest = require("../../models/contestModel");

exports.deleteContest = async(req,res)=>{
  try{
    const {id}=req.params;
    const response=await contest.findByIdAndDelete({_id:id});
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