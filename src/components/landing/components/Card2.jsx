import React from "react";
import FormGroup from "components/global/FormGroup";
import FormWrapper from "components/global/FormWrapper";
import styled from "styled-components";
import copy from "assets/icons/copy.svg";
import twitter from "assets/icons/twitter.svg";
import facebook from "assets/icons/facebook.svg";
// import instagram from "assets/icons/instagram.svg";
import whatsapp from "assets/icons/whatsapp.svg";
// import path from "assets/icons/path.svg";
import telegram from "assets/icons/telegram.svg";
import { Formik } from "formik";

const ICONS = [
  {
    name: "Twitter",
    iconName: twitter,
    bc: "#1DA1F2",
  },
  {
    name: "Facebook",
    iconName: facebook,
    bc: "#1877F2",
  },
  // {
  //   name: "Stories",
  //   iconName: instagram,
  //   bc: "#F00073",
  // },
  {
    name: "WhatsApp",
    iconName: whatsapp,
    bc: "#25D366",
  },
  // {
  //   name: "Snapchat",
  //   iconName: path,
  //   bc: "#FFFC00",
  // },
  {
    name: "Telegram",
    iconName: telegram,
    bc: "#0088CC",
  },
];

const Wrapper = styled.div`

	/* border-radius: 0.8rem;
	background-color: var(--accent_2-main);
	z-index: 2;
	width: 45.6rem;
	overflow: hidden;
	@media (max-width:760px){ */

  border-radius: 0.8rem;
  background-color: var(--accent_2-main);
  width: 45.6rem;
  overflow: hidden;
  pointer-events: none;

  @media (max-width: 760px) {
    width: auto;
  }
  .p1 {
    margin-bottom: 2.4rem;
  }
  label {
    display: none;
  }
  .para {
    margin-bottom: 1.6rem;
    color: white;
  }

  form {
    width: 100%;
    position: relative;
    grid-template-columns: 1fr;
    input {
      color: var(--placeholder);
    }
  }
  .top {
    margin: 3.2rem 4.1rem;
    padding: 2.4rem 2.4rem 2.8rem;
    background-color: var(--white);
    color: var(--title-active);
  }
  .copy {
    position: absolute;
    right: 2.6rem;
    z-index: 3;

    transform: translateY(65%);
  }
  .btm {
    padding: 2.9rem 4.8rem;
    background-color: var(--title-active);
  }

  .items {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;

    .item + .item {
      margin-bottom: 2.8rem;
    }

    p {
      width: fit-content;
      text-align: center;
      margin: auto;
      margin-top: 0.4rem;
    }

    .img-ctn {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 4.8rem;
      height: 4.8rem;
      margin: auto;
    }
  }
`;

const Card2 = () => {
  return (
    <Wrapper>
      <div className="top">
        <p className="title-4 p1">Share to</p>
        <div className="items">
          {ICONS.map((item) => (
            <div className="item" key={item.name}>
              <div
                style={{ backgroundColor: `${item.bc}` }}
                className="img-ctn"
              >
                <img src={item.iconName} alt="icon" />
              </div>
              <p className="subtitle-4">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="btm">
        <p className="subtitle-4 para"> Copy link</p>
        <Formik
          initialValues={{
            link: "",
          }}
          onSubmit={(values) => {
            // handleRegister(values);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <img
                // onClick={() => setShowInput(!showInput)}
                src={copy}
                alt="copy"
                className="copy"
              />
              <FormGroup
                fieldStyle="shortText"
                label="Find friends"
                name="link"
                value="https://www.giftly.me/Natasha/Doja"
                // className={`input ${showInput ? "mb" : ""}`}
              />
            </FormWrapper>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default Card2;
