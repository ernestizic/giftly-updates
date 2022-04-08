import styled from "styled-components";

export const LeaderboardWrapper = styled.div`
  width: 480px;
  margin: auto;

  @media screen and (max-width: 768px) {
    width: calc(100vw - 48px);

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

export const UserRow = styled.div`
  padding: 12px 18px;
  background-color: var(--accent_2-main);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  grid-gap: 24px;

  .giftlyScore {
    img {
      height: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
`;

export const OtherRow = styled.div`
  padding: 12px 0;
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 3fr;
  grid-gap: 8px;
`;
