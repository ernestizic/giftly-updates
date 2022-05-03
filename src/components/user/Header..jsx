import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";
import closeIcon from "assets/icons/close_square.svg";
import Dropdown from "components/user/Dropdown";
import FormGroupCustom from "components/global/FormGroupCustom";
import Spacer from "components/global/Spacer";
import { Link } from "react-router-dom";
import { HeaderWrapper, Search } from "./WishListsStyles";
import { Initials } from "./WishListsStyles";
import Loader from "components/global/Loader";
import Logo from "components/global/Logo";
import ImgWrapper from "components/global/ImgWrapper";
import useSearch from "hooks/useSearch";
import { useSelector } from "react-redux";
import { useState } from "react";

const Wrapper = styled(HeaderWrapper)``;

const searchCategories = ["Friends", "Wish list"];

const Header = () => {
  const [category, setCategory] = useState("Friends");
  const {
    search,
    setSearch,
    friends,
    findFriends,
    finding,
    showMobileSearch,
    hideMobileSearch,
  } = useSearch();
  const user = useSelector((state) => state.auth.user);

  return (
    <Wrapper className="flexRow alignCenter justifySpaceBetween">
      <Logo
        onClick={() => document.querySelector(".sidebar").classList.add("open")}
      />
      <Search className="searchBox">
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
            onChange={(e) => {
              if (category === searchCategories[1]) {
                setSearch(e.target.value);
                return;
              }
              findFriends(e);
            }}
            bg="#ffffff"
          />
          <img
            src={search ? closeIcon : searchIcon}
            alt="search"
            className="icon lg"
            onClick={() => {
              document.querySelector(`input[name=search]`).value = "";
              setSearch("");
            }}
          />
          <img
            src={closeIcon}
            alt="search"
            className="icon mb"
            onClick={() => {
              hideMobileSearch();
            }}
          />
          {search && category === searchCategories[0] && (
            <div className="searchResults">
              {finding ? (
                <div className="flexColumn alignCenter">
                  <Spacer y={2.4} />
                  <Loader />
                  <Spacer y={2.4} />
                </div>
              ) : (
                <>
                  {friends?.map((item, index) => (
                    <Link
                      key={index}
                      to={`/${item.username}`}
                      className="flexRow alignCenter item colorTitleActive"
                    >
                      {item.avatar ? (
                        <ImgWrapper size={4} imgHeight="100%">
                          <img src={item.avatar} alt="." />
                        </ImgWrapper>
                      ) : (
                        <Initials size="40" textSize="18" bg="#032250">
                          {item.username.charAt(0)}
                          {item.username.charAt(1)}
                        </Initials>
                      )}
                      <Spacer x={1.6} />
                      <span className="subtitle-4 text">{item.username}</span>
                    </Link>
                  ))}
                </>
              )}
              {!finding && !friends.length && (
                <div className="notFound colorTitleActive">
                  <h4 className="title-4">Oops!</h4>
                  <Spacer y={0.4} />
                  <p className="subtitle-4 subtitle">
                    Nothing found for {search}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Search>
      <div className="flexRow alignCenter">
        <button
          type="button"
          className="searchTrigger"
          onClick={showMobileSearch}
        >
          <img src={searchIcon} alt="search" className="icon" />
        </button>
        <Spacer x={2.4} />
        <Link as={Link} to="/user/wish-lists/profile">
          {user?.avatar ? (
            <ImgWrapper size={4} imgHeight="100%">
              <img src={user.avatar} alt="." />
            </ImgWrapper>
          ) : (
            <Initials>
              <span className="text textCenter textUppercase">
                {user?.first_name.charAt(0)}
                {user?.last_name.charAt(0)}
              </span>
            </Initials>
          )}
        </Link>
      </div>
    </Wrapper>
  );
};

export default Header;
