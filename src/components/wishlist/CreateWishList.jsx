import { Card, PrivacyOptions } from "components/user/WishListsStyles";
import { base_url, validURL } from "utils/utils";
import {
  setAlert
} from "features/alert/alertSlice";
import {
  setTempList,
  setTempListDescription,
  setTempListId,
  setTempListName,
  setTempListVisibility,
} from "features/wishList/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import CloseModal from "components/global/CloseModal";
import FormGroup from "components/global/FormGroup";
import { Formik } from "formik";
import { GiftBoxIconPrimary } from "components/global/SVG";
import ItemRowGroup from "./ItemRowGroup";
import Logo from "components/global/Logo";
import RadioInput from "components/global/RadioInput";
import Spacer from "components/global/Spacer";
import addIcon from "assets/icons/plus.svg";
import axios from "axios";
import deleteIcon from "assets/icons/trash.svg";
import settingsIcon from "assets/icons/settings.svg";
import shareIcon from "assets/icons/share_white.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Backdrop)`
  z-index: 20;
`;

const CreateWishList = () => {
  const navigate = useNavigate();
  const tempList = useSelector((state) => state.wishList.tempList);
  const tempListName = useSelector((state) => state.wishList.tempListName);
  const {tempListDescription} = useSelector(state => state.wishList)
  const tempListVisibility = useSelector(
    (state) => state.wishList.tempListVisibility
  );
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

    temp.push({ name: "" });

    dispatch(setTempList(temp));
  };

  const togglePrivacyOptions = () => {
    document.querySelector("form.options").classList.toggle("show");
  };

  const handleShare = async () => {
    const invalidLinks = tempList.filter(
      (item) => item.link && item.link.length && !validURL(item.link)
    );

    if (!tempListName || !tempListName.length) {
      dispatch(setAlert({
        type: 'warning',
        message: "Please name your wish list"
      }))
      return;
    }

    if (tempListDescription && tempListDescription.length < 5 ) {
      dispatch(setAlert({
        type: 'warning',
        message: "Wishlist description is too short"
      }))
      return;
    }

    if (!tempList[0].name) {
      dispatch(setAlert({
        type: 'warning',
        message: "Please add at least one item"
      }))
      return;
    }

    if (invalidLinks.length) {
      dispatch(setAlert({ type: 'warning', message: "You have entered an invalid URL link" }))
      return;
    }

    const wishList = {
      title: tempListName,
      description: tempListDescription,
      visibility: tempListVisibility,
      items: tempList,
    };
    console.log(wishList)

    setSaving(true);
    try {
      const res = await axios.post(`${base_url}/wishlist/save`, wishList);
      console.log(res.data)

      if (!res) {
        dispatch(setAlert({
          type: 'error',
          message: "An error occurred"
        }))
        return;
      }

      if (res.data.status === "success") {
        dispatch(setTempListId(res.data.data.id));
        dispatch(setAlert({
          type: 'success',
          message: "Wish list saved"
        }))
        setSaving(false);
        navigate("/home/register-prompt");
        return;
      }

      setSaving(false);
      dispatch(setAlert({
        type: 'success',
        message: res.data.message
      }))
    } catch (e) {
      setSaving(false);
      dispatch(setAlert({
        type: 'error',
        message: e.response.data.errors[0].message
      }))
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <CloseModal callback={() => navigate("/home")} />
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <p className="sub-text textCenter colorTitleActive">New wish list</p>
        <h2 className="textCenter colorTitleActive title">
          Create a wish list
        </h2>
        <Spacer y={2.4} />
        <Formik initialValues={{ 
            wish_list_name: tempListName || "",
            description: tempListDescription || ""
          }}>
          {({values, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <header>
                <p className="body-3 colorTitleActive">
                  List details
                </p>
                <p>Add wishlist name and description.</p>
              </header>
              <Spacer y={0.4} />
              <FormGroup
                fieldStyle="shortText"
                name="wish_list_name"
                label="Wish list name"
                value={tempListName}
                onChange={(e) => dispatch(setTempListName(e.target.value))}
              />
              <Spacer y={1.4} />
              <FormGroup
                fieldStyle="shortText"
                name="description"
                label="Description (optional)"
                value={tempListDescription}
                onChange={(e) => dispatch(setTempListDescription(e.target.value))}
              />
            </form>
          )}
        </Formik>
        <Spacer y={2.4} />
        <header>
          <p className="body-3 colorTitleActive">
            Add wishes
          </p>
          <p>Add wishlist and other details.</p>
        </header>
        <Spacer y={0.4} />
        <div className="formRows">
          {tempList?.map((row, index) => (
            <ItemRowGroup
              key={index}
              index={index}
              removeRow={removeRow}
              rowValues={row}
              setFieldValue={setFieldValue}
              noCheck
            />
          ))}
        </div>
        <button
          type="button"
          className="flexRow alignCenter colorGrey1"
          onClick={addMore}
        >
          <img src={addIcon} alt="plus" className="icon" />
          <Spacer x={1.2} />
          <span style={{fontWeight: '500'}}>Add another</span>
        </button>
        <Spacer y={2.4} />
        <button
          type="button"
          className="giftSuggestionsBtn flexRow alignCenter justifyCenter colorPrimaryDark"
          onClick={() => navigate("/home/gift-suggestions")}
        >
          <GiftBoxIconPrimary />
          <Spacer x={1.2} />
          <span>Gift suggestions</span>
        </button>
        <Spacer y={1.6} />
        <div className="stickyBottom">
          <PrivacyOptions>
            <button
              className="flexRow alignCenter toggler"
              onClick={togglePrivacyOptions}
            >
              <img src={settingsIcon} alt="icon" className="icon" />
              <Spacer x={0.8} />
              <span className="body-3">Privacy and Sharing</span>
            </button>
            <form className="options" onSubmit={(e) => e.preventDefault()}>
              <Spacer y={1.6} />
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
            <Spacer y={1.6} />
          </PrivacyOptions>
          <div className="flexRow justifyCenter actionBtns">
            <Button
              text="Share"
              iconLeft={shareIcon}
              disabled={saving}
              loading={saving}
              onClick={handleShare}
              fullWidth
            />
            <Button
              text="Delete"
              iconLeft={deleteIcon}
              className="secondary"
              onClick={() => navigate("/home/delete-prompt")}
              fullWidth
            />
          </div>
        </div>
      </Card>
      <Spacer y={4.8} />
    </Wrapper>
  );
};

export default CreateWishList;
