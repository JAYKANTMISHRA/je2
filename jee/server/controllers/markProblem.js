const user = require("../models/signupModel");
const problem = require("../models/contributerModel");

exports.markProblem = async(req,res)=>{
    try{
      const userId = req.body.userId;
      const problemId= req.body.problemId;
      const doc = await user.findOne({ _id: userId});
  
      doc.markedQuestion.push(problemId);
    //   console.log(doc.markedQeustion);
      await doc.save();
  
      res.status(200).json({
        success:true,
        data:true,
        message:"Problem added succesfully"
      })
    }
    catch(err){
      res.status(500).json({
        success:false,
        data:err.message,
        message:"Failed to add the problem!!!"
      })
    }
  };
  
  exports.unmarkProblem = async(req,res)=>{
    try{
      const userId = req.body.userId;
      const problemId= req.body.problemId;
      const doc = await user.findOne({ _id: userId});
  
      const arr = doc.markedQuestion;
      const id = arr.indexOf(problemId);
      arr.splice(id, 1);
  
      doc.markedQeustion = arr;
      console.log(doc.markedQuestion)
      await doc.save();
  
      res.status(200).json({
        success:true,
        data:false,
        message:"Problem removed succesfully"
      })
    }
    catch(err){
      res.status(500).json({
        success:false,
        data:err.message,
        message:"Failed to remove the problem!!!"
      })
    }
  };
  
  
  
  exports.getMarkedProblem = async(req, res) => {
    try{
      const userId = req.query.userId;
      const problemId = req.query.problemId;
      const userX = await user.findOne({ _id: userId});
      // console.log(userX);
      let markedQuestions = userX.markedQuestion || [];
      let isMarked = false;
      markedQuestions.forEach(id => {
        if(id===problemId){
          isMarked=true;
        }
      });
      
      res.status(200).json({
        success:true,
        data:isMarked,
        message:"Problem fetched successfully"
      })
    }
    catch(err){
      res.status(500).json({
        success:false,
        data:err.message,
        message:"Failed to get the marked problem!!!"
      })
    }
  }  

  exports.storeSolvedQuestion = async(req, res) =>{
    try{
        const userId = req.body.userId;
        const problemId = req.body.problemId;

        const userX = await user.findOne({_id : userId});
        const problemX = await problem.findOne({_id : problemId});

        const arr = userX.solvedQuestion || [];
        const ind = arr.indexOf(problemId);
        if(ind === -1){
            userX.solvedQuestion.push(problemId);
        }

        const tags = problemX.tags;
        const topic = userX.tagsSolved || [];
        tags.forEach(tag => {
            
            const id = topic.indexOf(tag.toLowerCase());
            if(id === -1){
                userX.tagsSolved.push(tag.toLowerCase());
            }
        });

        const response = await userX.save();

        res.status(200).json({
            success:true,
            data:response,
            message:"Problem stored succesfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            data:err.message,
            message:"Failed to store the solved problem!!!"
        })
    }
  }


  exports.getSolvedProblem = async(req, res) =>{
    try{

        const userId = req.query.userId;
        // console.log(userId);
        const userX = await user.findOne({_id : userId});
        // console.log(userX);
        const response = await userX.solvedQuestion;
        // console.log(response);
        res.status(200).json({
            success:true,
            data:response,
            message:"Problem sent succesfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            data:err.message,
            message:"Failed to send the solved problem!!!"
        })
    }
  }