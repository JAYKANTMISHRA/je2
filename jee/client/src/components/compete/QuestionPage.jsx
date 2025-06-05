import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {
  StyledButton,
  ButtonContainer,
  QuestionsContainer,
  QuestionItem,
  Statement,
  OptionsContainer,
  OptionLabel,
  OptionInput,
  QuestionText,
  AnswerTextarea,
  ContainerRight,
  Button,
} from './QuestionPageCss';
import Answer from './Answer';

const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics'];

const QuestionPage = () => {
  const location = useLocation();
  const { ques, name, duration } = location.state;

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([[], [], []]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [question, setQuestion] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [page, setPage] = useState(0);
  const [allSubject, setAllSubject] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // only use duration now

  // Timer countdown (duration in seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  // Fetch all questions from server
  const fetchRes = async (id) => {
    try {
      const res = await axios.get(`https://je2-backend.onrender.com/api/v1/getProblem/${id}`);
      console.log('Fetched question:', res);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await Promise.all(ques.map(id => fetchRes(id[0])));
      const validQuestions = fetchedQuestions.filter(question => question !== null);
      setQuestions(validQuestions);
    };
    fetchQuestions();
  }, [ques]);

  // Group questions by subject
  useEffect(() => {
    const updatedSubjects = [[], [], []];
    questions.forEach(question => {
      let subjectIndex = -1;
      if (question.tags && question.tags.length > 1) {
        const tag = question.tags[1].charAt(0).toUpperCase() + question.tags[1].slice(1).toLowerCase();
        subjectIndex = SUBJECTS.indexOf(tag);
      }
      if (subjectIndex !== -1) {
        updatedSubjects[subjectIndex].push(question);
      }
    });
    setSubjects(updatedSubjects);
    setSelectedSubject(updatedSubjects[0]);
  }, [questions]);

  useEffect(() => {
    const concatenatedSubjects = subjects.flatMap(item => item);
    setAllSubject(concatenatedSubjects);
  }, [subjects]);

  useEffect(() => {
    setQuestion(selectedSubject[page]);
  }, [selectedSubject, page]);

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

  const handlePage = (num) => {
    if (num) setPage(page + 1);
    else setPage(page - 1);
  };

  const handleButtonPage = (index) => {
    let a = subjects[0].length, b = subjects[1].length;
    if (index >= a + b) {
      setSelectedSubject(subjects[2]);
      setPage(index - a - b);
    }
    else if (index >= a) {
      setSelectedSubject(subjects[1]);
      setPage(index - a);
    }
    else {
      setSelectedSubject(subjects[0]);
      setPage(index);
    }
  };

  const handleSubjectClick = (subjectIndex) => {
    setSelectedSubject(subjects[subjectIndex]);
    setPage(0);
  };

  const handleManualSubmit = () => setShowAnswer(true);

  if (showAnswer) {
    return <Answer questions={questions} answers={selectedOptions} />;
  }

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const formatTime = val => (val < 10 ? `0${val}` : val);

  return (
    <div>
      <ButtonContainer>
        <StyledButton color="#4caf50" onClick={() => handleSubjectClick(0)}>Physics</StyledButton>
        <StyledButton color="#2196f3" onClick={() => handleSubjectClick(1)}>Chemistry</StyledButton>
        <StyledButton color="#ff9800" onClick={() => handleSubjectClick(2)}>Maths</StyledButton>
      </ButtonContainer>

      <QuestionsContainer>
        <QuestionItem>
          {question && (
            <>
              <Statement>{question.statement}</Statement>
              <QuestionText>{question.question}</QuestionText>
              {question.kind === "A" && (
                <OptionsContainer>
                  {question.option.map((opt, id) => (
                    <div key={id}>
                      <OptionLabel>
                        <OptionInput
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
                </OptionsContainer>
              )}
              {question.kind === "B" && (
                <OptionsContainer>
                  {question.option.map((opt, id) => (
                    <div key={id}>
                      <OptionLabel>
                        <OptionInput
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
                </OptionsContainer>
              )}
              {question.kind === "C" && (
                <AnswerTextarea
                  rows="2"
                  cols="20"
                  placeholder="Enter your answer..."
                  name={`ques-${question._id}`}
                  value={selectedOptions[question._id] || ''}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, [question._id]: e.target.value })}
                />
              )}
            </>
          )}
          {page > 0 && (
            <StyledButton color="#4caf50" onClick={() => handlePage(0)}>Previous</StyledButton>
          )}
          {page < selectedSubject.length - 1 && (
            <StyledButton color="#4caf50" onClick={() => handlePage(1)}>Next</StyledButton>
          )}
        </QuestionItem>
      </QuestionsContainer>

      {/* Timer display */}
      <ContainerRight top="100px" right="90px">
        <div style={{
          padding: '20px',
          borderRadius: '10px',
          width: 'fit-content',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f4f4f4',
          color: '#333',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Time Remaining: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
      </ContainerRight>

      {/* Manual submit button */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <button
          style={{
            padding: '10px 30px',
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            cursor: 'pointer'
          }}
          onClick={handleManualSubmit}
        >
          Submit & View Answer
        </button>
      </div>

      <ContainerRight top="330px" right="100px">
        {allSubject.map((ques, index) => (
          <Button
            style={{ backgroundColor: selectedOptions[ques._id] ? '#3af049' : '#87CEEB' }}
            key={index + 1}
            onClick={() => handleButtonPage(index)}
          >
            {index + 1}
          </Button>
        ))}
      </ContainerRight>
    </div>
  );
};

export default QuestionPage;
