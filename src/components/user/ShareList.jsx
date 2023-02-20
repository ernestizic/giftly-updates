import { AuthCard, AuthWrapper } from "components/auth/AuthStyles";
import { useDispatch, useSelector } from "react-redux";

import CheckIcon from "assets/icons/check-glow.svg"
import CloseModal from "components/global/CloseModal";
import FormGroupCustom from "components/global/FormGroupCustom";
import Spacer from "components/global/Spacer";
import copyIcon from "assets/icons/document_copy.svg";
import facebookIcon from "assets/icons/facebook.svg";
import {
  setAlert
} from "features/alert/alertSlice";
import styled from "styled-components";
import telegramIcon from "assets/icons/telegram.svg";
import twitterIcon from "assets/icons/twitter.svg";
import { useNavigate } from "react-router-dom";
import whatsappIcon from "assets/icons/whatsapp.svg";

const Wrapper = styled(AuthWrapper)``;

const Card = styled(AuthCard)`
  padding: 0;
  
  .shareOptions {
    padding: 24px 28px;
    .share-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  .title {
    font-weight: 600;
    color: #121212;
  }

  .subtext {
    font-weight: 475;
    font-size: 16px;
    line-height: 24px;
  }


  .socials {
    display: grid;
    grid-template-columns:repeat(2, 1fr);
    gap: 24px 0;
    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      .icon{
        width: 35px;
      }
    }
  }
  .cancel {
    width: 100%;
    border: 1px solid #9B9B9B;
    border-radius: 8px;
    padding: 12px;
    margin-top: 26px;
    color: #121212;
    font-weight: 500;
    font-size: 16px;
  }
  .copyWrapper {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .shareOptions {
      padding: 16px;
    }
  }
`;

const shareOnFB = (shareLink) => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&t=${encodeURI(
    "Checkout my wish list on giftly"
  )}`;
  window.open(url, "");
  return;
};

const shareOntwitter = (shareLink) => {
  const url = `https://twitter.com/intent/tweet?url=${shareLink}&via=giftly&text=${encodeURI(
    "Checkout my wish list on giftly"
  )}`;
  window.open(url);
  return;
};

const shareOnWhatsapp = (shareLink) => {
  const url = `whatsapp://send?text=${encodeURI(
    `Checkout my wish list on giftly\n${shareLink}`
  )}`;
  window.open(url);
  return;
};

const shareOnTelegram = (shareLink) => {
  const url = `https://telegram.me/share/url?url=${shareLink}&text=${encodeURI(
    "Checkout my wish list on giftly"
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
  const navigate = useNavigate();
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
    dispatch(setAlert({
      message: "Link copied!"
    }))
  };

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <div className="shareOptions">
          <div className="share-header">
            <img src={CheckIcon} alt='check' />
            <CloseModal callback={() => navigate("/user/wish-lists")} />
          </div>
          <h4 className="title-4 title colorTitleActive">Share wish list</h4>
          <p className="subtext">You have created a wish list, now it's time to share it with your family and friends to receive the most desirable gifts.</p>
          <Spacer y={2.4} />
          <div className="socials">
            {Object.keys(socials)?.map((key, index) => (
              <button
                key={index}
                className="item"
                onClick={() =>
                  socials[key].share(
                    `https://giftly.me/${user?.username}/${tempListSlug}`
                  )
                }
              >
                <img src={socials[key].icon} alt="" className="icon" />
                <p className="subtitle-4 textCenter colorTitleActive text textCapitalize">
                  {key}
                </p>
              </button>
            ))}
            <button
              className="item copyLink"
              onClick={() => copyLink("share_link")}
            >
              <img src={copyIcon} alt="search" className="icon" />
              <p className="subtitle-4 textCenter colorTitleActive text textCapitalize">
                Copy link
              </p>
            </button>
          </div>
          <button 
            type="button" 
            className="cancel" 
            onClick={()=> navigate("/user/wish-lists")}
          > 
          Cancel
        </button>
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
