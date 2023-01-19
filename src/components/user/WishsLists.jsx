import { Navigate, useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/global/Button";
import CreateUserWishList from "./CreateUserWishList";
import CreateUsername from "./CreateUsername";
import DeletePrompt from "components/wishlist/DeletePrompt";
import EditWishList from "components/user/EditWishList";
import GiftSuggestions from "./GiftSuggestions";
import Interests from "./Interests";
import { ListWrapper } from "./WishListsStyles";
import Loader from "components/global/Loader";
import { NoLists } from "./WishListsStyles";
import Profile from "./Profile";
import ShareList from "./ShareList";
import Spacer from "components/global/Spacer";
import WishListCard from "./WishListCard";
import axios from "axios";
import { base_url } from "utils/utils";
import { clearTempList } from "features/wishList/wishListSlice";
import ThinkingGirlImg from "assets/images/thinking-girl.svg";
import plusIcon from "assets/icons/plus_white.svg";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const Wrapper = styled.div``;

const WishsLists = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const tempListId = useSelector((state) => state.wishList.tempListId);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const updateTempWishList = async () => {
    if (!tempListId) {
      return;
    }

    const res = await axios.patch(
      `${base_url}/wishlist/${tempListId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.status === "success") {
      dispatch(clearTempList());
    }
  };

  const getWishLists = async () => {
    try {
      const res = await axios.get(`${base_url}/wishlist`, {
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
        setData(res.data.data.data);
        return res;
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

  useEffect(() => {
    updateTempWishList();
    getWishLists();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Spacer y={6.8} />
      {loading ? (
        <div className="flexRow justifyCenter">
          <Loader />
        </div>
      ) : !!data.length ? (
        <ListWrapper>
          {data?.map((item, index) => (
            <WishListCard key={index} details={item} />
          ))}
          {/* {data
            ?.filter((item) =>
              category === searchCategories[1] && search
                ? item.title.toLowerCase().match(search.toLowerCase())
                : true
            )
            .map((item, index) => (
              <WishListCard key={index} details={item} />
            ))} */}
        </ListWrapper>
      ) : null}
      {!loading && !data.length && (
        <NoLists>
          <img src={ThinkingGirlImg} alt='Girl thinking' width='90%' height='auto' />
          <h2>We've never met a list we didn't like</h2>
          <Spacer y={0.5} />
          <p>
            Your first list doesn't need to be perfect. Just put it out there and
            see if it helps receive the best gifts from your friends.
          </p>
          <Spacer y={2.5} />
          <Button
            text="Create wish list"
            className="createButton"
            iconLeft={plusIcon}
            onClick={() => {
              dispatch(clearTempList());
              navigate("new");
            }}
            />
        </NoLists>
      )}

      <Routes>
        <Route
          path="new"
          element={!user?.username ? <Navigate to="/user/wish-lists/create-username" /> : <CreateUserWishList getWishLists={getWishLists} />}
        />
        <Route
          path="edit"
          element={<EditWishList getWishLists={getWishLists} />}
        />
        <Route
          path="gift-suggestions"
          element={<GiftSuggestions />}
        />
        <Route path="share" element={<ShareList />} />
        <Route
          path="delete"
          element={<DeletePrompt getWishLists={getWishLists} />}
        />
        <Route
          path="create-username"
          element={ !user?.username ? <CreateUsername getWishLists={getWishLists} /> : <Navigate to='/user/wish-lists' />}
        />
        <Route
          path="select-interests"
          element={!user?.interests ? <Interests /> : <Navigate to='/user/wish-lists' />}
        />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Spacer y={4.8} />
    </Wrapper>
  );
};

export default WishsLists;
