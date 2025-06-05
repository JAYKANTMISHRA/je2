import React, { useEffect, useState, useContext } from 'react';
import { useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  HeaderContainer,
  QuestionHeader,
  QuestionTypeMessage,
  QuestionStatement,
  QuestionQuestion,
  OptionLabel,
  TextArea,
  Button,
  CorrectAnswer,
  AnsPara,
  AnswerBox,
  Success,
  Fail,
  MarkContainer,
  MarkImage,
  MarkTag
} from './QuestionCss';
import axios from 'axios';

const Question = () => {
  const location = useLocation();
  const { item } = location.state;
  const question = item;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionTypeMessage, setQuestionTypeMessage] = useState("");
  const [answerFlg, setAnswerFlg] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [submitFlg, setSubmitFlg] = useState(false);
  const [successFlg, setSuccessFlg] = useState(false);
  const [marked, setMark] = useState(false);
  const [userData, setUserData] = useState({});

  const checkMarked = async () =>{
    try{
      const storedData = JSON.parse(Cookies.get('userData'));
      const userId = storedData._id;
      const response = await axios.get(`http://localhost:5000/api/v1/getMarkedProblem?userId=${userId}&problemId=${item._id}`);
      setMark(response.data.data);
    }catch(err){
      console.error(err);
    }
  }
  checkMarked();

  useEffect(() => {
    // console.log(userData);
    const storedData = JSON.parse(Cookies.get('userData'));
    setUserData(storedData);
    if (item.kind === "A") setQuestionTypeMessage("Choose the correct option");
    if (item.kind === "B") setQuestionTypeMessage("Choose the correct option(s)");
    if (item.kind === "C") setQuestionTypeMessage("Fill the correct answer");
  },[]);

  
  

  const handleOptionChange = (e, questionId) => {
    const { type, value, checked } = e.target;

    setSelectedOptions(prevFormData => {
      const updatedOptions = { ...prevFormData };
      if (type === "radio") {
        updatedOptions[questionId] = value;
      } else {
        updatedOptions[questionId] = updatedOptions[questionId] || [];
        if (checked) {
          updatedOptions[questionId] = [...updatedOptions[questionId], value];
        } else {
          updatedOptions[questionId] = updatedOptions[questionId].filter(option => option !== value);
        }
      }
      return updatedOptions;
    });
  };


  const solvedQuestion = async () =>{
    try{
      const response = await axios.put(`http://localhost:5000/api/v1/storeSolvedQuestion`,{userId: userData._id, problemId:item._id});
      console.log("response",response.data);
    }catch(err){
      console.error(err.message);
    }
  }


  const handleSubmit = () => {
    let str = "";
    const tmp_ans = selectedOptions[item._id] || [];
    if(tmp_ans.length === 0){
      setSubmitFlg(false);
    }
    else{
      if (item.kind === "B") {
        const len = selectedOptions[item._id].length;
        selectedOptions[item._id].sort();
        selectedOptions[item._id].forEach((element, index) => {
          str = str + element;
          if (len - 1 !== index) str += '/';
        });
      } else  {
        str = selectedOptions[item._id];
      }
      str = str.toLowerCase();
      const ans = item.answer.toLowerCase();
      if (str === ans) {
        setSuccessFlg(true);
        // to store the problem in the db 
        solvedQuestion();
      } else {
        setSuccessFlg(false);
      }
      setSubmitFlg(true);
    }
  };

  const showAnswer = () => {
    const ans = item.answer.toLowerCase();
    let filter = [];
    const options = item.option;
    if (item.kind === "A") {
      let optionInd = ans[0].charCodeAt(0) - 97;
      filter.push([optionInd, options[optionInd]]);
    } else if (item.kind === "B") {
      for (let i = 0; i < ans.length; i++) {
        if (ans[i] !== '/') {
          let optionInd = ans[i].charCodeAt(0) - 97;
          filter.push([optionInd, options[optionInd]]);
        }
      }
    } else {
      filter.push(ans);
    }
    setCorrectAnswer(filter);
    setAnswerFlg(!answerFlg);
  };

  const markQuestion = async () => {
    try {
        console.log("userdata",userData._id);
        const res = await axios.put(`http://localhost:5000/api/v1/markProblem`, { problemId: `${item._id}`, userId:`${userData._id}`});
        console.log('Response:', res.data);
        setMark(res.data.data);
    } catch (err) {
        console.error('Error marking question:', err.response ? err.response.data : err.message);
    }
  }

  const unmarkQeustion = async () => {
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/unmarkProblem`, { problemId: `${item._id}`, userId:`${userData._id}`});
        console.log('Response:', res.data);
        setMark(res.data.data);
    } catch (err) {
        console.error('Error unmarking question:', err.response ? err.response.data : err.message);
    }
  }


  const handleMarking = () =>{
    if(!marked) markQuestion();
    else unmarkQeustion();
  };
  

  return (
    <div>
      <QuestionHeader>
        <HeaderContainer>
          <QuestionTypeMessage>{questionTypeMessage}</QuestionTypeMessage>
          <MarkContainer onClick={handleMarking}>
            <MarkImage
              src={require("../../assets/star_" + (marked ? "10171017" : "10234085") + ".png")}
              alt=""
            />
            <MarkTag>{marked ? ("Unmark") : ("Mark")}</MarkTag>
            {/* {marked ? (<MarkTag>Unmark</MarkTag>) : (<MarkTag>Mark</MarkTag>)} */}
          </MarkContainer>
        </HeaderContainer>
        <QuestionStatement>{question.statement}</QuestionStatement>
        <QuestionQuestion>{question.question}</QuestionQuestion>
      </QuestionHeader>
      
      
      <div>
        {question.kind === "A" && (
          <div>
            {question.option.map((opt, id) => (
              <div key={id}>
                <OptionLabel>
                  <input
                    type="radio"
                    name={`ques-${question._id}`}
                    value={String.fromCharCode(65 + id)}
                    checked={selectedOptions[question._id] === String.fromCharCode(65 + id)}
                    onChange={(e) => handleOptionChange(e, question._id)}
                  />
                  {opt}
                </OptionLabel>
              </div>
            ))}
          </div>
        )}
        {question.kind === "B" && (
          <div>
            {question.option.map((opt, id) => (
              <div key={id}>
                <OptionLabel>
                  <input
                    type="checkbox"
                    name={`ques-${question._id}`}
                    value={String.fromCharCode(65 + id)}
                    checked={(selectedOptions[question._id] || []).includes(String.fromCharCode(65 + id))}
                    onChange={(e) => handleOptionChange(e, question._id)}
                  />
                  {opt}
                </OptionLabel>
              </div>
            ))}
          </div>
        )}
        {question.kind === "C" && (
          <TextArea
            rows="1"
            cols="10"
            placeholder="Enter your answer..."
            name={`ques-${question._id}`}
            value={selectedOptions[question._id] || ''}
            onChange={(e) => setSelectedOptions({ ...selectedOptions, [question._id]: e.target.value })}
          />
        )}


        {submitFlg && 
          <>{
            successFlg ? (<Success>Correct Answer </Success>) : (<Fail> Wrong Answer</Fail>)
            }
          </>
        }


        <Button type="submit" onClick={handleSubmit}>Submit answer</Button>
      </div>
      {answerFlg ? (<Button onClick={showAnswer}>Hide answer</Button>) : (<Button onClick={showAnswer}>Show answer</Button>)}
      {answerFlg && (
        <CorrectAnswer>
          <AnsPara>Correct answer</AnsPara>
          {question.kind === "C" && <p>{correctAnswer[0]}</p>}
          {(question.kind === "B" || question.kind === "A") && (
            <AnswerBox>
              {correctAnswer.map((element, id) => (
                <p key={id}>{String.fromCharCode(65 + element[0])}{".  "}{element[1]}</p>
              ))}
            </AnswerBox>
          )}
        </CorrectAnswer>
      )}

    </div>
  );
};

export default Question;

