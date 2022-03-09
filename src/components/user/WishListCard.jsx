import styled from "styled-components";
import openBox from "assets/images/open_box.svg";
import unlockedIcon from "assets/icons/unlocked.svg";
import lockedIcon from "assets/icons/locked.svg";
import moreIcon from "assets/icons/more.svg";
import CardOptions from "./CardOptions";
import { useState } from "react";
import Spacer from "components/global/Spacer";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: var(--shadow_1);
  position: relative;
  transition: all 0.2s ease-out;

  &:hover {
    transform: translateY(-12px);
  }

  .screen {
    height: 120px;
    background-color: var(--background);

    img {
      height: 100%;
    }
  }

  .title {
    display: block;

    &:hover {
      color: var(--primary-main);
    }
  }
`;

const WishListCard = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <Wrapper>
      <div className="screen flexRow justifyCenter">
        <img src={openBox} alt="Open box" />
      </div>
      <Spacer y={1.6} />
      <div className="body">
        <Link to="edit" className="body-3 colorTitleActive title textCenter">
          For Tobeezy
        </Link>
        <Spacer y={0.4} />
        <p className="label subtitle colorLabelText textCenter">3 wishes</p>
      </div>
      <Spacer y={1.6} />
      <div className="bottom flexRow alignCenter justifySpaceBetween">
        <button className="flexRow alignCenter togglePrivacy">
          <img src={unlockedIcon} alt="lock" className="icon" />
          <Spacer x={0.8} />
          <span className="body-3 text">Public</span>
        </button>
        <button
          className="flexRow alignCenter toggleOptions"
          onClick={() => setOptionsOpen((prev) => !prev)}
        >
          <img src={moreIcon} alt="lock" className="icon" />
        </button>
      </div>

      {/* Options */}
      {optionsOpen && <CardOptions setOpen={setOptionsOpen} />}
    </Wrapper>
  );
};

export default WishListCard;
