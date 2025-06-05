import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import './Home.css';
import HomePractice from './practice_sec/HomePractice';
import Carousell from './testimonials/Carousel';
import Subscriber from './tutor_subscriber/Subscriber';
import ProblemSetter from './tutor_subscriber/ProblemSetter';
import { ModeContext } from '../contexts/ModeContext';

const BoldText = styled.div`
  align-items: center;
  font-family: CrimsonText;
  font-size: large;
  text-align: center;
`;

const LoginButton = styled.button`
  background: ${({ mode }) => (mode ? 'linear-gradient(to right, #fdc830, #f37335)' : 'radial-gradient(circle farthest-corner at 10% 20%, rgba(162,102,246,1) 0%, rgba(203,159,249,1) 90%)')};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 15px auto;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  transform: scale(1);
  margin:10px;

  &:hover {
    background: ${({ mode }) => (mode ? 'linear-gradient(to right, #f37335, #fdc830)' : 'radial-gradient(circle farthest-corner at 10% 20%, rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90%)')};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px;
    width: 90%;
    margin: 15px auto;
  }
`;

const Grad = styled.div`
  background: ${({ mode }) => (mode ? 'linear-gradient(to right, #000000, #2C3E50)' : 'linear-gradient(to left, #00c9ff, #92fe9d)')};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 10px;
  }
`;

const TextSection = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-left:10px;
    font-size:medium;
  }
  @media (max-width: 400px) {
    margin-left: 4px;
    // font-size:small;
  }
  
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
  }
  @media (max-width: 768px) {
    display:none
  }
`;

function Home() {
  const { darkMode } = useContext(ModeContext);
  
  return (
    <div>
      <Container className="container_1">
        <TextSection className="text_1">
          <h1>Take your learning to the next level. Develop Your Skills in a New and Unique Way.</h1>
          <p>Unlock your potential and turn your dreams into reality. The transformative journey to IIT starts here. Dare to compete fearlessly, strive to excel relentlessly.</p>
          <LoginButton mode={darkMode}>Learn More</LoginButton>
          <Link to="/feedback">
            <LoginButton mode={darkMode}>Rate Us</LoginButton>
          </Link>
        </TextSection>
        <ImageSection className="student_img">
          <img src={require('../assets/student.png')} alt="Student" />
        </ImageSection>
      </Container>

      <Grad mode={darkMode}>
        <HomePractice />
      </Grad>
      <div>
        <BoldText>
          <h1>Student Testimonials</h1>
        </BoldText>
        <Carousell />
      </div>

      {/* <Grad mode={darkMode}>
        <Subscriber />
      </Grad> */}
      <div>
        <ProblemSetter />
      </div>
    </div>
  );
}

export default Home;
