const contest = require("../../models/contestModel");

exports.updateContest = async(req,res)=>{
  try{
    const {id}  =req.params;
    const {contestName,writers,startTime,duration,questions}=req.body;
    const data = {contestName,writers,startTime,duration,questions};
    const response=await contest.findByIdAndUpdate({_id:id},data);
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