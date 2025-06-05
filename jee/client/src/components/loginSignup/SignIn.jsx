import React, { useState, useContext} from 'react'
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from '../../contexts/UserContext';
import { useLocation } from 'react-router-dom';

function SignInForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {set_Data_to_cookies, setIsAuthenticate} = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit =async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          state,
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      if(response.data.success === true) {
        setIsAuthenticate(true);
        const data = response.data.user;
        set_Data_to_cookies(data);
        if(location.state != null){
            navigate(location.state.returnPath);
        }
        else navigate('/');
      }else{
          setErrorMessage(response.data.message || 'An unknown error occurred.');
      }
    } catch (error) {
        const obj=error.response.data;
        toast.error(obj.message);
        setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignInForm;
