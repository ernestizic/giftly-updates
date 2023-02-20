import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import instagram from "assets/icons/instagram_wt.svg";
import facebook from "assets/icons/facebook_wt.svg";
import twitter from "assets/icons/twitter_wt.svg";
// import send from "assets/icons/send_wt.svg";
import { Link } from "react-router-dom";
import Button from "./Button";

const Wrapper = styled.div`
  background-color: var(--title-active);
  font-size: 14px;
  font-weight: 475;
  padding: 48px 80px;
  color: #fff;
  .section_1_footer {
    display: flex;
    justify-content: space-between;

    .item_1 {
      width: 40%;
      line-height: 20px;
      .logo{
        padding-bottom: 20px;
      }
    }
    .item_2 {
      /* border: 1px solid red; */
      width: 45%;
      display: grid;
      gap: 20px;
      /* grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); */
      grid-template-columns: repeat(3, 1fr);
    }
  }
  a {
    color: #fff;
    font-size: 14px;
    &:hover {
      color: #f0f0f0
    }
	}
  @media only screen and (max-width: 768px) {
    padding: 20px;
    .section_1_footer {
      flex-direction: column;
      gap: 40px;
      .item_1 {
        width: 100%;
      }
      .item_2 {
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
        gap: 40px;
      }
    }
    }
`;

const About = styled.div`
  p{
    line-height: 20px;
    font-weight: 600;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li a {
    margin: 0;
    font-weight: 475;
    font-size: 14px;
    line-height: 30px;
		text-decoration: none;
	}
`

const Socials = styled.div`
  p{
    line-height: 20px;
    font-weight: 600;
  }
& > div {
  display: flex;
}
.icon {
    margin-top: 10px;
    justify-content: center;
    display: inline-flex;
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    margin-right: 1.6rem;
    img {
      width: 50%;
      height: 100%;
    }
  }
`
const Contact = styled.div`
  p{
    line-height: 20px;
    font-weight: 600;
  }
`
const NewsletterSection = styled.div`
  margin-top: 36px;
  max-width: 40%;
  .newsletter {
    background: #1C1C3B;
    border-radius: 10px;
    margin: 20px 0;
    padding: 24px;
    font-size: 14px;
    line-height: 20px;
    form {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      input {
        color: #000;
        border-radius: 8px;
        padding-left: 24px;
        width: 100%;
        border: none;
        background: #F7F7F7;
        &::placeholder {
          color: #2E2E3A;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    max-width: 100%;
    .newsletter {
      form {
        flex-direction: column;
        gap: 20px;
        input{
          height: 45px;
        }
        button{
          width: 100%;
        }
      }
    }
  }
`
const LastFooter = styled.div`
  background-color: var(--title-active);
  padding: 26px 80px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  font-weight: 475;
  font-size: 14px;
  line-height: 20px;
  p{
    color: #fff;
  }
  a {
    color: #fff;
    font-size: 14px;
    &:hover {
      color: #f0f0f0;
    }
	}
  & > div {
    ul {
      list-style-type: none;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    li {
      display: inline-block;
      padding: 0 20px;
    }
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 10px;
    text-align: center;
    & > div {
    li {
      padding: 0 12px;
    }
  }
}
`

const MEDIA = [
  {
    icon: instagram,
    name: "instagram",
    link: "https://instagram.com/giftlydotme",
  },
  {
    icon: facebook,
    name: "facebook",
    link: "https://facebook.com/giftlydotme",
  },
  {
    icon: twitter,
    name: "twitter",
    link: "https://twitter.com/giftlydotme",
  },
];

const Footer = () => {
  return (
    <>
      <Wrapper>
        <div className="section_1_footer">
          <div className="item_1">
            <Logo className="logo" />
            <p>
              Giftly is a platform that makes it easy for your friends to get you
              the best gifts. Create your wish lists and share them with your
              friends.
            </p>
          </div>

          <div className="item_2">
            <About>
              <p className="subtitle-5">Company</p>
              <ul>
                <li>
                  <a href="https://blog.giftly.me/">Blog</a>
                </li>
                <li>
                  <Link to="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/">Find Friends</Link>
                </li>
              </ul>
            </About>
            <Socials>
              <p className="subtitle-5">Socials</p>
              <div>
                {MEDIA.map((ele, index) => (
                  <a
                    key={index}
                    className="icon"
                    href={ele.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={ele.icon} alt={ele.name} />
                  </a>
                ))}
              </div>
            </Socials>
            <Contact>
              <p className="subtitle-5">Contact</p>
              <a href="mailto:info@giftly.me">info@giftly.me</a>
            </Contact>
          </div>
        </div>

        <NewsletterSection>
          <div className="newsletter">
            <p>Keep up with the latest Giftly news and updates.</p>
            <form>
              <input 
                placeholder="Enter your email" 
                type="email" 
              />
              <Button type="submit" text="Subscribe" />
            </form>
          </div>
        </NewsletterSection>
      </Wrapper>
      <LastFooter>
        <p>❤️ Giftly Inc. © 2021. Crafted with love</p>
        <div>
          <ul>
            <li><Link to="/terms">Terms of use</Link></li>
            <li><Link to="/privacy-policy">Privacy policy</Link></li>
          </ul>
        </div>
      </LastFooter>
    </>
  );
};

export default Footer;
