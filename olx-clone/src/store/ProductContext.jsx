import { createContext, useState, useEffect } from "react";


const ProductContext = createContext();



export const ProductProvider = ({children}) =>{
    const [products, setProducts] = useState([])

    return(
       <ProductContext.Provider value={{products, setProducts}} >
        {children}
       </ProductContext.Provider>
    
    )
}

export default ProductContext