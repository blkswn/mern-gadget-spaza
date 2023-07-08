import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import { resetCart } from '../actions/cartActions';

const OrderScreen = () => {
  const navigate = useNavigate();
  const match = useParams();
  const orderId = match.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    const fetchPayFastClientId = async () => {
      try {
        const { data: clientId } = await axios.get('/api/config/payfast');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.payfast.co.za/onsite/engine.js?merchant_id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };

        document.body.appendChild(script);
      } catch (error) {
        // Handle error fetching PayFast client ID
        console.error(error);
      }
    };
    

    const handleCartReset = () => {
      dispatch(resetCart());
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      handleCartReset();
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      fetchPayFastClientId();
    }
  }, [dispatch, navigate, order, orderId, successPay, successDeliver, userInfo]);

  const successPaymentHandler = (paymentResult) => {    
    dispatch(payOrder(orderId, paymentResult));
    //console.log(orderId);
    //console.log(paymentResult);
  };

  

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  if (loading || !order) {
    return <Loader />;
  }
  if (error) {
    return <Message variant='danger'>{error}</Message>;
  }

  async function onApproveTest(){
    dispatch(payOrder(orderId, { payer: {} }));
  }
  return (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant={'success'}>Delivered on {order.deliveredAt ? order.deliveredAt.slice(0, 10) : '-'}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant={'success'}>Paid on {order.paidAt.slice(0, 10)}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
              {console.log(order.isPaid)}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <strong>Method: </strong>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x R{item.price} = R{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>


              <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>R{order.itemsPrice}</Col>
                  </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>R{order.shippingPrice}</Col>
                  </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>R{order.taxPrice}</Col>
                  </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>R{order.totalPrice}</Col>
                  </Row>
              </ListGroup.Item>

              {/* Add PayFast form */}
              {!order.isPaid && sdkReady && (

                

                <ListGroup.Item>

                    {loadingPay && <Loader />}
{/*                     <div>
                        <Button onClick={ onApproveTest }>Test Pay Order</Button>
                    
                    </div> */}
                    
                  <form action='https://www.payfast.co.za/eng/process' method='post'>
                    <input type='hidden' name='merchant_id' value='16166479' />
                    <input type='hidden' name='merchant_key' value='3kgtbhsdrjndv'/>
                    <input type="hidden" name="return_url" value={`https://www.gadgetspaza.co.za/order/${order._id}`}/>
                    <input type="hidden" name="cancel_url" value={`https://www.gadgetspaza.co.za/order/${order._id}`}/>
                    <input type="hidden" name="notify_url" value={`https://www.gadgetspaza.co.za/api/orders/${order._id}/payfast`}/>
                    <input type='hidden' name='amount' value={order.totalPrice.toFixed(2)} />
                    <input type='hidden' name='item_name' value=  {order.orderItems.map((item) => (
                             <div key={item._id}>{item.name}</div>
                            ))} />
                    <input
                            type='submit'
                            value='Pay with PayFast'
                            className='btn btn-primary btn-block'
                            disabled={order.orderItems.length === 0}
                            onClick={successPaymentHandler}
                    />

                  </form>
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
