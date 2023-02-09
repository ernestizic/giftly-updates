import styled from "styled-components";

export const LeaderboardWrapper = styled.div`
  width: 480px;
  margin: auto;
  
  @media screen and (max-width: 768px) {
    width: calc(100vw - 48px);
    padding-top: 60px;

    .title {
      font-size: 24px;
      line-height: 36px;
    }

    p {
      font-size: 18px;
      line-height: 28px;
    }
  }
`;


export const TopRankedWrapper = styled.div``;

export const TopRanked = styled.div`
  position: relative;

  .inner {
    border: 5px solid;

    &.first {
      border-color: #ffca28;
    }

    &.second {
      border-color: var(--accent_1-dark);
    }

    &.third {
      border-color: var(--primary-main);
    }
  }

  .medal {
    position: absolute;
    bottom: -16px;
  }

  .crown {
    position: absolute;
    top: -44px;
  }

  @media screen and (max-width: 768px) {
    .inner {
      &.first {
        height: 72px;
        width: 72px;
        font-size: 36px;
      }

      &.second,
      &.third {
        height: 56px;
        width: 56px;
        font-size: 28px;
      }
    }

    .crown {
      height: 48px;
      top: -37px;
    }

    .medal {
      height: 24px;
      bottom: -12px;
    }
  }
`;
export const UserContainer = styled.div`
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--accent_3-light);
  width: 100%;
  left: 0;
  @media screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    margin: -2px;
  }
`
export const UserRow = styled.div`
  margin: 1px auto;
  max-width: 50%;
  padding: 12px 30px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .name-section{
    display: flex;
    gap: 37px;
    align-items: center;
    & > div {
      gap: 5px
    }
    @media screen and (max-width: 768px) {
      gap: 22px
    }
  }

  .giftlyScore {
    img {
      height: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 12px 20px;
  }
`;

export const OtherRow = styled.div`
  padding: 12px 0;
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 3fr;
  grid-gap: 8px;
`;
