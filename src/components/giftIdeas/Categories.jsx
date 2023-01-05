import { getProductCategories } from "api/giftIdeas";
import styled from "styled-components";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useState } from "react";

const Wrapper = styled.div`
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

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

const ProductCategories = ({ setFilters }) => {
  const { list, lastListElementRef } = useInfiniteScroll(
    getProductCategories,
    "product_categories"
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

  return (
    <Wrapper>
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
  );
};

export default ProductCategories;
