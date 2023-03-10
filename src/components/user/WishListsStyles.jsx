import { AuthCard } from "components/auth/AuthStyles";
import styled from "styled-components";


export const HeaderWrapper = styled.div`
  background: #fff;
  position: sticky;
  z-index: 10;
  top: 0;
  padding: 24px 48px;
  border-bottom: 1px solid var(--accent_3-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    color: var(--title-active);
    font-weight: bold;
  }
  .searchTrigger, .menu-icon {
    display: none;
  }
  .logo{ display: none }

  .header-action-container {
    position: relative;
    display: flex;
    gap: 30px;
  }
  @media screen and (max-width: 768px) {
    position: fixed;
    width: 100%;
    background-color: var(--title-active);
    padding: 16px;
    .logo{ display: block }
    h3 {
      color: #fff;
    }
    .searchTrigger, .menu-icon {
      display: block;
      img {
        filter: var(--filter-white);
      }
    }
    .header-action-container {
      .add-btn {
        display: none;
      }
    }
  }
`

export const Search = styled.div`
  width: 400px;
  height: 56px;
  border: 1px solid #efefef;
  border-radius: 4px;
  padding: 8px 0;
  display: grid;
  grid-template-columns: 170px auto;
  background-color: #ffffff;

  .dropdownWrapper {
    height: 100%;
  }

  .searchInputWrapper {
    display: grid;
    grid-template-columns: auto 44px;
    position: relative;

    .icon {
      &.mb {
        display: none;
      }
    }
  }

  .searchResults {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    z-index: 5;
    background-color: #ffffff;
    border-radius: 8px;
    max-height: 248px;
    // padding: 24px 0;
    box-shadow: var(--shadow_1);
    overflow: auto;

    .item {
      padding: 12px 24px;

      .text {
        width: calc(100% - 56px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      &:hover {
        background-color: var(--input-bg);
      }
    }

    .notFound {
      padding: 24px;

      .subtitle {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
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
    position: fixed;
    top: -60px;
    left: 24px;
    z-index: 7;
    width: calc(100vw - 48px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease-out;

    &.open {
      opacity: 1;
      pointer-events: all;
      top: 20px;
    }

    .searchInputWrapper {
      .icon {
        &.mb {
          display: block;
        }

        &.lg {
          display: none;
        }
      }
    }
  }
`;

export const Initials = styled.div`
  background-color: ${(props) => props.bg ?? "var(--primary-main)"};
  color: #ffffff;
  width: ${(props) => props.size ?? "48"}px;
  height: ${(props) => props.size ?? "48"}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: ${(props) => props.textSize ?? "24"}px;
  font-style: normal;
  font-weight: 900;
  // line-height: 100%;
  letter-spacing: 0px;
  text-transform: uppercase;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 2fr));
  grid-gap: 48px;
  padding: 0 48px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 50px 10px;
  }
`;

export const NoLists = styled.div`
  max-width: 40%;
  margin: auto;
  text-align: center;
  .header-text {
    font-size: 24px;
    line-height: 36px;
    color: #121212;
  }
  p{
    font-style: normal;
    font-weight: 475;
    font-size: 18px;
    line-height: 27px;
    color: #3D3D3D;
  }
  .createButton {
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    min-width: 90%;
  }
`;

export const Card = styled(AuthCard)`
  ::-webkit-scrollbar {
    display: none;
  }
  margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding-bottom: 24px;
  position: relative;
  height: 100%;
  width: 600px;
  height: calc(100% - 16px);
  max-height: 836px;
  overflow: auto;

  header {
    margin-bottom: 8px;
  }
  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
  }

  .giftSuggestionsBtn {
    width: 100%;
    height: 48px;
    border: 1px solid var(--title-active);
    border-radius: 8px;
    transition: all 0.2s ease-out;

    &:hover {
      border-color: var(--primary-dark);
    }
  }

  .actionBtns {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 24px;
    width: 100%;
    margin: auto;
  }

  .stickyBottom {
    position: sticky;
    bottom: -24px;
    background-color: #ffffff;
    padding: 24px 0;
    z-index: 2;

    .actionBtns {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    margin: 0;
    padding: 24px 16px 0;
    overflow: auto;
    border-radius: 0;

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

    .giftSuggestionsBtn {
      margin-bottom: 120px;
    }

    .stickyBottom {
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      padding: 24px 16px 10px;
    }
  }
`;

export const PrivacyOptions = styled.div`
  .toggler {
    color: #3D3D3D;
    font-style: normal;
    font-weight: 475;
    font-size: 14px;
  }

  .options {
    opacity: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    transition: all 0.2s ease-out;

    &.show {
      opacity: 1;
      height: 72px;
      pointer-events: all;
    }
  }
`;
