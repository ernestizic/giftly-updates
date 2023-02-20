import Nav from "components/global/Nav";
import styled from "styled-components";
import openBox from "assets/images/open_box.svg";
import NoImage from 'assets/images/no-image.svg'
import heartIcon from "assets/icons/heart.svg";
import Spacer from "components/global/Spacer";
import Sec2 from "components/landing/components/Sec2";
import { Route, Routes, useNavigate } from "react-router";
import ConfirmInterest from "components/result/ConfirmInterest";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ItemReserved from "components/result/ItemReserved";
import {
  setAlert
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { base_url, base_url_vendors } from "utils/utils";
import axios from "axios";
import { useEffect } from "react";
import Loader from "components/global/Loader";
import Footer from "components/global/Footer";
import Sec8 from "components/landing/components/Sec8";
import { StarIcon } from "components/global/SVG";
import ShowInterestModal from "components/result/showInterest/ShowInterestModal";

const Wrapper = styled.div`
  color: #121212;
  .back-btn {
    margin: 20px 120px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  @media screen and (max-width: 768px) {
    .back-btn {
      margin: 10px;
      padding: 5px;
    }
  }
`;

const HeaderContainer = styled.div`
  background-color: var(--title-active);
  
`

const Header = styled.div`
  padding: 48px 0;
  max-width: 610px;
  margin: auto;
  color: #fff;
  text-align: center;

  img {
    border-radius: 50%;
    margin-bottom: 16px;
  }

  .profile {
    h1{
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 45px;
    }
  }

  .username{
    color: var(--accent_1-main);
  }
  @media screen and (max-width: 768px) {
    padding: 48px 40px;
    h1{
      font-size: 18px;
    }
    .listTitle {
      font-size: 20px;
    }

    .subtitle {
      font-size: 16px;
    }

  }
`;

const ListItems = styled.div`
  padding: 0 120px 30px;

  @media screen and (max-width: 768px) {
    padding: 0 24px;
  }
`;

const Banner = styled.div`
  padding: 30px 0;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
    border: none;
  }


  .details {
    width: 50%;
    display: flex;
    gap: 16px;
    align-items: center;
    &:hover {
      cursor: pointer;
    }

    .contents {
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      .itemName {
        font-weight: 500;
        font-size: 16px;
        display: flex;
        align-items: center;
        p{
          display: inline-block;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
        }
      }
      .price{
        display: flex;
        align-items: center;
        gap: 3px;
      }
      .itemLink {
        color: var(--primary-main);
        display: inline-block;
        max-width: 100%;
        font-weight: 500;
        font-size: 16px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
      }
      .item-desc{
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .image-container {
      width: 108px;
      min-width: 108px;
      height: 108px;
      background: #f0f0f0;
      text-align: center;
      img{
          max-width: 50px;
          min-width: 50px;
          width: 50px;
          object-fit: contain;
      }
      @media screen and (max-width: 768px) {
        width: 60px;
        min-width: 60px;
        height: 60px;
          img {
          min-width: 20px;
          height: 20px;
          margin-top: 30%;
        }
      } 
    }

    img {
      border-radius: 4px;
      width: 108px;
      min-width: 108px;
      height: 108px;
      max-height: 108px;
    }
    @media screen and (max-width: 768px) {
      align-items: start;
      img {
        min-width: 60px;
        height: 60px;
      }
    }
  }
  .btn-container {
    width: 50%;
    .showInterest {
      float: right;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px;
      width: 196px;
      height: 56px;
      border-radius: 8px;
      transition: all 0.2s ease-out;
      border: 1px solid #9B9B9B;
      color: #121212;
      background: inherit;
      font-style: normal;
      font-weight: 475;
      font-size: 16px;
      line-height: 24px;
      &:hover {
        box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
        background: #F7F7FC;
      }
      &:focus {
        border: 4px solid #121212;
        box-shadow: 0px 16px 40px 5px rgba(213, 216, 223, 0.2);
      }

    }
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 10px 0;
    margin-bottom: 24px;

    .details {
      width: 80%;
      .contents {
        width: 70%;
        .itemName {
        font-size: 16px;
        line-height: 24px;
      }

      .itemLink {
        font-size: 14px;
        line-height: 18px;
      }
      }

      img {
        width: 50px;
        height: 50px;
      }
    }

    .btn-container {
      width: 20%;
      .showInterest {
        width: 52px;
        height: 52px;
        .text {
          display: none;
        }
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
  const [openShowInterestModal, setOpenShowInterestModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("")
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const showInterest = (details) => {
    setItem(details);
    setOpenShowInterestModal(true)
  };

  const confirmInterest =(details) => {
    setItem(details)
    navigate('confirm-interest');
  }

  const getDeviceId = () => {
    const navigator_info = window.navigator;
    const screen_info = window.screen;
    let uid = navigator_info.mimeTypes?.length || "";
    uid += navigator_info.userAgent.replace(/\D+/g, "");
    uid += navigator_info.plugins?.length || "";
    uid += screen_info.height || "";
    uid += screen_info.width || "";
    uid += screen_info.pixelDepth || "";

    return uid;
  };

  const getWishList = async () => {
    const device_id = getDeviceId();
    try {
      const res = await axios.get(
        `${base_url}/user/${username}/${slug}?device_id=${device_id}`
      );

      if (!res) {
        setLoading(false);
        dispatch(setAlert({
          message: "An error occurred"
        }))
        return;
      }

      if (res.data.status === "success") {
        setLoading(false);
        setWishList(res.data.data[0]);
        return;
      }
      setLoading(false);
      dispatch(setAlert({
        message: res.data.message
      }))
    } catch (e) {
      setLoading(false);
      dispatch(setAlert({
        message: e.response.data.message || "Something went wrong"
      }))
    }
  };

  useEffect(() => {
    document.querySelector("html").scrollTo(0, 0);
    
    getWishList();
    // eslint-disable-next-line
  }, []);

  (async()=> {
    const res = await axios.get(`${base_url}/user/find/${wishList?.user_id}`)
    const data = res.data
    setAvatar(data.data.avatar)
  })()

  return (
    <Wrapper>
        <Nav />

      {!loading && !wishList?.items?.length && (
        <HeaderContainer>
          <Header className="flexColumn alignCenter">
            <img src={avatar ? avatar : openBox} alt="user avatar" className="userImage" width="120px" height="120px" />
            <Spacer y={0.8} />
            <h3 className="title-3 colorWhite textCenter listTitle">
              No items here...
            </h3>
          </Header>
        </HeaderContainer>
      )}
      {loading ? (
        <>
          <Spacer y={4.8} />
          <div className="flexRow justifyCenter">
            <Loader />
          </div>
          <Spacer y={4.8} />
        </>
      ) : !!wishList?.items?.length ? (
        <>
          <HeaderContainer>
            <Header>
                <img src={avatar ? avatar : openBox} alt="..." className="userImage" width="120px" height="120px" />
              <div className="profile">
                <h1>{wishList?.title}</h1>
                <Spacer y={0.4} />
                <p className="body-2 listTitle">
                  {wishList.description}
                </p>
                <Spacer y={0.4} />
                <p className="body-3 subtitle">
                  By <span className="username">@{username}</span>
                </p>
              </div>
            </Header>
          </HeaderContainer>
          <ListItems>
            <Spacer y={2.4} />
            {wishList?.items?.map((item, index) => (
              <Banner
                key={index}
              >
                <div className="details" onClick={() => showInterest(item)}>
                  {item.avatar && (
                    <img 
                      src={`${item.avatar?.startsWith("uploads") ? base_url_vendors+'/../'+item.avatar : item.avatar}`} 
                      alt="wish" 
                    />
                  )}
                  {!item.avatar && (
                    <div className="image-container">
                      <img 
                        src={NoImage} 
                        alt="wish" 
                        className="no-img"
                      />
                    </div>
                  )}
                  <div className="contents">
                    <div className="itemName">
                      {item.priority ? <StarIcon fill="var(--primary-main)" /> : '' } 
                      <p>{item.name}</p>
                    </div>
                    <Spacer y={0.6} />
                    <div className="price">
                      {item?.price}
                      {item.quantity ? <p>x {item.quantity}</p> : ''}
                    </div>
                    <Spacer y={0.5} />
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="subtitle-5 colorBody itemLink"
                      >
                        {item.link}
                      </a>
                    )}
                    <p className="item-desc">{item.description}</p>
                  </div>
                </div>

                <div className="btn-container">
                  <button
                    type="button"
                    className="showInterest"
                    onClick={() => confirmInterest(item)}
                  >
                    <img src={heartIcon} alt="heart" />
                    <span className="text">
                      Show interest
                    </span>
                  </button>
                </div>
              </Banner>
            ))}
          </ListItems>
          
          {openShowInterestModal && <ShowInterestModal item={item} setOpenShowInterestModal={setOpenShowInterestModal} />}

        </>
      ) : null}
      {!token && (
        <>
          <Sec2 />
          <Sec8 />
        </>
      )}
      <Footer />
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
            <ItemReserved 
              link={item?.link} 
              username={username} 
              slug={slug} 
            />
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default ViewWishListItems;
