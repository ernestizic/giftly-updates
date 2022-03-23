import Backdrop from "components/global/Backdrop";
import styled from "styled-components";
import closeIcon from "assets/icons/close_square.svg";
import addIcon from "assets/icons/plus.svg";
import settingsIcon from "assets/icons/settings.svg";
import shareIcon from "assets/icons/share_primary.svg";
import saveIcon from "assets/icons/save_white.svg";
import { Navigate, useNavigate } from "react-router-dom";
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
  setTempListName,
  setTempListSlug,
  setTempListVisibility,
} from "features/wishList/wishListSlice";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { base_url, validURL } from "utils/utils";
import axios from "axios";
import Loader from "components/global/Loader";

const Wrapper = styled(Backdrop)`
  padding: 72px 0;
  z-index: 20;

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

const CreateUserWishList = ({ getWishLists }) => {
  const navigate = useNavigate();
  const tempList = useSelector((state) => state.wishList.tempList);
  const tempListName = useSelector((state) => state.wishList.tempListName);
  const tempListVisibility = useSelector(
    (state) => state.wishList.tempListVisibility
  );
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
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

  const handleSave = async (action) => {
    const invalidLinks = tempList.filter(
      (item) => item.link && item.link.length && !validURL(item.link)
    );

    let timeout = setTimeout(() => {
      dispatch(clearAlert());
    }, 5000);
    dispatch(setAlertTimeout(timeout));

    if (!tempListName || !tempListName.length) {
      dispatch(showAlert("Please name your wish list"));
      return;
    }

    if (invalidLinks.length) {
      dispatch(showAlert("You have entered an invalid URL link"));
      return;
    }

    dispatch(clearAlert());

    const wishList = {
      title: tempListName,
      visibility: tempListVisibility,
      items: tempList,
    };

    setSaving(true);
    try {
      const res = await axios.post(`${base_url}/wishlist`, wishList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        setSaving(false);
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        getWishLists();
        setSaving(false);
        dispatch(setTempListSlug(res.data.data.slug));
        dispatch(showAlert("Wish list saved"));
        dispatch(clearTempList());
        action === "share"
          ? navigate("/user/wish-lists/share")
          : navigate("/user/wish-lists");
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
      dispatch(showAlert(e.response.data.message));
    }
  };

  if (!user.username) {
    return <Navigate to="/user/wish-lists/create-username" />;
  }

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <div className="flexRow alignCenter">
          <button type="button" onClick={() => navigate(-1)}>
            <img src={closeIcon} alt="icon" />
          </button>
        </div>
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <p className="subtitle-4 subtitle textCenter">Create a wish list</p>
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
              noCheck
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
        {saving ? (
          <div className="flexRow justifyCenter">
            <Loader />
          </div>
        ) : (
          <div className="flexRow justifyCenter actionBtns">
            <Button
              text="Share"
              className="secondary"
              iconLeft={shareIcon}
              disabled={saving}
              loading={saving}
              width="calc(50% - 12px)"
              onClick={() => handleSave("share")}
            />
            <Spacer x={2.4} />
            <Button
              text="Save"
              iconLeft={saveIcon}
              disabled={saving}
              loading={saving}
              width="calc(50% - 24px)"
              onClick={handleSave}
            />
          </div>
        )}
      </Card>
    </Wrapper>
  );
};

export default CreateUserWishList;
