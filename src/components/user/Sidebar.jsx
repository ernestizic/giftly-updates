import styled from "styled-components";
import logo from "assets/images/logo.svg";
import Spacer from "components/global/Spacer";
import giftIcon from "assets/icons/gift.svg";
import faqIcon from "assets/icons/message_question.svg";
import supportIcon from "assets/icons/support.svg";
import logoutIcon from "assets/icons/logout.svg";
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
`;

const menuList = [
  {
    title: "My wish lists",
    slug: "wish-lists",
    icon: giftIcon,
  },
  {
    title: "FAQ",
    slug: "faq",
    icon: faqIcon,
  },
  {
    title: "Support",
    slug: "support",
    icon: supportIcon,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
  };

  return (
    <Wrapper>
      <div className="brand">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <Spacer y={9.6} />
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
