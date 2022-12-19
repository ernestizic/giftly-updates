import {
  setTempList,
  setTempListId,
  setTempListName,
  setTempListSlug,
  setTempListVisibility,
} from "features/wishList/wishListSlice";

import CardOptions from "./CardOptions";
import { GiftBoxIcon } from "components/global/SVG";
import Spacer from "components/global/Spacer";
import lockedIcon from "assets/icons/locked.svg";
import moreIcon from "assets/icons/more.svg";
import openBox from "assets/images/open_box.svg";
import styled from "styled-components";
import unlockedIcon from "assets/icons/unlocked.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow_1);
  transition: all 0.2s ease-out;

  &:hover {
    transform: scale(1.05);
  }

  .screen {
    cursor: pointer;
  }

  .body {
    cursor: pointer;
  }

  .title {
    &:hover {
      color: var(--primary-main);
    }
  }

  @media screen and (max-width: 768px) {
    position: unset;
    margin: auto;
  }
`;

const WishListCard = ({
  details,
  fromSearch,
  handleSearchNavigate = () => null,
}) => {
  const navigate = useNavigate();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    if (!details) return;

    dispatch(setTempListId(details.id));
    dispatch(setTempListName(details.title));
    dispatch(setTempListSlug(details.slug));
    dispatch(setTempList(details.items));
    dispatch(setTempListVisibility(details.visibility));

    navigate("edit");
  };

  return (
    <Container>
      <Wrapper
        onClick={(e) => {
          if (fromSearch) {
            e.stopPropagation();
            return;
          }
          dispatch(setTempListSlug(details.slug));
          dispatch(setTempListId(details.id));
        }}
      >
        <div
          className="screen"
          onClick={
            fromSearch ? () => handleSearchNavigate(details.slug) : handleOpen
          }
        >
          <GiftBoxIcon />
        </div>
        <Spacer y={2.4} yMobile={1.6} />
        <div
          className="body"
          onClick={
            fromSearch ? () => handleSearchNavigate(details.slug) : handleOpen
          }
        >
          <button className="body-3 colorTitleActive title textLeft bold">
            {details.title}
          </button>
          <Spacer y={0.4} />
          <p className="label subtitle colorLabelText">
            {details?.items.length} wish{details?.items.length > 1 ? "es" : ""}
          </p>
        </div>
        {!fromSearch && (
          <>
            <Spacer y={4.8} yMobile={2.4} />
            <div className="bottom flexRow alignCenter justifySpaceBetween">
              <div
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
                <span className="body-3 text textCapitalize colorTitleActive">
                  {details?.visibility}
                </span>
              </div>
              <button
                id="toggleOptions"
                className="flexRow alignCenter toggleOptions"
                onClick={() => setOptionsOpen((prev) => !prev)}
              >
                <img src={moreIcon} alt="lock" className="icon" />
              </button>
            </div>
          </>
        )}
      </Wrapper>
      {/* Options */}
      {optionsOpen && (
        <CardOptions setOpen={setOptionsOpen} slug={details.slug} />
      )}
    </Container>
  );
};

export default WishListCard;
