import { AuthCard, AuthWrapper } from "components/auth/AuthStyles";
import CloseModal from "components/global/CloseModal";
import React from "react";
import Spacer from "components/global/Spacer";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import warningIcon from "assets/icons/warning.svg";
import ProfileDetailsTab from "./ProfileDetailsTab";
import Tab from "components/global/Tab";
import PasswordTab from "./PasswordTab";

const Card = styled(AuthCard)`
  .actionBtns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
    width: 100%;
    button{
      font-weight: 500;
      font-size: 16px;
    }
  }

  #photoInput {
    display: none;
  }

  .uploadWrapper{
    margin: 36px 0;
    .upload-btn {
      gap: 8px;
      img {
        margin-right: 5px;
      }
  }
}
  .demacator {
    background: #9B9B9B;
    width: 4px;
    height: 4px;
  }
  @media screen and (max-width: 768px) {
    .uploadWrapper{
    margin: 36px 0;
    .upload-btn {
      img {
        display: none;
      }
  }
}
  }
`;

const TabContainer = styled.div`
  padding-top: 24px;
`

const Profile = () => {
  const tabsData = [
    {
        label: 'Profile details',
        content: <ProfileDetailsTab />
    },
    {
        label: 'Password',
        content: <PasswordTab />
    },
]

  const navigate = useNavigate();
  const location = useLocation()

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <Card>
        <CloseModal callback={() => location.hash ? navigate(-2) : navigate(-1)} />
        <Spacer y={2.4} />
        <p className="title-4 bold colorTitleActive">Profile</p>
        <Spacer y={0.4} />
        <div className="flexRow alignCenter subtitle-5 subtitle colorGrayScale">
          <img src={warningIcon} alt="" className="icon" />
          <Spacer x={0.8} />
          <span>Changes to this profile will affect links sent to friends</span>
        </div>

        <TabContainer>
          <Tab tabsData={tabsData}/>
        </TabContainer>
      </Card>
    </AuthWrapper>
  );
};

export default Profile;
