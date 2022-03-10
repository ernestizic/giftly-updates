import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "./Loader";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  height: ${(props) => props.height || "4.8rem"};
  width: ${(props) => props.width ?? "max-content"};
  background-color: ${(props) => props.bg || " var(--primary-main)"};
  color: ${(props) => props.color || "#ffffff"};
  font-family: var(--font_1-regular);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0rem;
  text-align: center;
  transition: all 0.2s ease-out;
  flex-shrink: 0;

  .icon {
    height: 2rem;

    &.left {
      margin-right: 0.8rem;
    }

    &.right {
      margin-left: 0.8rem;
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
    height: 6.4rem;
    width: ${(props) => props.width ?? "20.0rem"};
    font-size: 1.8rem;
    line-height: 2.8rem;
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

  if (loading) {
    return (
      <Wrapper {...styleProps}>
        <Loader />
      </Wrapper>
    );
  }

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
  loading: PropTypes.bool,
};

export default Button;
