import React from "react";
import deleteIcon from "assets/icons/delete-circle-icon.svg";
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
  setAlert
} from "features/alert/alertSlice";
import { clearTempList } from "features/wishList/wishListSlice";
import { useState } from "react";

const Card = styled(AuthCard)`
  background-color: #fff;
  color: var(--title-active);
  .buttons {
    display: flex;
    gap: 10px;
  }
`;

const DeletePrompt = ({ getWishLists, redirect }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const tempListId = useSelector((state) => state.wishList.tempListId);
  const token = useSelector((state) => state.auth.token);

  const [deleting, setDeleting] = useState(false);

  const deleteList = async () => {
    if (!tempListId || !getWishLists) {
      redirect ? navigate(redirect) : navigate(-1);

      dispatch(clearTempList());

      return;
    }

    setDeleting(true);
    try {
      // console.log(tempListId)
      const res = await axios.delete(`${base_url}/wishlist/${tempListId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res) {
        setDeleting(false);
        dispatch(setAlert({
          type: 'error',
          message: "An error occurred"
        }))
        return;
      }

      if (res.data.status === "success") {
        getWishLists();
        dispatch(clearTempList());
        dispatch(setAlert({
          type: 'success',
          message: "List deleted"
        }))
        navigate(-1);
        return;
      }
      setDeleting(false);
      dispatch(setAlert({
        type: 'success',
        message: res.data.message
      }))
    } catch (e) {
      setDeleting(false);
      dispatch(setAlert({
        type: 'error',
        message: e.response?.data.message || "Something went wrong"
      }))
    }
  };

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <Card>
        <CardImage src={deleteIcon} alt="icon" className="icon" />
        <Spacer y={2.4} />
        <h2>
          Delete wishlist
        </h2>
        <Spacer y={0.8} />
        <p className="subtitle-3">
          Are you sure you want to delete this list? <br /> By deleting, all
          wishes will be deleted with it.
        </p>
        <Spacer y={1.9} />
        <div className="buttons">
          <Button
            text="Cancel"
            className="border_dark"
            width="50%"
            onClick={() => navigate(-1)}
          />
          <Button
            bg="#AB0001"
            text="Delete"
            width="50%"
            loading={deleting}
            disabled={deleting}
            onClick={deleteList}
          />
        </div>
      </Card>
    </AuthWrapper>
  );
};

export default DeletePrompt;
