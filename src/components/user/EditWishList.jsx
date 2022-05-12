import Backdrop from "components/global/Backdrop";
import styled from "styled-components";
import closeIcon from "assets/icons/close_square.svg";
import addIcon from "assets/icons/plus.svg";
import settingsIcon from "assets/icons/settings.svg";
import shareIcon from "assets/icons/share_primary.svg";
import saveIcon from "assets/icons/save_white.svg";
import { Navigate, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { useCallback, useEffect, useState } from "react";
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
import { base_url, debounce, validURL } from "utils/utils";
import axios from "axios";
import Loader from "components/global/Loader";

const Wrapper = styled(Backdrop)`
  padding: 72px 0;
  z-index: 20;

  @media screen and (max-width: 768px) {
    padding: 72px 8px;
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

  const addListItem = async (data) => {
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
      console.log(e);
    }
  };

  const updateListItem = async (data) => {
    if (!data.id) {
      addListItem(data);
      return;
    }

    try {
      await axios.patch(`${base_url}/items/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getWishLists();
    } catch (e) {
      console.log(e);
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

    const wishList = {
      title: tempListName,
      visibility: tempListVisibility,
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

  const handleSave = async (action) => {
    setSaving(true);
    try {
      const res = await updateDetails();

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        setSaving(false);
        return;
      }

      if (res.data.status === "success") {
        dispatch(setTempListId(res.data.data.id));
        dispatch(showAlert("Wish list saved"));
        setSaving(false);
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
      dispatch(showAlert(e.response.data.message || "Something went wrong"));
    }
  };

  useEffect(() => {
    document.querySelector("body").classList.add("modalOpen")
    // eslint-disable-next-line
  }, [])

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
        <div className="flexRow alignCenter">
          <button
            type="button"
            onClick={() => {
              dispatch(clearTempList());
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

export default EditWishList;
