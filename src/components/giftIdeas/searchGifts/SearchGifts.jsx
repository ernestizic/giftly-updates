import React, { useCallback, useState } from 'react';
import searchIcon from 'assets/icons/search.svg';
import closeIcon from 'assets/icons/close_square.svg';
import { SearchGiftForm, SearchContainer } from './SearchGifts.styled';
import { base_url_vendors, debounce } from 'utils/utils';
import axios from 'axios';
import Loader from 'components/global/Loader';
import Spacer from 'components/global/Spacer';
import { useNavigate } from 'react-router-dom';

const SearchGifts = () => {
	const [keyword, setKeyword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [relatedItems, setRelatedItems] = useState([]);
    const navigate = useNavigate()
    
    const fetchGifts = async(q) => {
        if(!q) return
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${base_url_vendors}/market?search=${q}`
            );
            const data = res.data;
            setRelatedItems(data.data.products);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    };
     // eslint-disable-next-line
    const findGifts = useCallback(debounce(fetchGifts, 500), []);

    function handleSubmit(e){
        e.preventDefault()
        navigate(`/user/gift-ideas/search?name=${keyword}`)
    }
	function handleClick(item){
		navigate(`/user/gift-ideas/search?name=${item.name}`)
	}
	const hideMobileSearch = () => {
		document.querySelector(`input[type=search]`).value = "";
		document.querySelector(".searchBox").classList.remove("open");
		setKeyword("");
	  };
	return (
		<SearchContainer className='searchBox'>
			<SearchGiftForm onSubmit={handleSubmit}>
				<img src={searchIcon} alt='search' className='search-icon' />
				<input
					type='search'
					placeholder='Find the perfect gift'
					onChange={(e) => {
                        setKeyword(e.target.value)
						findGifts(e.target.value);
					}}
				/>
				<img 
					src={closeIcon} 
					className='close-icon' 
					alt='close' 
					onClick={() => {
						document.querySelector(`input[type=search]`).value = "";
                        setKeyword("")
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
			</SearchGiftForm>

			{keyword && (
				<div className='list-of-related-items'>
					{isLoading ? (
						<div className='flexColumn alignCenter'>
							<Spacer y={2.4} />
							<Loader />
							<Spacer y={2.4} />
						</div>
					) : (
						<ul>
							{relatedItems?.map((item, idx) => (
								<li key={idx} onClick={()=>handleClick(item)}>
									{item.name}
								</li>
							))}
						</ul>
					)}
					{!isLoading && relatedItems.length < 1 && (
						<div className='notFound colorTitleActive'>
							<h1>Oops!</h1>
							<Spacer y={0.4} />
							<p className='subtitle-4 subtitle'>
								Nothing found for '{keyword}'.
							</p>
						</div>
					)}
				</div>
			)}
		</SearchContainer>
	);
};

export default SearchGifts;
