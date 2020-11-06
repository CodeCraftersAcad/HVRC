import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {productsByCategory} from "../actions/product-actions";
import Loader from "./Loader";
import Message from "./message";
import {Carousel, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProductCategoryCarousel = ({match, history, category, subcategory}) => {
    const dispatch = useDispatch()
    const productsByCat = useSelector(state => state.productsByCat)
    const {loading, products, error} = productsByCat

    useEffect(() => {
        dispatch(productsByCategory(category, subcategory))
    }, [dispatch, match, history, category, subcategory])
    return (
        <>
            {loading && <Loader/>}
            {error ? <Message variant='danger'>{error}</Message> : (
                <Carousel pause='hover' className=''>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid style={{width: '18rem'}}/>
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name} (${product.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    );
};

export default ProductCategoryCarousel;