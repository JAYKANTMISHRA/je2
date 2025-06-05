import React, { useContext } from 'react';
import './ContestForm.css';
import { useNavigate } from "react-router-dom";
import { CompeteContext } from './CompeteContext';
import axios from 'axios';

const ContestForm = () => {
    const navigate=useNavigate();
    const {handleChange,formmData}=useContext(CompeteContext);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post("https://je2-backend.onrender.com/api/v1/createContest",formmData);
        navigate(-1);
    }

    return (
        <div className='cont'>
            <form className="contributor-form" onSubmit={handleSubmit}>
            {/* Contest Name*/}
            <div className="form-group">
                <label htmlFor="contestName" className="form-label">
                    Contest Name:
                </label>
                <div className='come_center'>
                <textarea id="contestName" name="contestName" value={formmData.contestName} onChange={handleChange} className="form-control" />
                </div>
            </div>

            {/* Writers */}
            <div className="form-group">
                <label htmlFor="writers" className="form-label">
                    Writers:
                </label>
                <div className='come_center'>
                <textarea id="writers" name="writers" value={formmData.writers} onChange={handleChange} className="form-control" />
                </div>
            </div>

            {/* Start Time */}
            <div className="form-group">
                <label htmlFor="startTime" className="form-label">
                    Start Date & Time:
                </label>
                <div className='come_center'>
                <input type="datetime-local" id="startTime" name="startTime" value={formmData.startTime} onChange={handleChange} className="form-control" />
                </div>
            </div>

            {/* Duration */}
            <div className="form-group">
                <label htmlFor="Duration" className="form-label">
                    Duration(in Minutes):
                </label>
                <div className='come_center'>
                <textarea id="duration" name="duration" value={formmData.duration} onChange={handleChange} className="form-control" />
                </div>
            </div>
            {
                formmData.questions && formmData.questions.map((question, index) => (
                    <div key={index} className="question">
                    <p>{question[1]}</p>
                    </div>
                ))
            }


            {/* Questions */}

            <button className="btn btn-primary" onClick={()=>navigate("/addProblem")} value={formmData.questions}><h1>+</h1>Add Question</button>
            
            <button type="submit" className="btn btn-primary">Create Contest</button>
        </form>
        </div>
    );
}

export default ContestForm;
