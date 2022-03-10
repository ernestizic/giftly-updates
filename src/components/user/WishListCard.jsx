import styled from "styled-components";
import openBox from "assets/images/open_box.svg";
import unlockedIcon from "assets/icons/unlocked.svg";
import lockedIcon from "assets/icons/locked.svg";
import moreIcon from "assets/icons/more.svg";
import CardOptions from "./CardOptions";
import { useState } from "react";
import Spacer from "components/global/Spacer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setTempList,
  setTempListId,
  setTempListName,
  setTempListVisibility,
} from "features/wishList/wishListSlice";

const Wrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: var(--shadow_1);
  position: relative;
  transition: all 0.2s ease-out;

  &:hover {
    transform: translateY(-8px);
  }

  .screen {
    height: 120px;
    background-color: var(--background);

    img {
      height: 100%;
    }
  }

  .title {
    width: 100%;

    &:hover {
      color: var(--primary-main);
    }
  }

  @media screen and (max-width: 768px) {
    position: unset;
    margin: auto;
    width: 240px;
  }
`;

const WishListCard = ({ details }) => {
  const navigate = useNavigate();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    if (!details) return;

    dispatch(setTempListId(details.id));
    dispatch(setTempListName(details.title));
    dispatch(setTempList(details.items));
    dispatch(setTempListVisibility(details.visibility));

    navigate("edit");
  };

  return (
    <Wrapper>
      <div className="screen flexRow justifyCenter" onClick={handleOpen}>
        <img src={openBox} alt="Open box" />
      </div>
      <Spacer y={1.6} />
      <div className="body" onClick={handleOpen}>
        <button className="body-3 colorTitleActive title textCenter flexRow justifyCenter">
          {details.title}
        </button>
        <Spacer y={0.4} />
        <p className="label subtitle colorLabelText textCenter">
          {details?.items.length} wish{details?.items.length > 1 ? "es" : ""}
        </p>
      </div>
      <Spacer y={1.6} />
      <div className="bottom flexRow alignCenter justifySpaceBetween">
        <button
          className="flexRow alignCenter togglePrivacy"
          id="togglePrivacy"
        >
          {details?.visibility === "public" && (
            <img src={unlockedIcon} alt="lock" className="icon" />
          )}
          {details?.visibility === "private" && (
            <img src={lockedIcon} alt="lock" className="icon" />
          )}
          <Spacer x={0.8} />
          <span className="body-3 text textCapitalize">
            {details?.visibility}
          </span>
        </button>
        <button
          id="toggleOptions"
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
