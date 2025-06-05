import React, {useContext } from 'react';
import styled from 'styled-components';
import {ModeContext} from '../../contexts/ModeContext';
import { useNavigate } from 'react-router-dom';
// Styled components
const Container = styled.div`
    margin-top: 2rem;
    background-color: #fffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ImageContainer = styled.div`
`;

const ProImg = styled.img`
    width: 100%;
    height: 60vh;
    @media (max-width:768px) {
        height:40vh;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: CrimsonText;
`;

const Title = styled.h1`
    font-size: xx-large;
`;

const Paragraph = styled.p`
    font-size: large;
    margin: 0.2rem;
`;

const Button = styled.button`
  background: ${({ mode }) =>
    mode
      ? 'linear-gradient(to right, #fdc830, #f37335);'
      : 'radial-gradient(circle farthest-corner at 10% 20%, rgba(162,102,246,1) 0%, rgba(203,159,249,1) 90%)'};
  margin-top: 3rem;
  padding: 0.7rem 3.5rem;
  border: none;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: large;
  font-weight: bolder;

  &:hover {
    background: ${({ mode }) =>
      mode
        ? 'linear-gradient(to right, #f37335, #fdc830);'
        : 'radial-gradient(circle farthest-corner at 10% 20%, rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90%)'};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 2rem;
    font-size: medium;
    margin-bottom:20px;
  }
`;



const ProblemSetter = () => {
    const usenavigate = useNavigate();
    const handleClick = () => {
        usenavigate('/contest-form');
    }
    const { darkMode } = useContext(ModeContext);

    return (
        <Container>
            <TextContainer>
                <Title>Contribute A Problem</Title>
                <Paragraph> Share your brilliance, contribute a problem, and together, </Paragraph>
                <Paragraph>we’ll elevate the learning experience for all.</Paragraph>
                <Button mode={darkMode} onClick={handleClick}>Create a Contest</Button>
            </TextContainer>
            <ImageContainer>
                <ProImg src={require("../../assets/tutor.png")} alt="" />
            </ImageContainer>
        </Container>
    );
};

export default ProblemSetter;
