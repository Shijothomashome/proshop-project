import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { CLOUDINARY_IMG_URL } from '../constants'

const Product = ({ product }) => {
    console.log(product.image)
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={`${CLOUDINARY_IMG_URL}/${product.image}`} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' className='product-title'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </Card.Text>
                <Card.Text as='h3'>
                    $ {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product