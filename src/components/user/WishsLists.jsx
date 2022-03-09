import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";
import plusIcon from "assets/icons/plus_white.svg";
import heartIcon from "assets/icons/heart_primary_circle.svg";
import Dropdown from "components/user/Dropdown";
import { useState } from "react";
import FormGroup from "components/global/FormGroup";
import FormGroupCustom from "components/global/FormGroupCustom";
import Spacer from "components/global/Spacer";
import Button from "components/global/Button";
import { useNavigate } from "react-router";
import WishListCard from "./WishListCard";
import { Route, Routes } from "react-router-dom";
import ShareList from "./ShareList";
import DeletePrompt from "components/wishlist/DeletePrompt";
import CreateWishList from "components/wishlist/CreateWishList";
import EditWishList from "components/wishlist/EditWishList";

const Wrapper = styled.div``;

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding: 24px 48px;
`;

const Search = styled.div`
  width: 400px;
  height: 48px;
  border: 1px solid #efefef;
  border-radius: 4px;
  padding: 8px 0;
  display: grid;
  grid-template-columns: 140px auto;

  .dropdownWrapper {
    height: 100%;
  }

  .searchInputWrapper {
    display: grid;
    grid-template-columns: auto 44px;
  }

  .divider {
    width: 1px;
    height: 100%;
    background-color: var(--line);
    margin-left: 9px;
  }

  .inputWrapper {
    height: 100% !important;
  }

  .fieldWrapper {
    height: 100%;
  }
`;

const Initials = styled.div`
  background-color: var(--primary-main);
  color: #ffffff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  .text {
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: 30px;
    letter-spacing: 0px;
  }
`;

const SubHeader = styled.div`
  padding: 0 48px;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;
  padding: 0 48px;
`;

const searchCategories = ["Friends", "Wish list"];

const WishsLists = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Friends");
  const [search, setSearch] = useState("");

  return (
    <Wrapper>
      <Header className="flexRow alignCenter justifySpaceBetween">
        <Search>
          <div className="flexRow alignCenter dropdownWrapper">
            <Dropdown
              name="category"
              value={category}
              list={searchCategories}
              setValue={setCategory}
              bg="#ffffff"
            />
            <div className="divider"></div>
          </div>
          <div className="flexRow alignCenter searchInputWrapper">
            <FormGroupCustom
              fieldStyle="shortText"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              bg="#ffffff"
            />
            <img src={searchIcon} alt="search" className="icon" />
          </div>
        </Search>
        <div>
          <Initials>
            <span className="text textCenter textUppercase">ND</span>
          </Initials>
        </div>
      </Header>
      <Spacer y={2.4} />
      <SubHeader className="flexRow alignCenter justifySpaceBetween">
        <div className="captionWrapper flexRow alignCenter">
          <img src={heartIcon} alt="heart" className="heartIcon" />
          <Spacer x={1.6} />
          <div>
            <h4 className="title-4 colorTitleActive">My wish lists</h4>
            <Spacer y={0.4} />
            <p className="subtitle-3">The things I want for myself</p>
          </div>
        </div>
        <Button
          text="Create wish list"
          iconLeft={plusIcon}
          onClick={() => navigate("new")}
        />
      </SubHeader>
      <Spacer y={4.8} />
      <ListWrapper>
        <WishListCard />
      </ListWrapper>

      {/* Share */}
      <Routes>
        <Route path="new" element={<CreateWishList />} />
        <Route path="edit" element={<EditWishList />} />
        <Route path="share" element={<ShareList />} />
        <Route path="delete" element={<DeletePrompt />} />
      </Routes>
    </Wrapper>
  );
};

export default WishsLists;
