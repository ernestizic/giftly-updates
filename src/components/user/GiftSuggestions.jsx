import { base_url, base_url_vendors } from "utils/utils";
import { clearAlert, setAlertTimeout, showAlert } from "features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "components/global/Backdrop";
import Button from "components/global/Button";
import CloseModal from "components/global/CloseModal";
import Dropdown from "components/user/Dropdown";
import FormGroupCustom from "components/global/FormGroupCustom";
import ImageWrapper from "./ImageWrapper";
import Spacer from "components/global/Spacer";
import axios from "axios";
import { setTempList } from "features/wishList/wishListSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled(Backdrop)``;

const Product = styled.div`
  display: grid;
  grid-template-columns: 48px auto;
  grid-gap: 8px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px 24px;

  .imageWrapper {
    border-radius: 8px;
  }
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  position: relative;

  .line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #d5d8df;
  }

  .text {
    position: relative;
    background-color: #ffffff;
    padding-inline: 8px;
    line-height: 20px;
  }
`;

const GiftSuggestions = ({ wishlists, product }) => {
  const navigate = useNavigate();
  const [selectedWishlist, setSelectedWishlist] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    document.querySelector(".addToWishlist").classList.add("hidden");
    setSelectedWishlist("");
    setQuantity("1");
    setDescription("");
  }

  const addListItem = async (items) => {
    const tempListId = wishlists.find((list) => list.title === selectedWishlist)?.id

    setLoading(true);
    try {
      const res = await axios.post(
        `${base_url}/items/${tempListId}`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === "success") {
        const timeout = setTimeout(() => {
          dispatch(clearAlert());
        }, 5000);
        dispatch(setAlertTimeout(timeout));
        dispatch(showAlert("Link copied!"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = async (target) => {
      let temp = [];

      temp.push({
        name: product?.name,
        link: product?.purchase_link || "",
        quantity,
        description,
        price: product?.amount,
      });
  
      if (target === "new") {
        dispatch(setTempList(temp));
        navigate("new-wishlist");
      }

      if (target === "existing") {
        await addListItem(temp)
      }

      handleClose();
  };

  return (
    <Wrapper className="flexColumn alignCenter hidden addToWishlist">
      <Card>
        <CloseModal selector=".addToWishlist" callback={handleClose} />
        <Spacer y={2.4} />
        <h3 className="title-4 title textCenter colorTitleActive">
          Add to Wishlist
        </h3>
        <Spacer y={2.4} />
        <Product>
          <ImageWrapper className="imageWrapper fullWidth">
          <img src={`${base_url_vendors}/../${product?.avatar}`} className="image" alt="." />
          </ImageWrapper>
          <div>
            <p className="body-3 bold colorTitleActive productName">
              {product?.name}
            </p>
            <Spacer y={0.2} />
            <p className="body-3 colorGrayScale productPrice"><del>N</del>
            {parseInt(product.amount).toLocaleString()}</p>
          </div>
        </Product>
        <Spacer y={1.6} />
        <div>
          <Dropdown
            name="wishlist"
            placeholder="Select Wishlist"
            value={selectedWishlist}
            list={wishlists?.map((list) => list.title)}
            setValue={setSelectedWishlist}
            bg="#ffffff"
          />
          <Spacer y={1.6} />
          <FormGroupCustom
            fieldStyle="shortText"
            name="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Spacer y={1.6} />
          <FormGroupCustom
            fieldStyle="shortText"
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Spacer y={1.6} />
          <Button text="Add to Wishlist" loading={loading} disabled={loading || !selectedWishlist} onClick={() => handleAdd("existing")} fullWidth />
        </div>
        <Spacer y={1.6} />
        <Divider className="fullWidth">
          <div className="line"></div>
          <span className="body-4 text colorGrayScale">or</span>
        </Divider>
        <Spacer y={1.6} />
        <Button
          className="noBorder"
          type="button"
          text="Add to a new Wishlist"
          onClick={() => handleAdd("new")}
          fullWidth
        />
      </Card>
    </Wrapper>
  );
};

export default GiftSuggestions;
