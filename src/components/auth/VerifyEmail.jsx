import { AuthCard } from "./AuthStyles";
import { AuthWrapper } from "./AuthStyles";
import { CardImage } from "./AuthStyles";
import CloseModal from "components/global/CloseModal";
import React from "react";
import Spacer from "components/global/Spacer";
import handPoint from "assets/images/hand_point.svg";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const fromSite = new URLSearchParams(search).get("from");

  const fromTrigger = () => {
    if (!fromSite) return;
    document.querySelector("#fromTrigger").classList.add(fromSite);
    document.querySelector("#fromTrigger").click();
  }

  useEffect(() => {
    fromTrigger();
    // eslint-disable-next-line
  }, [])

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
      <CloseModal callback={() => navigate("/home/login")} />
        <Spacer y={2.4} />
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
        <button id="fromTrigger">...</button>
      </AuthCard>
    </AuthWrapper>
  );
};

export default VerifyEmail;
