import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {adminUpdateSingleBrand, brandDetails} from "../actions/category-actions";
import Message from "../components/message";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import FormContainer from "../components/form-container";
import {BRAND_UPDATE_RESET,} from "../constants/categories-constants";

const AdminBrandEditScreen = ({match, history}) => {
    const brandId = match.params.id
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const listBrandDetails = (useSelector(state => state.listBrandDetails))
    const {loading, error: errorDetails, brand} = listBrandDetails


    const updateBrand = (useSelector(state => state.updateBrand))
    const {loading: loadingBrandUpdate, error: errorUpdateSuccess, success: updateBrandSuccess} = updateBrand

    useEffect(() => {
        if (updateBrandSuccess) {
            history.push('/admin/categorylist')
        } else {
            if (!brand.name || brand._id !== brandId) {
                dispatch(brandDetails(brandId))
            } else {
                dispatch({type: BRAND_UPDATE_RESET})
                setName(brand.name)
            }
        }
    }, [dispatch, history, updateBrandSuccess, brand, brandId])

    const updateCategory = e => {
        e.preventDefault()
        dispatch(adminUpdateSingleBrand({
            _id: brandId,
            name
        }))
    }
    return (
        <>
            <Link to='/admin/categorylist' className='btn btn-outline-dark my-3'>
                Go Back
            </Link>
            {errorDetails && <Message variant='danger'>{errorDetails}</Message>}
            <FormContainer>
                <h1>Edit Brand</h1>
                {loadingBrandUpdate && <Loader/>}
                {errorUpdateSuccess && <Message variant='danger'>{errorUpdateSuccess}</Message>}
                {loading
                    ? <Loader/>
                    : errorDetails
                        ? <Message variant='danger'>{errorDetails}</Message>
                        : (
                            <Form onSubmit={updateCategory}>

                                <Form.Group controlId='brand'>
                                    <Form.Control type='text'
                                                  placeholder='Enter brand'
                                                  value={name}
                                                  onChange={e => setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='outline-primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    );
};

export default AdminBrandEditScreen;