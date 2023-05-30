import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import  { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'


const HomeScreen = () => {

 let { pageNumber } = useParams()

 pageNumber = pageNumber || 1

 let { keyword } = useParams()

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products, page, pages} = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])




  return (
    <>
    {!keyword ? ( 
    <ProductCarousel /> 
    ) : ( 
    <Link to='/' className='btn btn-light'>
      Go back
    </Link>
    )}
        <h1>All Products</h1>
        { loading ? (<Loader/>) : error ? ( <Message variant='danger'>{error}</Message> ):(
        <>
        <Row>
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}t/>
            </Col>
        ))}
    </Row>
    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
       )}
        
    </>
  )
}

export default HomeScreen