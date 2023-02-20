import Button from 'components/global/Button';
import { AuthWrapper } from 'components/auth/AuthStyles';
import { AuthCard } from 'components/auth/AuthStyles';
import { useNavigate } from 'react-router-dom';

const ItemReserved = ({ link, username, slug }) => {
	const navigate = useNavigate();
	const basePath = `/${username}/${slug}`;

	return (
		<AuthWrapper className='flexColumn alignCenter'>
			<AuthCard className='flexColumn justifyCenter' padding="48px 24px" width="400px">
				<h3 className='colorTitleActive body-lg-semibold' style={{marginBottom: "16px"}}>
					Item Reserved
				</h3>
				<p className='body-3'>The magic of Giftly ensures that {username} will remain unaware of your claim on this wish.</p>
				{link && (
					<>
						<p className='body-3' style={{wordBreak: "break-all"}}>
							You can now continue to buy the item: {" "} 
						<a
							href={link}
							rel='noopener noreferrer'
							target='_blank'
							className='body-3 colorPrimaryMain'
						>
							{link}
						</a>
						</p>
					</>
				)}
				<div style={{marginTop: "16px"}}>
					<Button
						text='Done'
						width='100%'
						onClick={() => {
							navigate(basePath);
						}}
					/>
				</div>
			</AuthCard>
		</AuthWrapper>
	);
};

export default ItemReserved;
