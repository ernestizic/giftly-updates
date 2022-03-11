import styled, { keyframes } from "styled-components";
import { useClickOutside } from "webrix/hooks";
import shareIcon from "assets/icons/share.svg";
import trashIcon from "assets/icons/trash_danger.svg";
import Spacer from "components/global/Spacer";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from {
    top: 90%;
    pointer-events: none;
    opacity: 0;
  }

  to {
    top: 100%;
    pointer-events: all;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 90%;
  right: 0;
  pointer-events: none;
  opacity: 0;
  box-shadow: var(--shadow_2);
  width: 164px;
  border-radius: 8px;
  background-color: #ffffff;
  animation: ${fadeIn} 0.2s ease forwards;
  z-index: 2;

  .item {
    padding: 16px;

    &.delete {
      background-color: var(--off-white);
    }
  }
`;

const CardOptions = ({ setOpen }) => {
  const navigate = useNavigate();
  const handleOnMouseDownCapture = useClickOutside(() => {
    setOpen(false);
  });

  return (
    <Wrapper onMouseDownCapture={handleOnMouseDownCapture}>
      <button
        className="flexRow alignCenter item"
        onClick={() => navigate("share")}
      >
        <img src={shareIcon} alt="share" className="icon" />
        <Spacer x={0.8} />
        <span className="body-3 text colorTitleActive">Share wish list</span>
      </button>
      <button
        className="flexRow alignCenter item delete"
        onClick={() => navigate("delete")}
      >
        <img src={trashIcon} alt="trash" className="icon" />
        <Spacer x={0.8} />
        <span className="body-3 text colorErrorDefault">Delete wish list</span>
      </button>
    </Wrapper>
  );
};

export default CardOptions;
