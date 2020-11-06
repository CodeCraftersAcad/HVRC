import React from 'react';
import {Carousel, Image} from "react-bootstrap";

const ProductDetailsCarousel = ({product}) => {
    return (
        <div>
            {!product.image2 ? <Image src={product.image} alt={product.name} fluid/> : (
                <Carousel pause='hover' className=''>
                    <Carousel.Item key={product._id}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Carousel.Item>
                    <Carousel.Item key={product._id}>
                        <Image src={product.image2} alt={product.name} fluid/>
                    </Carousel.Item>

                    {product.image3 && (
                        <Carousel.Item key={product._id}>
                            <Image src={product.image3} alt={product.name} fluid/>
                        </Carousel.Item>
                    )}
                    {product.image4 && (
                        <Carousel.Item key={product._id}>
                            <Image src={product.image4} alt={product.name} fluid/>
                        </Carousel.Item>
                    )}
                    {product.image5 && (
                        <Carousel.Item key={product._id}>
                            <Image src={product.image5} alt={product.name} fluid/>
                        </Carousel.Item>
                    )}

                </Carousel>
            )
            }
        </div>
    );
};

export default ProductDetailsCarousel;