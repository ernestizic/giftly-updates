import React from "react";
import { AuthCard } from "./AuthStyles";
import { AuthWrapper } from "./AuthStyles";
import handPoint from "assets/images/hand_point.png";
import Spacer from "components/global/Spacer";
import styled from "styled-components";

const CardImage = styled.img`
  display: block;
  width: 330px;
  margin: auto;

  @media screen and (max-width: 768px) {
    width: 160px;
  }
`;

const VerifyEmail = () => {
  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
        <CardImage src={handPoint} alt="Pointing hand" />
        <Spacer y={2.4} />
        <h3 className="title-3 colorTitleActive title textCenter">
          Hello Username
        </h3>
        <Spacer y={0.8} />
        <p className="subtitle-2 colorTitleActive textCenter">
          Welcome to Giftly 🎉
        </p>
        <Spacer y={0.8} />
        <p className="subtitle-3 colorTextDescription textCenter">
          An email has been sent to natashadibie@gmail.com with a link to verify
          your account. If you don't see this mail in your inbox, please check
          your spam section.
        </p>
      </AuthCard>
    </AuthWrapper>
  );
};

export default VerifyEmail;
