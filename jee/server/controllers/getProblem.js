const problem = require("../models/contributerModel");

exports.getProblemById = async(req,res)=>{
  try{
    const {id}=req.params;
    const response=await problem.findById({_id:id});
    if(!response) {
      return res.status(400).json({
        success:false,
        message:"Data Not Found"
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



exports.getProblem = async(req,res)=>{
  try{
    const tags = req.query.tags;
    let tags_array =[];
    if(tags !== "") tags_array = tags.split(',');
    let response;
    if(tags_array.length>0) response = await problem.find({ tags: { $all: tags_array } });
    else response = await problem.find({});
  
    const res_array = response

    let page = req.query.page_no;

    const probPerPage = req.query.probPerPage;
    const end_ind = page * probPerPage;
    const start_ind = end_ind - probPerPage;
    
    const filtered_res = res_array.slice(start_ind, end_ind);
    
    res.status(200).json({
      success:true,
      data:filtered_res,
      length:res_array.length,
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


exports.getProblemByText = async(req, res) => {
  try{
    const text = req.query.text;
    const textArr = text.split(' ');

    const response = await problem.find({});

    function isSubset(textArr, statementArr) {
      return textArr.every(element => statementArr.includes(element));
    }
    let resArr=[];
    const resRes = response;
    resRes.forEach(res => {
      let statementArr = res.statement.split(' ');
      if(isSubset(textArr, statementArr)){
        resArr.push(res);
      }
    });
    const page = req.query.page_no;
    const probPerPage = req.query.probPerPage;
    const end_ind = page * probPerPage;
    const start_ind = end_ind - probPerPage;

    const filtered_res = resArr.slice(start_ind, end_ind);
    res.status(200).json({
      success:true,
      data:filtered_res,
      length:resArr.length,
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
}

