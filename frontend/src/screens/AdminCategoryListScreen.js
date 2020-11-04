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
    adminDeleteScaleById, adminCreateNewCategory, adminCreateNewBrand, adminDeleteBrandById, listBrands
} from "../actions/category-actions";
import {
    BRAND_UPDATE_RESET,
    CATEGORY_UPDATE_RESET, DELETE_BRAND_RESET, DELETE_CATEGORY_RESET,
    DELETE_SCALE_RESET,
    SCALE_CREATE_RESET,
    SCALE_UPDATE_RESET
} from "../constants/categories-constants";

const AdminCategoryListScreen = ({match, history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    // Scale state
    const getScales = useSelector(state => state.getScales)
    const {loading: loadingAllScales, scales, error: errorGettingScales} = getScales

    const createScale = useSelector(state => state.createScale)
    const {loading: loadingCreateScale, error: errorCreatingScale, success: successCreatingScale, scale} = createScale

    const updateScale = useSelector(state => state.updateScale)
    const {loading: loadingUpdateScale, success: successUpdateScale, scale: updatedScale} = updateScale

    const deleteScale = (useSelector(state => state.deleteScale))
    const {loading: loadingDeleteScale, error: errorDeleteScale, success: successDeleteScale} = deleteScale
    // End scale state

    // Category state
    const getCategories = useSelector(state => state.getCategories)
    const {loading: loadingCategories, categories, error: errorLoadingCategories} = getCategories

    const createCategory = useSelector(state => state.createCategory)
    const {loading: loadingCreateCategory, success: successCreatingCategory, category, error: errorCreatingCategory} = createCategory

    const deleteCategory = useSelector(state => state.deleteCategory)
    const {loading: loadingDeleteCategory, success: successDeletingCategory, error: errorDeleteCategory} = deleteCategory

    const update = (useSelector(state => state.updateCategory))
    const {loading: loadingCategoryUpdate, error: errorUpdateCategory, success: updateCategorySuccess} = update
    // End category state

    // Brand state
    const getBrands = useSelector(state => state.getBrands)
    const {loading: loadingAllBrands, brands, error: errorGettingBrands} = getBrands

    const createBrand = useSelector(state => state.createBrand)
    const {loading: loadingCreateBrand, error: errorCreatingBrand, success: successCreatingBrand, brand} = createBrand

    const updateBrand = useSelector(state => state.updateBrand)
    const {loading: loadingUpdateBrand, success: successUpdateBrand, scale: updatedBrand} = updateBrand

    const deleteBrand = (useSelector(state => state.deleteBrand))
    const {loading: loadingDeleteBrand, error: errorDeleteBrand, success: successDeleteBrand} = deleteBrand
    // End brand state

    // Scale action
    const createNewScale = () => {
        dispatch(adminCreateNewScale())
    }

    const deleteScaleById = (id) => {
        if (window.confirm(`Are you sure you want to delete this scale`)) {
            dispatch(adminDeleteScaleById(id))
        }
    }
    // End scale actions

    // Category actions
    const createNewCategory = () => {
        dispatch(adminCreateNewCategory())
    }

    const deleteCategoryById = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(adminDeleteCategoryById(id))
        }
    }
    // End of category actions

    // Brand actions
    const createNewBrand = () => {
        dispatch(adminCreateNewBrand())
    }

    const deleteBrandById = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(adminDeleteBrandById(id))
        }
    }
    // End of brand actions

    useEffect(() => {
        if (!userInfo.isAdmin) history.push('/login')
        dispatch({type: SCALE_CREATE_RESET})

        // Success updating scale
        if (successUpdateScale) {
            dispatch({type: SCALE_UPDATE_RESET})
        }
        // Success deleting scale
        if (successDeleteScale) {
            dispatch({type: DELETE_SCALE_RESET})
            dispatch(listScale())
        }
        // Success on creating scale
        if (successCreatingScale) {
            history.push(`/admin/scales/${scale._id}/edit`)
        } else {
            dispatch(listScale())
        }

        // Success updating scale
        if (updateCategorySuccess) {
            dispatch({type: CATEGORY_UPDATE_RESET})
        }

        // Success deleting category
        if (successDeletingCategory) {
            dispatch({type: DELETE_CATEGORY_RESET})
            dispatch(listCategories())
        }

        // Success creating category
        if (successCreatingCategory) {
            history.push(`/admin/categories/${category._id}/edit`)
        } else {
            dispatch(listCategories())
        }

        // Success updating brand
        if (successUpdateBrand) {
            dispatch({type: BRAND_UPDATE_RESET})
        }
        // Success deleting scale
        if (successDeleteBrand) {
            dispatch({type: DELETE_BRAND_RESET})
            dispatch(listBrands())
        }
        // Success on creating scale
        if (successCreatingBrand) {
            history.push(`/admin/brands/${brand._id}/edit`)
        } else {
            dispatch(listBrands())
        }

    }, [dispatch, history, userInfo, successCreatingScale, successUpdateScale, successDeleteScale, successCreatingCategory, updateCategorySuccess, successDeletingCategory, successCreatingBrand,
    successUpdateBrand, successDeleteBrand])


    return (
        <>
            {loadingDeleteCategory && <Loader/>}
            {errorDeleteCategory && <Message variant='danger'>{errorDeleteCategory}</Message>}
            <Row className='align-items-center' md={12}>
                <Col className='text-center'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewCategory}>
                        <i className='fas fa-plus'></i> Create Category
                    </Button>
                </Col>
                <Col className='text-center'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewScale}>
                        <i className='fas fa-plus'></i> Create Scale
                    </Button>
                </Col>

                <Col className='text-center'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewBrand}>
                        <i className='fas fa-plus'></i> Create Brand
                    </Button>
                </Col>
            </Row>
            {errorLoadingCategories && <Message variant='danger'>{errorLoadingCategories}</Message>}
            {loadingCategories ? <Loader/> : errorLoadingCategories ?
                <Message variant='danger'>{errorLoadingCategories}</Message> : (
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
                                <h2>Brands</h2>
                            </Col>
                            {errorGettingBrands && <Message variant='danger'>{errorGettingBrands}</Message>}
                            {errorCreatingBrand && <Message variant='danger'>{errorCreatingBrand}</Message>}
                            {errorDeleteBrand && <Message variant='danger'>{errorDeleteBrand}</Message>}
                        </Row>
                        {loadingAllBrands && <Loader/>}
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {brands.map(brand => (
                                <tr key={brand._id}>
                                    <td>{brand._id}</td>
                                    <td>{brand.name}</td>
                                    <td>
                                        <LinkContainer to={`/admin/brands/${brand._id}/edit`}>
                                            <Button variant="outline-dark" className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => {
                                            deleteBrandById(brand._id)
                                        }}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {/*<Paginate pages={pages} page={page} isAdmin={true}/>*/}
                            </tbody>
                        </Table>
                        <Row>
                            <Col>
                                <h2>Scales</h2>
                            </Col>
                            {errorGettingScales && <Message variant='danger'>{errorGettingScales}</Message>}
                            {errorCreatingScale && <Message variant='danger'>{errorCreatingScale}</Message>}
                            {errorDeleteScale && <Message variant='danger'>{errorDeleteScale}</Message>}
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