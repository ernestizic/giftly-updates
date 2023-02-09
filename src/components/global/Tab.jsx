import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
	.tab-header-container {
		position: relative;
		overflow: hidden;

		.active-tab-line {
			position: absolute;
			height: 3px;
			bottom: 0;
			transition: all 0.3s ease;
			background-color: var(--gray-scale);
		}
	}

	.tab-header {
		border-bottom: 1px solid var(--line);
		display: flex;
		gap: 31px;
		a {
            color: #3D3D3D;
            padding: 0 0px 8px;
			font-weight: 500;
            font-size: 14px;
            line-height: 20px;
			transition: 0.3s ease-in;
		}
		.active {
            color: #121212;
		}
	}

	.tab-content {
		margin: 25px 0;
	}
`;

const Tab = ({ tabsData }) => {
	const [indexOfActiveTab, setIndexOfActiveTab] = useState(0);
	const [activeTabLineWidth, setActiveTabLineWidth] = useState(0);
	const [activeTabLineLeft, setActiveTabLineLeft] = useState(0);

	const tabsRef = useRef([]);

	useEffect(() => {
		const setTabLine = () => {
			const currentTab = tabsRef.current[indexOfActiveTab];
			setActiveTabLineLeft(currentTab?.offsetLeft ?? 0);
			setActiveTabLineWidth(currentTab?.clientWidth ?? 0);
		};
		setTabLine();
		window.addEventListener('resize', setTabLine);

		return () => window.removeEventListener('resize', setTabLine);
	}, [indexOfActiveTab]);
	return (
		<TabContainer>
			<div className='tab-header-container'>
				<div className='tab-header'>
					{tabsData.map((tab, idx) => (
						<a
							href='##'
							onClick={() => setIndexOfActiveTab(idx)}
							key={idx}
							ref={(el) => (tabsRef.current[idx] = el)}
							className={indexOfActiveTab === idx ? 'active' : ''}
						>
							{tab.label}
						</a>
					))}
				</div>
				<span
					className='active-tab-line'
					style={{ left: activeTabLineLeft, width: activeTabLineWidth }}
				></span>
			</div>

			<div className='tab-content'>{tabsData[indexOfActiveTab].content}</div>
		</TabContainer>
	);
};

export default Tab;
