import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate  } from 'react-router-dom'
import  { Table, Button  } from 'react-bootstrap'
import { useDispatch, useSelector  } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin




    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        }else{
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo ])




  return (
    <>
    <h1>Orders</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
    : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>USER</th>
                    <th>ORDER NAME</th>
                    <th>QTY</th>
                    <th>DATE</th>
                    <th>TOTAL PRICE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>
                             {/* Display the name of each order item */}
                            {order.orderItems.map((item) => (
                             <div key={item._id}>{item.name}</div>
                            ))}
                        </td>
                        <td>
                             {/* Display the quantity of each order item */}
                            {order.orderItems.map((item) => (
                             <div key={item._id}>{item.qty}</div>
                            ))}
                        </td>
                        <td>{ order.createdAt ? order.createdAt.slice(0, 10) : '_'}</td>
                        <td>R{order.totalPrice}</td>
                        <td>
                            {order.isPaid ? (
                                order.paidAt
                            ):(
                                <i className='fas fa-times' style={{
                                    color:'red'
                                }}></i>
                            )}
                        </td>

                        <td>
                            {order.isDelivered ? (
                               order.deliveredAt ?  order.deliveredAt.slice(0, 10) : '-'
                            ):(
                                <i className='fas fa-times' style={{
                                    color:'red'
                                }}></i>
                            )}
                        </td>

                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'> 
                                    Details
                                </Button>
                            </LinkContainer>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
    </>
  )
}

export default OrderListScreen