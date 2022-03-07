import { AuthWrapper, AuthCard } from "components/auth/AuthStyles";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import twitterIcon from "assets/icons/twitter.svg";
import facebookIcon from "assets/icons/facebook.svg";
import instagramIcon from "assets/icons/instagram.svg";
import whatsappIcon from "assets/icons/whatsapp.svg";
import snapchatIcon from "assets/icons/snapchat.svg";
import telegramIcon from "assets/icons/telegram.svg";

const Wrapper = styled(AuthWrapper)``;

const Card = styled(AuthCard)`
  padding: 0;

  .shareOptions {
    padding: 48px 64px;
  }

  .socials {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 80px;
    grid-row-gap: 24px;
  }
`;

const socials = {
  twitter: twitterIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
  whatsapp: whatsappIcon,
  snapchat: snapchatIcon,
  telegram: telegramIcon,
};

const ShareList = () => {
  return (
    <Wrapper className="flexColumn alignCenter">
      <Card>
        <div className="shareOptions">
          <h4 className="title-4 title colorTitleActive">Share to</h4>
          <Spacer y={2.4} />
          <div className="socials">
            {Object.keys(socials)?.map((key, index) => (
              <button
                key={index}
                className="flexColumn justifyCenter alignCenter item"
              >
                <img src={socials[key]} alt="" className="icon" />
                <Spacer y={0.4} />
                <p className="subtitle-4 textCenter colorTitleActive text textCapitalize">
                  {key}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default ShareList;
