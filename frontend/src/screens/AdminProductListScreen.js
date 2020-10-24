import React, {useEffect} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {listProducts, adminDeleteProductById, adminCreateNewProduct} from "../actions/product-actions";
import {PRODUCT_CREATE_RESET} from "../constants/product-contstants";

const AdminProductListScreen = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const adminDeleteProduct = useSelector(state => state.adminDeleteProduct)
    const {loading: loadingDeleteProduct, error: errorAdminDeletingProduct, success: successDelete} = adminDeleteProduct

    const adminCreateProduct = useSelector(state => state.adminCreateProduct)
    const {loading: loadingCreateProduct, error: errorCreatingProduct, success: successCreatingProduct, product: createdNewProduct} = adminCreateProduct

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin) history.push('/login')

        if (successCreatingProduct) history.push(`/admin/product/${createdNewProduct._id}/edit`)
        else dispatch(listProducts('', pageNumber))

    }, [dispatch, history, userInfo, successDelete, successCreatingProduct, createdNewProduct, pageNumber])

    const deleteProductById = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(adminDeleteProductById(id))
        }
    }

    const createNewProduct = () => {
        dispatch(adminCreateNewProduct())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' variant='outline-dark' onClick={createNewProduct}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDeleteProduct && <Loader/>}
            {errorAdminDeletingProduct && <Message variant='danger'>{errorAdminDeletingProduct}</Message>}
            {loadingCreateProduct && <Loader/>}
            {errorCreatingProduct && <Message variant='danger'>{errorCreatingProduct}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>${product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="outline-dark" className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => {
                                        deleteProductById(product._id)
                                    }}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true}/>
                </>
            )}
        </>
    );
};

export default AdminProductListScreen;