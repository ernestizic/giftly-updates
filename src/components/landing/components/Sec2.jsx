import React from 'react'
import styled from 'styled-components'
import Card1 from './Card1'


const Wrapper = styled.div`
background-color: var(--accent_2-main);
padding: 9.6rem 0;
display:flex;
justify-content: center;
flex-wrap: wrap;

h3{
    width: 100%;
    text-align: center;
    font-size: 5.6rem;
    line-height: 6rem;
    color: var(--title-active);
    margin-bottom: 4.8rem;
}

&>div + div{
    margin-left: 9.6rem;

    @media (max-width: 760px){
        margin: 0;
    }

}
`

const Sec2 = () => {
    return (
        <Wrapper>
            <h3 className="title-plus">How it works?</h3>
            <Card1 cardNum={1}/>
            <Card1 cardNum={2}/>
            <Card1 cardNum={3}/>
        </Wrapper>
    )
}

export default Sec2
