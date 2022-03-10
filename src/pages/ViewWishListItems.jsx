import ImgWrapper from "components/global/ImgWrapper";
import Nav from "components/global/Nav";
import styled from "styled-components";
import openBox from "assets/images/open_box.svg";
import arrowDowm from "assets/icons/arrow_down.svg";
import heartIcon from "assets/icons/heart_outline.svg";
import Spacer from "components/global/Spacer";
import Sec2 from "components/landing/components/Sec2";
import { Route, Routes, useNavigate } from "react-router";
import ConfirmInterest from "components/result/ConfirmInterest";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  @media screen and (max-width: 768px) {
    .prompt1 {
      font-size: 14px;
      line-height: 18px;
    }
  }
`;

const Header = styled.div`
  padding: 48px 120px;
  background-color: var(--title-active);

  @media screen and (max-width: 768px) {
    padding: 48px 72px;

    .listTitle {
      font-size: 24px;
      line-height: 36px;
    }

    .subtitle {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const ListItems = styled.div`
  padding: 120px;

  @media screen and (max-width: 768px) {
    padding: 48px 24px;
  }
`;

const Banner = styled.div`
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 8px;

  .showInterest {
    .text {
      margin-left: 8px;
    }
  }

  .details {
    .itemLink {
      word-wrap: break-word;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 24px;

    .details {
      max-width: calc(100% - 48px);

      .itemName {
        font-size: 16px;
        line-height: 24px;
      }

      .itemLink {
        font-size: 14px;
        line-height: 18px;
      }
    }

    .showInterest {
      .text {
        display: none;
      }
    }
  }
`;

const ViewWishListItems = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  const [wishList, setWishList] = useState({ title: "Doja’s 28th Birthday" });
  const [item, setItem] = useState();

  const showInterest = () => {
    navigate("confirm-interest");
  };

  return (
    <Wrapper>
      <Nav />
      <Header className="flexColumn alignCenter">
        <ImgWrapper size={16} imgHeight="100%">
          <img src={openBox} alt="..." className="userImage" />
        </ImgWrapper>
        <Spacer y={0.8} />
        <h3 className="title-3 colorWhite textCenter listTitle">
          {wishList?.title}
        </h3>
        <Spacer y={0.4} />
        <p className="subtitle-2 subtitle colorWhite">
          By <span className="username colorAccent1Main">{username}</span>
        </p>
      </Header>
      <ListItems>
        <div className="flexRow justifyEnd">
          <div className="flexRow alignCenter">
            <p className="body-3 colorTitleActive prompt1">
              Reserve items here
            </p>
            <Spacer x={0.8} />
            <img src={arrowDowm} alt="arrow" />
          </div>
        </div>
        <Spacer y={2.4} />
        <Banner className="flexRow alignCenter justifySpaceBetween">
          <div className="details">
            <p className="body-1 colorTitleActive itemName">Gucci Bag</p>
            <a
              href="https://www.chic.ae/product/croco-textured-jewel-slingbag/"
              target="_blank"
              rel="noopener noreferrer"
              className="subtitle-4 colorBody itemLink"
            >
              https://www.chic.ae/product/croco-textured-jewel-slingbag/
            </a>
          </div>
          <button
            type="button"
            className="flexRow alignCenter showInterest"
            onClick={showInterest}
          >
            <img src={heartIcon} alt="heart" />
            <span className="body-3 colorPrimaryMain text">Show interest</span>
          </button>
        </Banner>
      </ListItems>
      <Sec2 />

      {/* Confirm interest */}
      <Routes>
        <Route
          path="confirm-interest"
          element={
            <ConfirmInterest
              basePath={pathname}
              itemId={item?.id}
              itemName={item?.name}
              username={username}
            />
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default ViewWishListItems;
