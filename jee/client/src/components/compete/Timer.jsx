import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  background-color: #f4f4f4;
  color: #333;

  @media (prefers-color-scheme: dark) {
    background-color: #1e1e1e;
    color: #e0e0e0;
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Timerr = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

function Timer({ name, start, duration }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const startTime = new Date(start).getTime();
    const totalDurationMs = duration * 60 * 1000;
    const endTime = startTime + totalDurationMs;

    function updateTimeLeft() {
      const now = Date.now();
      const remainingMs = endTime - now;
      const seconds = Math.max(Math.floor(remainingMs / 1000), 0);
      setTimeLeft(seconds);
    }

    updateTimeLeft(); // set initial value

    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [start, duration]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const formatTime = val => (val < 10 ? `0${val}` : val);

  return (
    <Container>
      <Title>{name}</Title>
      <p>Time Remaining:</p>
      <Timerr>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Timerr>
    </Container>
  );
}

export default Timer;
