import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {listProductDetails, adminUpdateSingleProduct} from "../actions/product-actions";
import FormContainer from "../components/form-container";
import {PRODUCT_UPDATE_RESET} from "../constants/product-contstants";
import axios from 'axios'

const AdminProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const adminProductUpdate = useSelector(state => state.adminProductUpdate);
    const {loading: adminLoadingProductUpdate, error: adminProductUpdateError, success: successAdminProductUpdate} = adminProductUpdate;


    useEffect(() => {
        if (successAdminProductUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) dispatch(listProductDetails(productId))
            else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, productId, product, history, successAdminProductUpdate])

    const uploadPhoto = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const updateProduct = e => {
        e.preventDefault()
        dispatch(adminUpdateSingleProduct({
            _id: productId,
            name,
            price,
            brand,
            category,
            description,
            countInStock,
            image
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-outline-dark my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {adminLoadingProductUpdate && <Loader/>}
                {adminProductUpdateError && <Message variant='danger'>{adminProductUpdateError}</Message>}
                {loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={updateProduct}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter product name'
                                                  value={name}
                                                  onChange={e => setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='number'
                                                  placeholder='Enter product price'
                                                  value={price}
                                                  onChange={e => setPrice(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter image url'
                                                  value={image}
                                                  onChange={e => setImage(e.target.value)}>
                                    </Form.Control>
                                    <Form.File id='image-file'
                                               label='Choose file from computer'
                                               custom
                                               onChange={uploadPhoto}>
                                    </Form.File>
                                    {uploading && <Loader/>}
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter brand'
                                                  value={brand}
                                                  onChange={e => setBrand(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='count'>
                                    <Form.Label>Count In Stock</Form.Label>
                                    <Form.Control type='number'
                                                  placeholder='Enter product count'
                                                  value={countInStock}
                                                  onChange={e => setCountInStock(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter category'
                                                  value={category}
                                                  onChange={e => setCategory(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter product description'
                                                  value={description}
                                                  onChange={e => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='outline-primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    );
};

export default AdminProductEditScreen;
