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
  border-radius: 16px;
  background-color: var(--accent_2-main);
  width: 45.6rem;
  overflow: hidden;
  position: relative;
  z-index: 2;
  overflow: hidden;
  height: max-content;

  @media (max-width: 1110px) {
    width: 34rem;
  }

  @media (max-width: 768px) {
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
    pointer-events: none;

    input {
      color: var(--placeholder);
    }
  }
  .top {
    width: calc(100% - 82px);
    margin: 32px auto;
    padding: 24px;
    background-color: white;
    color: var(--title-active);

    @media (max-width: 900px) {
      width: calc(100% - 56px);
      margin: 24px auto;
      padding: 1rem;
    }
  }
  .copy {
    position: absolute;
    right: 2.6rem;
    z-index: 3;

    transform: translateY(65%);
  }
  .btm {
    padding: 3.9rem 4.8rem;
    background-color: var(--title-active);
    @media (max-width: 1300px) {
      padding: 2.9rem 4.8rem;
    }
    @media (max-width: 900px) {
      padding: 1.5rem 2.4rem;
    }
  }

  .items {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    grid-row-gap: 24px;

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
      @media (max-width: 1110px) {
        width: 3rem;
        height: 3rem;
      }

      img {
        width: 100%;
      }
    }
  }

  @media (max-width: 1110px) {
    .item {
      p {
        font-size: 1.2rem;
      }
    }
  }
  @media (max-width: 900px) {
    width: 28rem;
    height: fit-content;
    .item {
      p {
        font-size: 1rem;
      }
    }
    .fieldWrapper {
      height: 4rem;
    }
  }

  .inputField {
    input {
      width: calc(100% - 32px);
    }
  }

  @media screen and (max-width: 768px) {
    .top {
      width: calc(100% - 64px);
      margin: 24px auto;

      .p1 {
        font-size: 16px;
        line-height: 24px;
      }

      .img-ctn {
        width: 32px;
        height: 32px;
      }

      .img-label {
        font-size: 12px;
      }
    }

    .inputField {
      input {
        font-size: 12px;
      }
    }

    .btm {
      .copy {
        height: 20px;
      }
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
                // style={{ backgroundColor: `${item.bc}` }}
                className="img-ctn"
              >
                <img src={item.iconName} alt="icon" />
              </div>
              <p className="subtitle-4 img-label">{item.name}</p>
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
            return values;
          }}
        >
          {({ handleSubmit }) => (
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
                className={`inputField`}
              />
            </FormWrapper>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};

export default Card2;
