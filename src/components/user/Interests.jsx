import { useState } from "react";
import { AuthCard } from "components/auth/AuthStyles";
import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import { CheckWhiteIcon } from "components/global/SVG";
import ImageWrapper from "components/giftIdeas/ImageWrapper";
import Logo from "components/global/Logo";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import axios from "axios";
import { base_url } from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert
} from "features/alert/alertSlice";
import { setUser } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Backdrop)``;

const Card = styled(AuthCard)`
  margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 48px;
  position: relative;
  height: calc(100% - 50px);
  max-height: 836px;
  width: calc(100% - 32px);
  max-width: 812px;
  overflow: auto;

  .optionsWrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 16px;
  }

  .stickyBottom {
    position: sticky;
    bottom: -48px;
    background-color: #ffffff;
    padding: 24px 0;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 24px;
    overflow: auto;
    border-radius: 0;
    max-width: 100%;

    .title {
      font-size: 24px;
      line-height: 36px;
    }

    .prompt1 {
      font-size: 14px;
      line-height: auto;
    }

    .prompt2 {
      font-size: 12px;
      line-height: auto;
    }

    .optionsWrapper {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const InterestCard = styled(ImageWrapper)`
  border-radius: 8px;
  position: relative;
  cursor: pointer;

  .text {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #00000040;
    padding: 16px;
    border-radius: 8px;
    border: 2px solid transparent;
  }

  svg {
    position: absolute;
    top: 16px;
    right: 16px;
    display: none;
  }
  &:hover {
    .text {
      border-color: var(--title-active);
    }
  }

  &.selected {
    .text {
      border-color: var(--title-active);
      background-color: #00000080;
    }

    svg {
      display: block;
    }
  }
`;

const tempList = [
  "Women's fashion",
  "reading",
  "music",
  "art",
  "sports",
  "travel",
  "cooking",
  "gardening",
  "programming",
  "photography",
  "dancing",
  "hiking",
  "fishing",
  "gaming",
  "yoga",
  "knitting",
  "sculpting",
];

const Interests = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch()
  const { user, token } = useSelector((state)=> state.auth)

  const handleSelect = (e) => {
    e.target.closest(".interestCard")?.classList.toggle("selected");

    const tempSelected = Array.from(document.querySelectorAll('.interestCard.selected'));
    setSelected(tempSelected);
  };

  const interests = selected.map(item => {
    return item.innerText
  })
  const formData = {
    interests
  }
  const handleSave = async() => {
    setSaving(true);
    try {
      const res = await axios.patch(`${base_url}/user/interests`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
			const data = res.data
      dispatch(setUser({ ...user, interests: formData.interests }))
      dispatch(setAlert({
        type: 'success',
        message: data.message
      }))
			setSaving(false)
      navigate("/user/wish-lists");
    } catch (err) {
      dispatch(setAlert({
        type: 'error',
        message: err.response.data.message || "Something went wrong"
      }))
      setSaving(false)
    }
  }

  return (
    <Wrapper className="flexColumn justifyCenter alignCenter">
      <Card>
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <h1 className="textCenter colorTitleActive">
          What are you into these days?
        </h1>
        <Spacer y={0.8} />
        <p className="subtitle-4 subtitle textCenter colorTitleActive">
          Select at least 5 interests to help us personalise your Giftly
          experience.
        </p>
        <Spacer y={2.4} />
        <div className="optionsWrapper">
          {tempList.map((text) => (
            <InterestCard key={text} onClick={handleSelect} className="interestCard">
              <img
                className="image"
                alt="Interest"
                src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=474&q=80"
              />
              <div className="text body-4 colorWhite flexColumn justifyEnd">
                <span>{text}</span>
              </div>
              <CheckWhiteIcon />
            </InterestCard>
          ))}
        </div>
        <div className="stickyBottom">
        <Button
              text="Done"
              disabled={saving || selected.length < 5}
              loading={saving}
              onClick={handleSave}
              fullWidth
            />
        </div>
      </Card>
    </Wrapper>
  );
};

export default Interests;
