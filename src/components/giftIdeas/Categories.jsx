import { getProductCategories } from "api/giftIdeas";
import styled from "styled-components";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useState, useContext, useRef } from "react";
import ArrowRight from 'assets/icons/arrow-right.svg';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { ProductContext } from "context/ProductContext";
import { useLocation, useNavigate } from 'react-router-dom';

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) => props.giftSuggestionModal ? 'column-reverse' : 'row'};
  gap: 10px;

  .trending {
    button{
      color: var(--title-active)
    }
    .tag{
      background: #FFF5F9;
      color: var(--primary-main);
      border-radius: 8px;
      padding: 5px 15px;
      font-size: 14px;
      font-weight: normal;
    }
  }

  .category_container {
    display: flex;
    gap: 10px;
    width: ${(props) => props.giftSuggestionModal ? '100%' : '75%'}; //remove after removing trending
  }

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    .trending {
    p{
      margin-top: ${(props) => props.giftSuggestionModal ? '0' : '12px'};
    }
  }
  .category_container {
    width: 100%;
  }
  }
`
const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  background: white;
  padding: 10px 0;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .track {
    width: max-content;
    gap: 16px;
  }

  .category {
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 8px 16px;
    white-space: nowrap;
    transition: all .2s ease-out;

    &.active {
      background-color: var(--accent_3-dark);
      color: #ffffff;
    }
  }
`;

const ProductCategories = ({ setFilters, giftSuggestionModal, setQuery }) => {
  const ref = useRef(null);
  const navigate = useNavigate()
  const location = useLocation()
  const {emptySearch} = useContext(ProductContext)
  const { list, lastListElementRef } = useInfiniteScroll(
    getProductCategories,
    "data"
  );
  const [selectedId, setSelectedId] = useState(1);

  const handleSelect = (e) => {
    const categoryId = e.target.closest(".category").dataset.id;
    setSelectedId(parseInt(categoryId))
    if (parseInt(categoryId) === 1) {
      setFilters(undefined);
    }
    else {
      setFilters({ categoryId });
    }
  };

  function handleClick(){
		emptySearch()
		location.pathname.includes("gift-ideas") && navigate(`/user/gift-ideas/search?name=valentine`)
    setQuery("valentine")
	}

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <MainWrapper giftSuggestionModal={giftSuggestionModal}>
      <div className="category_container">
        <button onClick={() => scroll(-70)}>
          <img src={ArrowLeft} alt="arrow" />
        </button>
        <Wrapper giftSuggestionModal={giftSuggestionModal} ref={ref}>
          <div className="track flexRow">
            {list.map((category, index) => (
              <button
                key={category.id}
                data-id={category.id}
                ref={list.length === index + 1 ? lastListElementRef : null}
                className={`category${category.id === selectedId ? " active" : ""}`}
                onClick={handleSelect}
              >
                {index === 0 ? "All" : category.name}
              </button>
            ))}
          </div>
        </Wrapper>
        <button onClick={() => scroll(70)}>
          <img src={ArrowRight} alt="arrow" />
        </button>
      </div>
      <div className="trending">
        <button onClick={handleClick}><b>Trending:</b> <span className="tag">Valentine</span></button>
      </div>
    </MainWrapper>
  );
};

export default ProductCategories;
