import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import {listProducts} from "../actions/product-actions";
import Message from "../components/message";
import Loader from "../components/Loader";

const HomeScreen = ({match}) => {

    const keyword = match.params.keyword
    const dispatch = useDispatch();
    // productList is coming from the store
    const productList = useSelector(state => state.productList);

// loading error and products come from the products-reducer.js as possible states of the products request.
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <>
            <h1>Latest Products</h1>
            {loading
                ? <Loader>Loading...</Loader>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            }
        </>
    );
};

export default HomeScreen;