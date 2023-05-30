import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js';

// @desc Add item to cart
// @route POST /api/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const { product, name, image, price, countInStock, qty } = req.body;

  const cartItem = new Cart({
    user: req.user._id,
    product,
    name,
    image,
    price,
    countInStock,
    quantity: qty,
  });

  try {
    const addedItem = await cartItem.save();
    res.status(201).json(addedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
})


 // @desc Remove item from cart
// @route DELETE /api/cart/:id
// @access Private
const removeFromCart = asyncHandler(async (req, res) => {
    try {
      const cartItem = await Cart.findById(req.params.id);
  
      if (!cartItem) {
        res.status(404).json({ message: 'Cart item not found' });
        return;
      }
  
      await cartItem.remove();
      res.json({ message: 'Cart item removed' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove cart item' });
    }
  })


// @desc Get cart items
// @route GET /api/cart
// @access Private
const getCartItems = asyncHandler(async (req, res) => {
    try {
      const cartItems = await Cart.find({ user: req.user._id });
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve cart items' });
    }
  })
  

export { addToCart, removeFromCart, getCartItems  };
