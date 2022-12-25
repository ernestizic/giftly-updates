import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import AddToWishlist from "components/giftIdeas/AddToWishlist";
import CreateUserWishList from "components/user/CreateUserWishList";
import Loader from "components/global/Loader";
import ProductCard from "components/giftIdeas/ProductCard";
import ProductPreview from "components/giftIdeas/ProductPreview";
import Spacer from "components/global/Spacer";
import axios from "axios";
import { base_url } from "utils/utils";
import { getGiftIdeas } from "api/giftIdeas";
import styled from "styled-components";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  padding: 48px;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

const Categories = styled.div`
  width: 100%;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 48px;

  @media screen and (max-width: 576px) {
    grid-gap: 16px;
  }
`;

const GiftIdeas = () => {
  const [wishlists, setWishlists] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const token = useSelector((state) => state.auth.token);

  const showPreview = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    document.querySelector(".productPreview")?.classList.remove("hidden");
  };

  const getWishLists = async () => {
    try {
      const res = await axios.get(`${base_url}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === "success") {
        setWishlists(res.data.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { loading, list, lastListElementRef } = useInfiniteScroll(getGiftIdeas);

  useEffect(() => {
    getWishLists();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <ProductPreview details={selectedProduct} />
      <AddToWishlist wishlists={wishlists} product={selectedProduct} />
      <h4 className="title-4 colorTitleActive title">Gift Ideas</h4>
      <Spacer y={4.8} />
      <Categories></Categories>
      <ProductList>
        {list?.map((product, index) => (
          <ProductCard
            key={product.product_id}
            showPreview={showPreview}
            details={product}
            ref={list.length === index + 1 ? lastListElementRef : null}
          />
        ))}
      </ProductList>
      <Spacer y={4.8} />
      {loading && (
        <div className="flexRow justifyCenter">
          <Loader />
        </div>
      )}
      <Routes>
        <Route path="new-wishlist" element={<CreateUserWishList />} />
      </Routes>
    </Wrapper>
  );
};

export default GiftIdeas;
