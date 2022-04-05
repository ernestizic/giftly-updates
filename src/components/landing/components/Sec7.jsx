import React from "react";
import styled from "styled-components";
import Button from "components/global/Button";
import Accordion from "../../global/Accordion";
import Spacer from "components/global/Spacer";
import { useNavigate } from "react-router-dom";

const FAQS = [
  {
    question: "How can I share my wish lists?",
    answer:
      "Once you have signed up and created your wish list, all you have to do is share your wishlist link on your email or social media sites.",
  },
  {
    question: "How do I add an item to my wish list?",
    answer:
      "You can add items to your wish list once you click on ‘Create wish list.’ After adding an item, include a link to purchase the item. To add an item to your wish list after creating the wish list, click on ‘Add item.’",
  },
  {
    question: "How many wish lists can I create?",
    answer:
      "You can create multiple wish lists for various occasions on Giftly. You can also add as many items as you want to your wish list.",
  },
];

const Wrapper = styled.div`
  background-color: white;
  padding: 12rem 9.6rem;
  .accordion + .accordion {
    margin-top: 3.2rem;
  }

  & > * {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .mb {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 4.8rem 0;
  }

  h3 {
    color: black;
    margin-bottom: 5.6rem;
    .dsk {
      display: block;
      max-width: 89.5rem;
    }

    @media (max-width: 1050px) {
      margin-right: unset;
      margin-left: unset;
      width: auto;
      max-width: 57rem;
      font-size: 3.2rem;
      line-height: 4rem;
    }

    @media (max-width: 768px) {
      .dsk {
        display: none;
      }
      .mb {
        display: block;
      }

      max-width: 32.7rem;
      padding: 0 2.4rem;
      font-size: 2.4rem;
      line-height: 3.6rem;
    }
  }

  // p {
  //   margin: 2.4rem auto 4.8rem;
  // }
  @media (max-width: 768px) {
    button {
      margin-left: 2.4rem;
      height: 4.8rem;
    }
  }
`;

const Sec7 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h3 className="title-2">
        <span className="dsk">
          We answered a few nagging questions you might have!
        </span>
        <span className="mb">We answered frequently asked questions</span>
      </h3>
      {FAQS.map((item) => (
        <Accordion
          className="accordion"
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
      <Spacer y={2.4} />
      <div className="btn-ctn">
        <Button
          width="18rem"
          height="7.4rem"
          text="Create a wishlist"
          onClick={() => navigate("/home/new-wishlist")}
        />
      </div>
    </Wrapper>
  );
};

export default Sec7;
