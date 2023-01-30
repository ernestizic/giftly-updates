import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [searchedItems, setSearchedItems] = useState([]);

    const emptySearch =()=> {
        setSearchedItems([])
    }

    const fillSearch =(list)=> {
        setSearchedItems((prev)=> [...prev, ...list])
    }


    return ( 
        <ProductContext.Provider  value={{searchedItems, emptySearch, fillSearch}}>
            {props.children}
        </ProductContext.Provider>
     );
}
 
export default ProductContextProvider;