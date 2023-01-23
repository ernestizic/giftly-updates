import React from 'react';
import { setToken, setUser } from "features/auth/authSlice";
import { NavLink } from "react-router-dom";
import Spacer from "components/global/Spacer";
import cupIcon from "assets/icons/cup.svg";
import discoverIcon from "assets/icons/discover.svg";
import ArchiveIcon from "assets/icons/archive-icon.svg";
import giftIcon from "assets/icons/gift.svg";
import logo from "assets/images/logo.svg";
import logoutIcon from "assets/icons/logout.svg";
import styled from "styled-components";
import supportIcon from "assets/icons/message-icon.svg";
import UserIcon from "assets/icons/user-icon.svg";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  padding: 2.4rem;
  min-height: 100vh;
  width: 100%;
  background-color: var(--title-active);

  .brand {
    height: 48px;

    img {
      height: 100%;
    }
  }

  .toggle,
  .backDrop {
    display: none;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: -100vh;
    min-height: 50vh;
    transition: all 0.2s ease-out;
    z-index: 5;

    &.open {
      bottom: 0;

      .backDrop {
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
      }
    }

    .brand {
      display: none;
    }

    .toggle {
      display: block;
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      height: 5px;
      background-color: var(--background);
      border-radius: 3px;
      width: 120px;
    }
  }
`;

const Menu = styled.ul`
  overflow: auto;
  max-height: 75vh;
  .item {
    white-space: nowrap;
    border-radius: 8px;
    color: var(--line);
    margin-bottom: 20px;
    padding: 12px;
    transition: all 0.2s ease-out;

    .text {
      margin-left: 8px;
    }
    .tag{
      font-size: 12px !important;
      margin-left: 40px;
      color: var(--title-active);
      background-color: var(--primary-light);
      border-radius: 5px;
      padding: 0 6px;
    }

    &:hover {
      background-color: #fff4f933;
    }

    &.active {
      color: #ffffff;

      .icon {
        filter: var(--filter-white);
      }
    }
  }

  @media screen and (max-width: 768px) {
    max-height: 85vh;
    height: calc(100vh - 75px);
    position: relative;
    z-index: 6;
    padding-top: 50px;
  }
`;

const menuList = [
  {
    title: "My Wishlists",
    slug: "wish-lists",
    icon: giftIcon,
  },
  {
    title: "Leaderboard",
    slug: "leaderboard",
    icon: cupIcon,
  },
  {
    title: "Gift Ideas",
    slug: "gift-ideas",
    icon: discoverIcon,
    tag: 'New'
  },
  {
    title: "Archive",
    slug: "archive",
    icon: ArchiveIcon,
  },
  {
    title: "Profile",
    slug: "wish-lists/profile",
    icon: UserIcon,
  },
];

const Sidebar = ({setHeaderText}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
  };

  return (
    <Wrapper className="sidebar">
      <div
        className="backDrop"
        onClick={() =>
          document.querySelector(".sidebar").classList.remove("open")
        }
      ></div>
      <button
        type="button"
        className="toggle"
        onClick={() =>
          document.querySelector(".sidebar").classList.remove("open")
        }
      ></button>
      <div className="brand">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <Spacer y={5.6} yMobile={2.4} />
      <Menu>
        {menuList?.map((item, index) => (
          <NavLink
            exact="true"
            key={index}
            to={item.slug}
            className="item flexRow alignCenter"
            onClick={() => {
              setHeaderText(item.title)
              document.querySelector(".sidebar").classList.remove("open")
            }}
          >
            <img src={item.icon} alt="icon" className="icon" />
            <span className="subtitle-5 text">{item.title}</span>
            {item.tag && <span className="tag">{item.tag}</span>}
          </NavLink>
        ))}
        <a
          href="mailto:info@giftly.me"
          target="_blank"
          rel="noopener noreferrer"
          className="item flexRow alignCenter"
        >
          <img src={supportIcon} alt="icon" className="icon" />
          <span className="subtitle-5 text">Support</span>
        </a>
        <NavLink
          to="/home/login"
          className="item flexRow alignCenter"
          onClick={handleLogout}
        >
          <img src={logoutIcon} alt="icon" className="icon" />
          <span className="subtitle-5 text">Logout</span>
        </NavLink>
      </Menu>
    </Wrapper>
  );
};

export default Sidebar;
