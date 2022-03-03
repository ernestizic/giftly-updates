import React from "react";
import deleteIcon from "assets/icons/delete_circle.svg";
import coolEmoji from "assets/images/cool_emoji.png";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import Button from "components/global/Button";
import { AuthWrapper } from "components/auth/AuthStyles";
import { AuthCard } from "components/auth/AuthStyles";
import { useNavigate } from "react-router-dom";

const Card = styled(AuthCard)`
  background-color: var(--primary-main);
`;

const CardImage = styled.img`
  display: block;
  width: 330px;
  margin: auto;

  &.icon {
    width: 48px;
  }

  @media screen and (max-width: 768px) {
    width: 160px;

    &.icon {
      width: 48px;
    }
  }
`;

const DeletePrompt = () => {
  const navigate = useNavigate();
  return (
    <AuthWrapper className="flexColumn alignCenter">
      <Card className="flexColumn justifyCenter">
        <CardImage src={deleteIcon} alt="icon" className="icon" />
        <Spacer y={2.4} />
        <h3 className="title-4 colorWhite title flexRow alignCenter justifyCenter">
          Delete wish list
        </h3>
        <Spacer y={0.8} />
        <p className="subtitle-3 colorWhite textCenter">
          Are you sure you want to delete this list? Note: By deleting, all
          wishes will be deleted with it.
        </p>
        <Spacer y={2.4} />
        <Button text="Delete wish list" width="100%" className="inverted" />
        <Spacer y={1.6} />
        <Button
          text="Cancel"
          className="noBorder white"
          width="100%"
          onClick={() => navigate("/home/new-wishlist")}
        />
      </Card>
    </AuthWrapper>
  );
};

export default DeletePrompt;
