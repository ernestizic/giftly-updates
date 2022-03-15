import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import eyeIcon from "assets/icons/eye.svg";
import eyeClosed from "assets/icons/eye_slash.svg";
import { useState, useEffect } from "react";

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
      border: 1px solid var(--error-default);
    }
  }

  input,
  textarea,
  select {
    display: block;
    color: ${(props) => props.color ?? "var(--title-active)"};
    width: 100%;
    padding: 0 24px;
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
    color: var(--error-default);
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

const FormGroupCustom = ({
  className,
  fieldStyle,
  type = "text",
  name,
  value,
  label,
  required = true,
  defaultValue,
  color,
  bg,
  onChange,
  rowIndex,
  ...props
}) => {
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
    if (defaultValue?.length) {
      setShowLabel(true);
    }
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
      <FormGroupWrapper
        className={className}
        fieldStyle={fieldStyle}
        bg={bg}
        color={color}
      >
        <div className={`fieldWrapper`}>
          {label && showLabel && (
            <FormGroupLabel htmlFor={name}>{label}</FormGroupLabel>
          )}
          {fieldStyle === "shortText" && (
            <>
              <input
                {...props}
                className="textSmall"
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                onChange={(e) => {
                  onChange && onChange(e);
                  toggleLabel(e);
                }}
                onBlur={(e) => {
                  toggleLabel(e);
                }}
                value={value}
                autoComplete="off"
                placeholder={label}
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
                {...props}
                autoComplete="off"
              />
            </>
          )}
        </div>
      </FormGroupWrapper>
    </>
  );
};

FormGroupCustom.propTypes = {
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

export default FormGroupCustom;
