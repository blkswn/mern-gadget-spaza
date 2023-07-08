import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to ={`/product/${product._id}`}>
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <Card.Img src={product.image} variant="top" className="w-100" />
        </div>
        </Link>

        <Card.Body>
        <Link to ={`/product/${product._id}`}>
            <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
        </Link>

        <Card.Text as='div'>
           <Rating value={product.rating} text={`${product.numReviews} reviews`}
           ></Rating>
        </Card.Text>

        <Card.Text as='h3'>R{product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product