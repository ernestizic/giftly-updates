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
    answer: "",
  },
  {
    question: "How many wish lists can I create?",
    answer: "",
  },
];

const Wrapper = styled.div`
  background-color: white;
  padding: 12rem 9.6rem;
  .accordion + .accordion {
    margin-top: 3.2rem;
  }
 
  .mb{
    display: none;
  }

  @media (max-width: 760px) {
    padding: 4.8rem 2.4rem;
  }

  h3 {
    color: black;
    margin-bottom: 5.6rem;
    max-width: 89.5rem;

    @media (max-width: 1050px) {
      width: auto;
      max-width: 57rem;
      font-size: 3.2rem;
      line-height: 4rem;
    }

    @media (max-width: 760px) {
      .dsk{
    display:  none;
  }
  .mb{
    display: block;
  }
      max-width: 32.7rem;
      padding: 0 2.4rem;
      font-size: 2.4rem;
      line-height: 3.6rem;
    }
  }


  p {
    margin: 2.4rem auto 4.8rem;
  }
  @media (max-width: 760px) {
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
        <span className="dsk">We answered a few nagging questions you might have!</span>
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
      <Button
        width="18rem"
        height="7.4rem"
        text="Create a wishlist"
        onClick={() => navigate("/home/new-wishlist")}
      />
    </Wrapper>
  );
};

export default Sec7;
