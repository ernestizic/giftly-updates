import styled from "styled-components";

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding: 24px 48px;
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
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;
  padding: 0 48px;
`;

export const NoLists = styled.div`
  width: 300px;
  margin: auto;
`;
