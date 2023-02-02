import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";
import closeIcon from "assets/icons/close_square.svg";
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
import SearchGifts from "components/giftIdeas/searchGifts/SearchGifts";
import Button from "components/global/Button";

const Wrapper = styled(HeaderWrapper)``;

const SearchBox = styled(Search)`
  display: flex;
  align-items: center;
  margin-left: 48px;
  padding: 0;
  width: 320px;
  position: relative;
  overflow: visible;
  height: auto;

  .searchInputWrapper {
    width: 100%;
    grid-template-columns: 24px auto 24px;
    align-items: center;
    background-color: var(--input-bg);
    z-index: 5;
    padding: 0 24px;
    height: 48px;
    border-radius: 4px;
  }

  .fieldWrapper {
    padding: 0 8px;

    input {
      padding: 0;
    }

    label {
      margin: 0;
    }
  }

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000050;
    z-index: 2;
    display: none;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    margin-left: 0;
    width: calc(100vw - 48px);

    &::before {
      display: block;
    }
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const pathname = location.pathname.split("/")[2]
  const removeChar = pathname.replace("-", " ")

  return (
    <Wrapper className="flexRow alignCenter justifySpaceBetween">
      <Logo className='logo' />
      <h3 className='subtitle-2' style={{textTransform: "capitalize"}}>{removeChar}</h3>

      <div className='header-action-container'>
        {location.pathname.includes('/gift-ideas') ? (
          <SearchGifts />
        ) : (
          <SearchBox className="searchBox">
          <div className="backdrop"></div>
          <div className="flexRow alignCenter searchInputWrapper">
            <img src={searchIcon} alt="search" className="icon" />
            <FormGroupCustom
              fieldStyle="shortText"
              name="search"
              label="Find friends"
              onChange={findFriends}
              bg="var(--input-bg)"
              noLabel
            />

            <img
              src={closeIcon}
              alt="search"
              className="icon mb"
              onClick={() => {
                hideMobileSearch();
              }}
            />

            {search && (
              <img
                src={closeIcon}
                alt="search"
                className="icon lg"
                onClick={() => {
                  document.querySelector(`input[name=search]`).value = "";
                  setSearch("");
                }}
              />
            )}
          </div>
          {search && (
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
                      onClick={() => setSearch("")}
                    >
                      {item.avatar ? (
                        <ImgWrapper size={4} imgHeight="100%">
                          <img src={item.avatar} alt="." />
                        </ImgWrapper>
                      ) : (
                        <Initials size="40" textSize="18" bg="#032250">
                          {item?.first_name.charAt(0)}
                          {item?.last_name.charAt(0)}
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
        </SearchBox>
        )}
        
        <Button
          width="170px"
          text="Create Wishlist"
          className="add-btn"
          iconLeft={plusIcon}
          onClick={() => {
            dispatch(clearTempList());
            navigate("wish-lists/new");
          }}
        />
        
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
