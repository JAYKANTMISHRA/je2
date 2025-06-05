const contest = require("../../models/contestModel");

exports.getContestById = async(req,res)=>{
  try{
    const {id}=req.param;
    const response=await contest.findById({_id:id});
    if(!response) {
      return res.status(400).json({
        success:false,
        message:"Contest Not Found"
      })
    }
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

exports.getContest = async(req,res)=>{
  try{
    const response=await contest.find({});
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

