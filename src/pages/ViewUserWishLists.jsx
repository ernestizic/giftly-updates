import ImgWrapper from "components/global/ImgWrapper";
import Nav from "components/global/Nav";
import styled from "styled-components";
import openBox from "assets/images/open_box.svg";
import Spacer from "components/global/Spacer";
import Sec2 from "components/landing/components/Sec2";
import { useNavigate } from "react-router";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "utils/utils";
import axios from "axios";
import { useEffect } from "react";
import Loader from "components/global/Loader";
import Footer from "components/global/Footer";
import { ListWrapper } from "components/user/WishListsStyles";
import WishListCard from "components/user/WishListCard";
import { Initials } from "components/user/WishListsStyles";
import Sec8 from "components/landing/components/Sec8";

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

const ViewUserWishLists = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        setData(res.data.data);
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
      dispatch(showAlert(e.response?.data.message || "Something went wrong"));
    }
  };

  const showListItems = (slug) => {
    if (!slug) return;

    navigate(`/${username}/${slug}`);
  };

  useEffect(() => {
    document.querySelector("html").scrollTo(0, 0);
    
    getUser();
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <Wrapper>
      <Nav wt />
      {!loading && !data?.wishlists?.length && (
        <Header className="flexColumn alignCenter">
          <ImgWrapper size={16} imgHeight="100%">
            <img src={openBox} alt="..." className="userImage" />
          </ImgWrapper>
          <Spacer y={0.8} />
          <h3 className="title-3 colorTitleActive textCenter listTitle">
            No items here...
          </h3>
          <Spacer y={0.4} />
          <p className="body-2 textCenter">
            When {username} creates any they'll appear here.
          </p>
          <Spacer y={4.8} />
        </Header>
      )}
      {loading ? (
        <>
          <Spacer y={4.8} />
          <div className="flexRow justifyCenter">
            <Loader />
          </div>
          <Spacer y={4.8} />
        </>
      ) : !!data?.wishlists?.length ? (
        <>
          <Header className="flexColumn alignCenter">
            {data.user.avatar ? (
              <ImgWrapper size={16} imgHeight="100%">
                <img src={data.user.avatar} alt="..." className="userImage" />
              </ImgWrapper>
            ) : (
              <Initials size={160} textSize={72}>
                <span className="text">
                  {data.user?.first_name.charAt(0)}
                  {data.user?.last_name.charAt(0)}
                </span>
              </Initials>
            )}
            <Spacer y={0.8} />
            <h3 className="title-3 colorTitleActive textCenter listTitle">
              {data.user.username}
            </h3>
            <Spacer y={0.4} />
            <p className="subtitle-2 subtitle colorTitleActive">
              {data.user.first_name} {data.user.last_name}
            </p>
          </Header>
          <Spacer y={2.4} />
          <ListWrapper>
            {data?.wishlists?.map((item, index) => (
              <WishListCard
                key={index}
                details={item}
                handleSearchNavigate={showListItems}
                fromSearch
              />
            ))}
          </ListWrapper>
          <Spacer y={7.2} />
        </>
      ) : null}
      {!token && (
        <>
          <Sec2 />
          <Sec8 />
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

export default ViewUserWishLists;
