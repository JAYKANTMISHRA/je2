const contest = require("../../models/contestModel");

exports.createContest = async(req,res)=>{
  try{
    const {contestName,writers,startTime,duration,questions}=req.body;
    const data = {contestName,writers,startTime,duration,questions};
    const response=await contest.create(data);
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