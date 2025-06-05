import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import './ContributorForm.css';
import { CompeteContext } from '../components/compete/CompeteContext';
import { useNavigate } from 'react-router-dom';

const animatedComponents = makeAnimated();

const ContributorForm = () => {



    const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: document.documentElement.classList.contains('dark') ? '#3a3a3a' : '#fff',
    borderColor: document.documentElement.classList.contains('dark') ? '#666' : '#ccc',
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: document.documentElement.classList.contains('dark') ? '#2c2c2c' : '#fff',
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: document.documentElement.classList.contains('dark') ? '#555' : '#e0e0e0',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
  }),
  input: (provided) => ({
    ...provided,
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
  }),
};





    const navigate = useNavigate();
    const { setFormmdata } = useContext(CompeteContext);
    const [formData, setFormdata] = useState({
        option: Array(4).fill(""),
        kind: "A"
    });

    const [type, setType] = useState(true);
    const [placeholder_string, setPlaceholderString] = useState("Write the correct option");

    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormdata((prev) => ({ ...prev, [name]: value }));

        if (name === "kind") {
            if (value === "C") {
                setType(false);
                setPlaceholderString("Write the correct answer");
            } else if (value === "A") {
                setType(true);
                setPlaceholderString("Write the correct option");
            } else {
                setType(true);
                setPlaceholderString("Write all the correct options separated by /, e.g., A/B/D");
            }
        }
    };

    const handleChangeOption = (event, index) => {
        const { value } = event.target;
        setFormdata(prev => ({
            ...prev,
            option: prev.option.map((opt, i) => (i === index ? value : opt))
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://je2-frontend01.onrender.com/api/v1/createProblem", formData);
            setFormmdata(prev => ({
                ...prev,
                questions: [...prev.questions, [response.data.data._id, response.data.data.statement]]
            }));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

    const handleLevel = (val) => setSelectedLevel(val);
    const handleSubject = (val) => setSelectedSubject(val);
    const handleTopic = (val) => setSelectedTopic(val);

    useEffect(() => {
        let tags = [];
        if (selectedLevel) tags.push(selectedLevel.value);
        if (selectedSubject) tags.push(selectedSubject.value);
        selectedTopic.forEach(topic => tags.push(topic.label));
        setFormdata(prev => ({ ...prev, tags }));
    }, [selectedLevel, selectedSubject, selectedTopic]);

    const levelOptions = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" }
    ];
    const subjectOptions = [
        { value: "physics", label: "Physics" },
        { value: "chemistry", label: "Chemistry" },
        { value: "mathematics", label: "Mathematics" }
    ];
   const topicOptions = [
  // Physics Class 11
  { value: "laws of motion", label: "Laws of Motion" },
  { value: "work energy power", label: "Work, Energy and Power" },
  { value: "rotational motion", label: "Rotational Motion" },
  { value: "gravitation", label: "Gravitation" },
  { value: "thermodynamics", label: "Thermodynamics" },
  { value: "oscillations", label: "Oscillations" },

  // Physics Class 12
  { value: "electrostatics", label: "Electrostatics" },
  { value: "current electricity", label: "Current Electricity" },
  { value: "magnetism", label: "Magnetism" },
  { value: "alternating current", label: "Alternating Current" },
  { value: "ray optics", label: "Ray Optics" },
  { value: "dual nature", label: "Dual Nature of Radiation and Matter" },

  // Chemistry Class 11
  { value: "structure of atom", label: "Structure of Atom" },
  { value: "thermodynamics chemistry", label: "Thermodynamics" },
  { value: "equilibrium", label: "Equilibrium" },
  { value: "chemical bonding", label: "Chemical Bonding" },
  { value: "states of matter", label: "States of Matter" },
  { value: "hydrocarbons", label: "Hydrocarbons" },

  // Chemistry Class 12
  { value: "solid state", label: "Solid State" },
  { value: "electrochemistry", label: "Electrochemistry" },
  { value: "chemical kinetics", label: "Chemical Kinetics" },
  { value: "coordination compounds", label: "Coordination Compounds" },
  { value: "haloalkanes", label: "Haloalkanes and Haloarenes" },
  { value: "biomolecules", label: "Biomolecules" },

  // Math Class 11
  { value: "sets", label: "Sets" },
  { value: "functions", label: "Functions" },
  { value: "trigonometry", label: "Trigonometry" },
  { value: "sequences", label: "Sequences and Series" },
  { value: "complex numbers", label: "Complex Numbers" },
  { value: "binomial theorem", label: "Binomial Theorem" },

  // Math Class 12
  { value: "relations", label: "Relations and Functions" },
  { value: "inverse trigonometry", label: "Inverse Trigonometric Functions" },
  { value: "matrices", label: "Matrices and Determinants" },
  { value: "continuity", label: "Continuity and Differentiability" },
  { value: "integrals", label: "Integrals" },
  { value: "probability", label: "Probability" }
];


    return (
        <div className='cont'>
            <form className="contributor-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="statement" className="form-label">Question Title:</label>
                    <div className='come_center'>
                        <textarea id="statement" name="statement" value={formData.statement || ""} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="question" className="form-label">Question Statement:</label>
                    <div className='come_center'>
                        <textarea id="question" name="question" value={formData.question || ""} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="image" className="form-label">Upload Image:</label>
                    <div className='come_center'>
                        <input type="file" accept="image/*" id="image" name="img" className="form-control" />
                    </div>
                </div> */}

                <div className="form-group">
                    <label htmlFor="kind" className="form-label">Select Question Type:</label>
                    <div className='come_center'>
                        <select id="kind" name="kind" value={formData.kind} onChange={handleChange} className="form-control">
                            <option value="A">Single Correct</option>
                            <option value="B">Multiple Correct</option>
                            <option value="C">Fill in the blanks</option>
                        </select>
                    </div>
                </div>

                {type &&
                    <div className="form-group">
                        <div className="options">
                            {[0, 1, 2, 3].map(index => (
                                <div key={index} className='option_cont'>
                                    <label htmlFor={`option${index}`} className="option-label">{String.fromCharCode(65 + index)}:</label>
                                    <textarea
                                        id={`option${index}`}
                                        name={`option${index}`}
                                        value={formData.option[index] || ""}
                                        onChange={(e) => handleChangeOption(e, index)}
                                        className="form-control"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }

                <div className="form-group">
                    <label htmlFor="answer" className="form-label">Correct Answer:</label>
                    <div className='come_center'>
                        <textarea id="answer" name="answer" value={formData.answer || ""} onChange={handleChange} placeholder={placeholder_string} className="form-control" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="solution" className="form-label">Solution:</label>
                    <div className='come_center'>
                        <textarea id="solution" name="solution" value={formData.solution || ""} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div className="select-container">
                   <Select
  styles={customSelectStyles}
  closeMenuOnSelect={true}
  components={animatedComponents}
  options={levelOptions}
  value={selectedLevel}
  onChange={handleLevel}
  placeholder="Level"
  isClearable
/>
<Select
  styles={customSelectStyles}
  closeMenuOnSelect={true}
  components={animatedComponents}
  options={subjectOptions}
  value={selectedSubject}
  onChange={handleSubject}
  placeholder="Subject"
  isClearable
/>
<Select
  styles={customSelectStyles}
  isMulti
  components={animatedComponents}
  options={topicOptions}
  value={selectedTopic}
  onChange={handleTopic}
  placeholder="Topics"
/>

                </div>

                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default ContributorForm;
