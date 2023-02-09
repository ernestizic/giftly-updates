import PropTypes from "prop-types";
import chevronDown from "assets/icons/chevron_down.svg";
import styled from "styled-components";

export const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;

  .selectInput {
    display: block;
    color: ${(props) => props.color ?? "var(--label-text)"};
    width: calc(100% - 24px);
    padding: 0 24px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    pointer-events: none;

    &::placeholder {
      color: var(--placeholder);
    }
  }

  .inputWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    height: ${(props) => (props.fieldStyle === "longText" ? "auto" : "56px")};
    position: relative;
    background-color: ${(props) => props.bg ?? "var(--input-bg)"};
    cursor: pointer;

    &.error {
      border: 1px solid var(--error-default);
    }
  }

  .toggleIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    pointer-events: none;
    transition: all 0.2s ease-out;
  }

  .list {
    width: 100%;
    max-height: 30vh;
    overflow: auto;
    position: absolute;
    top: 4.8rem;
    left: 0;
    // padding: 2.4rem 0;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: var(--shadow_1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease-out;
    z-index: 5;
  }

  .listItem {
    display: block;
    width: 100%;
    height: 48px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    color: var(--grey_1);

    &:hover {
      background-color: var(--input-bg);
    }
  }

  &.isOpen {
    .toggleIcon {
      transform: translateY(-50%) rotateZ(180deg);
    }

    .list {
      top: 56px;
      opacity: 1;
      pointer-events: all;
    }
  }

  &.hasIcon {
    .header {
      justify-content: flex-start;

      .title {
        margin-left: 0.8rem;
      }
    }
  }

  .iconLeft {
    margin-right: 0.8rem;
  }

  label {
    display: block;
    color: var(--label);
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    margin-top: 6px;
    margin-left: 24px;
  }

  .errorText {
    display: block;
    width: 100%;
    text-align: left;
    margin-top: 0.6rem;
    color: var(--error-default);
  }

  @media screen and (min-width: 768px) {
    .list {
      max-height: 60vh;
    }
  }
`;

const Dropdown = ({
  className,
  name,
  value,
  setValue,
  type,
  label,
  placeholder,
  bg,
  list,
  readOnly,
  onChange = () => {},
}) => {
  const toggleList = (open) => {
    if (readOnly) return;

    open
      ? document.querySelector(`#${name}`).classList.add("isOpen")
      : document.querySelector(`#${name}`).classList.remove("isOpen");
  };

  const handleSelect = (e, l) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(l);
    toggleList(false);
  };

  return (
    <DropdownWrapper
      id={name}
      className={`dWrapper flexRow alignCenter ${className ?? ""}`}
      bg={bg}
    >
      <div
        className="inputWrapper"
        onClick={() =>
          document.querySelector(`#${name}`).classList.toggle("isOpen")
        }
      >
        <input
          type={type || "text"}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
          className="selectInput"
          readOnly
        />
        <img src={chevronDown} alt="down" className="toggleIcon" />
      </div>
      <div className="list">
        {!!list?.length &&
          list.map((item) => (
            <button
              key={item}
              className="listItem label"
              onClick={(e) => handleSelect(e, item.toString())}
            >
              {item}
            </button>
          ))}
      </div>
    </DropdownWrapper>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  list: PropTypes.array,
  hasIcon: PropTypes.bool,
  icon: PropTypes.any,
  readOnly: PropTypes.bool,
};

export default Dropdown;
