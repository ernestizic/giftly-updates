import styled from "styled-components";
import logo from "assets/images/logo.svg";
import Spacer from "components/global/Spacer";
import giftIcon from "assets/icons/gift.svg";
import faqIcon from "assets/icons/message_question.svg";
import supportIcon from "assets/icons/support.svg";
import logoutIcon from "assets/icons/logout.svg";
import cupIcon from "assets/icons/cup.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "features/auth/authSlice";

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
  max-height: 60vh;
  overflow: auto;

  .item {
    border-radius: 8px;
    color: var(--line);
    margin-bottom: 24px;
    padding: 12px;
    transition: all 0.2s ease-out;

    .text {
      margin-left: 8px;
    }

    &.active {
      color: #ffffff;
      background-color: #fff4f933;

      .icon {
        filter: var(--filter-white);
      }
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    a-index: 6;
  }
`;

const menuList = [
  {
    title: "My wish lists",
    slug: "wish-lists",
    icon: giftIcon,
  },
  {
    title: "Leaderboard",
    slug: "leaderboard",
    icon: cupIcon,
  },
  {
    title: "FAQ",
    slug: "/faqs",
    icon: faqIcon,
  },
];

const Sidebar = () => {
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
      <Spacer y={9.6} yMobile={2.4} />
      <Menu>
        {menuList?.map((item, index) => (
          <NavLink
            exact="true"
            key={index}
            to={item.slug}
            className="item flexRow alignCenter"
          >
            <img src={item.icon} alt="icon" className="icon" />
            <span className="subtitle-4 text">{item.title}</span>
          </NavLink>
        ))}
        <a
          href="mailto:info@giftly.me"
          target="_blank"
          rel="noopener noreferrer"
          className="item flexRow alignCenter"
        >
          <img src={supportIcon} alt="icon" className="icon" />
          <span className="subtitle-4 text">Support</span>
        </a>
        <NavLink
          to="/home/login"
          className="item flexRow alignCenter"
          onClick={handleLogout}
        >
          <img src={logoutIcon} alt="icon" className="icon" />
          <span className="subtitle-4 text">Logout</span>
        </NavLink>
      </Menu>
    </Wrapper>
  );
};

export default Sidebar;
