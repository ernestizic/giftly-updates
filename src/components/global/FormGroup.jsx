import PropTypes from "prop-types";
import React from "react";
import eyeClosed from "assets/icons/eye_slash.svg";
import eyeIcon from "assets/icons/eye.svg";
import styled from "styled-components";
import { useEffect } from "react";
import { useField } from "formik";
import { useState } from "react";

export const FormGroupWrapper = styled.div`
  .fieldWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    height: ${(props) => (props.fieldStyle === "longText" ? "auto" : "56px")};
    position: relative;
    background-color: ${(props) => props.bg ?? "var(--input-bg)"};

    &.error {
      border: 0.1rem solid var(--error-default);
    }
  }

  input,
  textarea,
  select {
    display: block;
    color: ${(props) => props.color ?? "#121212"};
    width: 100%;
    padding: 0 24px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;

    &::placeholder {
      color: var(--placeholder);
      font-weight: 475;
      font-size: 14px;
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
      width: calc(100% - 24px);
    }

    .toggleShow {
      display: inline;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 16px;
      height: 24px;
    }
  }

  textarea {
    height: 144px;
    padding: 16px;
  }

  .dropdownIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    pointer-events: none;
  }

  .errorText {
    display: block;
    width: 100%;
    text-align: left;
    margin-top: 6px;
    color: var(--error-default);
    font-weight: 475;
    font-size: 12px;
    line-height: 18px;
  }
`;

export const FormGroupLabel = styled.label`
  display: block;
  color: var(--label);
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  margin-top: 6px;
  margin-left: 24px;
`;

const handleToggleShowPassword = (id) => {
  const field = document.querySelector(`#${id}`);

  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
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
  ...props
}) => {
  const [field, meta] = useField({ ...props, name });
  const [showPassword, setShowPassword] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const toggleLabel = (e) => {
    if (e.target.value) {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }
  };

  useEffect(() => {
    if (defaultValue?.length || defaultValue !== undefined) {
      setShowLabel(true);
    }
    // eslint-disable-next-line
  }, [defaultValue]);

  useEffect(() => {
    document.querySelectorAll(`input`).forEach((input) => {
      input.addEventListener("mousewheel", function (e) {
        e.target.blur();
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <FormGroupWrapper className={className} fieldStyle={fieldStyle}>
        <div
          className={`fieldWrapper${
            meta.touched && meta.error ? " error" : ""
          }`}
        >
          {label && (showLabel || field.value) && (
            <FormGroupLabel htmlFor={name}>{label}</FormGroupLabel>
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
                  onChange && onChange(e);
                  toggleLabel(e);
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  toggleLabel(e);
                  field.onBlur(e);
                }}
                value={field.value}
                autoComplete="off"
                placeholder={label}
                {...props}
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
