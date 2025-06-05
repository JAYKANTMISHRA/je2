// import React, { useState, useContext} from 'react'
// import axios from 'axios';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import UserContext from '../../contexts/UserContext';
// import { useLocation } from 'react-router-dom';

// const Login = () => {
//     const [loginData, setLoginData] = useState({});
//     const [signupData, setSignupData] = useState({});
//     const [signup, setSignup] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const {set_Data_to_cookies, setIsAuthenticate} = useContext(UserContext);
//     const location = useLocation();
//     const navigate = useNavigate();

//     const handleChange = (e) =>{
//         const {name, value} = e.target;
//         if(signup){
//             setSignupData((prevSignupData) => ({ ...prevSignupData, [name]: value}));
//         }else{
//         setLoginData((prevLoginData) => ({ ...prevLoginData, [name]: value }));

//         }
//     } 
//     const handleSignup = () =>{
//         setErrorMessage('');
//         setSignup(true);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             let response;
//             if (signup) {
//                 response = await axios.post(
//                     "http://localhost:8000/api/v1/signup",
//                     signupData,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                     }
//                 );
//             } else {
//                 response = await axios.post(
//                     "http://localhost:8000/api/v1/login",
//                     loginData,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                     }
//                 );
//             } 
//             if(response.data.success === true) {
//                 setIsAuthenticate(true);
//                 const data = response.data.user;
//                 set_Data_to_cookies({email:data.email, first:data.first, last:data.last, username:data.username, token:data.token});
//                 if(location.state != null){
//                     navigate(location.state.returnPath);
//                 }
//                 else navigate('/');
//             }else{
//                 setErrorMessage(response.data.message || 'An unknown error occurred.');
//             }
//         } catch (error) {
//             const obj=error.response.data;
//             toast.error(obj.message);
//             setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
//         }
//     };
    

//     return (
//         <div className="cont">
//         <div className="container">
//             <form onSubmit={handleSubmit} className="form-container">
//                 {
//                     signup === false ? (
//                         <div className="form-section">
//                             <div>
//                                 <input type="email" name="email" placeholder="email" value={loginData.email || ''} onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <input type="text" name="password" value={loginData.password || ''} placeholder="password" onChange={handleChange} />
//                             </div>
//                             {errorMessage && <div className="error-message">{errorMessage}</div>}
//                             <span>SignUp if you don't have an account <span onClick={handleSignup}>Click here</span></span>
//                             <div>
//                                 <button type="submit">LogIn</button>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="form-section">
//                             <div className='name-row'>
//                                 <input type="text" name="first" value={signupData.first || ''} placeholder="First name" onChange={handleChange} />
//                                 <input type="text" name="last" value={signupData.last || ''} placeholder="Last name" onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <input type="text" name="username" value={signupData.username || ''} placeholder="Username" onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <input type="email" name="email" placeholder="email" value={signupData.email || ''} onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <input type="text" name="password" value={signupData.password || ''} placeholder="password" onChange={handleChange} />
//                             </div>
//                             {errorMessage && <div className="error-message">{errorMessage}</div>}
//                             <div>
//                                 <button type="submit">SignUp</button>
//                             </div>
//                         </div>
//                     )
//                 }
//             </form>
//             <div className="image-container">
//                 <img src={require("../../assets/rocket1.png")} alt="Rocket" />
//             </div>
//         </div>
//         <ToastContainer />
//         </div>
//     )
// }

// export default Login



import React, { useState } from "react";
import "./Login.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SingUp";

export default function Login() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Appp">
      <h2>Start With Us</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}