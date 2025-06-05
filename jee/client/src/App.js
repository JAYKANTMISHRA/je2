import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from './components/compete/MainPage';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContributorForm from './forms/ContributorForm';
import Login from './components/loginSignup/Login'
import UserContextProvider from "./contexts/UserContextProvider";
import Table from "./components/PracticePage";
import CompeteContextProvider from "./components/compete/CompeteContext";
import ContestForm from "./components/compete/ContestForm";
import QuestionPage from "./components/compete/QuestionPage";
import Question from "./components/practice_sec/Question";
import {useContext} from 'react'
import {ModeContext} from './contexts/ModeContext';
import FeedbackPage from "./components/FeedBack";
import PaymentSuccess from "./PaymentSuccess";
import ProblemList from "./components/profile/ProblemList";
import UserProfile from "./components/profile/UserProfile";
import Friends from "./components/profile/Friends";
import Settings from "./components/profile/Settings";
import { TimerProvider } from './components/compete/AnswerContext';
function App() {
  const { darkMode } = useContext(ModeContext);
  return (
    <div className={`${darkMode ? 'App' : 'changed-App'}`}>
   <TimerProvider>
      <UserContextProvider>
      <CompeteContextProvider>
      <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
              <Route
                  path="/"
                  Component={Home}
                  ></Route>
              <Route
                  path="/login"
                  Component={Login}
                  ></Route>
              <Route
                  path="/addProblem"
                  Component={ContributorForm}
                  ></Route>
              <Route
                  path="/practice"
                  Component={Table}
                  ></Route>
              <Route
                  path="/contest-form"
                  Component={ContestForm}
                  ></Route>
              <Route
                  path="/compete"
                  Component={MainPage}
                  ></Route>
              <Route
                  path="/contest/:cid/"
                  Component={QuestionPage}
                  ></Route>
              <Route 
                path="/Problem/:statement/"
                Component={Question}>
              </Route>
              <Route 
                path="/feedback"
                Component={FeedbackPage}>
              </Route>
              <Route
                path="/paymentsuccess"
                Component={PaymentSuccess}>
              </Route>
              <Route
                path="/myList"
                Component={ProblemList}>
              </Route>
              <Route
                path="/submissions"
                Component={ProblemList}>
              </Route>
              <Route
                path="/user/:profile"
                Component = {UserProfile}>
              </Route>
              <Route
                path="/friends"
                Component = {Friends}>
              </Route>
              <Route
                path="/settings"
                Component = {Settings}>
              </Route>
          </Routes>
          
        <Footer></Footer>
      </BrowserRouter>
      </CompeteContextProvider>
      </UserContextProvider>
      </TimerProvider>
    </div>
  );
}

export default App;
