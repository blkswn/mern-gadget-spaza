import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import  { Form, Button, Row, Col  } from 'react-bootstrap'
import { useDispatch, useSelector  } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate()

    const dispatch = useDispatch()

    /*if(!shippingAddress){
        navigate('/shipping')
    }*/
  
    const [paymentMethod, setPaymentMethod] = useState('Payfast')
  
  
    useEffect(() => {
      if (!shippingAddress) {
        navigate('/shipping')
      }
    }, [shippingAddress, navigate]) 
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    }
  
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            
            <Col>
                <Form.Check 
                    type='radio' 
                    label='PayPal or Credit Card' 
                    id='PayPal' 
                    name='paymentMethod' 
                    value='PayPal' 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                 ></Form.Check>
                      <Form.Check 
                    type='radio' 
                    label='Payfast' 
                    id='Payfast' 
                    name='paymentMethod' 
                    value='Payfast' 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                 ></Form.Check>

                 

                {/* <Form.Check 
                    type='radio' 
                    label='PayPal or Credit Card' 
                    id='PayPal' 
                    name='paymentMethod' 
                    value='PayPal' 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                 ></Form.Check> */}
            </Col>
            </Form.Group>

            <Row className='py-3'></Row>
         
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    )
  }
  
  export default PaymentScreen;
  