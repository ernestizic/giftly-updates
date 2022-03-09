import Backdrop from "components/global/Backdrop";
import styled from "styled-components";
import closeIcon from "assets/icons/close_square.svg";
import addIcon from "assets/icons/plus.svg";
import settingsIcon from "assets/icons/settings.svg";
import shareIcon from "assets/icons/share_white.svg";
import deleteIcon from "assets/icons/trash.svg";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { useState } from "react";
import ItemRowGroup from "./ItemRowGroup";
import FormGroup from "components/global/FormGroup";
import { Formik } from "formik";
import RadioInput from "components/global/RadioInput";
import Button from "components/global/Button";
import Logo from "components/global/Logo";
import { AuthCard } from "components/auth/AuthStyles";

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

const EditWishList = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([{}]);
  const [privacyOption, setPrivacyOption] = useState("public");

  const setFieldValue = (rowIndex, fieldName, fieldValue) => {
    let temp = [...rows];
    temp[rowIndex][fieldName] = fieldValue;

    setRows(temp);
  };

  const removeRow = (index) => {
    if (rows[index] !== undefined && rows[index] !== null) {
      let temp = [...rows];
      temp.splice(index, 1);
      setRows(temp);
    }
  };

  const togglePrivacyOptions = () => {
    document.querySelector("form.options").classList.toggle("show");
  };

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <div className="flexRow alignCenter justifyEnd">
          <button type="button" onClick={() => navigate(-1)}>
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
        <Formik initialValues={{ wish_list_name: "" }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormGroup
                fieldStyle="shortText"
                name="wish_list_name"
                label="Wish list name"
                // onChange={(e) => }
              />
            </form>
          )}
        </Formik>
        <Spacer y={2.4} />
        <p className="subtitle-4 colorTitleActive">Add wishes</p>
        <Spacer y={1.6} />
        <div className="formRows">
          {rows.map((row, index) => (
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
          onClick={() => setRows((prev) => [...prev, {}])}
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
                checked={privacyOption === "public"}
                onClick={() => setPrivacyOption("public")}
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
                checked={privacyOption === "private"}
                onClick={() => setPrivacyOption("private")}
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
            width="calc(50% - 12px)"
            onClick={() => navigate("/home/register-prompt")}
          />
          <Spacer x={2.4} />
          <Button
            text="Delete"
            iconLeft={deleteIcon}
            className="secondary"
            width="calc(50% - 24px)"
            onClick={() => navigate("/home/delete-prompt")}
          />
        </div>
      </Card>
    </Wrapper>
  );
};

export default EditWishList;
