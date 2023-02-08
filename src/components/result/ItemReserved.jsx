import Spacer from 'components/global/Spacer';
import Button from 'components/global/Button';
import { AuthWrapper } from 'components/auth/AuthStyles';
import { AuthCard } from 'components/auth/AuthStyles';
import { useNavigate } from 'react-router-dom';

const ItemReserved = ({ link, username, slug }) => {
	const navigate = useNavigate();
	const basePath = `/${username}/${slug}`;

	return (
		<AuthWrapper className='flexColumn alignCenter'>
			<AuthCard className='flexColumn justifyCenter'>
				<h3 className='title-3 colorTitleActive title flexRow alignCenter justifyCenter'>
					Item reserved
				</h3>
				{link && (
					<>
						<Spacer y={0.8} />
						<p className='subtitle-2 textCenter'>
							You can now continue to buy the item:
						</p>
						<Spacer y={0.8} />
						<a
							href={link}
							rel='noopener noreferrer'
							target='_blank'
							className='subtitle-3 colorLink textCenter'
						>
							{link}
						</a>
					</>
				)}
				<Spacer y={2.4} />
				<Button
					text='Done'
					width='100%'
					onClick={() => {
						navigate(basePath);
					}}
				/>
			</AuthCard>
		</AuthWrapper>
	);
};

export default ItemReserved;
