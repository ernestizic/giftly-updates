import { useDispatch, useSelector } from "react-redux";

import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import { Card } from "./WishListsStyles";
import CheckBox from "components/global/CheckBox";
import CloseModal from "components/global/CloseModal";
import EmptyState from "components/global/EmptyState";
import ImageWrapper from "components/giftIdeas/ImageWrapper";
import Loader from "components/global/Loader";
import Logo from "components/global/Logo";
import ProductCategories from "components/giftIdeas/Categories";
import Spacer from "components/global/Spacer";
import { base_url_vendors } from "utils/utils";
import { getGiftIdeas } from "api/giftIdeas";
import { setTempList } from "features/wishList/wishListSlice";
import styled from "styled-components";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled(Backdrop)`
  .card {
    width: 600px;
  }

  @media screen and (max-width: 768px) {
    .card {
      width: 100%;
    }
  }
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: 20px 48px auto;
  grid-gap: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px 24px;
  margin-bottom: 16px;

  .imageWrapper {
    border-radius: 8px;
  }

  .textWrapper {
    max-width: 320px;
  }

  @media screen and (max-width: 768px) {
    .textWrapper {
      max-width: 200px;
    }
  }
`;

const GiftSuggestions = () => {
  const navigate = useNavigate();
  const tempList = useSelector((state) => state.wishList.tempList);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const { loading, list, lastListElementRef, updateFilters } = useInfiniteScroll(getGiftIdeas, "products");
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };

  const handleAdd = async () => {
    const selectedProducts = list.filter((d) =>
      selectedProductIds.includes(d.product_id)
    );

    const temp = selectedProducts.map((product) => ({
      name: product?.name,
      link: product?.purchase_link || "",
      price: (product?.currency === "Dollar" ? "$" : "₦") + product?.amount,
      quantity: 1,
    }));

    dispatch(setTempList(tempList[0].name ? tempList.concat(temp) : temp));

    handleClose();
  };

  const handleSelect = async (id) => {
    if (!id) return;

    const index = selectedProductIds.findIndex((curr) => curr === id);

    if (index === -1) {
      setSelectedProductIds((prev) => [...prev, id]);
    } else {
      setSelectedProductIds((prev) => prev.splice(index, 1));
    }
  };

  return (
    <Wrapper className="flexColumn alignCenter">
      <Card className="card">
        <CloseModal callback={handleClose} />
        <Spacer y={2.4} />
        <div className="flexRow justifyCenter">
          <Logo />
        </div>
        <Spacer y={0.8} />
        <p className="title-4 title textCenter colorTitleActive textCenter">
          Gift suggestions
        </p>
        <Spacer y={0.4} />
        <h3 className="subtitle-4 subtitle textCenter">
          Here’s a list of gift suggestions that you can add to your wish list.
        </h3>
        <Spacer y={4.8} />
        <ProductCategories setFilters={updateFilters} />
        <Spacer y={2.4} />
        {list?.map((product, index) => (
          <Product
            key={product.product_id}
            ref={list.length === index + 1 ? lastListElementRef : null}
          >
            <CheckBox
              id={`product_${product.product_id}`}
              name={`product_${product.product_id}`}
              isChecked={selectedProductIds.includes(product.product_id)}
              onChange={() => {
                handleSelect(product.product_id);
              }}
            />
            <ImageWrapper className="imageWrapper fullWidth">
              <img
                src={`${base_url_vendors}/../${product.avatar}`}
                className="image"
                alt="."
              />
            </ImageWrapper>
            <div className="textWrapper">
              <p className="body-3 bold colorTitleActive ellipsify productName">
                {product.name}
              </p>
              <Spacer y={0.2} />
              <p className="body-3 colorGrayScale productPrice">
                {product.currency === "Dollar" ? "$" : <del>N</del>}
                {parseInt(product.amount).toLocaleString()}
              </p>
            </div>
          </Product>
        ))}
        {loading && (
          <>
            <Spacer y={4.8} />
            <div className="flexRow justifyCenter">
              <Loader />
            </div>
            <Spacer y={4.8} />
          </>
        )}
        {!loading && !list.length && <EmptyState />}

        <div className="stickyBottom">
          <div className="flexRow justifyCenter actionBtns">
            <Button
              text="Cancel"
              className="secondary"
              onClick={() => handleClose()}
              fullWidth
            />
            <Button
              text="Add to Wishlist"
              disabled={!selectedProductIds.length}
              onClick={() => handleAdd()}
              fullWidth
            />
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default GiftSuggestions;
