import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import CloseModal from "components/global/CloseModal";
import ImageWrapper from "./ImageWrapper";
import Spacer from "components/global/Spacer";
import { base_url_vendors } from "utils/utils";
import plusIcon from "assets/icons/plus_white.svg";
import styled from "styled-components";

const Wrapper = styled(Backdrop)``;

const Card = styled.div`
  display: grid;
  grid-template-columns: 302px 360px;
  grid-template-rows: 302px;

  > .closeModal {
    display: none;
  }

  .imageWrapper {
    border-radius: 16px 0 0 16px;
  }

  .description {
    padding: 48px;
    border-radius: 0 16px 16px 0;
    background-color: #ffffff;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-flow: column;
    gap: 16px;
    padding: 24px 16px;
    background-color: #ffffff;
    border-radius: 16px;
    width: calc(100% - 32px);
    max-width: 343px;

    > .closeModal {
      display: flex;
    }

    .imageWrapper {
      border-radius: 8px;
    }

    .description {
      padding: 0;

      .closeModal {
        display: none;
      }
    }
  }
`;

const ProductPreview = ({ details }) => {
  const handleAdd = () => {
    document.querySelector(".productPreview").classList.add("hidden");
    document.querySelector(".addToWishlist").classList.remove("hidden");
  };

  return (
    <Wrapper className="flexColumn justifyCenter alignCenter hidden productPreview">
      <Card>
        <CloseModal selector=".productPreview" />
        <ImageWrapper className="imageWrapper fullWidth">
          <img
            src={`${base_url_vendors}/../${details?.avatar}`}
            className="image"
            alt="."
          />
        </ImageWrapper>
        <div className="description fullWidth">
          <CloseModal selector=".productPreview" />
          <Spacer y={2.4} yMobile={0} />
          <p className="body-1 bold colorTitleActive ellipsify productName">
            {details?.name}
          </p>
          <Spacer y={0.4} />
          <p className="body-2 colorGrayScale productPrice">
            {details.currency === "Dollar" ? "$" : <del>N</del>}
            {parseInt(details.amount).toLocaleString()}
          </p>
          <Spacer y={0.4} />
          <a
            href={details?.purchase_link || "/user/gift-ideas"}
            target="_blank"
            rel="noopener noreferrer"
            className="body-3 colorPrimaryMain ellipsify productLink"
          >
            {details?.store}
          </a>
          <Spacer y={2.4} />
          <Button
            text="Add to Wishlist"
            iconLeft={plusIcon}
            onClick={handleAdd}
            fullWidth
          />
        </div>
      </Card>
    </Wrapper>
  );
};

export default ProductPreview;
