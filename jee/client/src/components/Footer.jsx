import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';


const FooterContainer = styled.footer`
background-image: radial-gradient( circle 862px at 3.9% 23.8%,  rgba(17,58,93,1) 0%, rgba(18,51,80,1) 90.8% );
  padding: 20px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  a {
    color: #f8f8f8;
    margin: 0 15px;
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #FFA500;
    }
  }
`;

const FooterText = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const SocialIcons = styled.div`
  margin-top: 10px;

  a {
    color: #f8f8f8;
    margin: 0 10px;
    font-size: 20px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #FFA500; /* Accent color on hover */
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </FooterLinks>
      <FooterText>&copy; 2024 JE^2. All rights reserved.</FooterText>
      <SocialIcons>
        <a href="#facebook" aria-label="Facebook">
        <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="#twitter" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#instagram" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
