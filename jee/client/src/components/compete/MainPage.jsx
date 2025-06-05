import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { ModeContext } from '../../contexts/ModeContext';

const lightModeColors = {
  background: '#f5f5f5',
  text: '#333333',
  tableHeaderBackground: '#007bff',
  tableHeaderColor: '#ffffff',
  tableRowEvenBackground: '#e9ecef',
};

const darkModeColors = {
  background: '#181818',
  text: '#e0e0e0',
  tableHeaderBackground: '#1e3a8a',
  tableHeaderColor: '#ffffff',
  tableRowEvenBackground: '#2e2e2e',
};

const getThemeColors = (theme) => (theme === false ? lightModeColors : darkModeColors);

const Container = styled.div`
  margin: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  height: 100%;
  ${({ theme }) => {
    const colors = getThemeColors(theme);
    return css`
      background-color: ${colors.background};
      color: ${colors.text};
      transition: background-color 0.3s, color 0.3s;
    `;
  }}
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    ${({ theme }) => {
      const colors = getThemeColors(theme);
      return css`
        background-color: ${colors.tableRowEvenBackground};
        transition: background-color 0.3s;
      `;
    }}
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: center;
  ${({ theme }) => {
    const colors = getThemeColors(theme);
    return css`
      background-color: ${colors.tableHeaderBackground};
      color: ${colors.tableHeaderColor};
      transition: background-color 0.3s, color 0.3s;
      text-transform: uppercase;
      letter-spacing: 1px;
    `;
  }}
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s;
  }
`;

const LiveTag = styled.span`
  margin-left: 8px;
  padding: 2px 6px;
  background-color: red;
  color: white;
  font-size: 12px;
  border-radius: 4px;
`;

const CompletedTag = styled.span`
  margin-left: 8px;
  padding: 2px 6px;
  background-color: gray;
  color: white;
  font-size: 12px;
  border-radius: 4px;
`;

const MainPage = () => {
  const [contests, setContests] = useState([]);
  const [now, setNow] = useState(Date.now());
  const { isAuthenticate } = useContext(UserContext);
  const { darkMode } = useContext(ModeContext);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://je2-backend.onrender.com/api/v1/getContest");
      setContests(response.data.data || []);
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 30000); // update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const isLive = (startTime, duration) => {
    const start = new Date(startTime).getTime();
    const end = start + duration * 60 * 1000;
    return now >= start && now <= end;
  };

  const isCompleted = (startTime, duration) => {
    const end = new Date(startTime).getTime() + duration * 60 * 1000;
    return now > end;
  };

  return (
    <Container theme={darkMode}>
      <Table>
        <tbody>
          <TableRow className='header'>
            <TableHeader theme={darkMode}>Contest Name</TableHeader>
            <TableHeader theme={darkMode}>Writers</TableHeader>
            <TableHeader theme={darkMode}>Start</TableHeader>
            <TableHeader theme={darkMode}>Duration</TableHeader>
          </TableRow>

          {[...contests].reverse().map((contest, index) => {
            const localTime = new Date(contest.startTime).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata"
            });
            const [date, time] = localTime.split(", ");
            const live = isLive(contest.startTime, contest.duration);
            const completed = isCompleted(contest.startTime, contest.duration);

            return (
              <TableRow key={index} theme={darkMode}>
                <TableCell>
                  {live ? (
                    <Link
                      to={isAuthenticate ? `/contest/${contest._id}` : "/login"}
                      state={isAuthenticate ? {
                        ques: contest.questions,
                        name: contest.contestName,
                        start: contest.duration,
                        duration: contest.duration,
                      } : { returnPath: "/compete" }}
                    >
                      {contest.contestName}
                      <LiveTag>Live</LiveTag>
                    </Link>
                  ) : (
                    <>
                      {contest.contestName}
                      {completed && <CompletedTag>Completed</CompletedTag>}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {contest.writers.map((writer, ind) => (
                    <p key={ind}>{writer}</p>
                  ))}
                </TableCell>
                <TableCell>{date}<br />{time}</TableCell>
                <TableCell>{contest.duration}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default MainPage;
