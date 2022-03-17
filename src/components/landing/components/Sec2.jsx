import React from "react";
import styled from "styled-components";
import Card1 from "./Card1";

const Wrapper = styled.div`
  background-color: var(--accent_2-main);
  padding: 9.6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    text-align: center;
    font-size: 5.6rem;
    line-height: 6rem;
    color: var(--title-active);
    margin-bottom: 4.8rem;
  }

  .cardWrapper {
    gap: 96px;

    @media (max-width: 930px) {
        gap: 2rem;

			}

  }

  @media (max-width: 760px) {
    padding: 4.8rem 0;

    .title {
      font-size: 36px;
      line-height: 48px;
    }

    .cardWrapper {
      flex-direction: column;
      gap: 48px;
      @media (max-width: 930px) {
        /* gap: 2.4rem; */

			}
    }
  }
`;

const Sec2 = () => {
  return (
    <Wrapper>
      <h3 className="title-1 title">How it works?</h3>
      <div className="cardWrapper flexRow justifySpaceBetween">
        <Card1 cardNum={1} />
        <Card1 cardNum={2} />
        <Card1 cardNum={3} />
      </div>
    </Wrapper>
  );
};

export default Sec2;
