import styled from "styled-components";

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding: 24px 48px;
  z-index: 6;

  .logo {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 16px 24px;

    .logo {
      display: block;
    }
  }
`;

export const Search = styled.div`
  width: 400px;
  height: 48px;
  border: 1px solid #efefef;
  border-radius: 4px;
  padding: 8px 0;
  display: grid;
  grid-template-columns: 140px auto;

  .dropdownWrapper {
    height: 100%;
  }

  .searchInputWrapper {
    display: grid;
    grid-template-columns: auto 44px;
  }

  .divider {
    width: 1px;
    height: 100%;
    background-color: var(--line);
    margin-left: 9px;
  }

  .inputWrapper {
    height: 100% !important;
  }

  .fieldWrapper {
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Initials = styled.div`
  background-color: var(--primary-main);
  color: #ffffff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  .text {
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: 30px;
    letter-spacing: 0px;
  }
`;

export const SubHeader = styled.div`
  padding: 0 48px;

  @media screen and (max-width: 768px) {
    padding: 0 24px;
    flex-direction: column;

    .captionWrapper {
      flex-direction: column;

      .title,
      subtitle {
        text-align: center;
      }

      .heartIcon {
        margin-bottom: 16px;
      }
    }

    .createButton {
      position: fixed;
      bottom: 60px;
      right: 24px;
      z-index: 2;
      border-radius: 50%;
      height: 56px;
      width: 56px;

      span {
        display: none;
      }

      .icon {
        margin: 0;
      }
    }
  }
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;
  padding: 0 48px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }
`;

export const NoLists = styled.div`
  width: 300px;
  margin: auto;
`;
