import React from "react";
import styled from "styled-components";
// import hm_hero_2 from "assets/images/hm_hero_2.png";
import curve1 from "assets/images/curve1.svg";
import curve2 from "assets/images/curve2.svg";
import curve3 from "assets/images/curve3.svg";
import curve4 from "assets/images/curve4.svg";
import Button from "components/global/Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  padding: 9.6rem 12rem;
  overflow: hidden;
  background-color: var(--accent_2-main);

  .inner {
    overflow: hidden;
    position: relative;
    display: flex;
    border-radius: 0.8rem;
    background-color: var(--title-active);
    padding: 9.6rem;
    height: fit-content;

    h1 {
      color: var(--primary-light);
      z-index: 3;
    }

    img {
      width: 100%;
    }

    .cur1 {
      top: 0;
      left: 0;
      height: 45rem;
      position: absolute;
    }

    .cur2 {
      top: 0;
      left: 0;
      position: absolute;
    }
    .cur3 {
      top: 0;
      right: -48px;
      position: absolute;
    }

    .cur4 {
      bottom: 0;
      right: 0;
      position: absolute;
    }

    .text {
      width: 59.8rem;

      @media (max-width: 760px) {
        width: auto;
      }

      p {
        position: relative;
        color: var(--white);
        margin-left: auto;
        width: 35.3rem;
        margin-top: 2.4rem;

        @media (max-width: 760px) {
          width: auto;
          text-align: right;
        }
      }
      h1 {
        position: relative;
      }
    }

    button {
      margin: auto;
      position: relative;
    }
  }

  @media (max-width: 760px) {
    padding: 4.8rem 2.4rem;

    .inner {
      flex-direction: column;
      padding: 96px 16px;

      .cur2 {
        display: none;
      }

      .cur3 {
        width: 200%;
        top: 20%;
        right: -50%;
      }

      .actionBtn {
        margin-top: 48px;
      }
    }

    .title {
      font-size: 48px;
      line-height: 56px;
    }
  }
`;

const Sec8 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="inner">
        <div className="cur1">
          <img src={curve1} alt="curve" />
        </div>
        <div className="cur2">
          <img src={curve2} alt="curve" />
        </div>
        <div className="cur3">
          <img src={curve3} alt="curve" />
        </div>
        <div className="cur4">
          <img src={curve4} alt="curve" />
        </div>
        <div className="text">
          <h1 className="title-plus title">Get started for free now.</h1>
          <p className="subtitle-2 subtitle">
            Let friends and family know the gifts you truly want and need.
          </p>
        </div>
        <Button
          className="actionBtn"
          height="6.4rem"
          width="200px"
          text="Sign me up"
          onClick={() => navigate("/home/sign-up")}
        />
      </div>
    </Wrapper>
  );
};

export default Sec8;
