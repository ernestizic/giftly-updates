import closeIcon from "assets/icons/close_square.svg";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import Button from "components/global/Button";
import { useEffect, useState } from "react";
import CheckBox from "components/global/CheckBox";
import { AuthWrapper, AuthCard } from "components/auth/AuthStyles";
import Logo from "components/global/Logo";
import axios from "axios";
import { base_url } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/auth/authSlice";

const CreateUsername = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const schema = Yup.object({
    username: Yup.string().required("Field required"),
  });

  const handleCreate = async (cred) => {
    try {
      const res = await axios.post(`${base_url}/user/username`, cred, {
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
        dispatch(showAlert(res.data.message));
        dispatch(setUser({ ...user, username: cred.username }));
        navigate("/user/wish-lists");
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

  return (
    <AuthWrapper className="flexColumn alignCenter">
      <AuthCard>
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <h1 className="title-3 textCenter colorTitleActive title">
          Create a username
        </h1>
        <p className="body-3 textCenter">
          Create a unique username for yourself, you can also change it later.
        </p>
        <Spacer y={3.2} />
        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleCreate(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <div className="spanFull">
                <FormGroup
                  fieldStyle="shortText"
                  label="Username"
                  name="username"
                  className="spanFull"
                />
              </div>

              <Button
                type="submit"
                text="Continue"
                className="spanFull"
                width="100%"
                loading={isSubmitting}
                disabled={isSubmitting || !isValid || !values.username}
              />
            </FormWrapper>
          )}
        </Formik>
      </AuthCard>
    </AuthWrapper>
  );
};

export default CreateUsername;
