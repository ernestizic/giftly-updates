import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
import { base_url, base_url_vendors } from "utils/utils";
import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AddToWishlist from "components/giftIdeas/AddToWishlist";
import CreateUserWishList from "components/user/CreateUserWishList";
import Loader from "components/global/Loader";
import ProductCard from "components/giftIdeas/ProductCard";
import ProductPreview from "components/giftIdeas/ProductPreview";
import Spacer from "components/global/Spacer";
import axios from "axios";
import styled from "styled-components";

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
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlists, setWishlists] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const token = useSelector((state) => state.auth.token);

  const showPreview = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    document.querySelector(".productPreview")?.classList.remove("hidden");
  };

  const getGiftIdeas = async () => {
    try {
      const res = await axios.get(`${base_url_vendors}/market`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));

      if (!res) {
        setLoading(false);
        dispatch(showAlert("An error occurred"));
        return;
      }

      if (res.data.status === true) {
        setLoading(false);
        setData(res.data.data.products);
        return
      }
      setLoading(false);
      dispatch(showAlert(res.data.message));
    } catch (e) {
      setLoading(false);
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      dispatch(setAlertTimeout(timeout));
      dispatch(showAlert(e.response?.data.message || "Something went wrong"));
    }
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
      console.log(e)
    }
  };

  useEffect(() => {
    getGiftIdeas();
    getWishLists();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <ProductPreview details={selectedProduct} />
      <AddToWishlist wishlists={wishlists} product={selectedProduct} />
      <h4 className="title-4 colorTitleActive title">Gift Ideas</h4>
      <Spacer y={4.8} />
      {loading && (
        <div className="flexRow justifyCenter">
          <Loader />
        </div>
      )}
      <Categories></Categories>
      {!loading && (
        <ProductList>
          {data?.map((product) => (
            <ProductCard key={product.product_id} showPreview={showPreview} details={product} />
          ))}          
        </ProductList>
      )}

      <Routes>
        <Route path="new-wishlist" element={<CreateUserWishList />} />
      </Routes>
    </Wrapper>
  );
};

export default GiftIdeas;
