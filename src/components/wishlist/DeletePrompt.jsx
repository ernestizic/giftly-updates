import React from "react";
import deleteIcon from "assets/icons/delete-circle-icon.svg";
import CloseIcon from "assets/icons/close_square.svg"
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
  max-width: 400px;
  padding: 24px;
  background-color: #fff;
  color: var(--title-active);
  .buttons {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 16px;
  }
  .close-icon:hover {
    cursor: pointer;
  }
  h2{
    margin: 16px 0 4px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #121212;
  }
  p{
    font-weight: 475;
    font-size: 16px;
    line-height: 24px;
    color: #3D3D3D;
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
        <div className="flexRow justifySpaceBetween">
          <CardImage src={deleteIcon} alt="icon" className="icon" />
          <img src={CloseIcon} alt="close" className="close-icon" onClick={() => navigate(-1)}/>
        </div>
        <h2>
          Delete wishlist
        </h2>
        <p className="subtitle-3">
          Are you sure you want to delete this list? <br /> By deleting, all
          wishes will be deleted with it.
        </p>
        <div className="buttons">
          <Button
            text="Cancel"
            className="border_dark"
            width="45%"
            onClick={() => navigate(-1)}
          />
          <Button
            bg="#AB0001"
            text="Delete"
            width="45%"
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
