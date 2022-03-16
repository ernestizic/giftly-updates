import heartIcon from "assets/icons/heart_outline_circle.svg";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import Button from "components/global/Button";
import { AuthWrapper } from "components/auth/AuthStyles";
import { AuthCard } from "components/auth/AuthStyles";
import { useNavigate } from "react-router-dom";
import { CardImage } from "components/auth/AuthStyles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useState } from "react";

const Card = styled(AuthCard)`
  background-color: var(--primary-main);
`;

const ConfirmInterest = ({ itemId, itemName, username, slug }) => {
  const navigate = useNavigate();
  const basePath = `/${username}/${slug}`;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [confirming, setConfirming] = useState(false);

  const confirmInterest = async () => {
    setConfirming(true);
    try {
      const res = await axios.post(
        `${base_url}/items/${itemId}/interest`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        setConfirming(false);
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        navigate(`${basePath}/item-reserved`);
        return;
      }

      dispatch(showAlert(res.data.message));
    } catch (e) {
      setConfirming(false);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response?.data.message || "Something went wrong"));
    }
  };

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <Card className="flexColumn justifyCenter">
        <CardImage src={heartIcon} alt="icon" className="icon" />
        <Spacer y={2.4} />
        <h3 className="title-4 colorWhite title flexRow alignCenter justifyCenter">
          Confirm interest
        </h3>
        <Spacer y={0.8} />
        <p className="subtitle-2 colorWhite textCenter">{itemName}</p>
        <Spacer y={0.8} />
        <p className="subtitle-3 colorWhite textCenter">
          {username} will be notified that you have indicated interest to
          purchase this item anonymously and may check it off their wish list.
        </p>
        <Spacer y={2.4} />
        <Button
          text="Confirm"
          width="100%"
          className="inverted"
          loading={confirming}
          disabled={confirming}
          onClick={confirmInterest}
        />
        <Spacer y={1.6} />
        <Button
          text="Cancel"
          className="noBorder white"
          width="100%"
          onClick={() => navigate(-1)}
        />
      </Card>
    </AuthWrapper>
  );
};

export default ConfirmInterest;
