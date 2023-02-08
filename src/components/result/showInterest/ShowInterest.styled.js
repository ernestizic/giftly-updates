import Backdrop from 'components/global/Backdrop';
import styled from 'styled-components';

export const ShowInterestContainer = styled(Backdrop)``;

export const Modal = styled.div`
    border-radius: 10px;
    overflow: hidden;
	width: 60%;
    max-width: 70%;
    height: 60%;
    max-height: 70%;
	display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .image-container {
        text-align: center;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .no-image{
            width: 100px;
            object-fit: contain;
        }
    }
    .bg {
        background: #f0f0f0;

    }

	& > div {
		width: 50%;
		background: #fff;
	}
    .right-side{
        padding: 24px;
    }
    @media screen and (max-width: 768px) {
        background: #fff;
        overflow: auto;
        height: 100%;
        max-height: 90vh;
        flex-direction: column;
        min-width: 95vw;
        & > div {
            width: 100%;
        }
        .image-container {
            margin-top: 60px;
            /* height: 200px; */
            padding: 0 20px;
        }
    }
`;

export const ButtonContainer = styled.div`
    z-index: 1;
    background: #fff;
    position: absolute;
    right: 0;
    .close-icon {
        float: right;
        margin: 5px;
        padding: 24px 20px 0;
	}
    @media screen and (max-width: 768px) {
        top: 0;
        .close-icon {
            padding: 10px;
        }
    }
`
export const ModalContent = styled.div`
    position: relative;
	font-size: 16px;
	padding: 70px 0 0;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	header {
		display: flex;
		align-items: center;
		gap: 5px;
        h2{
            font-weight: 700;
            font-size: 20px;
            line-height: 30px;
        }
	}
    .showInterest {
        position: sticky;
        bottom: 0;
        background: #fff;
        margin: 20px 0 0;
        width: 100%;
        justify-content: center;
        border: 1px solid var(--accent_3-dark);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px;
        border-radius: 5px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
    }

    @media screen and (max-width: 768px) {
        padding: 0;
    }
`;
