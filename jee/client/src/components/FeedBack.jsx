// src/FeedbackPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const Label = styled.label`
  display: block;
  color: #555;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  text-align: center;
  color: #007bff;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Star = styled(FaStar)`
  cursor: pointer;
  transition: color 0.2s;
  color: ${props => (props.selected ? '#FFD700' : '#ccc')};

  &:hover {
    color: #FFD700;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const FeedbackPage = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === null) {
      setError('Rating is required');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>JE^2</Title>
        {submitted ? (
          <Message>
            <h3>Thank you for your feedback!</h3>
            <p>We appreciate your input.</p>
          </Message>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>How was JE^2</h2>
            <p>We would Like your Feedback to improve our webapp</p>
            <StarRating>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <Star
                    key={index}
                    selected={ratingValue <= (hover || rating)}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    size={30}
                    />
                  );
                })}
            </StarRating>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div>
              <Label htmlFor="message">Please leave your Feedback below:</Label>
              <Textarea
                id="message"
                placeholder="Your feedback"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></Textarea>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </FormWrapper>
    </Container>
  );
};

export default FeedbackPage;
