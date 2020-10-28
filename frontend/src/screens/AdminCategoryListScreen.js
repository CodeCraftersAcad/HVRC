import React, {useEffect} from 'react';
import {Button, Col, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/message";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    listCategories,
    adminDeleteCategoryById,
    adminCreateNewScale,
    listScale,
    adminDeleteScaleById
} from "../actions/category-actions";

const AdminCategoryListScreen = ({match, history}) => {
    const dispatch = useDispatch()

    const getCategories = useSelector(state => state.getCategories)
    const {loading, categories, error} = getCategories


    const getScales = useSelector(state => state.getScales)
    const {loading: loadingAllScales, scales, error: errorGettingScales} = getScales

    const deleteCategory = useSelector(state => state.deleteCategory)
    const {loading: loadingDeleteCategory, success: successDeletingCategory, error: errorDeleteCategory} = deleteCategory

    const deleteScale = (useSelector(state => state.deleteScale))
    const {loading: loadingDeleteScale, error: errorDeleteScale, success: successDeleteScale} = deleteScale

    const createScale = useSelector(state => state.createScale)
    const {loading: loadingCreateScale, error: errorCreatingScale, success: successCreatingScale, scale} = createScale

    const updateScale = useSelector(state => state.updateScale)
    const {loading: loadingUpdateScale, success: successUpdateScale, scale: updatedScale} = updateScale

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const deleteCategoryById = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(adminDeleteCategoryById(id))
        }
    }

    const deleteScaleById = (id) => {
        if (window.confirm(`Are you sure you want to delete this scale`)) {
            dispatch(adminDeleteScaleById(id))
        }
    }

    const createNewCategory = () => {
        history.push('/admin/category/create')
    }
    const createNewScale = () => {
        dispatch(adminCreateNewScale())
    }
    useEffect(() => {
        // dispatch({type: SCALE_CREATE_RESET})
        if (!userInfo.isAdmin) history.push('/login')

        if (successDeleteScale || errorCreatingScale || successUpdateScale) {
            dispatch(listScale())
            dispatch(listCategories())
        }
        if (successCreatingScale) {
            history.push(`/admin/scales/${scale._id}/edit`)
        } else {
            console.log('12345')
        }
        dispatch(listCategories())
        dispatch(listScale())
    }, [successDeleteScale, successCreatingScale, history, userInfo, successUpdateScale])


    return (
        <>
            {loadingDeleteCategory && <Loader/>}
            {errorDeleteCategory && <Message variant='danger'>{errorDeleteCategory}</Message>}
            <Row className='align-items-center' md={12}>
                <Col className='text-right'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewCategory}>
                        <i className='fas fa-plus'></i> Create Category
                    </Button>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewScale}>
                        <i className='fas fa-plus'></i> Create Scale
                    </Button>
                </Col>
            </Row>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col>
                            <h2>Categories</h2>
                        </Col>
                    </Row>
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
                        {/*<Paginate pages={pages} page={page} isAdmin={true}/>*/}
                    </Table>
                    <Row>
                        <Col>
                            <h2>Scales</h2>
                        </Col>
                        {errorGettingScales && <Message variant='danger'>{errorGettingScales}</Message>}
                        {errorCreatingScale && <Message variant='danger'>{errorCreatingScale}</Message>}
                    </Row>
                    {loadingAllScales && <Loader/>}
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Scale</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {scales.map(scale => (
                            <tr key={scale._id}>
                                <td>{scale._id}</td>
                                <td>{scale.name}</td>
                                <td>
                                    <LinkContainer to={`/admin/scales/${scale._id}/edit`}>
                                        <Button variant="outline-dark" className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => {
                                        deleteScaleById(scale._id)
                                    }}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {/*<Paginate pages={pages} page={page} isAdmin={true}/>*/}
                        </tbody>
                    </Table>

                </>
            )}
        </>
    );
};

export default AdminCategoryListScreen;