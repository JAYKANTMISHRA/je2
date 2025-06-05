import React, { useState, useContext} from 'react'
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from '../../contexts/UserContext';
import { useLocation } from 'react-router-dom';

function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {set_Data_to_cookies, setIsAuthenticate} = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    name: "",
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

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/signup",
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        
        
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button>Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUpForm;
