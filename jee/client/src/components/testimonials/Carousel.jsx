import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import review from './Data';
import Card from './Card';

const CarousellContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:60px;
  @media (max-width: 768px) {
    flex-direction:column;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 20%
  margin-left: 20px;
`;

const SliderContainer = styled.div`
  flex: 1;
  max-width: 60%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (max-width: 400px) {
    max-width: 145%;
    
  }
  
`;

const SliderItem = styled.div`
  flex: 0 0 auto;
  margin-right: 20px;
  @media (max-width: 768px) {
    flex: none;
  }
`;

const BoldText = styled.div`
    align-items: center;
    font-family: CrimsonText;
    font-size: x-large;
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

const Carousell = () => {
  const settings = {
    dots: true,
    infinite: true,
    centerPadding: '10px',
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  return (
    <CarousellContainer>
      <TextContainer>
        <BoldText>
          <h1>Over 1M Learners</h1>
          <p>Our learners benefit from our rich repository of courses and practice problems every day.</p>
        </BoldText>
      </TextContainer>
      <SliderContainer>
        <Slider {...settings}>
          {review.map((content, idx) => (
            <SliderItem key={idx}>
              <Card
                comment={content.comment}
                rating={content.rating}
                avatar={content.avatar}
                username={content.username}
                address={content.address}
              />
            </SliderItem>
          ))}
        </Slider>
      </SliderContainer>
    </CarousellContainer>
  );
};

export default Carousell;