import React from "react";
import styled from "styled-components";
import up_arrow_pink from "assets/icons/up_arrow_pink.svg";
import down_arrow from "assets/icons/down_arrow.svg";

const Wrapper = styled.div`
  position: relative;
  padding: ${(props) => (props.withPadding ? "0 " : "0 2.4rem")};
  transition: all 0.2s ease-out;
  border-radius: 0.8rem;

  img {
    display: inline-block;
    align-self: center;
    height: 20px;
    margin-left: 12px;
  }

  h4 {
    color: var(--title-active);
    cursor: pointer;

    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  p {
    margin: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
    color: var(--title-active);

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 18px;
    }
  }

  &.open {
    background-color: var(--accent_2-main);
    padding: 2.4rem;

    h4 {
      color: var(--primary-main);
    }

    p {
      margin-top: 1.6rem;
      height: auto;
      overflow: hidden;
      opacity: 1;
      margin-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 0 2.4rem;

    .acc-title {
      justify-content: space-between;
    }
  }
`;

const Accordion = ({ question, answer, className, withPadding }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper
      withPadding={withPadding}
      className={`${className || ""} ${isOpen ? "open" : ""}`}
      onClick={handleClick}
    >
      <h4 className="subtitle-2 acc-title flexRow">
        <span>{question}</span>
        <img
          src={isOpen ? up_arrow_pink : down_arrow}
          alt="up_arrow_pink"
          className="icon"
        />
      </h4>
      <p className="subtitle-3">{answer}</p>
    </Wrapper>
  );
};

export default Accordion;
