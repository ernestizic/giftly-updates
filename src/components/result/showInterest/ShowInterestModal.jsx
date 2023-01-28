import React from 'react';
import NoImage from 'assets/images/no-image.svg';
import CloseIcon from 'assets/icons/close_square.svg';
import { StarIcon } from 'components/global/SVG';
import heartIcon from 'assets/icons/heart.svg';
import Spacer from 'components/global/Spacer';
import {
	Modal,
	ModalContent,
	ShowInterestContainer,
    ButtonContainer
} from './ShowInterest.styled';
import { useNavigate } from 'react-router-dom';

const ShowInterestModal = ({ item, setOpenShowInterestModal }) => {
	const navigate = useNavigate();

	const showInterest = () => {
		navigate('confirm-interest');
	};
	return (
		<ShowInterestContainer>
			<Modal>
                <ButtonContainer>
                    <button 
                        type='button' 
                        className='close-icon'
                        onClick={() => setOpenShowInterestModal(false)}
                    >
                        <img
                            src={CloseIcon}
                            alt='close'
                        />
                    </button>
                </ButtonContainer>
				<div className='image-container'>
					<img
						src={item?.avatar ? item.avatar : NoImage}
						className='item-image'
						alt='empty'
					/>
				</div>
				<div className='right-side'>
					<ModalContent>
						<header>
							<StarIcon fill='var(--primary-main)' />
							<h2>Purist organics skincare set</h2>
						</header>

						<Spacer y={0.5} />
						<p>
							{item?.price} {item.quantity ? 'x ' + item.quantity : ''}
						</p>
						<Spacer y={0.5} />
						<a
							href={item.link}
							target='_blank'
							rel='noopener noreferrer'
							className='subtitle-5 colorPrimaryMain'
						>
							{item.link}
						</a>
						<Spacer y={1.0} />
						<p>{item.description}</p>
                        <button
                            type='button'
                            className='showInterest'
                            onClick={() => showInterest(item)}
                        >
                            <img src={heartIcon} alt='heart' />
                            <span className='text'>Show interest</span>
                        </button>
					</ModalContent>
				</div>
			</Modal>
		</ShowInterestContainer>
	);
};

export default ShowInterestModal;
