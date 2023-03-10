import axios from 'axios';
import ProductCard from 'components/giftIdeas/ProductCard';
import Spacer from 'components/global/Spacer';
import React, { useState, useMemo, useRef, useContext } from 'react';
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { base_url_vendors, base_url } from 'utils/utils';
import Loader from 'components/global/Loader';
import ProductPreview from 'components/giftIdeas/ProductPreview';
import AddToWishlist from 'components/giftIdeas/AddToWishlist';
import { ProductContext } from 'context/ProductContext';

const SearchPageContainer = styled.div`
	color: var(--title-active);
	padding: 20px 48px;

	@media screen and (max-width: 768px) {
		padding: 20px;
		h2 {
			padding-top: 90px;
			font-weight: 600;
			font-size: 20px;
			line-height: 30px;
		}
	}
`;
const ProductList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	grid-gap: 48px;

	.center-loader {
		margin: 20px auto;
	}

	@media screen and (max-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
	}
`;

const SearchPage = () => {
	const { searchedItems, fillSearch } = useContext(ProductContext);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const { search } = useLocation();
	const query = useMemo(() => new URLSearchParams(search), [search]);
	const nameFromQuery = query.get('name');

	const [wishlists, setWishlists] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const token = useSelector((state) => state.auth.token);
	const showPreview = (product) => {
		if (!product) return;
		setSelectedProduct(product);
		document.querySelector('.productPreview')?.classList.remove('hidden');
	};

	useEffect(() => {
		getWishLists();
		// eslint-disable-next-line
	}, []);

	const sendQuery = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				`${base_url_vendors}/market?page=${page}&search=${nameFromQuery}`
			);

			const list = res.data.data.products;
			const links = res.data.data.pagination?.links || {};
			fillSearch(list);

			setHasMore(links?.next_page_url);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
		// eslint-disable-next-line
	}, [nameFromQuery, page]);

	useEffect(() => {
		sendQuery();
	}, [sendQuery, nameFromQuery, page]);

	const observer = useRef();
	const lastListElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prev) => prev + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	const getWishLists = async () => {
		try {
			const res = await axios.get(`${base_url}/wishlist`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.data.status === 'success') {
				setWishlists(res.data.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<SearchPageContainer>
			<ProductPreview details={selectedProduct} />
			<AddToWishlist wishlists={wishlists} product={selectedProduct} />
			<h2>Showing results for '{nameFromQuery}'</h2>
			<Spacer y={4.8} />
			<ProductList>
				{searchedItems?.map((product, index) => (
					<ProductCard
						key={index}
						showPreview={showPreview}
						details={product}
						ref={searchedItems.length === index + 1 ? lastListElementRef : null}
					/>
				))}
			</ProductList>
			{searchedItems.length < 1 && !isLoading && (
				<div>
					<h1>Oops!</h1>
					<Spacer y={0.4} />
					<p className='subtitle-4 subtitle'>Nothing found for '{nameFromQuery}'.</p>
				</div>
			)}
			{isLoading && (
				<div className='flexRow justifyCenter'>
					<Loader />
				</div>
			)}
		</SearchPageContainer>
	);
};

export default SearchPage;
