import React from "react";
import styled from "styled-components";
import hm_hero_3 from "assets/images/hm_hero_3.png";
import Button from "components/global/Button";
import { useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";

// const Wrapper = styled.div`
//   color: var(--white);
//   display: flex;
//   @media (max-width: 760px) {
//     flex-direction: column;
//   }
//   h1 {
//     .fr {
//       color: var(--accent_1-light);
//     }
//     .sd {
//       color: var(--primary-main);
//     }
//     @media (max-width: 760px) {
//       font-size: 4.8rem;
//       line-height: 4.8rem;
//     }
//   }
//   & > div {
//     /* width: 50%; */
//     flex: 1;
//     img {
//       width: 100%;
//     }
//   }
//   & > div:last-child {
//     padding: 15.4rem 0;

//     & > * {
//       width: 66.38%;
//       margin: auto;
//       @media (max-width: 760px) {
//         width: 67%;
//         text-align: center;
//         button {
//           margin: auto;
//         }
//       }
//       @media (max-width: 570px) {
//         width: 87.2%;
//       }
//     }

//     p {
//       margin: 2.4rem auto 4.8rem;
//     }
//   }
// `;

const Wrapper = styled.div`
  color: var(--white);
  display: grid;
  grid-template-columns: 1fr 1fr;

  h1 {
    .fr {
      color: var(--accent_1-light);
    }
    .sd {
      color: var(--primary-main);
    }

    @media (max-width: 760px) {
      font-size: 4.8rem;
      line-height: 4.8rem;
    }
  }

  .imgWrapper {
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .textContent {
    padding: 0 120px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;

    .textContent {
      padding: 48px 24px;
      align-items: center;
      text-align: center;

      .title {
        font-size: 48px;
        line-height: 48px;
        width: 278px;
      }
    }
  }
`;

const Sec6 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="imgWrapper">
        <img src={hm_hero_3} alt="hm_hero_3" />
      </div>
      <div className="flexColumn justifyCenter textContent">
        <h1 className="title-plus title">
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
        <div>
          <Button
            width="18rem"
            height="6.4rem"
            text="Create a wishlist"
            onClick={() => navigate("/home/new-wishlist")}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Sec6;
