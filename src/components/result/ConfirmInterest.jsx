import heartIcon from "assets/icons/heart_success_circle.svg";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import Button from "components/global/Button";
import { AuthWrapper } from "components/auth/AuthStyles";
import { AuthCard } from "components/auth/AuthStyles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url } from "utils/utils";
import {
  setAlert
} from "features/alert/alertSlice";
import { useState } from "react";

const Card = styled(AuthCard)`
  background-color: var(--off-white);
  color: var(--title-active);

  .action-buttons {
    display: flex;
    gap: 10px;
  }
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

      if (!res) {
        setConfirming(false);
        dispatch(setAlert({
          type: 'error',
          message: 'An error occurred'
        }))
        return;
      }

      if (res.data.status === "success") {
        navigate(`${basePath}/item-reserved`);
        return;
      }
      dispatch(setAlert({
        type: 'success',
        message: res.data.message
      }))
    } catch (e) {
      setConfirming(false);
      dispatch(setAlert({
        type: 'error',
        message: e.response?.data.message || "Something went wrong"
      }))
    }
  };

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <Card className="flexColumn justifyCenter">
        <img src={heartIcon} alt='confirm interest' width="48px"/>
        <Spacer y={2.4} />
        <h2>
          Confirm interest
        </h2>
        <Spacer y={0.8} />
        <p className="subtitle-4" style={{fontWeight: '500'}}>{itemName}</p>
        <Spacer y={0.8} />
        <p className="subtitle-4">
          {username} will be notified that you have indicated interest to
          purchase this item anonymously and may check it off their wish list.
        </p>
        <Spacer y={2.4} />
        <div className="action-buttons">
          <Button
            type="button"
            text="Cancel"
            className="border_dark"
            width="50%"
            onClick={() => navigate(-1)}
          />
          <Button
            type='button'
            text="Confirm"
            width="50%"
            loading={confirming}
            disabled={confirming}
            onClick={confirmInterest}
          />
        </div>
      </Card>
    </AuthWrapper>
  );
};

export default ConfirmInterest;
