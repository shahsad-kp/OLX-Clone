import {createContext, useState} from "react";


export const ProductContext = createContext(null)

function ProductCTXComponent({children}) {
    const [product, setProduct] = useState(null);
    return (
        <ProductContext.Provider value={{product, setProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductCTXComponent;
