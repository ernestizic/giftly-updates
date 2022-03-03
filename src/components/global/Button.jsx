import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 48px;
  width: ${(props) => props.width ?? "120px"};
  background-color: var(--primary-main);
  color: #ffffff;
  font-family: var(--font_1-regular);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  transition: all 0.2s ease-out;

  .icon {
    height: 20px;

    &.left {
      margin-right: 8px;
    }

    &.right {
      margin-left: 8px;
    }
  }

  &:hover {
    background-color: var(--primary-dark);
  }

  &.secondary {
    background-color: var(--primary-light);
    color: var(--primary-main);

    &:hover {
      background-color: var(--primary-light);
    }
  }

  &.large {
    height: 64px;
    width: ${(props) => props.width ?? "200px"};
    font-size: 18px;
    line-height: 28px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &.noBorder {
    border: none;
    color: var(--primary-main);
    background-color: transparent;

    &.white {
      color: #ffffff;
    }
  }

  &.inverted {
    background-color: #ffffff;
    color: var(--primary-main);

    &:hover {
      background-color: var(--primary-light);
    }
  }
`;

const Button = ({
  className,
  bg,
  type = "button",
  height,
  fullWidth,
  width,
  text,
  disabled,
  color,
  iconLeft,
  iconRight,
  as,
  href,
  onClick,
  loading,
}) => {
  const styleProps = {
    className,
    bg,
    type,
    height,
    fullWidth,
    width,
    text,
    disabled,
    color,
    as,
    href,
    onClick,
  };
  return (
    <Wrapper {...styleProps}>
      {iconLeft && <img src={iconLeft} alt="icon" className="icon left" />}
      <span>{text}</span>
      {iconRight && <img src={iconRight} alt="icon" className="icon right" />}
    </Wrapper>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  bg: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  endIcon: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
