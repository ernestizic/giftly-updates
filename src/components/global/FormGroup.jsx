import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CheckBox from "./CheckBox";
import eyeIcon from "assets/icons/eye.svg";
import eyeClosed from "assets/icons/eyeClosed.svg";
import { useField } from "formik";
import { useState } from "react";
import { useEffect } from "react";

export const FormGroupWrapper = styled.div`
  .fieldWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 4px;
    height: ${(props) => (props.fieldStyle === "longText" ? "auto" : "4.8rem")};
    border: none;
    position: relative;

    &.error {
      border-color: var(--danger);
    }
  }

  input,
  textarea,
  select {
    display: block;
    color: ${(props) => props.color ?? "var(--grey_1)"};
    width: 100%;
    height: 100%;
    padding: 0 1.5rem;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

    &::placeholder {
      color: var(--grey_9);
    }
  }

  select {
    cursor: pointer;
    color: #6e7191;
  }

  .toggleShow {
    display: none;
  }

  &.password {
    input,
    textarea {
      width: 80%;
    }

    .toggleShow {
      display: inline;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1.5rem;
      height: 2rem;
    }
  }

  textarea {
    height: 14.4rem;
    padding: 1.5rem;
  }

  .dropdownIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.5rem;
    pointer-events: none;
  }

  .errorText {
    display: block;
    width: 100%;
    text-align: left;
    margin-top: 0.6rem;
  }
`;

export const FormGroupLabel = styled.label`
  display: block;
  color: var(--body_text);
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 0.3rem;
  text-align: left;

  sup {
    color: var(--danger);
  }
`;

const CheckboxField = styled.div``;

const handleToggleShowPassword = (id) => {
  const field = document.querySelector(`#${id}`);

  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
};

const handleCheckboxSelect = (e, id) => {
  e.preventDefault();

  const selectedElCheckbox = document.querySelector(`#${id}`);
  selectedElCheckbox.click();
};

const FormGroup = ({
  className,
  fieldStyle,
  type = "text",
  name,
  value,
  label,
  required = true,
  defaultValue,
  color,
  onChange,
  rowIndex,
  ...props
}) => {
  const [field, meta] = useField({ ...props, name });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.querySelectorAll(`input`).forEach((input) => {
      input.addEventListener("mousewheel", function (e) {
        e.target.blur();
      });
    });
    // eslint-disable-next-line
  }, []);

  if (type === "checkbox") {
    return (
      <CheckboxField className={`flex-row align-center ${className ?? ""}`}>
        <CheckBox className="checkbox" id={name} name={name} />
        <FormGroupLabel
          className="cursorPointer"
          htmlFor={name}
          onClick={(e) => handleCheckboxSelect(e, name)}
          style={{ marginBottom: 0, marginLeft: "0.5rem" }}
        >
          {label}
        </FormGroupLabel>
      </CheckboxField>
    );
  }

  return (
    <>
      <FormGroupWrapper className={className} fieldStyle={fieldStyle}>
        <div
          className={`fieldWrapper${
            meta.touched && meta.error ? " error" : ""
          }`}
        >
          {label && (
            <FormGroupLabel htmlFor={name}>
              {label}
              <sup>*</sup>
            </FormGroupLabel>
          )}
          {fieldStyle === "shortText" && (
            <>
              <input
                {...field}
                className="textSmall"
                id={name}
                type={type}
                defaultValue={defaultValue}
                onChange={(e) => {
                  onChange && onChange(rowIndex, name, e.target.value);
                  field.onChange(e);
                }}
                value={value || field.value}
                {...props}
                autoComplete="off"
              />
              {type === "password" && (
                <img
                  src={showPassword ? eyeClosed : eyeIcon}
                  alt="eye"
                  className="toggleShow cursorPointer"
                  onClick={(e) => {
                    setShowPassword((prev) => !prev);
                    handleToggleShowPassword(name);
                  }}
                />
              )}
            </>
          )}
          {fieldStyle === "longText" && (
            <>
              <textarea
                className="textSmall"
                id={name}
                name={name}
                required={required}
                defaultValue={defaultValue}
                {...field}
                {...props}
                autoComplete="off"
              />
            </>
          )}
        </div>
        {meta.touched && meta.error && (
          <span className="textDescription colorDanger errorText">
            {meta.error}
          </span>
        )}
      </FormGroupWrapper>
    </>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  fieldStyle: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  color: PropTypes.string,
  rowIndex: PropTypes.number,
};

export default FormGroup;
