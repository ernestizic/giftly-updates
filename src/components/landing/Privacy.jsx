import Footer from "components/global/Footer";
import Nav from "components/global/Nav";
import React from "react";
import styled from "styled-components";
import data from "assets/data.json";
import Nav2 from "./components/Nav2";

const Wrapper = styled.div`
  .ctn {
    padding: 9.6rem 0 10.1rem 12rem;

    @media (max-width: 1000px) {
      padding: 9.6rem 0 10.1rem 5rem;
    }

    display: flex;
    & > :first-child {
      width: 95.5rem;
      @media (max-width: 900px) {
        width: auto;
        max-width: 89rem;
      }
    }
    & > :last-child {
      margin-left: auto;
    }

    @media (max-width: 768px) {
      width: auto;
      padding: 4.8rem 2.4rem;
    }
    @media (max-width: 768px) {
      width: auto;
      padding: 4.8rem 1rem;
    }
  }

  h2,
  h3,
  h5 {
    font-family: "BoldenVan";
    color: var(--title-active);
  }
  h2 {
    font-size: 4.8rem;
    line-height: 5.6rem;
    padding-bottom: 4.8rem;
    @media (max-width: 1000px) {
      font-size: 3.6rem;
      line-height: 4.8rem;
    }
  }
  h3 {
    font-size: 3.6rem;
    line-height: 4.8rem;
    margin-bottom: 1.6rem;
    margin-top: 4.8rem;
    @media (max-width: 1000px) {
      font-size: 2.4rem;
      line-height: 3.6rem;
    }
  }
  h5 {
    font-size: 2.4rem;
    line-height: 3.6rem;
    margin: 1.6rem 0;
    @media (max-width: 1000px) {
      font-size: 1.8rem;
      line-height: 2.4rem;
    }
  }

  .child {
    margin-top: 10rem;
  }

  .priv1 + .priv1 {
    margin-top: 3.2rem;
  }

  .priv1 + .priv1 {
    margin-top: 3.2rem;
  }

  .normal + .list {
    margin-top: 1.6rem;
  }
  .list + .normal {
    margin-top: 1.6rem;
  }

  p,
  li {
    font-size: 2rem;
    line-height: 2.8rem;
    @media (max-width: 1000px) {
      font-size: 1.6rem;
      line-height: 2.4rem;
    }
  }
`;

const privacyPolicy = data.privacyPolicy;
const personalData = privacyPolicy.personalData.map((ele, index) => {
  if ([0, 5, 10, 15, 34, 51, 53, 57, 69].includes(index)) {
    return <h5 key={ele + index}>{ele}</h5>;
  }
  if (
    (index > 1 && index < 6) ||
    (index > 16 && index < 20) ||
    (index > 35 && index < 44) ||
    (index > 44 && index < 51) ||
    (index > 63 && index < 69) ||
    index === 12
  ) {
    return (
      <p className="list" key={ele + index}>
        {ele}
      </p>
    );
  }

  return (
    <p
      className={`normal ${
        [21, 26, 29, 33, 55, 60, 62].includes(index) ? "mg-top " : ""
      } ${[21, 55].includes(index) ? " mg-btm" : ""}    `}
      key={ele + index}
    >
      {ele}
    </p>
  );
});

const Privacy = () => {
  return (
    <Wrapper>
      <Nav wt />
      <div className="ctn">
        <div>
          <h2>Privacy Policy</h2>
          {privacyPolicy.privacy.map((ele) => (
            <p className="priv1" key={ele}>
              {ele}
            </p>
          ))}
          <h3>Interpretation</h3>
          {privacyPolicy.interpretation.map((ele) => (
            <p key={ele}>{ele}</p>
          ))}
          <h3>Definitions</h3>
          <p>-For this Privacy Policy:</p>
          <ul>
            {privacyPolicy.definition.map((ele) => (
              <li key={ele}>{ele}</li>
            ))}
          </ul>
          <h3>Collecting and Using Your Personal Data</h3>
          {personalData}
          <h3 className="child">Children's Privacy </h3>
          {privacyPolicy.changeToPrivacy.map((ele, index) => (
            <p key={ele + index}>{ele}</p>
          ))}
          <h3 className="link">Links to Other Websites</h3>
          {privacyPolicy.linkToWebsite.map((ele, index) => (
            <p key={ele + index}>{ele}</p>
          ))}
          <h3> Changes to this Privacy Policy</h3>
          {privacyPolicy.changeToPrivacy.map((ele, index) => (
            <p key={ele + index}>{ele}</p>
          ))}
          <h3>Contact Us</h3>
          {privacyPolicy.contactUs.map((ele, index) => (
            <p key={ele + index}>{ele}</p>
          ))}
        </div>
        <Nav2 />
      </div>

      <Footer />
    </Wrapper>
  );
};

export default Privacy;
