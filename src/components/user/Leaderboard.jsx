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
import openBox from "assets/images/open_box.svg";
// import { Initials } from "./WishListsStyles";
import ImgWrapper from "components/global/ImgWrapper";
import Logo from "components/global/Logo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url, formatNum } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import Loader from "components/global/Loader";

const Leaderboard = () => {
  const [leaderboardItems, setLeaderboardItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const getLeaderboard = async () => {
    try {
      const res = await axios.get(`${base_url}/weekly-leaderboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        setLoading(false);
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        setLoading(false);
        // const tempItems = res.data.data.leaderboard?.sort(
        //   (a, b) => a.points > b.points
        // );
        setLeaderboardItems(res.data.data.leaderboard);
        setCurrentUser(res.data.data.current_user);
        return;
      }
      setLoading(false);
      dispatch(showAlert(res.data.message));
    } catch (e) {
      setLoading(false);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response.data.message || "Something went wrong"));
    }
  };

  useEffect(() => {
    getLeaderboard();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <Spacer y={2.4} />
      {loading ? (
        <>
          <Spacer y={4.8} />
          <div className="flexRow justifyCenter">
            <Loader />
          </div>
          <Spacer y={4.8} />
        </>
      ) : (
        <LeaderboardWrapper>
          <h3 className="title-3 colorTitleActive textCenter title">
            Weekly Leaderboard
          </h3>
          <Spacer y={9.6} yMobile={7.2} />
          <div className="flexRow justifySpaceBetween alignEnd">
            {leaderboardItems[1] && (
              <TopRankedWrapper className="flexColumn alignCenter">
                <TopRanked imgHeight="100%" className="flexColumn alignCenter">
                  {/* <Initials
                size="72"
                textSize="36"
                bg="var(--accent_3-main)"
                className="inner second"
              >
                ND
              </Initials> */}
                  <ImgWrapper
                    size={7.2}
                    imgHeight="100%"
                    className="inner second"
                  >
                    <img
                      src={leaderboardItems[1].avatar || openBox}
                      alt="..."
                      className="userImage"
                    />
                  </ImgWrapper>
                  <img src={medal_two} alt="2" className="medal" />
                </TopRanked>
                <Spacer y={2.4} />
                <p className="subtitle-2 textCenter colorTitleActive">
                  {leaderboardItems[1].username}
                </p>
                <p className="subtitle-2 textCenter">
                  {formatNum(leaderboardItems[1].points)} pts
                </p>
              </TopRankedWrapper>
            )}
            {leaderboardItems[0] && (
              <TopRankedWrapper className="flexColumn alignCenter">
                <TopRanked imgHeight="100%" className="flexColumn alignCenter">
                  <img src={crown} alt="." className="crown" />
                  {/* <Initials
                size="96"
                textSize="48"
                bg="var(--accent_3-main)"
                className="inner first"
              >
                SN
              </Initials> */}
                  <ImgWrapper
                    size={7.2}
                    imgHeight="100%"
                    className="inner first"
                  >
                    <img
                      src={leaderboardItems[0].avatar || openBox}
                      alt="..."
                      className="userImage"
                    />
                  </ImgWrapper>
                  <img src={medal_one} alt="1" className="medal" />
                </TopRanked>
                <Spacer y={2.4} />
                <p className="subtitle-2 textCenter colorTitleActive">
                  {leaderboardItems[0].username}
                </p>
                <p className="subtitle-2 textCenter">
                  {formatNum(leaderboardItems[0].points)} pts
                </p>
              </TopRankedWrapper>
            )}
            {leaderboardItems[2] && (
              <TopRankedWrapper className="flexColumn alignCenter">
                <TopRanked
                  size={7.2}
                  imgHeight="100%"
                  className="flexColumn alignCenter"
                >
                  {/* <Initials
                size="72"
                textSize="36"
                bg="var(--accent_3-main)"
                className="inner third"
              >
                OE
              </Initials> */}
                  <ImgWrapper
                    size={7.2}
                    imgHeight="100%"
                    className="inner third"
                  >
                    <img
                      src={leaderboardItems[2].avatar || openBox}
                      alt="..."
                      className="userImage"
                    />
                  </ImgWrapper>
                  <img src={medal_three} alt="3" className="medal" />
                </TopRanked>
                <Spacer y={2.4} />
                <p className="subtitle-2 textCenter colorTitleActive">
                  {leaderboardItems[2].username}
                </p>
                <p className="subtitle-2 textCenter">
                  {formatNum(leaderboardItems[2].points)} pts
                </p>
              </TopRankedWrapper>
            )}
          </div>
          <Spacer y={4.8} />
          {currentUser && Number(currentUser.rank) > 10 && (
            <UserRow className="flexRow alignCenter">
              <p className="body-2 colorTitleActive">
                Rank: {currentUser.rank}
              </p>
              <div className="flexRow alignCenter">
                {/* <Initials size="32" textSize="16" bg="var(--accent_3-main)">
              JJ
            </Initials> */}
                <ImgWrapper size={3.2} imgHeight="100%">
                  <img
                    src={currentUser.avatar || openBox}
                    alt="..."
                    className="userImage"
                  />
                </ImgWrapper>
                <Spacer x={0.4} />
                <div>
                  <p className="body-2 colorTitleActive">
                    {currentUser.username}
                  </p>
                  <div className="giftlyScore flexRow alignCenter">
                    <Logo />
                    <Spacer x={0.4} />
                    <span className="subtitle-3 colorPrimaryMain bold">
                      {formatNum(currentUser.cummulative_points)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="body-2 colorTitleActive textRight">
                {formatNum(currentUser.points)} pts
              </p>
            </UserRow>
          )}
          {leaderboardItems?.slice(3).map((item, index) => {
            if (currentUser?.username === item.username) {
              return (
                <UserRow className="flexRow alignCenter">
                  <p className="body-2 colorTitleActive">
                    Rank: {currentUser.rank}
                  </p>
                  <div className="flexRow alignCenter">
                    {/* <Initials size="32" textSize="16" bg="var(--accent_3-main)">
              JJ
            </Initials> */}
                    <ImgWrapper size={3.2} imgHeight="100%">
                      <img
                        src={currentUser.avatar || openBox}
                        alt="..."
                        className="userImage"
                      />
                    </ImgWrapper>
                    <Spacer x={0.4} />
                    <div>
                      <p className="body-2 colorTitleActive">
                        {currentUser.username}
                      </p>
                      <div className="giftlyScore flexRow alignCenter">
                        <Logo />
                        <Spacer x={0.4} />
                        <span className="subtitle-3 colorPrimaryMain bold">
                          {formatNum(currentUser.cummulative_points)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="body-2 colorTitleActive textRight">
                    {formatNum(currentUser.points)} pts
                  </p>
                </UserRow>
              );
            }
            return (
              <OtherRow className="flexRow alignCenter" key={index}>
                <p className="subtitle-3 colorTitleActive">{item.rank}</p>
                {/* <Initials size="40" textSize="20" bg="var(--accent_3-main)">
            ML
          </Initials> */}
                <ImgWrapper size={4} imgHeight="100%">
                  <img
                    src={item.avatar || openBox}
                    alt="..."
                    className="userImage"
                  />
                </ImgWrapper>
                <p className="body-2 colorTitleActive">{item.username}</p>
                <p className="body-2 textRight">{formatNum(item.points)} pts</p>
              </OtherRow>
            );
          })}
        </LeaderboardWrapper>
      )}
      <Spacer y={4.8} yMobile={6} />
    </>
  );
};

export default Leaderboard;
