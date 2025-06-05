import React, {useContext } from 'react';
import styled from 'styled-components';
import {ModeContext} from '../../contexts/ModeContext';
import axios from 'axios';

// Styled components
const Container = styled.div`
    margin-top: 2rem;
    background-color: #fffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ImageContainer = styled.div`
    
`;

const ProImg = styled.img`
    width: 100%;
    height: 60vh;
    @media (max-width:768px) {
        height:40vh;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: CrimsonText;
`;

const Title = styled.h1`
    font-size: xx-large;
`;

const Paragraph = styled.p`
    font-size: large;
    margin: 0.2rem;
`;

const Button = styled.button`
background: ${({ mode }) => (mode ? 'linear-gradient(to right, #fdc830, #f37335);' : 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(162,102,246,1) 0%, rgba(203,159,249,1) 90%)')};
    color: #fff;
    margin-top: 3rem;
    padding: 0.7rem 3.5rem; /* Increased button size */
    border: none;
    border-radius: 1rem; /* Increased button border radius */
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: large;
    font-weight: bolder;
    &:hover {
        background: ${({ mode }) => (mode ? 'linear-gradient(to right, #f37335, #fdc830);' : 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90% )')};
        transform: scale(1.05);
    }
    @media (max-width: 768px) {
        padding: 0.5rem 2rem;
        font-size: medium;
        margin-bottom:20px;
      }
`;

const Subscriber = () => {
    const { darkMode } = useContext(ModeContext);

    const checkoutHandler = async (amount) => {
        const { data: { key } } = await axios.get("https://je2-backend.onrender.com/api/v1/getkey");
        const { data: { order } } = await axios.post("https://je-2-backend.onrender.com/api/v1/checkout", { amount });
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Ankur",
            description: "Razorpay Integration",
            image: "https://lh3.googleusercontent.com/-F0G6IrwKVQ0/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkm6s0ROcIP5Rz6jpsv2I4NnRA6WiA/photo.jpg?sz=46",
            order_id: order.id,
            callback_url: "http://localhost:5000/api/v1/paymentverification",
            prefill: {
                name: "Ankur Kumar",
                email: "ankur.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <Container>
            <ImageContainer>
                <ProImg src={require("../../assets/prostudent.png")} alt="" />
            </ImageContainer>
            <TextContainer>
                <Title>Get JEEEEE Pro</Title>
                <Paragraph>Unlock your full potential with our Pro subscription!</Paragraph>
                <Paragraph>Gain access to exclusive JEE practice material and personalized tests.</Paragraph>
                <Button mode={darkMode} onClick={()=>checkoutHandler(999)}>Go Pro</Button>
            </TextContainer>
        </Container>
    );
};

export default Subscriber;
