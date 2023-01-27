import styled from 'styled-components';

export const SearchContainer = styled.div`
    position: relative;
    @media screen and (max-width: 640px) {
        position: fixed;
        top: -60px;
        left: 55px;
        z-index: 2;
        width: calc(100vw - 48px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.2s ease-out;

        &.open {
        opacity: 1;
        pointer-events: all;
        top: 20px;
        }
    }
    .list-of-related-items {
        box-shadow: 0px 1px 10px 2px #E5E5E5;
        background: #fff;
        top: 55px;;
        width: 100%;
        position: absolute;
        max-height: 250px;
        overflow: scroll;
        ::-webkit-scrollbar {
            display: none;
        }

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
        li {
            padding: 12px;
            &:hover {
                background-color: var(--off-white);
                cursor: pointer;
            }
	    }
        @media screen and (max-width: 640px) {
            width: 85%;
        }
    }
    .notFound {
        padding: 20px;
    }
`
export const SearchGiftForm = styled.form`
    position: relative;
    display: flex;
    gap: 30px;

	input {
		border: 1px solid #D5D8DF;
		background-color: var(--input-bg);
		border-radius: 5px;
		width: 300px;
		padding: 15px;
		text-indent: 25px;
		&:focus {
			outline: none;
		}
	}
    input[type="search"]::-webkit-search-cancel-button {
        display: none;
    }
	.search-icon {
		position: absolute;
		top: 14px;
		left: 10px;
	}
    .close-icon {
        position: absolute;
        top: 14px;
        right: 14px;
        &:hover {
            cursor: pointer;
        }
    }
    .mb {
        display: none;
    }
    @media screen and (max-width: 640px) {
        input {
            width: 85%;
        }
        .close-icon {
            display: none;
        }
        .mb {
            position: absolute;
            top: 14px;
            right: 65px;
            display: block;
        }
    }
`;
