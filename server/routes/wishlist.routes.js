import express from 'express'
import { getWishlist, getWishlistProducts, removeWishlistProduct, toggleWishlist } from '../controllers/wishlist.controller.js';
const router = express.Router();
import { isAuthenticated } from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'

router.get('/get-wishlist-products', isAdmin, getWishlistProducts)
router.delete('/remove-wishlist-product/:product_id', isAdmin, removeWishlistProduct)
router.post("/toggle-wishlist/:id", isAuthenticated, toggleWishlist);
router.get("/:id", isAuthenticated, getWishlist);

export default router