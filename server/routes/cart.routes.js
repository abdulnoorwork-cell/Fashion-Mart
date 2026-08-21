import express from 'express';
import { addToCart, getCart, updateCartQuantity, removeCartItem } from '../controllers/cart.controller.js';
import { isAuthenticated } from '../middleware/auth.js'
const router = express.Router();

router.post("/add-cart/:id", isAuthenticated, addToCart);
router.get("/:id",isAuthenticated, getCart);
router.put("/cart-quantity", isAuthenticated, updateCartQuantity);
router.delete("/:id", isAuthenticated, removeCartItem);

export default router;