import ImgWrapper from "components/global/ImgWrapper";
import Nav from "components/global/Nav";
import styled from "styled-components";
import openBox from "assets/images/open_box.svg";
import NoImage from 'assets/images/no-image.svg'
// import Star from "assets/icons/star-colored.svg";
import heartIcon from "assets/icons/heart.svg";
import BackArrowIcon from "assets/icons/back-arrow-red.svg";
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
import { base_url } from "utils/utils";
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
    /* .prompt1 {
      font-size: 14px;
      line-height: 18px;
    } */
    .back-btn {
      margin: 10px;
      padding: 5px;
    }
  }
`;

const Header = styled.div`
  padding: 10px 120px;
  background-color: #fff;
  display: flex;
  gap: 25px;
  align-items: center;

  .username{
    color: var(--primary-dark)
  }
  @media screen and (max-width: 768px) {
    padding: 10px;
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
  padding: 20px 120px;

  @media screen and (max-width: 768px) {
    padding: 48px 24px;
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
  }


  .details {
    width: 50%;
    display: flex;
    align-items: center;
    gap: 10px;

    .contents {
      width: 100%;
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
        line-height: 25px;
        width: 100%;
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

    img {
      background: #f0f0f0;
      border-radius: 4px;
      width: 85px;
      height: 80px;
    }
  }
  .btn-container {
    /* border: 1px solid blue; */
    width: 50%;
    .showInterest {
      float: right;
      border: 1px solid var(--accent_3-dark);
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 5px;

    }
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 10px 0;
    margin-bottom: 24px;

    .details {
      width: 80%;
      .contents {
        width: 80%;
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
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const showInterest = (details) => {
    setItem(details);
    setOpenShowInterestModal(true)
  };

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
          type: 'error',
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
        type: 'success',
        message: res.data.message
      }))
    } catch (e) {
      setLoading(false);
      dispatch(setAlert({
        type: 'error',
        message: e.response.data.message || "Something went wrong"
      }))
    }
  };

  // const getUser =async()=> {

  // }

  useEffect(() => {
    document.querySelector("html").scrollTo(0, 0);
    
    getWishList();
    // eslint-disable-next-line
  }, []);

  function goBack() {
    token ? navigate('/user') : navigate('/')
  }

  return (
    <Wrapper>
      <div style={{borderBottom: '1px solid #f0f0f0'}}>
        <Nav />
      </div>
      <button className="back-btn" type="button" onClick={goBack}>
        <img src={BackArrowIcon} alt="back arrow"/>
        Back to Dashboard
      </button>

      {!loading && !wishList?.items?.length && (
        <Header className="flexColumn alignCenter">
          <ImgWrapper size={16} imgHeight="100%">
            <img src={openBox} alt="user avatar" className="userImage" />
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
          <div className="flexRow justifyCenter">
            <Loader />
          </div>
          <Spacer y={4.8} />
        </>
      ) : !!wishList?.items?.length ? (
        <>
          <Header>
            <ImgWrapper size={16} imgHeight="100%">
              <img src={openBox} alt="..." className="userImage" />
            </ImgWrapper>
            <div>
              <h1>{wishList?.title}</h1>
              <Spacer y={0.4} />
              <p className="body-2 listTitle">
                {wishList.description}
              </p>
              <Spacer y={0.4} />
              <p className="body-3 subtitle">
                By <span className="username">{username}</span>
              </p>
            </div>
          </Header>
          <ListItems>
            {/* <div className="flexRow justifyEnd">
              <div className="flexRow alignCenter">
                <p className="body-3 colorTitleActive prompt1">
                  Reserve items here
                </p>
                <Spacer x={0.8} />
                <img src={arrowDowm} alt="arrow" />
              </div>
            </div> */}
            <Spacer y={2.4} />
            {wishList?.items?.map((item, index) => (
              <Banner
                key={index}
              >
                <div className="details">
                  <img src={item.avatar ? item.avatar : NoImage} alt="wish"/>
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
                    onClick={() => showInterest(item)}
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
              setOpenShowInterestModal={setOpenShowInterestModal} 
            />
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default ViewWishListItems;
