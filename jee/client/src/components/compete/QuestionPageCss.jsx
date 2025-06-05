import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.color};
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
  
  &:hover {
    filter: brightness(90%);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const QuestionsContainer = styled.div`
  margin-top: 20px;
`;

const QuestionItem = styled.div`
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  max-width: 900px;
`;

const Statement = styled.p`
  font-weight: 1000;
  font-size: 30px;
  margin-bottom: 5px;
  text-align: left;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  `;
  
  const OptionLabel = styled.label`
  margin-bottom: 5px;
  font-size: 23px;
  text-align:left;
  `;
  
  const OptionInput = styled.input`
    margin-right: 5px;
`;

const QuestionText = styled.p`
  text-align: left;
  margin-left: 10px;
  font-size: 30px;
  overflow: auto;
  height:200px;
`;

const AnswerTextarea = styled.textarea`
  width: calc(100%);
  height: 100px;
  margin-top: 10px;
  padding: 8px;
  border: 10px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-left:0px;
  text-align: left;
`;

const ContainerRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  position:absolute;
  top:${(props) => props.top};
  right:${(props) => props.right};
`;

const Button = styled.button`
  margin: 5px;
  width: calc(20% - 10px);
`;

export {
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
};