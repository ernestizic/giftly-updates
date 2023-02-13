import styled, { keyframes } from 'styled-components';

import Spacer from 'components/global/Spacer';
import eyeIcon from 'assets/icons/eye.svg';
import shareIcon from 'assets/icons/share.svg';
import ArchiveIcon from 'assets/icons/archive-icon2.svg';
import RefreshIcon from 'assets/icons/refresh.svg';
import trashIcon from 'assets/icons/trash_danger.svg';
import { useClickOutside } from 'webrix/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from 'utils/utils';
import { setAlert } from 'features/alert/alertSlice';
import { useDispatch } from 'react-redux';

const fadeIn = keyframes`
  from {
    top: 90%;
    pointer-events: none;
    opacity: 0;
  }

  to {
    top: 100%;
    pointer-events: all;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
	position: absolute;
	top: 90%;
	right: 0;
	pointer-events: none;
	opacity: 0;
	box-shadow: var(--shadow_2);
	min-width: 164px;
	border-radius: 8px;
	background-color: #ffffff;
	animation: ${fadeIn} 0.2s ease forwards;
	z-index: 2;

	.item {
		padding: 16px;
		width: 100%;

		&.delete {
			background-color: var(--off-white);
		}
	}

	@media screen and (max-width: 768px) {
		right: unset;
		left: 0;
		min-width: 200px;
	}
`;

const CardOptions = ({ setOpen, slug, wishItem, getWishLists }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const username = useSelector((state) => state.auth.user.username);
	const token = useSelector((state) => state.auth.token);

	const handleOnMouseDownCapture = useClickOutside(() => {
		setOpen(false);
	});

	const archiveFunc = async (wishItem) => {
		setOpen(false)
		const visibility = wishItem.visibility === 'private' ? 'public' : 'private';
		const formData = {
			...wishItem,
			visibility,
		};
		try {
			await axios.patch(
				`${base_url}/wishlist/${wishItem.id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			getWishLists();
			dispatch(
				setAlert({
					message:
						visibility === 'public'
							? 'Wishlist restored successfully'
							: 'Wishlist archived successfully',
				})
			);
		} catch (err) {
			dispatch(
				setAlert({
					message: err.response.data.errors[0].message,
				})
			);
		}
	};

	return (
		<Wrapper onMouseDownCapture={handleOnMouseDownCapture}>
			{wishItem.visibility === 'public' && (
				<button
					className='flexRow alignCenter item'
					onClick={() => navigate('share')}
				>
					<img src={shareIcon} alt='share' className='icon' />
					<Spacer x={0.8} />
					<span className='body-3 text colorTitleActive'>Share wish list</span>
				</button>
			)}

			{wishItem.visibility === 'public' && (
				<button
					className='flexRow alignCenter item'
					onClick={() => navigate(`/${username}/${slug}`)}
				>
					<img src={eyeIcon} alt='view' className='icon' />
					<Spacer x={0.8} />
					<span className='body-3 text colorTitleActive'>
						Preview wish list
					</span>
				</button>
			)}

			<button
				className='flexRow alignCenter item'
				onClick={() => archiveFunc(wishItem)}
			>
				<img
					src={wishItem.visibility === 'public' ? ArchiveIcon : RefreshIcon}
					alt='archive'
					className='icon'
				/>
				<Spacer x={0.8} />
				<span className='body-3 text colorTitleActive'>
					{wishItem.visibility === 'public'
						? 'Archive wish list'
						: 'Restore wish list'}
				</span>
			</button>

			<button
				className='flexRow alignCenter item delete'
				onClick={() => {
					location.pathname === '/user/archive'
						? navigate('/user/archive/delete')
						: navigate('/user/wish-lists/delete')
						setOpen(false)
				}
				}
			>
				<img src={trashIcon} alt='trash' className='icon' />
				<Spacer x={0.8} />
				<span className='body-3 text colorErrorDefault'>Delete wish list</span>
			</button>
		</Wrapper>
	);
};

export default CardOptions;
