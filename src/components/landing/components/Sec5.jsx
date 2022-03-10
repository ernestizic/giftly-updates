import React from 'react'
import styled from 'styled-components'
import hm_hero_2 from "assets/images/hm_hero_2.png"

const Wrapper = styled.div`
padding: 9.6rem 12rem;
@media (max-width: 760px) {
padding: 4.8rem 2.4rem;
	}
background-color: var(--accent_2-main);
div{
    border-radius: 0.8rem;
    img{
        height: 100%;
        width: 100%;
    }
}
`

const Sec5 = () => {
    return (
        <Wrapper>
            <div>
                <img src={hm_hero_2} alt="hm_hero_2" />
            </div>
        </Wrapper>
    )
}

export default Sec5
