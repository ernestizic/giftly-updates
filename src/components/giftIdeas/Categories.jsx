import { getProductCategories } from "api/giftIdeas";
import styled from "styled-components";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useState, useContext } from "react";
// import ArrowRight from 'assets/icons/arrow-right.svg';
// import ArrowLeft from 'assets/icons/arrow-left.svg';
import { ProductContext } from "context/ProductContext";
import { useNavigate } from 'react-router-dom';

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
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    .trending {
    p{
      margin-top: ${(props) => props.giftSuggestionModal ? '0' : '12px'};
    }
  }
  }
`
const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  width: ${(props) => props.giftSuggestionModal ? '100%' : '75%'}; //remove after removing trending
  background: white;
  padding: 10px 0;
  overflow: auto;
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

const ProductCategories = ({ setFilters, giftSuggestionModal }) => {
  const navigate = useNavigate()
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
		navigate(`/user/gift-ideas/search?name=valentine`)
	}

  return (
    <MainWrapper giftSuggestionModal={giftSuggestionModal}>
      <Wrapper giftSuggestionModal={giftSuggestionModal}>
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
      <div className="trending">
        <button onClick={handleClick}><b>Trending:</b> <span className="tag">Valentine</span></button>
      </div>
    </MainWrapper>
  );
};

export default ProductCategories;
