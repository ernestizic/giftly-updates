import Accordion from "../global/Accordion";
import Footer from "components/global/Footer";
import Nav from "components/global/Nav";
import Nav2 from "./components/Nav2";
import React from "react";
import data from "assets/data.json";
import styled from "styled-components";
import { useEffect } from "react";

const Wrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  padding: 0;
  margin: 0;

  .faqs-ctn {
    display: flex;
    padding-top: 9.6rem;
    padding-bottom: 9.6rem;
    @media (max-width: 768px) {
      display: block;
      padding-top: 0;
    }
  }
  color: var(--title-active);
  .acc,
  h1 {
    margin: 0 12rem;
    @media (max-width: 1000px) {
      margin: 0 5rem;
    }
    @media (max-width: 768px) {
      margin: 3.2rem 0;
    }
  }
  h1 {
    margin-bottom: 4.8rem;
    @media (max-width: 768px) {
      margin: 3.2rem 2.4rem;
    }
  }

  color: var(--title-active);
  .acc,
  h1 {
    margin: 0 12rem;
    @media (max-width: 1000px) {
      margin: 0 5rem;
    }
    @media (max-width: 768px) {
      margin: 3.2rem 0;
    }
  }

  h1 {
    margin-bottom: 4.8rem;
    @media (max-width: 768px) {
      margin: 3.2rem 2.4rem;
    }
  }

  & > :last-child {
    margin-bottom: 0;
  }

  .acc {
    margin-bottom: 32px;
  }

  @media screen and (max-width: 768px) {
    .faq-title {
      font-size: 36px;
      line-height: 48px;
    }
  }
`;

const FAQs = () => {
  useEffect(() => {
    document.querySelector("html").scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <Nav wt />
      <div className="faqs-ctn">
        <div className="faqs">
          <h1 className="title-2 faq-title">FAQ</h1>
          {data.faqs.map((item, index) => (
            <Accordion
              key={index}
              className="acc"
              withPadding
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        <Nav2 />
      </div>

      <Footer />
    </Wrapper>
  );
};

export default FAQs;
