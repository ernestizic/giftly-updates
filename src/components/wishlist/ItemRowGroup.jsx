import {
  CashIcon,
  CloseSquare,
  LinkIcon,
  QuantityIcon,
  StarIcon,
  TextIcon,
} from "components/global/SVG";

import CheckBox from "components/global/CheckBox";
import FormGroup from "components/global/FormGroup";
import { Formik } from "formik";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import { useState } from "react";

const RowWrapper = styled.form`
  width: 100%;
  grid-gap: 16px;
  position: relative;
  margin-bottom: ${(props) => (props.header ? 0 : "16px")};
  background-color: var(--input-bg);
  border-radius: 8px;
  padding: 16px 24px;

  .remove {
    width: max-content;
    height: 20px;
    align-self: center;
  }

  .submitBtn {
    display: none;
  }

  .header {
    display: grid;
    grid-template-columns: auto 24px;
    grid-gap: 12px;
  }

  .mainInput {
    width: 100%;

    .fieldWrapper {
      height: auto;
    }

    input {
      padding: 0;
    }

    label {
      margin-left: 0;
    }
  }

  .additionalOptionsWrapper {
    // padding-left: 24px;
  }

  .additionalOption {
    padding: 4px 0;
    margin-bottom: 16px;

    input {
      display: block;
      color: var(--title-active);
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 16px;
      line-height: 24px;
      font-style: normal;
      font-weight: 400;

      &::placeholder {
        color: var(--placeholder);
      }
    }
  }

  .actionBtns {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 24px;

    .btn {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 10px 0;
    }
  }
`;

const ItemRowGroup = ({
  initial,
  index,
  removeRow,
  rowValues,
  setFieldValue,
  noCheck,
}) => {
  const [desired, setDesired] = useState(false);
  return (
    <Formik
      initialValues={{
        name: "",
        link: "",
      }}
    >
      {({ handleSubmit }) => (
        <RowWrapper onSubmit={handleSubmit}>
          <div className="header">
            <div className="flexRow alignCenter">
              {rowValues?.name && !noCheck && (
                <>
                  <CheckBox
                    id={`status_${rowValues.id}`}
                    name={`status_${rowValues.id}`}
                    isChecked={
                      rowValues.status && rowValues.status !== "pending"
                    }
                    onChange={() => {
                      setFieldValue(
                        index,
                        "status",
                        `${
                          rowValues.status === "pending" ? "checked" : "pending"
                        }`
                      );
                    }}
                  />
                  <Spacer x={0.8} />
                </>
              )}
              <FormGroup
                className="mainInput"
                fieldStyle="shortText"
                name="name"
                label="Wish title"
                value={rowValues?.name}
                onChange={(e) => {
                  setFieldValue(index, "name", e.target.value);
                }}
              />
            </div>
            {!initial && index !== 0 && (
              <button
                type="button"
                className="remove"
                onClick={() => removeRow(index)}
              >
                <CloseSquare />
              </button>
            )}
          </div>

          {rowValues?.name && (
            <div
              className={`additionalOptionsWrapper${noCheck ? " noCheck" : ""}`}
            >
              <Spacer y={1.6} />
              <div className={`additionalOption flexRow alignCenter`}>
                <LinkIcon />
                <Spacer x={0.8} />
                <input
                  name="link"
                  placeholder="Link e.g https://example.com"
                  value={rowValues?.link || ""}
                  onChange={(e) =>
                    setFieldValue(index, "link", e.target.value.trim())
                  }
                />
              </div>
              <div className={`additionalOption flexRow alignCenter`}>
                <CashIcon />
                <Spacer x={0.8} />
                <input name="price" placeholder="Price e.g $30" 
                value={rowValues?.price || ""}
                onChange={(e) =>
                  setFieldValue(index, "price", e.target.value.trim())
                }
                />
              </div>
              <div className={`additionalOption flexRow alignCenter`}>
                <QuantityIcon />
                <Spacer x={0.8} />
                <input name="quantity" placeholder="Quantity e.g 2" 
                value={rowValues?.quantity || ""}
                onChange={(e) =>
                  setFieldValue(index, "quantity", e.target.value.trim())
                }/>
              </div>
              <div className={`additionalOption flexRow alignCenter`}>
                <TextIcon />
                <Spacer x={0.8} />
                <input name="description" placeholder="Description" 
                value={rowValues?.description || ""}
                onChange={(e) =>
                  setFieldValue(index, "description", e.target.value)
                }/>
              </div>
              <div className="actionBtns">
                <button
                  type="button"
                  className="flexRow alignCenter justifyCenter fullWidth btn"
                  onClick={() => {
                    setFieldValue(index, "priority", !desired);
                    setDesired(prev => !prev);
                  }}
                >
                  <StarIcon fill={rowValues?.priority ? "var(--primary-main)" : "none"} />
                  <Spacer x={0.4} />
                  <span className="body-4">Desired Item</span>
                </button>
                {/* <button
                  type="button"
                  className="flexRow alignCenter justifyCenter fullWidth btn"
                >
                  <ImageIcon />
                  <Spacer x={0.4} />
                  <span className="body-4">Add an image</span>
                </button> */}
              </div>
            </div>
          )}
          <button className="submitBtn" type="submit"></button>
        </RowWrapper>
      )}
    </Formik>
  );
};

export default ItemRowGroup;
