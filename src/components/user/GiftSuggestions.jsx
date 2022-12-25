import {
  clearAlert,
  setAlertTimeout,
  showAlert,
} from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import { Card } from "./WishListsStyles";
import CheckBox from "components/global/CheckBox";
import CloseModal from "components/global/CloseModal";
import ImageWrapper from "components/giftIdeas/ImageWrapper";
import Loader from "components/global/Loader";
import Logo from "components/global/Logo";
import Spacer from "components/global/Spacer";
import axios from "axios";
import { base_url_vendors } from "utils/utils";
import { setTempList } from "features/wishList/wishListSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const token = useSelector((state) => state.auth.token);
  const tempList = useSelector((state) => state.wishList.tempList);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(-1);
  };

  const handleAdd = async () => {
    const selectedProducts = data.filter((d) =>
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
        return;
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

  useEffect(() => {
    getGiftIdeas();
    // eslint-disable-next-line
  }, []);

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
        {loading ? (
          <>
            <div className="flexRow justifyCenter">
              <Loader />
            </div>
            <Spacer y={4.8} />
          </>
        ) : (
          data?.map((product) => (
            <Product key={product.product_id}>
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
          ))
        )}

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
