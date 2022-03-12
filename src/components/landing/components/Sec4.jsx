import React from "react";
import styled from "styled-components";
import star from "assets/icons/star.svg";

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 72rem;
  padding: 9.6rem 0;

  .mb {
    height: 100%;
    display: none;
    margin: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    color: var(--white);
    @media (max-width: 760px) {
      display: flex;
    }
  }
  .ctn {
    color: var(--white);
    width: 148.5%;
    transform: translateX(-9%);
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    @media (max-width: 760px) {
      display: none;
    }
  }

  p {
    @media (max-width: 760px) {
      font-size: 48px;
      line-height: 48px;
    }

    display: flex;
    img {
      width: 5.6rem;
      height: 5.6rem;
      margin: 0 2.4rem;
      @media (max-width: 760px) {
        margin: 0 auto;
      }
      padding: 0;
      display: inline-block;
      align-self: center;
    }
    span {
      width: fit-content;
      display: inline-block;
    }
    .shift {
      margin-left: -1.8rem;
    }
  }

  .title-plus {
    width: max-content;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    padding: 48px 0;
    height: auto;

    .mb {
      gap: 32px;
    }
  }
`;
const Star = () => <img src={star} alt="start" />;

const Sec4 = () => {
  return (
    <Wrapper>
      <div className="ctn">
        <p className="title-plus">
          <span>Birthdays</span> <Star />
          <span>Secret Santa</span>
          <Star /> <span>Wedding</span>
        </p>
        <p className="title-plus">
          <span className="shift">Baby Shower</span> <Star />
          <span>House warming</span>
          <Star /> <span>Christmas</span>
        </p>
        <p className="title-plus">
          <span>Office send-off</span> <Star /> <span>Retirement parties</span>
        </p>
        <p className="title-plus">
          <span>Anniversary</span> <Star />
          <span>Graduations</span> <Star />
          <span>Anything else</span>
        </p>
      </div>
      <div className="mb">
        <p className="title-plus">
          Birthdays <Star />
          SecretSanta
        </p>
        <p className="title-plus">
          Baby Shower <Star />
          Weddings
        </p>
        <p className="title-plus">
          Birthdays
          <Star />
          Secret Santa
        </p>
        <p className="title-plus">
          Baby Shower <Star />
          Weddings
        </p>
      </div>
    </Wrapper>
  );
};

export default Sec4;
