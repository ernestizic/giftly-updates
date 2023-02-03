import Button from "components/global/Button";
import ImageWrapper from "./ImageWrapper";
import { base_url_vendors } from "utils/utils";
import { forwardRef } from "react";
import plusIcon from "assets/icons/plus_white.svg";
import Heart from "assets/icons/heart.svg"
import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: 0px 1px 10px 2px #E5E5E5;
  border-radius: 15px;

  .imageWrapper {
    border-radius: 16px 16px 0 0;
    position: relative;
    .tag {
      position: absolute;
      padding: 5px 15px;
      border-bottom-right-radius: 15px;
      background: var(--primary-main);
      color: #fff;
      display: flex;
      align-items: center;
      gap: 5px;
      img {
        width: 18px;
        filter: var(--filter-white);
      }
    }
  }

  .description {
    background: #fff;
    padding: 16px;
    border-radius: 0 0 8px 8px;
  }
  .desc-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .textWrapper {
    max-width: calc(240px - 32px - 36px - 8px);
  }

  .previewBtn {
    width: 36px;
    height: 36px;
    padding: 0;
  }

  @media screen and (max-width: 768px) {
    overflow: hidden;
    .description {
      padding: 8px;
    }
    .textWrapper {
      .text {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
`;

const ProductCard = forwardRef(({ showPreview = () => null, details }, ref) => {
  const val = details.tags?.find((item) => item?.name === 'Valentines')
  return (
    <Wrapper ref={ref}>
      <ImageWrapper className="imageWrapper">
        {val && (
          <div className="tag">
            <img src={Heart} alt="heart" />
            Valentine
          </div>)}
        <img
          src={`${base_url_vendors}/../${details?.avatar}`}
          className="image"
          alt="."
          loading="lazy"
        />
      </ImageWrapper>
      <div className="description">
        <div className="textWrapper fullWidth">
          <p className="body-3 semi-bold ellipsify text">{details?.name}</p>
        </div>
        <div className="desc-2">
          <p className="body-3 ellipsify text">
            {details.currency === "Dollar" ? "$" : <del>N</del>}
            {parseInt(details.amount).toLocaleString()}
          </p>
          <Button
            className="previewBtn"
            iconLeft={plusIcon}
            onClick={() => showPreview(details)}
          />
        </div>
      </div>
    </Wrapper>
  );
});

export default ProductCard;
