import { AuthCard, AuthWrapper } from "components/auth/AuthStyles";
import React from "react";
import { useNavigate } from "react-router-dom";
import warningIcon from "assets/icons/warning.svg";
import closeIcon from "assets/icons/close_square.svg";
import cameraIcon from "assets/icons/camera.svg";
import Spacer from "components/global/Spacer";
import { Initials } from "./WishListsStyles";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import FormWrapper from "components/global/FormWrapper";
import FormGroup from "components/global/FormGroup";
import Button from "components/global/Button";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { setUser } from "features/auth/authSlice";
import axios from "axios";
import { base_url } from "utils/utils";
import { useState } from "react";
import Loader from "components/global/Loader";
import styled from "styled-components";
import ImgWrapper from "components/global/ImgWrapper";

const Card = styled(AuthCard)`
  .actionBtns {
    width: 100%;
    margin: auto;
  }

  #photoInput {
    display: none;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [imgDetails, setImgDetails] = useState(null);
  const [userImage, setUserImage] = useState(user?.avatar);

  const loadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgDetails(file);
    }
  };

  const schema = Yup.object({
    first_name: Yup.string().required("Fiield required"),
    last_name: Yup.string().required("Fiield required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
    username: Yup.string().required("Field required"),
    password: Yup.string(),
  });

  const handleSave = async (data) => {
    try {
      const res = await axios.patch(`${base_url}/user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === "success") {
        dispatch(setUser(res.data.data));
        dispatch(showAlert(res.data.message));
        return;
      }

      dispatch(showAlert(res.data.message));
    } catch (e) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response.data.message || "Something went wrong"));
    }
  };

  // DISCUSS USERNAME CHANGE ***IMPORTANT***

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <Card>
        <div className="flexRow alignCenter">
          <button type="button" onClick={() => navigate(-1)}>
            <img src={closeIcon} alt="icon" />
          </button>
        </div>
        <Spacer y={2.4} />
        <p className="title-4 title colorTitleActive">Account</p>
        <Spacer y={0.4} />
        <div className="flexRow alignCenter subtitle-5 subtitle">
          <img src={warningIcon} alt="" className="icon" />
          <Spacer x={0.8} />
          <span>Changing your username will affect links sent to friends</span>
        </div>
        <Spacer y={2.4} />
        <div className="uploadWrapper flexRow alignCenter">
          {imgDetails ? (
            <ImgWrapper size={7.2} imgHeight={"100%"}>
              <img src={imgDetails && URL.createObjectURL(imgDetails)} alt="" />
            </ImgWrapper>
          ) : userImage ? (
            <ImgWrapper size={7.2} imgHeight={"100%"}>
              <img src={userImage} alt="" />
            </ImgWrapper>
          ) : (
            <Initials size={72} textSize={24} bg="var(--primary-dark)">
              <span className="text">
                {user?.first_name.charAt(0)}
                {user?.last_name.charAt(0)}
              </span>
            </Initials>
          )}
          <Spacer x={1.6} />
          <div>
            <input
              type="file"
              accept="image/*"
              id="photoInput"
              onChange={(e) => loadFile(e)}
            />
            {imgDetails || userImage ? (
              <div className="flexRow justifySpaceBetween">
                <button
                  className="flexRow alignCenter subtitle-4 colorTitleActive"
                  onClick={() => document.querySelector("#photoInput").click()}
                >
                  <img src={cameraIcon} alt="" className="icon" />
                  <Spacer x={0.8} />
                  <span>Upload a photo</span>
                </button>
                <button
                  className="flexRow alignCenter subtitle-4 colorPrimaryMain"
                  onClick={() => {
                    setUserImage(null);
                    setImgDetails(null);
                  }}
                >
                  {/* <img src={deleteIcon} alt="" className="icon" />
                  <Spacer x={0.8} /> */}
                  <span>Remove</span>
                </button>
              </div>
            ) : (
              <button
                className="flexRow alignCenter subtitle-4 colorTitleActive"
                onClick={() => document.querySelector("#photoInput").click()}
              >
                <img src={cameraIcon} alt="" className="icon" />
                <Spacer x={0.8} />
                <span>Upload a photo</span>
              </button>
            )}
            <Spacer y={0.4} />
            <p className="label">
              Photos help your friends recognize you on Giftly
            </p>
          </div>
        </div>
        <Spacer y={2.4} />
        <Formik
          initialValues={{
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            username: user?.username || "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleSave(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <FormGroup
                fieldStyle="shortText"
                label="First name"
                name="first_name"
              />
              <FormGroup
                fieldStyle="shortText"
                label="Last name"
                name="last_name"
              />
              <FormGroup
                fieldStyle="shortText"
                type="email"
                label="Email address"
                name="email"
                className="spanFull"
              />
              <div className="spanFull">
                <FormGroup
                  fieldStyle="shortText"
                  label="Username"
                  name="username"
                  readOnly
                />
                <Spacer y={0.8} />
                <span className="subtitle-5">
                  You can only change your username once every 30 days
                </span>
              </div>
              {/* <FormGroup
                fieldStyle="shortText"
                type="password"
                label="Password"
                name="password"
                className="password spanFull"
              /> */}

              {isSubmitting ? (
                <div className="flexRow justifyCenter spanFull">
                  <Loader />
                </div>
              ) : (
                <div className="flexRow justifyCenter actionBtns spanFull">
                  <Button
                    type="button"
                    text="Cancel"
                    className="secondary"
                    width="calc(50% - 12px)"
                    onClick={() => navigate(-1)}
                  />
                  <Spacer x={2.4} />
                  <Button
                    type="submit"
                    text="Update profile"
                    width="calc(50% - 12px)"
                    disabled={!isValid}
                  />
                </div>
              )}
            </FormWrapper>
          )}
        </Formik>
      </Card>
    </AuthWrapper>
  );
};

export default Profile;
