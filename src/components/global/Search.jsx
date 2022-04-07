import Dropdown from "components/user/Dropdown";
import {
  Initials,
  Search as SearchWrapper,
} from "components/user/WishListsStyles";
import useSearch from "hooks/useSearch";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormGroupCustom from "./FormGroupCustom";
import ImgWrapper from "./ImgWrapper";
import Loader from "./Loader";
import Spacer from "./Spacer";
import searchIcon from "assets/icons/search.svg";
import closeIcon from "assets/icons/close_square.svg";

const __searchCategories = ["Friends", "Wish list"];

const SearchBox = ({ searchCategories = __searchCategories }) => {
  const [category, setCategory] = useState("Friends");
  const { search, setSearch, friends, findFriends, finding, showMobileSearch } =
    useSearch();

  const hideMobileSearch = () => {
    document.querySelector(`input[name=search]`).value = "";
    document.querySelector(".searchBox").classList.remove("open");
    setSearch("");
  };

  return (
    <SearchWrapper className="searchBox">
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
          onChange={(e) => {
            if (category === searchCategories[1]) {
              setSearch(e.target.value);
              return;
            }
            findFriends(e);
          }}
          bg="#ffffff"
        />
        <img
          src={search ? closeIcon : searchIcon}
          alt="search"
          className="icon lg"
          onClick={() => {
            document.querySelector(`input[name=search]`).value = "";
            setSearch("");
          }}
        />
        <img
          src={closeIcon}
          alt="search"
          className="icon mb"
          onClick={() => {
            hideMobileSearch();
          }}
        />
        {search && category === searchCategories[0] && (
          <div className="searchResults">
            {finding ? (
              <div className="flexColumn alignCenter">
                <Spacer y={2.4} />
                <Loader />
                <Spacer y={2.4} />
              </div>
            ) : (
              <>
                {friends?.map((item, index) => (
                  <Link
                    key={index}
                    to={`/${item.username}`}
                    className="flexRow alignCenter item colorTitleActive"
                  >
                    {item.avatar ? (
                      <ImgWrapper size={40} imgHeight="100%">
                        <img src={item.avatar} alt="." />
                      </ImgWrapper>
                    ) : (
                      <Initials size="40" textSize="18" bg="#032250">
                        {item.username.charAt(0)}
                        {item.username.charAt(1)}
                      </Initials>
                    )}
                    <Spacer x={1.6} />
                    <span className="subtitle-4 text">{item.username}</span>
                  </Link>
                ))}
              </>
            )}
            {!finding && !friends.length && (
              <div className="notFound colorTitleActive">
                <h4 className="title-4">Oops!</h4>
                <Spacer y={0.4} />
                <p className="subtitle-4 subtitle">
                  Nothing found for {search}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </SearchWrapper>
  );
};

export default SearchBox;
