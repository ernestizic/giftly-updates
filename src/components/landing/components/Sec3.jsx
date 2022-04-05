import Button from "components/global/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card2 from "./Card2";
import wave3 from "assets/images/wave3.svg";
import wave4 from "assets/images/wave4.svg";

const Wrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 9.6rem 12rem;
  justify-content: space-between;
  position: relative;

  @media (min-width: 1440px) {
    justify-content: center;
    & > div + div {
      margin-left: 194px;
    }
  }

  @media (max-width: 1300px) {
    padding: 9.6rem 11rem;
  }

  @media (max-width: 1110px) {
    padding: 9.6rem 6rem;
  }

  .img__tp {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    z-index: 1;

    @media (max-width: 900px) {
      width: 180px;
    }
  }

  h1 {
    font-size: 9.6rem;
    line-height: 9.6rem;
    font-family: "BoldenVan";

    span {
      color: var(--primary-main);
    }
  }

  .img__btm {
    position: absolute;
    bottom: 29px;
    left: 31px;
    width: 200px;
    z-index: 1;
  }

  .text {
    max-width: 55rem;
    color: var(--title-active);
    position: relative;
    z-index: 2;

    .subtitle {
      margin: 2.4rem 0 4.8rem;
      color: var(--body);
    }

    @media (max-width: 768px) {
      max-width: 100vw;
      text-align: center;
      & > * {
        margin: auto;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 96px 0;
    padding-top: 160px;
    align-items: center;

    .title {
      font-size: 48px;
      line-height: 56px;
      margin-top: 4.951rem;
      width: 300px;
    }

    .img__tp {
      width: 140px;
    }

    .img__btm {
      display: none;
    }

    .text {
      padding: 0 24px;
    }

    .subtitle {
      font-size: 16px;
      line-height: 24px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1300px) {
    padding: 96px 72px;

    .img__btm {
      position: absolute;
      bottom: 40px;
      left: 0;
      width: 200px;
      z-index: 1;
    }
  }
`;

const Sec3 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <img className="img__tp" src={wave3} alt="wave3" />
      <Card2 />
      <div className="text">
        <h1 className="title-plus title">
          Build a list, <span>share</span> with ease.
        </h1>
        <p className="subtitle-2 subtitle">
          Not just for birthdays! Create a wishlist for any special occasion and
          share with your family, friends and loved ones on any of these
          platforms.
        </p>
        <Button
          width="23.2rem"
          height="6.4rem"
          text="Sign up now"
          className="large"
          onClick={() => navigate("/home/sign-up")}
        />
      </div>
      <img className="img__btm" src={wave4} alt="wave4" />
    </Wrapper>
  );
};

export default Sec3;
