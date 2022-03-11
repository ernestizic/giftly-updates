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
import { useParams } from "react-router-dom";
import { useState } from "react";
import ItemReserved from "components/result/ItemReserved";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch } from "react-redux";
import { base_url } from "utils/utils";
import axios from "axios";
import { useEffect } from "react";
import Loader from "components/global/Loader";

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
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }

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
  const { username } = useParams();
  const { slug } = useParams();
  const [wishList, setWishList] = useState();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();

  const showInterest = (details) => {
    setItem(details);
    navigate("confirm-interest");
  };

  const getWishList = async () => {
    try {
      const res = await axios.get(`${base_url}/user/${username}/${slug}`);

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        setLoading(false);
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        setLoading(false);
        setWishList(res.data.data[0]);
        return;
      }
      setLoading(false);
      dispatch(showAlert(res.data.message));
    } catch (e) {
      setLoading(false);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response.data.message || "Something went wrong"));
    }
  };

  useEffect(() => {
    getWishList();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Nav />
      {!loading && !wishList?.items?.length && (
        <Header className="flexColumn alignCenter">
          <ImgWrapper size={16} imgHeight="100%">
            <img src={openBox} alt="..." className="userImage" />
          </ImgWrapper>
          <Spacer y={0.8} />
          <h3 className="title-3 colorWhite textCenter listTitle">
            No items here...
          </h3>
        </Header>
      )}
      {loading ? (
        <>
          <Spacer y={4.8} />
          <div className="flexRow alignCenter">
            <Loader />
          </div>
          <Spacer y={4.8} />
        </>
      ) : !!wishList?.items?.length ? (
        <>
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
            {wishList?.items?.map((item, index) => (
              <Banner
                key={index}
                className="flexRow alignCenter justifySpaceBetween"
              >
                <div className="details">
                  <p className="body-1 colorTitleActive itemName">
                    {item.name}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="subtitle-4 colorBody itemLink"
                    >
                      {item.link}
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  className="flexRow alignCenter showInterest"
                  onClick={() => showInterest(item)}
                >
                  <img src={heartIcon} alt="heart" />
                  <span className="body-3 colorPrimaryMain text">
                    Show interest
                  </span>
                </button>
              </Banner>
            ))}
          </ListItems>
        </>
      ) : null}
      <Sec2 />

      {/* Confirm interest */}
      <Routes>
        <Route
          path="confirm-interest"
          element={
            <ConfirmInterest
              itemId={item?.id}
              itemName={item?.name}
              username={username}
              slug={slug}
            />
          }
        />
        <Route
          path="item-reserved"
          element={
            <ItemReserved link={item?.link} username={username} slug={slug} />
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default ViewWishListItems;
