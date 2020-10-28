import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, Form, Table} from "react-bootstrap";
import Rating from "../components/Rating";
import {listProductDetails, createNewProductReview} from "../actions/product-actions";
import Loader from "../components/Loader";
import Message from "../components/message";
import {PRODUCT_REVIEW_RESET} from "../constants/product-contstants";

const ProductScreen = ({history, match}) => {
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReview = useSelector(state => state.productReview);
    const {error: errorCreateReview, success: successCreateReview} = productReview

    useEffect(() => {
        if (successCreateReview) {
            alert('Review submitted')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successCreateReview])

    const addToCart = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }

    const submitReview = (e) => {
        e.preventDefault()
        dispatch(createNewProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col md={4}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{product.name}, {product.additionalName}</h2>
                                    <h4>SKU: {product.sku}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating text={`${product.numReviews}`} reviews value={product.rating}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Sub-Category: {product.subCategory}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Category:
                                            </Col>
                                            <Col>
                                                {product.category}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Shipping Cost:
                                            </Col>
                                            <Col>
                                                {product.shippingCost}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Shipping Time:
                                                </Col>
                                                <Col>
                                                    {product.shippingTime}
                                                </Col>
                                            </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Discountable:
                                            </Col>
                                            <Col>
                                                {product.discountable ?
                                                    <i className='fa fa-check' style={{color: 'green'}}></i> :
                                                    <i className='fas fa-times' style={{color: 'red'}}></i>}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity: </Col>
                                                <Col>
                                                    <Form.Control as='select' value={quantity}
                                                                  onChange={(e) => setQuantity(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>))}

                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button className='btn-block' variant='outline-dark' type='button'
                                                disabled={product.countInStock === 0}
                                                onClick={addToCart}>Add To Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='pt-2 pb-4'>
                        <Col md={6} sm={12}>
                            <ListGroup.Item>
                                <small><strong>Description:</strong></small> {product.description}
                            </ListGroup.Item>
                        </Col>
                        <Col md={6} sm={12}>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                <tr>
                                    <th>Scale</th>
                                    <th>Dimension</th>
                                    <th>Weight</th>
                                    <th>Package Includes</th>
                                </tr>
                                </thead>
                                <tbody>
                                <td>{product.scale}</td>
                                <td>{product.dimensions}</td>
                                <td>{product.weight} (lbs)</td>
                                <td>{product.includesAdditional}</td>
                                </tbody>
                            </Table>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                <tr>
                                    <th>Power Type</th>
                                    <th>Motor</th>
                                    <th>Battery</th>
                                </tr>
                                </thead>
                                <tbody>
                                <td>{product.powerType}</td>
                                <td>{product.motor}</td>
                                <td>{product.battery}</td>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h2> Reviews </h2>
                            {product.reviews.length === 0 &&
                            <Message>No reviews. Bet the first to leave a review.</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h6>Leave a review</h6>
                                    {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitReview}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select'
                                                              value={rating}
                                                              onChange={e => setRating(e.target.value)}>
                                                    <option value=''>Select a rating</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Bad</option>
                                                    <option value='3'>3 - Fair</option>
                                                    <option value='4'>4 - Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea'
                                                              row='4'
                                                              value={comment}
                                                              onChange={e => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='outline-dark'>Submit Review</Button>
                                        </Form>
                                    ) : <Message><Link to='/login'>
                                        Login to leave a comment
                                    </Link></Message>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;