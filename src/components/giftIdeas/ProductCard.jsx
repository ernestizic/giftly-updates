import Button from "components/global/Button";
import ImageWrapper from "./ImageWrapper";
import { base_url_vendors } from "utils/utils";
import plusIcon from "assets/icons/plus_white.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: var(--shadow_2);

  .imageWrapper {
    border-radius: 16px 16px 0 0;
  }

  .description {
    height: 85px;
    display: grid;
    grid-template-columns: auto 36px;
    grid-gap: 8px;
    align-items: center;
    padding: 16px;
    border-radius: 0 0 8px 8px;
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

const ProductCard = ({ showPreview = () => null, details }) => {
  return (
    <Wrapper>
      <ImageWrapper className="imageWrapper fullWidth">
        <img src={`${base_url_vendors}/../${details?.avatar}`} className="image" alt="." loading="lazy" />
      </ImageWrapper>
      <div className="description">
        <div className="textWrapper fullWidth">
          <p className="body-3 semi-bold ellipsify text">{details?.name}</p>
          <p className="body-3 ellipsify text">
            <del>N</del>
            {parseInt(details.amount).toLocaleString()}
          </p>
        </div>
        <Button
          className="previewBtn"
          iconLeft={plusIcon}
          onClick={() => showPreview(details)}
        />
      </div>
    </Wrapper>
  );
};

export default ProductCard;
