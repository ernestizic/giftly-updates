import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import doneIconWhite from "assets/icons/doneIconWhite.svg";

const Wrapper = styled.div`
  label {
    margin-left: 1.2rem;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 1.8rem;
  width: 1.8rem;
  border: 1px solid
    ${(props) => (props.checked ? "var(--primary-main)" : "var(--line)")};
  border-radius: ${(props) => (props.circle ? "100%" : "4px")};
  background-color: ${(props) =>
    props.checked ? "var(--primary-main)" : "transparent"};
  cursor: pointer;

  input {
    display: none;
  }

  .checkedIcon {
    height: 100%;
    pointer-events: none;
  }
`;

const handleClick = (e, id) => {
  e.stopPropagation();
  const checkboxInput = document.querySelector(`input[type="checkbox"]#${id}`);

  checkboxInput.click();
};

const CheckBox = ({
  id,
  className,
  name,
  grey,
  circle,
  label,
  value,
  isChecked,
  required = false,
  disabled,
  onChange,
}) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <Wrapper className="flexRow alignCenter">
      <Box
        grey={grey}
        circle={circle}
        checked={checked}
        onClick={(e) => handleClick(e, id)}
        className={className}
      >
        <input
          type="checkbox"
          name={name}
          id={`${id}`}
          data-id={id}
          data-name={name}
          checked={checked}
          value={value}
          onChange={(e) => {
            setChecked(!checked);
            onChange && onChange(e);
          }}
          required={required}
          disabled={disabled}
        />
        <img src={doneIconWhite} alt="check" className="checkedIcon" />
      </Box>
      {label && (
        <label htmlFor={`${id}`} className="subtitle-5">
          {label}
        </label>
      )}
    </Wrapper>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  grey: PropTypes.bool,
  circle: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckBox;
