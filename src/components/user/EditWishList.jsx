import Backdrop from "components/global/Backdrop";
import styled from "styled-components";
import closeIcon from "assets/icons/close_square.svg";
import addIcon from "assets/icons/plus.svg";
import settingsIcon from "assets/icons/settings.svg";
import shareIcon from "assets/icons/share_white.svg";
import deleteIcon from "assets/icons/trash.svg";
import { useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { useState } from "react";
import ItemRowGroup from "../wishlist/ItemRowGroup";
import FormGroup from "components/global/FormGroup";
import { Formik } from "formik";
import RadioInput from "components/global/RadioInput";
import Button from "components/global/Button";
import Logo from "components/global/Logo";
import { AuthCard } from "components/auth/AuthStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTempList,
  setTempList,
  setTempListId,
  setTempListName,
  setTempListVisibility,
} from "features/wishList/wishListSlice";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { base_url } from "utils/utils";
import axios from "axios";

const Wrapper = styled(Backdrop)`
  padding: 72px 0;

  @media screen and (max-width: 768px) {
    padding: 32px 8px;
  }
`;

const Card = styled(AuthCard)`
  margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 48px;

  .addMore {
    width: 100%;
    height: 48px;
    border: 1px dashed var(--line);
    border-radius: 4px;
    transition: all 0.2s ease-out;

    &:hover {
      border-color: var(--body);
    }
  }

  .actionBtns {
    width: 100%;
    margin: auto;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 24px 16px;

    .title {
      font-size: 24px;
      line-height: 36px;
    }

    .prompt1 {
      font-size: 14px;
      line-height: auto;
    }

    .prompt2 {
      font-size: 12px;
      line-height: auto;
    }
  }
`;

const PrivacyOptions = styled.div`
  .toggler {
    color: var(--body);
  }

  .options {
    opacity: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    transition: all 0.2s ease-out;

    &.show {
      opacity: 1;
      height: 60px;
      pointer-events: all;
    }
  }
`;

const EditWishList = ({ getWishLists }) => {
  const navigate = useNavigate();
  const tempListId = useSelector((state) => state.wishList.tempListId);
  const tempList = useSelector((state) => state.wishList.tempList);
  const tempListName = useSelector((state) => state.wishList.tempListName);
  const tempListVisibility = useSelector(
    (state) => state.wishList.tempListVisibility
  );
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const setFieldValue = (rowIndex, fieldName, fieldValue) => {
    let temp = tempList.map((item) => Object.assign({}, item));

    temp[rowIndex][fieldName] = fieldValue;

    dispatch(setTempList(temp));
  };

  const removeRow = (index) => {
    if (tempList[index] !== undefined && tempList[index] !== null) {
      let temp = [...tempList];
      temp.splice(index, 1);
      dispatch(setTempList(temp));
    }
  };

  const addMore = () => {
    let temp = tempList.map((item) => Object.assign({}, item));

    temp.push({ name: "", link: "" });

    dispatch(setTempList(temp));
  };

  const togglePrivacyOptions = () => {
    document.querySelector("form.options").classList.toggle("show");
  };

  const updateDetails = async () => {
    let timeout = setTimeout(() => {
      dispatch(clearAlert());
    }, 5000);
    dispatch(setAlertTimeout(timeout));

    if (!tempListName || !tempListName.length) {
      dispatch(showAlert("Please name your wish list"));
      return;
    }

    if (!tempList[0].name) {
      dispatch(showAlert("Please add at least one item"));
      return;
    }

    dispatch(clearAlert());

    const wishList = {
      title: tempListName,
      visibility: tempListVisibility,
      items: tempList,
    };

    const res = await axios.patch(
      `${base_url}/wishlist/${tempListId}`,
      wishList,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getWishLists();

    dispatch(clearTempList());

    return res;
  };

  const handleShare = async () => {
    setSaving(true);
    try {
      const res = await updateDetails();

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        dispatch(setTempListId(res.data.data.id));
        dispatch(showAlert("Wish list saved"));
        setSaving(false);
        navigate("/user/wish-lists/share");
        return;
      }

      setSaving(false);
      dispatch(showAlert(res.data.message));
    } catch (e) {
      setSaving(false);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response.data.message || "Something went wrong"));
    }
  };

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <div className="flexRow alignCenter justifyEnd">
          <button
            type="button"
            onClick={() => {
              updateDetails();
              navigate(-1);
            }}
          >
            <img src={closeIcon} alt="icon" />
          </button>
        </div>
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <p className="subtitle-4 subtitle textCenter">Edit this wish list</p>
        <Spacer y={0.4} />
        <h3 className="title-3 title textCenter colorTitleActive">
          List Details
        </h3>
        <Spacer y={2.4} />
        <Formik initialValues={{ wish_list_name: tempListName || "" }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormGroup
                fieldStyle="shortText"
                name="wish_list_name"
                label="Wish list name"
                value={tempListName}
                onChange={(e) => dispatch(setTempListName(e.target.value))}
              />
            </form>
          )}
        </Formik>
        <Spacer y={2.4} />
        <p className="subtitle-4 colorTitleActive">Add wishes</p>
        <Spacer y={1.6} />
        <div className="formRows">
          {tempList?.map((row, index) => (
            <ItemRowGroup
              key={index}
              index={index}
              removeRow={removeRow}
              rowValues={row}
              setFieldValue={setFieldValue}
            />
          ))}
        </div>
        <Spacer y={2.4} />
        <button
          type="button"
          className="addMore flexRow alignCenter justifyCenter colorGrey1"
          onClick={addMore}
        >
          <img src={addIcon} alt="plus" className="icon" />
          <Spacer x={1.2} />
          <span>Add another</span>
        </button>
        <Spacer y={1.6} />
        <PrivacyOptions>
          <button
            className="flexRow alignCenter toggler"
            onClick={togglePrivacyOptions}
          >
            <img src={settingsIcon} alt="icon" className="icon" />
            <Spacer x={0.8} />
            <span className="body-3">Privacy and Sharing</span>
          </button>
          <Spacer y={1.6} />
          <form className="options" onSubmit={(e) => e.preventDefault()}>
            <div className="flexRow alignCenter">
              <RadioInput
                id="public"
                name="privacy"
                value="public"
                checked={tempListVisibility === "public"}
                onClick={() => dispatch(setTempListVisibility("public"))}
              />
              <Spacer x={0.8} />
              <label className="body-3 colorTitleActive" htmlFor="public">
                Public (anyone online can view)
              </label>
            </div>
            <Spacer y={0.8} />
            <div className="flexRow alignCenter">
              <RadioInput
                id="private"
                name="privacy"
                value="private"
                checked={tempListVisibility === "private"}
                onClick={() => dispatch(setTempListVisibility("private"))}
              />
              <Spacer x={0.8} />
              <label className="body-3 colorTitleActive" htmlFor="private">
                Private (only those with link can view)
              </label>
            </div>
          </form>
        </PrivacyOptions>
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter actionBtns">
          <Button
            text="Share"
            iconLeft={shareIcon}
            disabled={saving}
            loading={saving}
            width="calc(50% - 12px)"
            onClick={handleShare}
          />
          <Spacer x={2.4} />
          <Button
            text="Delete"
            iconLeft={deleteIcon}
            className="secondary"
            width="calc(50% - 24px)"
            onClick={() => navigate("delete")}
          />
        </div>
      </Card>
    </Wrapper>
  );
};

export default EditWishList;