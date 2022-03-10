import { AuthWrapper, AuthCard } from "components/auth/AuthStyles";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import closeIcon from "assets/icons/close_square.svg";
import twitterIcon from "assets/icons/twitter.svg";
import facebookIcon from "assets/icons/facebook.svg";
import whatsappIcon from "assets/icons/whatsapp.svg";
import telegramIcon from "assets/icons/telegram.svg";
import copyIcon from "assets/icons/document_copy.svg";
import copyIconCircle from "assets/icons/document_copy_circle.svg";
import { Link } from "react-router-dom";
import FormGroupCustom from "components/global/FormGroupCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";

const Wrapper = styled(AuthWrapper)``;

const Card = styled(AuthCard)`
  padding: 0;

  .shareOptions {
    padding: 48px 64px;
  }

  .socials {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20%;
    grid-row-gap: 24px;
  }

  .copyWrapper {
    padding: 24px 48px;
    background-color: var(--title-active);
  }

  .copyArea {
    display: grid;
    grid-template-columns: auto 48px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .copyTrigger {
    width: max-content;
  }

  @media screen and (max-width: 768px) {
    .shareOptions {
      padding: 24px 48px;
      padding-bottom: 32px;
    }

    .socials {
      grid-column-gap: 40px;
      .icon {
        height: 48px;
      }

      .text {
        font-size: 14px;
        line-height: 18px;
      }
    }

    .copyWrapper {
      display: none;
    }
  }
`;

const shareOnFB = (shareLink) => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&t=${encodeURI(
    "Checkout my wish list on giftly.me"
  )}`;
  window.open(url, "");
  return;
};

const shareOntwitter = (shareLink) => {
  const url = `https://twitter.com/intent/tweet?url=${shareLink}&via=giftly&text=${encodeURI(
    "Checkout my wish list on giftly.me"
  )}`;
  window.open(url);
  return;
};

const shareOnWhatsapp = (shareLink) => {
  const url = `whatsapp://send?text=${encodeURI(
    `Checkout my wish list on giftly.me\n${shareLink}`
  )}`;
  window.open(url);
  return;
};

const shareOnTelegram = (shareLink) => {
  const url = `https://telegram.me/share/url?url=${shareLink}&text=${encodeURI(
    "Checkout my wish list on giftly.me"
  )}`;
  window.open(url);
  return;
};

const socials = {
  twitter: {
    icon: twitterIcon,
    share: shareOntwitter,
  },
  facebook: {
    icon: facebookIcon,
    share: shareOnFB,
  },
  whatsapp: {
    icon: whatsappIcon,
    share: shareOnWhatsapp,
  },
  telegram: {
    icon: telegramIcon,
    share: shareOnTelegram,
  },
};

const ShareList = () => {
  const dispatch = useDispatch();
  const tempListSlug = useSelector((state) => state.wishList.tempListSlug);
  const user = useSelector((state) => state.auth.user);

  const shareLink = `https://giftly.me/${user?.username}/${tempListSlug}`;

  const copyLink = (id) => {
    /* Get the text field */
    var copyText = document.getElementById(id);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    const timeout = setTimeout(() => {
      dispatch(clearAlert());
    }, 5000);
    dispatch(setAlertTimeout(timeout));
    dispatch(showAlert("Link copied!"));
  };

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <div className="shareOptions">
          <div className="flexRow alignCenter justifyEnd closeWrapper">
            <Link to="/user/wish-lists">
              <img src={closeIcon} alt="icon" />
            </Link>
          </div>
          <Spacer y={2.4} />
          <h4 className="title-4 title colorTitleActive">Share to</h4>
          <Spacer y={2.4} />
          <div className="socials">
            {Object.keys(socials)?.map((key, index) => (
              <button
                key={index}
                className="flexColumn justifyCenter alignCenter item"
                onClick={() => socials[key].share(shareLink)}
              >
                <img src={socials[key].icon} alt="" className="icon" />
                <Spacer y={0.4} />
                <p className="subtitle-4 textCenter colorTitleActive text textCapitalize">
                  {key}
                </p>
              </button>
            ))}
            <button
              className="flexColumn justifyCenter alignCenter item copyLink"
              onClick={() => copyLink("share_link")}
            >
              <img src={copyIconCircle} alt="search" className="icon" />
              <Spacer y={0.4} />
              <p className="subtitle-4 textCenter colorTitleActive text textCapitalize">
                Copy link
              </p>
            </button>
          </div>
        </div>
        <div className="copyWrapper">
          <p className="subtitle-4 colorWhite">Copy link</p>
          <Spacer y={1.6} />
          <div className="flexRow alignCenter copyArea">
            <FormGroupCustom
              fieldStyle="shortText"
              name="share_link"
              value={shareLink}
              bg="#ffffff"
              color="var(--placeholder)"
              readOnly
            />
            <button
              type="button"
              className="copyTrigger"
              onClick={() => copyLink("share_link")}
            >
              <img src={copyIcon} alt="search" className="icon" />
            </button>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default ShareList;
