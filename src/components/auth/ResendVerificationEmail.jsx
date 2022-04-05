import { Link, useNavigate } from "react-router-dom";
import Spacer from "components/global/Spacer";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import Button from "components/global/Button";
import { AuthWrapper } from "./AuthStyles";
import { AuthCard } from "./AuthStyles";
import closeIcon from "assets/icons/close_square.svg";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import axios from "axios";
import { setUser } from "features/auth/authSlice";

const ResendVerificationEmail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const schema_email = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Field required"),
  });

  const submitEmail = async (values) => {
    const { email } = values;

    try {
      const res = await axios.post(
        `${base_url}/auth/email/verify/resend/${email}`
      );

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (res.data.status === "success") {
        user
          ? dispatch(setUser({ ...user, email }))
          : dispatch(setUser({ email }));
        navigate("/home/verify-email");
      } else if (res.data.status === "failure") {
        dispatch(showAlert(res.data.message));
      } else {
        dispatch(showAlert("An error occurred"));
      }
    } catch (e) {
      console.log(e);
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
        <div className="flexRow alignCenter">
          <Link to="/home/login">
            <img src={closeIcon} alt="icon" />
          </Link>
        </div>
        <Spacer y={2.4} />
        <h1 className="title-3 textCenter colorTitleActive title">
          Resend Verification Email
        </h1>
        <Spacer y={0.8} />
        <p className="body-3 subtitle textCenter">
          Enter your email address and we will send instructions to verify your
          account.
        </p>
        <Spacer y={2.4} />
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={schema_email}
          onSubmit={async (values) => {
            await submitEmail(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <FormGroup
                fieldStyle="shortText"
                type="email"
                label="Email address"
                name="email"
                className="spanFull"
              />
              <Button
                type="submit"
                text={"Send instructions"}
                loading={isSubmitting}
                className="spanFull"
                disabled={!isValid || !values.email || isSubmitting}
                width="100%"
              />
              <Button
                type="button"
                text="Back to login"
                className="spanFull noBorder"
                width="100%"
                onClick={() => navigate("/home/login")}
              />
            </FormWrapper>
          )}
        </Formik>
      </AuthCard>
    </AuthWrapper>
  );
};

export default ResendVerificationEmail;
