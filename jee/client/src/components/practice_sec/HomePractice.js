import React from 'react'
import styled from 'styled-components';

import {Link} from 'react-router-dom';

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
  }
`;

const BoldText = styled.div`
  padding-top: 50px;
  align-items: center;
  font-family: CrimsonText;
  font-size: large;
  text-align: center;

  @media (max-width: 768px) {
    font-size: medium;
  }
`;

const CardContainer = styled.div`
  width: 36%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin: 3rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
    margin: 1rem auto;
  }
`;

const CardLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardImage = styled.img`
  width: 25%;
  height: 37%;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const CardP = styled.p`
  font-weight: bolder;
  font-size: x-large;
  color: black;

  @media (max-width: 768px) {
    font-size: large;
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StarImage = styled.img`
  width: 15%;
  height: 15%;

  @media (max-width: 768px) {
    width: 10%;
    height: 10%;
  }
`;

const RatingWala = styled.span`
  display: flex;
  justify-content: end;
  align-items: end;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
  background: linear-gradient(to right, #4ca1af, #c4e0e5);
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;


export default function HomePractice() {

  return (
    <div>
        <BoldText>
            <h1>Practice Problems</h1>
            <p>Dream big, work hard, and you will conquer the JEE sky!</p>
        </BoldText>

        <Cards>

            <CardContainer>
                <CardLogo>
                    <CardImage src={require('../../assets/phy_logo.png')} alt="" />
                    <CardP>Physics</CardP>
                </CardLogo>
                
                <CardContent>
                <StyledLink to='/practice' state={{subject: 'physics'}}>
                  Practice
                </StyledLink>
                    <RatingWala>
                        <span style={{ color: "black" }}>4</span>
                    <StarImage src={require('../../assets/rating.png')} alt="" />
                    </RatingWala>
                </CardContent>
            </CardContainer>
          

            <CardContainer>
              <CardLogo>
                  <CardImage src={require('../../assets/chem_logo.png')} alt="" />
                  <CardP>Chemistry</CardP>
              </CardLogo>
              {/* <p style={{ color: "black" }}>babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore It is thus unlikely that this bug willever be fixed. Add  to your devDependencies to work around this error. This will make this message go away</p> */}
              <CardContent>
                  <StyledLink to='/practice' state={{subject:'chemistry'}}>Practice</StyledLink>
                  <RatingWala>
                      <span style={{ color: "black" }}>4.2</span>
                  <StarImage src={require('../../assets/rating.png')} alt="" />
                  </RatingWala>
              </CardContent>
            </CardContainer>

            <CardContainer>
                <CardLogo>
                    <CardImage src={require('../../assets/math_logo.png')} alt="" />
                    <CardP>Mathematics</CardP>
                </CardLogo>
                {/* <p style={{ color: "black" }}>babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore It is thus unlikely that this bug willever be fixed. Add  to your devDependencies to work around this error. This will make this message go away</p> */}
                <CardContent>
                    <StyledLink to='/practice' state={{subject:'mathematics'}}>Practice</StyledLink>
                    <RatingWala>
                        <span style={{ color: "black" }}>4.7</span>
                    <StarImage src={require('../../assets/rating.png')} alt="" />
                    </RatingWala>
                </CardContent>
            </CardContainer>  
        </Cards>
    </div>
  )
}
