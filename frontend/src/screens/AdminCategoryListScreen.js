import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/message";
import {LinkContainer} from "react-router-bootstrap";
import Paginate from "../components/Paginate";
import {useDispatch, useSelector} from "react-redux";
import {listCategories, adminDeleteCategoryById} from "../actions/category-actions";
import {Link} from "react-router-dom";

const AdminCategoryListScreen = ({match, history}) => {
    const dispatch = useDispatch()

    const getCategories = useSelector(state => state.getCategories)
    const {loading, categories, error} = getCategories

    const deleteCategory = useSelector(state => state.deleteCategory)
    const {loading:loadingDeleteCategory, success:successDeletingCategory, error:errorDeleteCategory} = deleteCategory

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const deleteCategoryById = (id) => {
            if (window.confirm('Are you sure')) {
                dispatch(adminDeleteCategoryById(id))
            }
    }

    const createNewCategory = () => {
        history.push('/admin/category/create')
    }

    useEffect(() => {
        if (!userInfo.isAdmin) history.push('/login')
        else dispatch(listCategories())
    }, [successDeletingCategory, history, userInfo])

    return (
        <>
            {loadingDeleteCategory && <Loader/>}
            {errorDeleteCategory && <Message variant='danger'>{errorDeleteCategory}</Message> }
            <Row className='align-items-center'>
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewCategory}>
                        <i className='fas fa-plus'></i> Create Category
                    </Button>
                </Col>
            </Row>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category._id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <LinkContainer to={`/admin/categories/${category._id}/edit`}>
                                        <Button variant="outline-dark" className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => {
                                        deleteCategoryById(category._id)
                                    }}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {/*<Paginate pages={pages} page={page} isAdmin={true}/>*/}
                </>
            )}
        </>
    );
};

export default AdminCategoryListScreen;