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
import {listBrands, listCategories, listColors, listScale} from "../actions/category-actions";

const AdminProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const [name, setName] = useState('');
    const [additionalName, setAdditionalName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [image5, setImage5] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [powerType, setPowerType] = useState('')
    const [motor, setMotor] = useState('')
    const [transmitter, setTransmitter] = useState('')
    const [other, setOther] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [battery, setBattery] = useState('')
    const [includesAdditional, setIncludesAdditions] = useState('')
    const [sku, setSku] = useState('')
    const [discountable, setDiscountable] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [scale, setScale] = useState('')
    const [productIdNumber, setProductIdNumber] = useState('')
    const [weight, setWeight] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [color, setColor] = useState('')
    const [shippingCost, setShippingCost] = useState(0)
    const [shippingTime, setShippingTime] = useState('')

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const adminProductUpdate = useSelector(state => state.adminProductUpdate);
    const {loading: adminLoadingProductUpdate, error: adminProductUpdateError, success: successAdminProductUpdate} = adminProductUpdate;

    const getScales = useSelector(state => state.getScales)
    const {loading: loadingAllScales, scales, error: errorGettingScales} = getScales

    const getAllColors = useSelector(state => state.getAllColors)
    const {loading: loadingAllColors, colors, error: errorGettingColors} = getAllColors

    const getBrands = useSelector(state => state.getBrands)
    const {loading: loadingAllBrands, brands, error: errorGettingBrands} = getBrands

    const getCategories = useSelector(state => state.getCategories)
    const {loading: loadingCategories, categories, error: errorCategories} = getCategories


    useEffect(() => {
        if (successAdminProductUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
                dispatch(listCategories())
                dispatch(listScale())
                dispatch(listBrands())
                dispatch(listColors())
            } else {
                setName(product.name)
                setAdditionalName(product.additionalName)
                setPrice(product.price)
                setImage(product.image)
                setImage2(product.image2)
                setImage3(product.image3)
                setImage4(product.image4)
                setImage5(product.image5)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setPowerType(product.powerType)
                setMotor(product.motor)
                setTransmitter(product.transmitter)
                setOther(product.other)
                setDimensions(product.dimensions)
                setBattery(product.battery)
                setIncludesAdditions(product.includesAdditional)
                setSku(product.sku)
                setScale(product.scale)
                setDiscountable(product.discountable)
                setProductIdNumber(product.productIdNumber)
                setWeight(product.weight)
                setSubCategory(product.subCategory)
                setColor(product.colors)
                setShippingCost(product.shippingCost)
                setShippingTime(product.shippingTime)

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
    const uploadPhoto2 = async (e) => {
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

            const {data} = await axios.post('/api/upload/photo2', formData, config)
            setImage2(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const uploadPhoto3 = async (e) => {
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

            const {data} = await axios.post('/api/upload/photo3', formData, config)
            setImage3(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const uploadPhoto4 = async (e) => {
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

            const {data} = await axios.post('/api/upload/photo4', formData, config)
            setImage4(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const uploadPhoto5 = async (e) => {
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

            const {data} = await axios.post('/api/upload/photo5', formData, config)
            setImage5(data)
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
            additionalName,
            price,
            image,
            brand,
            countInStock,
            category,
            description,
            powerType,
            motor,
            transmitter,
            other,
            dimensions,
            battery,
            includesAdditional,
            sku,
            discountable,
            productIdNumber,
            weight,
            scale,
            subCategory,
            color,
            shippingCost,
            shippingTime,
            image2,
            image3,
            image4,
            image5,
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
                {loadingCategories && <Loader/>}
                {loadingAllBrands && <Loader/>}
                {errorCategories && <Message variant='danger'>{errorCategories}</Message>}
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
                                <Form.Group controlId='additionalName'>
                                    <Form.Label>Addition Name</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Name Details'
                                                  value={additionalName}
                                                  onChange={e => setAdditionalName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='weight'>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter product weight'
                                                  value={weight}
                                                  onChange={e => setWeight(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                {/*<Form.Group controlId='scale'>*/}
                                {/*    <Form.Label>Scale</Form.Label>*/}
                                {/*    <Form.Control type='text'*/}
                                {/*                  placeholder='Enter scale'*/}
                                {/*                  value={scale}*/}
                                {/*                  onChange={e => setScale(e.target.value)}>*/}
                                {/*    </Form.Control>*/}
                                {/*</Form.Group>*/}

                                <Form.Group controlId='subCategory'>
                                    <Form.Label>Sub-Category</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter sub category'
                                                  value={subCategory}
                                                  onChange={e => setSubCategory(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='productIdNumber'>
                                    <Form.Label>Product ID Number</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter product id number'
                                                  value={productIdNumber}
                                                  onChange={e => setProductIdNumber(e.target.value)}>
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

                                <Form.Group controlId='shippingTime'>
                                    <Form.Label>Shipping Time</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter shipping Time'
                                                  value={shippingTime}
                                                  onChange={e => setShippingTime(e.target.value)}>
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

                                <Form.Group controlId='image2'>
                                    <Form.Label>Image 2</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter image2 url'
                                                  value={image2}
                                                  onChange={e => setImage2(e.target.value)}>
                                    </Form.Control>
                                    <Form.File id='image-file'
                                               label='Choose file from computer'
                                               custom
                                               onChange={uploadPhoto2}>
                                    </Form.File>
                                    {uploading && <Loader/>}
                                </Form.Group>

                                <Form.Group controlId='image3'>
                                    <Form.Label>Image 3</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter image3 url'
                                                  value={image3}
                                                  onChange={e => setImage3(e.target.value)}>
                                    </Form.Control>
                                    <Form.File id='image-file'
                                               label='Choose file from computer'
                                               custom
                                               onChange={uploadPhoto3}>
                                    </Form.File>
                                    {uploading && <Loader/>}
                                </Form.Group>

                                <Form.Group controlId='image4'>
                                    <Form.Label>Image 4</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter image4 url'
                                                  value={image4}
                                                  onChange={e => setImage4(e.target.value)}>
                                    </Form.Control>
                                    <Form.File id='image-file'
                                               label='Choose file from computer'
                                               custom
                                               onChange={uploadPhoto4}>
                                    </Form.File>
                                    {uploading && <Loader/>}
                                </Form.Group>

                                <Form.Group controlId='image5'>
                                    <Form.Label>Image 5</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter image5 url'
                                                  value={image5}
                                                  onChange={e => setImage5(e.target.value)}>
                                    </Form.Control>
                                    <Form.File id='image-file'
                                               label='Choose file from computer'
                                               custom
                                               onChange={uploadPhoto5}>
                                    </Form.File>
                                    {uploading && <Loader/>}
                                </Form.Group>

                                {/*<Form.Group controlId='brand'>*/}
                                {/*    <Form.Label>Brand</Form.Label>*/}
                                {/*    <Form.Control type='text'*/}
                                {/*                  placeholder='Enter brand'*/}
                                {/*                  value={brand}*/}
                                {/*                  onChange={e => setBrand(e.target.value)}>*/}
                                {/*    </Form.Control>*/}
                                {/*</Form.Group>*/}
                                {loadingAllColors && <Loader/>}
                                {errorGettingBrands && <Message variant='danger'>{errorGettingBrands}</Message>}
                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control as='select' value={brand}
                                                  onChange={(e) => setBrand(e.target.value)}>
                                        {brands && brands.map(brand => (
                                            <option key={brand._id} value={brand.name}>{brand.name}</option>))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='shippingCost'>
                                    <Form.Label>Shipping Cost</Form.Label>
                                    <Form.Control type='number'
                                                  placeholder='Enter shipping cost'
                                                  value={shippingCost}
                                                  onChange={e => setShippingCost(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                {/*<Form.Group controlId='colors'>*/}
                                {/*    <Form.Label>Colors</Form.Label>*/}
                                {/*    <Form.Control type='text'*/}
                                {/*                  placeholder='Enter product colors'*/}
                                {/*                  value={colors}*/}
                                {/*                  onChange={e => setColors(e.target.value)}>*/}
                                {/*    </Form.Control>*/}
                                {/*</Form.Group>*/}
                                {loadingAllColors && <Loader/>}
                                {errorGettingColors && <Message variant='danger'>{errorGettingColors}</Message>}
                                <Form.Group controlId='color'>
                                    <Form.Label>Colors</Form.Label>
                                    <Form.Control as='select' value={color}
                                                  onChange={(e) => setColor(e.target.value)}>
                                        <option key='1' value='Set Color'>Select a color</option>
                                        {colors && colors.map(color => (
                                            <option key={color._id} value={color.name}>{color.name}</option>))}

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
                                    <Form.Control as='select' value={category}
                                                  onChange={(e) => setCategory(e.target.value)}>
                                            <option key='1' value='Set Category'>Select a category</option>
                                        {categories && categories.map(cat => (
                                            <option key={cat._id} value={cat.name}>{cat.name}</option>))}

                                    </Form.Control>
                                </Form.Group>

                                {loadingAllScales && <Loader/>}
                                {errorGettingScales && <Message variant='danger'>{errorGettingScales}</Message>}
                                <Form.Group controlId='scale'>
                                    <Form.Label>Scale</Form.Label>
                                    <Form.Control as='select' value={scale}
                                                  onChange={(e) => setScale(e.target.value)}>
                                        <option key='1' value='Set Scale'>Select a scale</option>
                                        {scales && scales.map(scale => (
                                            <option key={scale._id} value={scale.name}>{scale.name}</option>))}

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
                                <Form.Group controlId='powerType'>
                                    <Form.Label>Power Type</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter powerType'
                                                  value={powerType}
                                                  onChange={e => setPowerType(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='motor'>
                                    <Form.Label>Motor</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Motor specs'
                                                  value={motor}
                                                  onChange={e => setMotor(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='transmitter'>
                                    <Form.Label>Transmitter</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Transmitter type'
                                                  value={transmitter}
                                                  onChange={e => setTransmitter(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='other'>
                                    <Form.Label>Other Information</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter addtional information'
                                                  value={other}
                                                  onChange={e => setOther(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Dimensions</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter product dimensions'
                                                  value={dimensions}
                                                  onChange={e => setDimensions(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='battery'>
                                    <Form.Label>Battery</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Battery Description'
                                                  value={battery}
                                                  onChange={e => setBattery(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='includesAdditional'>
                                    <Form.Label>Package Includes</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Package includes'
                                                  value={includesAdditional}
                                                  onChange={e => setIncludesAdditions(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='sku'>
                                    <Form.Label>Sku</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter product sku'
                                                  value={sku}
                                                  onChange={e => setSku(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='discountable'>
                                    <Form.Check type='checkbox'
                                                label='Discountable'
                                                checked={discountable}
                                                onChange={e => setDiscountable(e.target.checked)}>
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='outline-primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    );
};

export default AdminProductEditScreen;

// <Form.Group controlId='category'>
//     <Form.Label>Category</Form.Label>
//     <Form.Control type='text'
//                   placeholder='Enter category'
//                   value={category}
//                   onChange={e => setCategory(e.target.value)}>
//     </Form.Control>
// </Form.Group>

// import React, {useState, useEffect} from 'react';
// import {Link} from "react-router-dom";
// import {Form, Button, Col} from "react-bootstrap";
// import {useDispatch, useSelector} from "react-redux";
// import Message from "../components/message";
// import Loader from "../components/Loader";
// import {listProductDetails, adminUpdateSingleProduct} from "../actions/product-actions";
// import FormContainer from "../components/form-container";
// import {PRODUCT_UPDATE_RESET} from "../constants/product-contstants";
// import axios from 'axios'
// import {listCategories} from "../actions/category-actions";
//
// const AdminProductEditScreen = ({match, history}) => {
//     const productId = match.params.id
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState(0);
//     const [image, setImage] = useState('')
//     const [brand, setBrand] = useState('')
//     const [category, setCategory] = useState('')
//     const [countInStock, setCountInStock] = useState(0)
//     const [description, setDescription] = useState('')
//     const [uploading, setUploading] = useState(false)
//
//     const dispatch = useDispatch();
//
//     const productDetails = useSelector(state => state.productDetails);
//     const {loading, error, product} = productDetails;
//
//     const getCategories = useSelector(state => state.getCategories)
//     const {loading: loadingCategories, categories, error: errorCategories} = getCategories
//
//     const adminProductUpdate = useSelector(state => state.adminProductUpdate);
//     const {loading: adminLoadingProductUpdate, error: adminProductUpdateError, success: successAdminProductUpdate} = adminProductUpdate;
//
//     useEffect(() => {
//         if (successAdminProductUpdate) {
//             dispatch({type: PRODUCT_UPDATE_RESET})
//             history.push('/admin/productlist')
//         } else {
//             if (!product.name || product._id !== productId) {
//                 dispatch(listProductDetails(productId))
//                 dispatch(listCategories())
//             } else {
//                 setName(product.name)
//                 setPrice(product.price)
//                 setImage(product.image)
//                 setBrand(product.brand)
//                 setCategory(product.category)
//                 setCountInStock(product.countInStock)
//                 setDescription(product.description)
//             }
//         }
//     }, [dispatch, productId, product, history, successAdminProductUpdate])
//
//     const uploadPhoto = async (e) => {
//         const file = e.target.files[0]
//         const formData = new FormData()
//         formData.append('image', file)
//         setUploading(true)
//         try {
//
//             const config = {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             }
//
//             const {data} = await axios.post('/api/upload', formData, config)
//             setImage(data)
//             setUploading(false)
//
//         } catch (error) {
//             console.error(error)
//             setUploading(false)
//         }
//     }
//
//     const updateProduct = e => {
//         e.preventDefault()
//         dispatch(adminUpdateSingleProduct({
//             _id: productId,
//             name,
//             price,
//             image,
//             brand,
//             countInStock,
//             category,
//             description,
//         }))
//     }
//     return (
//         <>
//             <Link to='/admin/productlist' className='btn btn-outline-dark my-3'>
//                 Go Back
//             </Link>
//             <FormContainer>
//                 <h1>Edit Product</h1>
//
//                 {adminLoadingProductUpdate && <Loader/>}
//                 {adminProductUpdateError && <Message variant='danger'>{adminProductUpdateError}</Message>}
//                 {loading
//                     ? <Loader/>
//                     : error
//                         ? <Message variant='danger'>{error}</Message>
//                         : (
//                             <Form onSubmit={updateProduct}>
//
//                                 <Form.Group controlId='name'>
//                                     <Form.Label>Name</Form.Label>
//                                     <Form.Control type='text'
//                                                   placeholder='Enter product name'
//                                                   value={name}
//                                                   onChange={e => setName(e.target.value)}>
//                                     </Form.Control>
//                                 </Form.Group>
//
//                                 <Form.Group controlId='price'>
//                                     <Form.Label>Price</Form.Label>
//                                     <Form.Control type='number'
//                                                   placeholder='Enter product price'
//                                                   value={price}
//                                                   onChange={e => setPrice(e.target.value)}>
//                                     </Form.Control>
//                                 </Form.Group>
//
//                                 <Form.Group controlId='image'>
//                                     <Form.Label>Image</Form.Label>
//                                     <Form.Control type='text'
//                                                   placeholder='Enter image url'
//                                                   value={image}
//                                                   onChange={e => setImage(e.target.value)}>
//                                     </Form.Control>
//                                     <Form.File id='image-file'
//                                                label='Choose file from computer'
//                                                custom
//                                                onChange={uploadPhoto}>
//                                     </Form.File>
//                                     {uploading && <Loader/>}
//                                 </Form.Group>
//
//                                 <Form.Group controlId='brand'>
//                                     <Form.Label>Brand</Form.Label>
//                                     <Form.Control type='text'
//                                                   placeholder='Enter brand'
//                                                   value={brand}
//                                                   onChange={e => setBrand(e.target.value)}>
//                                     </Form.Control>
//                                 </Form.Group>
//
//                                 <Form.Group controlId='count'>
//                                     <Form.Label>Count In Stock</Form.Label>
//                                     <Form.Control type='number'
//                                                   placeholder='Enter product count'
//                                                   value={countInStock}
//                                                   onChange={e => setCountInStock(e.target.value)}>
//                                     </Form.Control>
//                                 </Form.Group>
//
//                                 <Form.Group>
//                                     <Form.Label>Category</Form.Label>
//                                     <Form.Control as='select' value={category}
//                                                    onChange={(e) => setCategory(e.target.value)}>
//                                          {categories && categories.map(cat => (
//                                              <option key={cat._id} value={cat.name}>{cat.name}</option>))}
//
//                                      </Form.Control>
//                                 </Form.Group>
//
//                                 <Form.Group controlId='description'>
//                                     <Form.Label>Description</Form.Label>
//                                     <Form.Control type='text'
//                                                   placeholder='Enter product description'
//                                                   value={description}
//                                                   onChange={e => setDescription(e.target.value)}>
//                                     </Form.Control>
//                                 </Form.Group>
//
//
//                                 <Button type='submit' variant='outline-primary'>Update</Button>
//                             </Form>
//                         )}
//             </FormContainer>
//         </>
//     );
// };
//
// export default AdminProductEditScreen;
//
