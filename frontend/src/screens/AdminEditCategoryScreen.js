import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    adminUpdateSingleCategory,
    listCategoryDetails,

} from "../actions/category-actions";
import Message from "../components/message";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import FormContainer from "../components/form-container";
import {CATEGORY_UPDATE_RESET} from "../constants/categories-constants";

const AdminEditCategoryScreen = ({match, history}) => {
    const categoryId = match.params.id
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const categoryDetails = (useSelector(state => state.categoryDetails))
    const {loading, error: errorDetails, category} = categoryDetails

    const update = (useSelector(state => state.updateCategory))
    const {loading: loadingCategoryUpdate, error: errorUpdateCategory, success: updateCategorySuccess} = update

    useEffect(() => {
        if (updateCategorySuccess) {
            dispatch({type: CATEGORY_UPDATE_RESET})
            history.push('/admin/categorylist')
        } else {
            if (!category.name || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            } else {
                setName(category.name)
            }
        }
    }, [dispatch, history, updateCategorySuccess, category, categoryId])

    const updateCategory = e => {
        e.preventDefault()
        dispatch(adminUpdateSingleCategory({
            _id: categoryId,
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
                <h1>Edit Category</h1>
                {loadingCategoryUpdate && <Loader/>}
                {errorUpdateCategory && <Message variant='danger'>{errorUpdateCategory}</Message>}
                {loading
                    ? <Loader/>
                    : errorDetails
                        ? <Message variant='danger'>{errorDetails}</Message>
                        : (
                            <Form onSubmit={updateCategory}>

                                <Form.Group controlId='scale'>
                                    <Form.Control type='text'
                                                  placeholder='Enter scale'
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

export default AdminEditCategoryScreen;