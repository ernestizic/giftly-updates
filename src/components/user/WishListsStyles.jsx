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

  .searchTrigger {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 16px 24px;

    .logo {
      display: block;
    }

    .searchTrigger {
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
        background-color: var(--background);
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

  .text {
    font-size: ${(props) => props.textSize ?? "24"}px;
    font-style: normal;
    font-weight: 900;
    line-height: auto;
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
