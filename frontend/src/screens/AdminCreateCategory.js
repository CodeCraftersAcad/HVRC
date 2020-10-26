import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {Container, Row, Col, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {adminCreateNewCategory} from "../actions/category-actions";
import Message from "../components/message";

const AdminCreateCategory = ({history}) => {
    const [category, setCategory] = useState('')
    const dispatch = useDispatch()

    const createCategory = useSelector(state => state.createCategory)
    const {success, category: newCategory, error} = createCategory


    const createNewCategory = (e) => {
        e.preventDefault()
        console.log(category)
        dispatch(adminCreateNewCategory({category}))
    }

    useEffect(() => {
        if (success) {
            history.push('/admin/categorylist')
        }
    }, [history, success])
    return (
        <>
            {error && <Message variant='danger'>{error}</Message> }
            <Row className=''>
                <Col md={6} className='offset-3'>
                    <Form onSubmit={createNewCategory}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                                          placeholder='Enter category name'
                                          value={category}
                                          onChange={e => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='outline-dark' className='btn btn-sm'>Create Category</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default AdminCreateCategory;