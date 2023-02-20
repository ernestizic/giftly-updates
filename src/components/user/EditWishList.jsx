import { Card, PrivacyOptions } from "./WishListsStyles";
import { Navigate, useNavigate } from "react-router-dom";
import { base_url, debounce, validateURL } from "utils/utils";
import {
  setAlert
} from "features/alert/alertSlice";
import {
  clearTempList,
  setTempList,
  setTempListDescription,
  setTempListId,
  setTempListName,
  setTempListVisibility,
} from "features/wishList/wishListSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import CloseModal from "components/global/CloseModal";
import FormGroup from "components/global/FormGroup";
import { Formik } from "formik";
import { GiftBoxIconPrimary } from "components/global/SVG";
import ItemRowGroup from "../wishlist/ItemRowGroup";
import Logo from "components/global/Logo";
import RadioInput from "components/global/RadioInput";
import Spacer from "components/global/Spacer";
import addIcon from "assets/icons/plus.svg";
import axios from "axios";
import saveIcon from "assets/icons/save_white.svg";
import settingsIcon from "assets/icons/settings.svg";
import shareIcon from "assets/icons/share-black.svg";
import styled from "styled-components";

const Wrapper = styled(Backdrop)`
  z-index: 20;
`;

const EditWishList = ({ getWishLists }) => {
  const navigate = useNavigate();
  const tempListId = useSelector((state) => state.wishList.tempListId);
  const tempList = useSelector((state) => state.wishList.tempList);
  const tempListName = useSelector((state) => state.wishList.tempListName);
  const {tempListDescription} = useSelector(state => state.wishList)
  const tempListVisibility = useSelector(
    (state) => state.wishList.tempListVisibility
  );
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const addListItem = async (data) => {
    console.log(data)
    try {
      await axios.post(
        `${base_url}/items/${tempListId}`,
        { items: [data] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await getWishLists();

      if (res.data.status === "success") {
        dispatch(
          setTempList(
            res.data.data.data.find((item) => item.id === tempListId).items
          )
        );
        return;
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const updateListItem = async (data) => {
    console.log(data)
    if (!data.id) {
      addListItem(data);
      return;
    }

    try {
      const res = await axios.patch(`${base_url}/items/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)

      getWishLists();
    } catch (e) {
      console.log(e.response.data.errors);
    }
  };

  const deleteListItem = async (id) => {
    if (!id) return;

    try {
      await axios.delete(`${base_url}/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getWishLists();
    } catch (e) {
      console.log(e);
    }
  };

  // eslint-disable-next-line
  const updateListItems_memoed = useCallback(debounce(updateListItem, 500), []);

  const setFieldValue = (rowIndex, fieldName, fieldValue) => {
    let temp = tempList.map((item) => Object.assign({}, item));

    temp[rowIndex][fieldName] = fieldValue;

    dispatch(setTempList(temp));

    // update list items
    // const update = debounce(() => updateListItem(temp[rowIndex]));
    updateListItems_memoed(temp[rowIndex]);
  };

  const removeRow = (index) => {
    if (tempList[index] !== undefined && tempList[index] !== null) {
      let temp = [...tempList];
      temp.splice(index, 1);
      dispatch(setTempList(temp));
      deleteListItem(tempList[index].id);
    }
  };

  const addMore = () => {
    let temp = tempList.map((item) => Object.assign({}, item));

    const data = { name: "", status: "pending" };

    temp.push(data);

    dispatch(setTempList(temp));
  };

  const togglePrivacyOptions = () => {
    document.querySelector("form.options").classList.toggle("show");
  };

  const updateDetails = async () => {
    const invalidLinks = tempList.filter(
      (item) => item.link && item.link.length && !validateURL(item.link)
    );

    if (!tempListName || !tempListName.length) {
      dispatch(setAlert({
        message: "Please name your wish list"
      }))
      return;
    }

    if (tempListDescription && tempListDescription.length < 5 ) {
      dispatch(setAlert({
        message: "Wishlist description is too short"
      }))
      return;
    }

    if (invalidLinks.length) {
      dispatch(setAlert({
        message: "You have entered an invalid URL link"
      }))
      return;
    }

    const wishList = {
      title: tempListName,
      description: tempListDescription,
      visibility: tempListVisibility,
    };

    await axios.post(
      `${base_url}/items/${tempListId}`,
      { items: tempList.filter(item => !item.id) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

  const handleSave = async (action) => {
    setSaving(true);
    try {
      const res = await updateDetails();

      if (!res) {
        setSaving(false);
        return;
      }

      if (res.data.status === "success") {
        dispatch(setTempListId(res.data.data.id));
        dispatch(setAlert({
          message: "Wish list saved"
        }))
        setSaving(false);
        action === "share"
          ? navigate("/user/wish-lists/share")
          : navigate("/user/wish-lists");
        return;
      }

      setSaving(false);
      dispatch(setAlert({
        message: res.data.message
      }))
    } catch (e) {
      setSaving(false);
      console.log(e.response.data)
      dispatch(setAlert({
        message: e.response.data.errors[0].message || "Something went wrong"
      }))
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  if (!tempListId) {
    return <Navigate to="/user/wish-lists" />;
  }

  return (
    <Wrapper
      id="editModal"
      className="flexColumn alignCenter"
      onClick={(e) => {
        if (e.target.id === e.currentTarget.id) {
          dispatch(clearTempList());
          navigate(-1);
        }
      }}
    >
      <Card>
        <CloseModal
          callback={() => {
            dispatch(clearTempList());
            navigate(-1);
          }}
        />
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <p className="sub-text textCenter colorTitleActive">Edit this wish list</p>
        <h2 className="textCenter colorTitleActive title">
          List Details
        </h2>
        <Spacer y={2.4} />
        <Formik initialValues={{ 
          wish_list_name: tempListName || "",
          description: tempListDescription || "" 
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
        <p className="subtitle-4 colorTitleActive">Add wishes</p>
        <Spacer y={0.4} />
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
        <button
          type="button"
          className="flexRow alignCenter colorGrey1"
          onClick={addMore}
          style={{color: "#121212", fontWeight: 600,}}
        >
          <img src={addIcon} alt="plus" className="icon" />
          <Spacer x={1.2} />
          <span>Add another</span>
        </button>
        <Spacer y={2.4} />
        <button
          type="button"
          className="giftSuggestionsBtn flexRow alignCenter justifyCenter colorPrimaryDark"
          onClick={() => navigate("/user/wish-lists/gift-suggestions")}
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

          <div className="actionBtns">
            <Button
              text="Share"
              className="secondary"
              iconLeft={shareIcon}
              disabled={saving}
              onClick={() => handleSave("share")}
              fullWidth
            />
            <Button
              text="Save"
              iconLeft={saveIcon}
              disabled={saving}
              loading={saving}
              onClick={handleSave}
              fullWidth
            />
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default EditWishList;
