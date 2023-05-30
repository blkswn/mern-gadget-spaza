import express from 'express';
const router = express.Router();
import { addToCart, removeFromCart, getCartItems } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/:id/cart').get(protect, getCartItems);
router.route('/:id/cart').post(protect, addToCart).delete(protect, removeFromCart);

export default router;
