import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";
import closeIcon from "assets/icons/close_square.svg";
import Dropdown from "components/user/Dropdown";
import FormGroupCustom from "components/global/FormGroupCustom";
import Spacer from "components/global/Spacer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderWrapper, Search } from "./WishListsStyles";
import { Initials } from "./WishListsStyles";
import Loader from "components/global/Loader";
import Logo from "components/global/Logo";
import ImgWrapper from "components/global/ImgWrapper";
import useSearch from "hooks/useSearch";
import { useDispatch } from "react-redux";
import { useState } from "react";
import plusIcon from "assets/icons/plus_white.svg";
import MenuIcon from "assets/icons/menu-icon.svg";
import CloseIcon from "assets/icons/close-square.svg";
import { clearTempList } from "features/wishList/wishListSlice";
import { useEffect } from "react";

const Wrapper = styled(HeaderWrapper)``;

const searchCategories = ["Friends"];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("Friends");
  const [showNavigation, setShowNavigation] = useState(false)
  const {
    search,
    setSearch,
    friends,
    findFriends,
    finding,
    showMobileSearch,
    hideMobileSearch,
  } = useSearch();
  const location = useLocation()

  useEffect(()=> {
    setShowNavigation(false)
  }, [location])

  return (
    <Wrapper className="flexRow alignCenter justifySpaceBetween">
      <Logo className='logo' />
      <h3 className='subtitle-2'>My Wish lists</h3>

      <div className='header-action-container'>
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
        
        <button
          className="add-btn"
          type='button'
          onClick={() => {
            dispatch(clearTempList());
            navigate("wish-lists/new");
          }}
        > 
          <img src={plusIcon} alt='plus icon'/>
          Create Wishlist
        </button>
        
        <button
          type="button"
          className="searchTrigger"
          onClick={showMobileSearch}
        >
          <img src={searchIcon} alt="search" className="icon" />
        </button>
        
        {showNavigation ? (
          <button
            type="button"
            className="menu-icon"
            onClick={() => {
              setShowNavigation((prev)=> !prev )
              document.querySelector(".sidebar").classList.remove("open")
            }}
          >
            <img src={CloseIcon} alt="close" className="icon" />
          </button>
        ) : (
          <button
            type="button"
            className="menu-icon"
            onClick={() => {
              setShowNavigation((prev)=> !prev )
              document.querySelector(".sidebar").classList.add("open")
            }}
          >
            <img src={MenuIcon} alt="menu" className="icon" />
          </button>
        )}

      </div>
    </Wrapper>
  );
};

export default Header;
