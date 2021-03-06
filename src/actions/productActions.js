import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_PRICE, PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    SORT_PRODUCTS
} from "../type";

export const fetchProducts = ()=> async (dispatch)=>{
 const res = await  fetch("/api/products");
 const data = await res.json();
 dispatch({
     type: FETCH_PRODUCTS,
     payload: data,
 })
};

export const fetchDetailsProduct = (productId)=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const res = await fetch(`/api/productDetails/${productId}`);
        const data = await res.json();
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
};

export const filterProductsByPrice = (filteredProducts, price)=> (dispatch)=>{
    let [priceMin, priceMax] = price;
    const products = filteredProducts.slice().filter((productItem)=> productItem.price > priceMin && productItem.price < priceMax);
    dispatch({
        type: FILTER_PRODUCTS_BY_PRICE,
        payload: {
            items: products
        }
    })
};

export const sortProducts = (products, sort)=>(dispatch)=>{
    let sortedProducts = products.slice().sort((a,b)=> {
                return    sort === "Newest" ?
                    ((a.id < b.id) ? 1 : -1) :
                    sort === "Oldest" ?
                        ((a.id > b.id) ? 1 : -1) :
                        ((a.id > b.id) ? 1 : -1)
            });
    console.log(sortedProducts);
    dispatch({
        type: SORT_PRODUCTS,
        payload: {
            items: sortedProducts
        }
    })
};

// let [priceMin, priceMax] = price;
// setProducts( {
//     products: storeProducts.slice().filter((productItem)=>{
//         return productItem.price > priceMin && productItem.price < priceMax
//     }),

