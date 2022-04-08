import Spacer from "components/global/Spacer";
import Header from "./Header.";
import {
  LeaderboardWrapper,
  OtherRow,
  TopRanked,
  TopRankedWrapper,
  UserRow,
} from "./LeaderboardStyles";
import medal_one from "assets/icons/medal_one.svg";
import medal_two from "assets/icons/medal_two.svg";
import medal_three from "assets/icons/medal_three.svg";
import crown from "assets/icons/crown.svg";
import { Initials } from "./WishListsStyles";
import ImgWrapper from "components/global/ImgWrapper";
import Logo from "components/global/Logo";

const Leaderboard = () => {
  return (
    <>
      <Header />
      <Spacer y={2.4} />
      <LeaderboardWrapper>
        <h3 className="title-3 colorTitleActive textCenter title">
          Weekly Leaderboard
        </h3>
        <Spacer y={9.6} yMobile={7.2} />
        <div className="flexRow justifySpaceBetween alignEnd">
          <TopRankedWrapper className="flexColumn alignCenter">
            <TopRanked imgHeight="100%" className="flexColumn alignCenter">
              <Initials
                size="72"
                textSize="36"
                bg="var(--accent_3-main)"
                className="inner second"
              >
                ND
              </Initials>
              <img src={medal_two} alt="2" className="medal" />
            </TopRanked>
            <Spacer y={2.4} />
            <p className="subtitle-2 textCenter colorTitleActive">Nelly</p>
            <p className="subtitle-2 textCenter">1000 pts</p>
          </TopRankedWrapper>
          <TopRankedWrapper className="flexColumn alignCenter">
            <TopRanked imgHeight="100%" className="flexColumn alignCenter">
              <img src={crown} alt="." className="crown" />
              <Initials
                size="96"
                textSize="48"
                bg="var(--accent_3-main)"
                className="inner first"
              >
                SN
              </Initials>
              <img src={medal_one} alt="1" className="medal" />
            </TopRanked>
            <Spacer y={2.4} />
            <p className="subtitle-2 textCenter colorTitleActive">Salazer</p>
            <p className="subtitle-2 textCenter">2000 pts</p>
          </TopRankedWrapper>
          <TopRankedWrapper className="flexColumn alignCenter">
            <TopRanked
              size={7.2}
              imgHeight="100%"
              className="flexColumn alignCenter"
            >
              <Initials
                size="72"
                textSize="36"
                bg="var(--accent_3-main)"
                className="inner third"
              >
                OE
              </Initials>
              <img src={medal_three} alt="3" className="medal" />
            </TopRanked>
            <Spacer y={2.4} />
            <p className="subtitle-2 textCenter colorTitleActive">Obara</p>
            <p className="subtitle-2 textCenter">900 pts</p>
          </TopRankedWrapper>
        </div>
        <Spacer y={4.8} />
        <UserRow className="flexRow alignCenter">
          <p className="body-2 colorTitleActive">Rank: 20</p>
          <div className="flexRow alignCenter">
            <Initials size="32" textSize="16" bg="var(--accent_3-main)">
              JJ
            </Initials>
            <Spacer x={0.4} />
            <div>
              <p className="body-2 colorTitleActive">Username</p>
              <div className="giftlyScore flexRow alignCenter">
                <Logo />
                <Spacer x={0.4} />
                <span className="subtitle-3 colorPrimaryMain bold">9,380</span>
              </div>
            </div>
          </div>
          <p className="body-2 colorTitleActive textRight">58 pts</p>
        </UserRow>
        <OtherRow className="flexRow alignCenter">
          <p className="subtitle-3 colorTitleActive">4</p>
          <Initials size="40" textSize="20" bg="var(--accent_3-main)">
            ML
          </Initials>
          <p className="body-2 colorTitleActive">Username</p>
          <p className="body-2 textRight">700 pts</p>
        </OtherRow>
      </LeaderboardWrapper>
      <Spacer y={4.8} yMobile={6} />
    </>
  );
};

export default Leaderboard;
