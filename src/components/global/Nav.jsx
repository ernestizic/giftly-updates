import React, { useCallback, useState } from "react";
import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";
import closeIcon from "assets/icons/close_square.svg";
import Logo from "./Logo";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "./Spacer";
import { Search } from "components/user/WishListsStyles";
import axios from "axios";
import { base_url, debounce } from "utils/utils";
import FormGroupCustom from "./FormGroupCustom";
import Loader from "./Loader";
import ImgWrapper from "./ImgWrapper";
import { Initials } from "components/user/WishListsStyles";
import { useSelector } from "react-redux";

const Wrapper = styled.nav`
  height: 9.6rem;
  padding: 0 12rem;
  // max-width: 1440px;
  margin: auto;
  background-color: ${(props) =>
    props.wt ? "white" : " var(--title-active);"};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  form {
    width: 32rem;
    position: relative;
    height: 4.8rem;
    margin-left: 4.8rem;
    margin-right: auto;
    display: block;

    @media (max-width: 768px) {
      /* width: auto */
      .input {
        display: none;
      }

      .mb {
        display: block;
      }
    }

    & > div > div {
      padding-left: 3.667rem;
      @media (max-width: 768px) {
        padding: 0;
      }
    }
  }
  .search {
    position: absolute;
    z-index: 6;
    left: 2.4rem;
    top: 1.6rem;
    @media (max-width: 768px) {
      position: sticky;
      top: 4.1rem;
      left: 23%;
      filter: var(--filter-white);
    }
  }
  & > button:last-child {
    margin-left: 2.4rem;
  }

  .searchTrigger {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .searchTrigger {
      display: block;
      margin-left: 48px;

      .icon {
        filter: var(--filter-white);
      }
    }
  }
`;

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
    background-color: var(--off-white);
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

const Nav = ({ wt }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [finding, setFinding] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleFind = async (e) => {
    const q = e.target.value;

    setSearch(q);

    if (!q) return;

    try {
      setFinding(true);
      const res = await axios.get(`${base_url}/user/search?q=${q}`);

      if (res.data.status === "success") {
        setFriends(res.data.data);
      }

      setFinding(false);
    } catch (e) {
      setFinding(false);
      console.log(e);
    }
  };

  // eslint-disable-next-line
  const findFriends = useCallback(debounce(handleFind, 500), []);

  const showMobileSearch = () => {
    document.querySelector(".searchBox").classList.add("open");
  };

  const hideMobileSearch = () => {
    document.querySelector(".searchBox").classList.remove("open");
    setSearch("");
  };

  return (
    <Wrapper wt={wt}>
      <div className="flexRow alignCenter">
        <Logo onClick={() => navigate("/home")} />
        <button
          type="button"
          className="searchTrigger"
          onClick={showMobileSearch}
        >
          <img src={searchIcon} alt="search" className="icon" />
        </button>
        <SearchBox className="searchBox">
          <div className="backdrop"></div>
          <div className="flexRow alignCenter searchInputWrapper" wt={wt}>
            <img src={searchIcon} alt="search" className="icon" />
            <FormGroupCustom
              fieldStyle="shortText"
              name="search"
              label="Find friends"
              onChange={findFriends}
              bg="var(--off-white)"
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
      </div>
      {token ? (
        <div className="flexRow alignCenter">
          <Link to="/user/wish-lists" className="body-3 colorWhite">
            Back to account
          </Link>
        </div>
      ) : (
        <div className="flexRow alignCenter">
          <Button
            className="inverted"
            text="Login"
            onClick={() => navigate("/home/login")}
          />
          <Spacer x={2.4} xMobile={1.6} />
          <Button text="Sign up" onClick={() => navigate("/home/sign-up")} />
        </div>
      )}
      {/* {!token && (
        <div className="flexRow alignCenter">
        <Button
          bg="var(--accent_2-main)"
          color="var(--primary-main)"
          text="Login"
          onClick={() => navigate("/home/login")}
        />
        <Spacer x={2.4} xMobile={1.6} />
        <Button text="Sign up" onClick={() => navigate("/home/sign-up")} />
      </div>
      )} */}
    </Wrapper>
  );
};

export default Nav;
