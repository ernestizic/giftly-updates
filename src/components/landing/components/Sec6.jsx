import React from "react";
import styled from "styled-components";
import hm_hero_3 from "assets/images/hm_hero_3.png";
import hm_hero_3sm from "assets/images/hm_hero_3sm.png";
import Button from "components/global/Button";
import { useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";

const Wrapper = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;

  h1 {
    font-size: 9.6rem;
    line-height: 9.6rem;

    .fr {
      color: var(--accent_1-light);
    }
    .sd {
      color: var(--primary-main);
    }

    @media (max-width: 768px) {
      font-size: 4.8rem;
      line-height: 4.8rem;
    }
  }

  .imgWrapper {
    overflow: hidden;
    background-image: ${`url(${hm_hero_3} )`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* 
		img {
			width: 100%;
			height: 100%;
		} */
  }

  .textContent {
    padding: 15.6rem 0;
    padding-left: 4.8rem;
    max-width: 55.2rem;
  }

  @media (max-width: 1100px) {
    .textContent {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
    h1 {
      font-size: 6.2rem;
      max-width: 26rem;
      line-height: 7.6rem;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 55rem auto;

    .imgWrapper {
      overflow: hidden;
      background-image: ${`url(${hm_hero_3sm} )`};
      background-size: cover;
      background-position: top;
    }

    .textContent {
      padding: 48px 24px;
      align-items: center;
      text-align: center;
      margin: auto;

      .title {
        font-size: 48px;
        line-height: 48px;
        width: 278px;
      }

      p {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  @media (max-width: 560px) {
    grid-template-rows: 37rem auto;
  }
`;

const Sec6 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="imgWrapper">
        {/* <img src={hm_hero_3} alt="hm_hero_3" /> */}
      </div>
      <div className="flexColumn justifyCenter textContent">
        <h1 className="title-1 title">
          No more <span className="fr">bad</span>{" "}
          <span className="sd">gifts</span>
        </h1>
        <Spacer y={2.4} />
        <p className="subtitle-2">
          When it comes to gift-giving, forget trying to read minds. Now relax,
          put your feet up. You’ll never have to worry about finding or
          receiving the perfect gift again!
        </p>
        <Spacer y={4.8} />
        <div className="btnWrapper">
          <Button
            width="18rem"
            height="6.4rem"
            text="Create a wishlist"
            className="large"
            onClick={() => navigate("/home/new-wishlist")}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Sec6;
