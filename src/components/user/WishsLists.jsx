import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";
import plusIcon from "assets/icons/plus_white.svg";
import heartIcon from "assets/icons/heart_primary_circle.svg";
import handPoint from "assets/images/hand_phone.svg";
import Dropdown from "components/user/Dropdown";
import { useState } from "react";
import FormGroupCustom from "components/global/FormGroupCustom";
import Spacer from "components/global/Spacer";
import Button from "components/global/Button";
import { useNavigate } from "react-router";
import WishListCard from "./WishListCard";
import { Route, Routes } from "react-router-dom";
import ShareList from "./ShareList";
import DeletePrompt from "components/wishlist/DeletePrompt";
import EditWishList from "components/user/EditWishList";
import CreateUsername from "./CreateUsername";
import CreateUserWishList from "./CreateUserWishList";
import { Search } from "./WishListsStyles";
import { SubHeader } from "./WishListsStyles";
import { Header } from "./WishListsStyles";
import { ListWrapper } from "./WishListsStyles";
import { Initials } from "./WishListsStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { base_url } from "utils/utils";
import axios from "axios";
import Loader from "components/global/Loader";
import { NoLists } from "./WishListsStyles";
import { clearTempList } from "features/wishList/wishListSlice";
import Logo from "components/global/Logo";

const Wrapper = styled.div``;

const searchCategories = ["Friends", "Wish list"];

const WishsLists = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Friends");
  const [setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const tempListId = useSelector((state) => state.wishList.tempListId);
  const dispatch = useDispatch();

  const updateTempWishList = async () => {
    if (user.username) {
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
    updateTempWishList();

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

  useEffect(() => {
    getWishLists();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Header className="flexRow alignCenter justifySpaceBetween">
        <Logo
          onClick={() =>
            document.querySelector(".sidebar").classList.add("open")
          }
        />
        <Search>
          <div className="flexRow alignCenter dropdownWrapper">
            <Dropdown
              name="category"
              value={category}
              list={searchCategories}
              setValue={setCategory}
              bg="#ffffff"
            />
            <div className="divider"></div>
          </div>
          <div className="flexRow alignCenter searchInputWrapper">
            <FormGroupCustom
              fieldStyle="shortText"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              bg="#ffffff"
            />
            <img src={searchIcon} alt="search" className="icon" />
          </div>
        </Search>
        <div>
          <Initials>
            <span className="text textCenter textUppercase">
              {user?.first_name.charAt(0)}
              {user?.last_name.charAt(0)}
            </span>
          </Initials>
        </div>
      </Header>
      <Spacer y={2.4} />
      <SubHeader className="flexRow alignCenter justifySpaceBetween">
        <div className="captionWrapper flexRow alignCenter">
          <img src={heartIcon} alt="heart" className="heartIcon" />
          <Spacer x={1.6} />
          <div>
            <h4 className="title-4 colorTitleActive title">My wish lists</h4>
            <Spacer y={0.4} />
            <p className="subtitle-3 subtitle">The things I want for myself</p>
          </div>
        </div>
        <Button
          text="Create wish list"
          className="createButton"
          iconLeft={plusIcon}
          onClick={() => {
            dispatch(clearTempList());
            navigate("new");
          }}
        />
      </SubHeader>
      <Spacer y={4.8} />
      {loading ? (
        <div className="flexRow justifyCenter">
          <Loader />
        </div>
      ) : (
        <ListWrapper>
          {data?.map((item, index) => (
            <WishListCard key={index} details={item} />
          ))}
        </ListWrapper>
      )}
      {!loading && !data.length && (
        <NoLists className="flexColumn justifyCenter">
          <img src={handPoint} alt="..." className="image" />
          <Spacer y={2.4} />
          <h3 className="title-3 colorTitleActive textCenter">
            No Wish list yet
          </h3>
          <Spacer y={0.4} />
          <p className="body-2 textCenter">
            Click on the create button to create a wish list
          </p>
        </NoLists>
      )}

      <Routes>
        <Route
          path="new"
          element={<CreateUserWishList getWishLists={getWishLists} />}
        />
        <Route
          path="edit"
          element={<EditWishList getWishLists={getWishLists} />}
        />
        <Route path="share" element={<ShareList />} />
        <Route
          path="delete"
          element={<DeletePrompt getWishLists={getWishLists} />}
        />
        <Route path="create-username" element={<CreateUsername />} />
      </Routes>
      <Spacer y={4.8} />
    </Wrapper>
  );
};

export default WishsLists;
