import express from 'express'
const router = express.Router()
import { getOrders, addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, handlePayFastNotification  } from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/payfast').put(updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

// Add the new route for PayFast notification callback
router.route('/payfast').post(handlePayFastNotification);

export default router