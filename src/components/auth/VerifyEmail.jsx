import React from "react";
import { AuthCard } from "./AuthStyles";
import { AuthWrapper } from "./AuthStyles";
import handPoint from "assets/images/hand_point.svg";
import Spacer from "components/global/Spacer";
import { CardImage } from "./AuthStyles";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
        <CardImage src={handPoint} alt="Pointing hand" />
        <Spacer y={2.4} />
        <h3 className="title-3 colorTitleActive title textCenter">
          Hello {user?.first_name || ""}
        </h3>
        <Spacer y={0.8} />
        <p className="subtitle-2 colorTitleActive textCenter">
          Welcome to Giftly 🎉
        </p>
        <Spacer y={0.8} />
        <p className="subtitle-3 colorTextDescription textCenter">
          An email has been sent to {user?.email || "you"} with a link to verify
          your account. If you don't see this mail in your inbox, please check
          your spam section.
        </p>
      </AuthCard>
    </AuthWrapper>
  );
};

export default VerifyEmail;
