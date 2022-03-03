import React from "react";
import handPhone from "assets/images/hand_phone.png";
import coolEmoji from "assets/images/cool_emoji.png";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import Button from "components/global/Button";
import { AuthWrapper } from "components/auth/AuthStyles";
import { AuthCard } from "components/auth/AuthStyles";
import { useNavigate } from "react-router-dom";
import { CardImage } from "components/auth/AuthStyles";

const SignupPrompt = () => {
  const navigate = useNavigate();
  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard className="flexColumn justifyCenter">
        <CardImage src={handPhone} alt="Pointing hand" />
        <Spacer y={2.4} />
        <h3 className="title-3 colorTitleActive title flexRow alignCenter justifyCenter">
          <img src={coolEmoji} alt="emoji" className="emoji" />
          <Spacer x={1.6} />
          <span>Hi There</span>
        </h3>
        <Spacer y={0.8} />
        <p className="subtitle-3 colorTextDescription textCenter">
          Kindly sign up to giftly to enable you share your wish list with your
          family and friends.
        </p>
        <Spacer y={2.4} />
        <Button
          text="Sign up now"
          width="100%"
          onClick={() => navigate("/home/sign-up")}
        />
        <Spacer y={1.6} />
        <Button
          text="Cancel"
          className="noBorder"
          width="100%"
          onClick={() => navigate("/home/new-wishlist")}
        />
      </AuthCard>
    </AuthWrapper>
  );
};

export default SignupPrompt;
