import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    max-width: 800px;
    margin: 0.5rem auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 0.5rem grey;
`;

const FormContent = styled.div`
    flex: 1;
`;

const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: grey;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
    color: grey;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UserImage = styled.img`
    width: 22rem;
    height: auto;
`;

const Settings = () => {
    const [state, setState] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
        cnfPassword:"",
        school: ""
    });

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    };

    const storedData = JSON.parse(Cookies.get('userData'));

    const handleSettingsChanges = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/updateUser`, {
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
                cnfPassword: state.cnfPassword,
                email: state.email,
                userEmail: storedData.email,
                school: state.school
            });
            if (response.data.success) {
                toast.success("Changes saved successfully!");
            } else {
                toast.warning("Check the details filled carefully!");
            }
        } catch (err) {
            console.log(err.response ? err.response.data : err.message);
            toast.error(err.response ? err.response.data.message : err.message);
        }
    }

    return (
        <FormContainer>
            <FormContent>
                <FormTitle>User Settings</FormTitle>
                <form onSubmit={handleSettingsChanges}>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <InputField
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="oldPassword">Old Password:</Label>
                        <InputField
                            type="password"
                            name="oldPassword"
                            value={state.oldPassword}
                            onChange={handleChange}
                            placeholder="Enter your old password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="newPassword">New Password:</Label>
                        <InputField
                            type="password"
                            name="newPassword"
                            value={state.newPassword}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="cnfPassword">Confirm New Password:</Label>
                        <InputField
                            type="password"
                            name="cnfPassword"
                            value={state.cnfPassword}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="school">School / College:</Label>
                        <InputField
                            type="text"
                            name="school"
                            value={state.school}
                            onChange={handleChange}
                            placeholder="Enter your school or college"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Save Changes</Button>
                    </FormGroup>
                </form>
            </FormContent>
            <ImageContainer>
                <UserImage src={require("../../assets/user.png")} alt="User" />
            </ImageContainer>
            <ToastContainer />
        </FormContainer>
    );
};

export default Settings;










// import axios from 'axios';
// import React, { useState } from 'react';
// import Cookies from 'js-cookie';

// const Settings = () => {
//     const [state, setState] = useState({
//         email: "",
//         oldPassword: "",
//         newPassword: "",
//         cnfPassword:"",
//         school: ""
//     });

//     const handleChange = evt => {
//         const value = evt.target.value;
//         setState({
//           ...state,
//           [evt.target.name]: value
//         });
//     };

//     const storedData = JSON.parse(Cookies.get('userData'));

//     const handleSettingsChanges = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.put(`http://localhost:8000/api/v1/updateUser`, {
//                 oldPassword: state.oldPassword,
//                 newPassword: state.newPassword,
//                 cnfPassword: state.cnfPassword,
//                 email: state.email,
//                 userEmail: storedData.email,
//                 school: state.school
//             });
//             console.log(response.data);
//         } catch (err) {
//             console.log(err.response ? err.response.data : err.message);
//         }
//     }

//     return (
//         <div>
//             <form onSubmit={handleSettingsChanges}>
//                 <div>
//                     <label htmlFor="email">Email:</label>
//                     <div>
//                         <input type="email"
//                             name="email"
//                             value={state.email}
//                             onChange={handleChange}
//                             placeholder='xyz@gmail.com' />
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="oldPassword">Old Password:</label>
//                     <div>
//                         <input type="password"
//                             name="oldPassword"
//                             value={state.oldPassword}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="newPassword">New Password:</label>
//                     <div>
//                         <input type="password"
//                             name="newPassword"
//                             value={state.newPassword}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="cnfPassword">Confirm New Password:</label>
//                     <div>
//                         <input type="password"
//                             name="cnfPassword"
//                             value={state.cnfPassword}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="school">School / College:</label>
//                     <div>
//                         <input type="text"
//                             name="school"
//                             value={state.school}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     <button type='submit'>Save Changes</button>
//                 </div>
//             </form>
//             <div>
//                 <img src={require("../../assets/user.png")} alt="User" />
//             </div>
//         </div>
//     )
// }

// export default Settings;
