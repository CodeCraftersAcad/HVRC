import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    adminUpdateSingleColor,
    adminUpdateSingleScale,
    listColorDetails,
    listScaleDetails
} from "../actions/category-actions";
import Message from "../components/message";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import FormContainer from "../components/form-container";
import {UPDATE_COLOR_RESET} from "../constants/categories-constants";

const AdminColorEditScreen = ({match, history}) => {
    const colorId = match.params.id
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const getColorDetails = (useSelector(state => state.getColorDetails))
    const {loading, error: errorDetails, color} = getColorDetails

    const updateColor = (useSelector(state => state.updateColor))
    const {loading: loadingColorUpdate, error: errorUpdateSuccess, success: updateColorSuccess} = updateColor

    useEffect(() => {
        if (updateColorSuccess) {
            dispatch({type: UPDATE_COLOR_RESET})
            history.push('/admin/categorylist')
        } else {
            if (!color.name || color._id !== colorId) {
                dispatch(listColorDetails(colorId))
            } else {
                setName(color.name)
            }
        }
    }, [dispatch, history, updateColorSuccess, color, colorId])

    const updateCategory = e => {
        e.preventDefault()
        dispatch(adminUpdateSingleColor({
            _id: colorId,
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
                <h1>Edit Color</h1>
                {loadingColorUpdate && <Loader/>}
                {errorUpdateSuccess && <Message variant='danger'>{errorUpdateSuccess}</Message>}
                {loading
                    ? <Loader/>
                    : errorDetails
                        ? <Message variant='danger'>{errorDetails}</Message>
                        : (
                            <Form onSubmit={updateCategory}>

                                <Form.Group controlId='color'>
                                    <Form.Control type='text'
                                                  placeholder='Enter color name'
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

export default AdminColorEditScreen;