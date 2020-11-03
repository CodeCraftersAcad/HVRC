import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {adminUpdateSingleScale, listScaleDetails} from "../actions/category-actions";
import Message from "../components/message";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import FormContainer from "../components/form-container";
import {SCALE_UPDATE_RESET} from "../constants/categories-constants";

const AdminEditScaleScreen = ({match, history}) => {
    const scaleId = match.params.id
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const scaleDetails = (useSelector(state => state.scaleDetails))
    const {loading, error: errorDetails, scale} = scaleDetails


    const updateScale = (useSelector(state => state.updateScale))
    const {loading: loadingScaleUpdate, error: errorUpdateSuccess, success: updateScaleSuccess} = updateScale

    useEffect(() => {
        if (updateScaleSuccess) {
            history.push('/admin/categorylist')
            dispatch({type: SCALE_UPDATE_RESET})
        } else {
            if (!scale.name || scale._id !== scaleId) {
                dispatch(listScaleDetails(scaleId))
            } else {
                setName(scale.name)
            }
        }
    }, [dispatch, history, updateScaleSuccess, scale, scaleId])

    const updateCategory = e => {
        e.preventDefault()
        dispatch(adminUpdateSingleScale({
            _id: scaleId,
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
                {loadingScaleUpdate && <Loader/>}
                {errorUpdateSuccess && <Message variant='danger'>{errorUpdateSuccess}</Message>}
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

export default AdminEditScaleScreen;