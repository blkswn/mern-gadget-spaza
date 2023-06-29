import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


//@desc create new order
//@route POST /api/orders
//access private
const addOrderItems = asyncHandler(async (req, res) => {
   const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

   if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items')
    return
   }else{
    const order = new Order({
        orderItems, 
        user: req.user._id,
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
   }
})

//@desc GET order by ID
//@route GET /api/orders/:id
//access private
const getOrderById = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email')

   if(order){
    res.json(order)
   }else{
    res.status(404)
    throw new Error('Order not found')
   }
    
 })

 //@desc update order to paid
//@route PUT /api/orders/:id/pay
//access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.sendStatus(200);

   const order = await Order.findById(req.params.id)
   if(order){
    //res.sendStatus(200)
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      payment_id: req.body.pf_payment_id,
      status: req.body.payment_status,
      orderName: req.body.item_name,
    }
    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
   }else{
    res.status(404)
    throw new Error('Order not found')
   }
    
 })



 const handlePayFastNotification = asyncHandler(async (req, res) => {
  const {
    payment_status,
    m_payment_id,
    // other payment details
  } = req.body;

  const order = await Order.findById(m_payment_id);

  if (order) {
    order.isPaid = payment_status === 'COMPLETE';
    order.paidAt = Date.now();
    order.paymentResult = {
      payment_id: req.body.pf_payment_id,
      status: req.body.payment_status,
      orderName: req.body.item_name,

    };

    updatedOrder = await order.save();
    res.sendStatus(200);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


 //@desc GET logged in user orders
//@route GET /api/orders/myorders
//access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  res.json(orders)
})

 //@desc GET all orders
//@route GET /api/orders
//access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})


//@desc update order to delivered
//@route GET /api/orders/:id/delivered
//access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order){
   order.isDelivered = true
   order.deliveredAt = Date.now()

   const updatedOrder = await order.save()

   res.json(updatedOrder)
  }else{
   res.status(404)
   throw new Error('Order not found')
  }
   
})



export { addOrderItems, getOrderById , updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders, handlePayFastNotification}