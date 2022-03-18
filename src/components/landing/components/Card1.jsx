import React from "react";
import styled from "styled-components";
import card1 from "assets/images/card1.png";
import card2a from "assets/images/card2a.png";
import card2b from "assets/images/card2b.png";
import send from "assets/icons/send.svg";
import check from "assets/icons/check.svg";
import add from "assets/icons/add.svg";

const Wrapper = styled.div`
  background-color: white;
  padding: 1.6rem;
  max-width: 26rem;
  border-radius: 0.8rem;
  position: relative;

  .images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 16.8rem;
    grid-gap: 1.6rem;

    .add {
      position: absolute;
      background-color: var(--primary-main);
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 50%;
    }
    .card1__img {
      width: 90.26%;
      grid-column: 1 / 3;
      display: block;
      margin: auto;
      margin-top: 3.2rem;
    }

    & > div {
      display: flex;
      background-color: var(--accent_2-main);
      border-radius: 0.8rem;
      align-items: center;
      justify-content: center;
    }

    .img1 {
      grid-column: 1/2;
      grid-row: 1/3;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 7.2rem;
        }

        img + img {
          margin-top: 1.1rem;
        }
      }
    }

    .send {
      width: 1.777rem;
    }

    .with-check {
      background-color: var(--primary-main);
      img {
        width: 2.3rem;
      }
    }
  }

  .text {
    height: 11.6rem;
    margin-top: 4rem;
    text-align: center;
    color: var(--title-active);
    h4 {
      font-size: 2.4rem;
      line-height: 3.6rem;
      @media (max-width: 930px) {
        font-size: 2rem;
        line-height: 2rem;
      }
      @media (max-width: 768px) {
        font-size: 2.4rem;
        line-height: 3.6rem;
      }
    }
    p {
      font-size: 1.6rem;
      line-height: 2.4rem;
      margin-top: 0.8rem;
      color: var(--body);
      @media (max-width: 930px) {
        font-size: 1.4rem;
        line-height: 2rem;
      }
      @media (max-width: 768px) {
        font-size: 1.6rem;
        line-height: 2.4rem;
      }
    }
  }
`;

const TEXT = [
  {
    title: "Create a Wish list",
    para: "Make a wish list for yourself, for a friend, or even a pet! Then, add items from any store.",
  },
  {
    title: "Share Wish list",
    para: "Send your wish list to anyone. Generate a unique link to share via email, chat or social media.",
  },
  {
    title: "Claim",
    para: "Family and friends can claim gifts on your wishlist anonymously. Useful!",
  },
];

const Card1 = ({ cardNum }) => {
  return (
    <Wrapper>
      <div className="images">
        {cardNum === 1 && (
          <>
            <div className="add">
              <img src={add} alt="add" />
            </div>
            <img className="card1__img" src={card1} alt="card1" />
          </>
        )}
        {cardNum === 2 && (
          <>
            <div className="img1">
              <div>
                <img src={card2a} alt="card2a" />
                <img src={card2b} alt="card2b" />
              </div>
            </div>
            <div>
              <img className="send" src={send} alt="send" />
            </div>
            <div></div>
          </>
        )}
        {cardNum === 3 && (
          <>
            <div className="img1 with-check">
              <img src={check} alt="check" />
            </div>
            <div>{/* <img src={send} alt="send" /> */}</div>
            <div></div>
          </>
        )}
      </div>
      <div className="text">
        <h4 className=" title-1">{TEXT[cardNum - 1].title}</h4>
        <p>{TEXT[cardNum - 1].para}</p>
      </div>
    </Wrapper>
  );
};

export default Card1;
