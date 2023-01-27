import {
  CashIcon,
  ImageIcon,
  LinkIcon,
  QuantityIcon,
  StarIcon,
  TextIcon,
} from "components/global/SVG";
import MaximizeIcon from 'assets/icons/maximize-icon.svg';
import MinimizeIcon from 'assets/icons/minimize-icon.svg';
import TrashIcon from 'assets/icons/trash_danger.svg';
import CloseIcon from 'assets/icons/close_circle.svg';
// import CheckBox from "components/global/CheckBox";
import FormGroup from "components/global/FormGroup";
import { Formik } from "formik";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { base_url_vendors } from "utils/utils";

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

  .form-top-section {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .gift-image-container {
      position: relative;
      padding: 5px 10px 0;
      img {
        border-radius: 5px;
      }
      button {
        position: absolute;
        top: 10px;
        left: 45px;
      }
    }
    .toggle-section {
      display: flex;
      z-index: 1;
      gap: 15px;
      position: absolute;
      top: -3px;
      right: 0;
      .field-toggler{
        padding-top: 7px;
      }
      img {
        width: 16px;
        height: auto;
      }
    }
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
    overflow: hidden;
    transition: max-height 0.6s ease;
    // padding-left: 24px;
  }

  .additionalOption {
    padding: 4px 0;
    margin-bottom: 16px;

    .fieldWrapper {
      height: auto;

      input {
        padding: 0;
      }
    }

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
    display: flex;
    gap: 24px;
    .upload-file-container {
      .file-upload:hover {
        cursor: pointer;
      }
      input[type='file']{
          display: none;
      }
    }

    .btn {
      background-color: #fff;
      border-radius: 8px;
      padding: 10px;
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
  const [showAllFields, setShowAllFields] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px');
  const contentRef = useRef(null);

	useEffect(() => {
		setContentHeight(
			showAllFields ? contentRef.current.scrollHeight + 'px' : '0px'
		);
	}, [showAllFields]);


  // file conversion to base64
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

    return reader
  });

	const onImageChange =async(e)=> {
		const base64file = await toBase64(e.target.files[0])
		if (e.target.files && e.target.files[0]) {
			setFieldValue(index, "avatar", base64file) 
		}
    // const imgFile = e.target.files[0]
    // setFieldValue(index, "avatar", imgFile)
	}
  return (
    <Formik
      initialValues={{
        name: rowValues?.name || "",
        link: rowValues?.link || "",
        price: rowValues?.price || "",
        quantity: rowValues?.quantity || "",
        description: rowValues?.description || "",
        avatar: rowValues?.avatar || ""
      }}
    >
      {({ handleSubmit }) => (
        <RowWrapper onSubmit={handleSubmit}>
          <div className="form-top-section">
            {rowValues?.avatar && (
              <div className='gift-image-container'>
                <img 
                  src={`${rowValues.avatar?.startsWith("data") ? rowValues.avatar : base_url_vendors+'/../'+rowValues.avatar}`} 
                  alt='wish item' 
                  width='45px' 
                  height='45px' 
                />
                <button
                  type='button'
                  onClick={() => setFieldValue(index, "avatar", "") }
                >
                  <img src={CloseIcon} alt="close icon"/>
                </button>
              </div>
            )}

            <div className="toggle-section">
              <button
                type='button'
                onClick={() => setShowAllFields((prev) => !prev)}
                className='field-toggler'
              >
                <img src={showAllFields ? MinimizeIcon : MaximizeIcon} alt='maximize field' />
              </button>

              {!initial && index !== 0 && (
                <button
                  type="button"
                  className="remove"
                  onClick={() => removeRow(index)}
                >
                  <img src={TrashIcon} alt='trash'/>
                </button>
              )}
            </div>
          </div>
          <div className="header">
            <div className="flexRow alignCenter">
              {/* {rowValues?.name && !noCheck && (
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
              )} */}
              <FormGroup
                className="mainInput"
                fieldStyle="shortText"
                name="name"
                label="Wish name"
                onChange={(e) => {
                  setFieldValue(index, "name", e.target.value.trim());
                }}
              />
            </div>
              <Spacer y={1.6} />
              <div className={`additionalOption flexRow alignCenter`}>
                <LinkIcon />
                <Spacer x={0.8} />
                <FormGroup
                className="fullWidth"
                fieldStyle="shortText"
                name="link"
                placeholder="Link e.g https://example.com"
                onChange={(e) =>
                  setFieldValue(index, "link", e.target.value.trim())
                }
              />
              </div>
          </div>

          <div
            className={`additionalOptionsWrapper${noCheck ? " noCheck" : ""}`}
            ref={contentRef}
            style={{ maxHeight: `${contentHeight}` }}
          >
            <div className={`additionalOption flexRow alignCenter`}>
              <CashIcon />
              <Spacer x={0.8} />
              <FormGroup
              className="fullWidth"
              fieldStyle="shortText"
              name="price" 
              placeholder="Price e.g $30" 
              onChange={(e) =>
                setFieldValue(index, "price", e.target.value.trim())
              }
            />
            </div>
            <div className={`additionalOption flexRow alignCenter`}>
              <QuantityIcon />
              <Spacer x={0.8} />
              <FormGroup
              className="fullWidth"
              fieldStyle="shortText"
              name="quantity" 
              type="number"
              placeholder="Quantity e.g 2" 
              onChange={(e) =>
                setFieldValue(index, "quantity", e.target.value.trim())
              }
            />
            </div>
            <div className={`additionalOption flexRow alignCenter`}>
              <TextIcon />
              <Spacer x={0.8} />
              <FormGroup
              className="fullWidth"
              fieldStyle="shortText"
              name="description" placeholder="Description" 
              onChange={(e) =>
                setFieldValue(index, "description", e.target.value.trim())
              }
            />
            </div>
            <div className="actionBtns">
              <button
                type="button"
                className="flexRow alignCenter justifyCenter btn"
                onClick={() => {
                  setFieldValue(index, "priority", !desired);
                  setDesired(prev => !prev);
                }}
              >
                <StarIcon fill={rowValues?.priority || desired ? "var(--primary-main)" : "none"} />
                <Spacer x={0.4} />
                <span className={`body-4 ${rowValues?.priority || desired ? 'colorPrimaryMain' : ''}`}>Desired Item</span>
              </button>

              <div className='upload-file-container'>
                <label htmlFor='file' className='file-upload'>
                  <span
                    type="button"
                    className="flexRow alignCenter justifyCenter btn"
                  >
                    <ImageIcon />
                    <Spacer x={0.4} />
                    <span className="body-4">Add an image</span>
                  </span>
                </label>
                <input
                  type='file'
                  accept='image/*'
                  id='file'
                  name='image'
                  onChange={onImageChange}
                />
              </div>

            </div>
          </div>
          <button className="submitBtn" type="submit"></button>
        </RowWrapper>
      )}
    </Formik>
  );
};

export default ItemRowGroup;
