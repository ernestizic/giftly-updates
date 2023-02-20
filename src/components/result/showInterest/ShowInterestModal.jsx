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
    ButtonContainer,
	ShowInterestButtonContainer
} from './ShowInterest.styled';
import { useNavigate } from 'react-router-dom';
import { base_url_vendors } from 'utils/utils';

const ShowInterestModal = ({ item, setOpenShowInterestModal }) => {
	const navigate = useNavigate();

	const showInterest = () => {
		navigate('confirm-interest');
		setOpenShowInterestModal(false)
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
				<div className={`image-container ${!item.avatar && 'bg'}`}>
					{item.avatar && (
						<img 
						src={`${item.avatar?.startsWith("uploads") ? base_url_vendors+'/../'+item.avatar : item.avatar}`} 
						alt="wish" 
						/>
					)}
					{!item.avatar && (
						<div className='no-image'>
							<img 
							src={NoImage} 
							alt="wish" 
							
							/>
						</div>
					)}
				</div>
				<div className='right-side'>
					<ModalContent>
						<header>
							<StarIcon fill='var(--primary-main)' />
							<h2>{item.name}</h2>
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
						<ShowInterestButtonContainer>
							<button
								type='button'
								className='showInterest'
								onClick={() => showInterest(item)}
							>
								<img src={heartIcon} alt='heart' />
								<span className='text'>Show interest</span>
							</button>
						</ShowInterestButtonContainer>
					</ModalContent>
				</div>
			</Modal>
		</ShowInterestContainer>
	);
};

export default ShowInterestModal;
