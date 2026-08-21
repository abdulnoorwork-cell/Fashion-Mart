import db from '../config/db.js'

export const addToCart = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            productId,
            size,
            color,
            quantity = 1
        } = req.body;

        const [existing] = await db.query(
            `
            SELECT *
            FROM cart_items
            WHERE user_id = ?
            AND product_id = ?
            AND size <=> ?
            AND color <=> ?
            `,
            [id, productId, size, color]
        );

        if (existing.length > 0) {

            await db.query(
                `
                UPDATE cart_items
                SET quantity = quantity + ?
                WHERE id = ?
                `,
                [quantity, existing[0].id]
            );

            return res.status(200).json({
                success: true,
                message: "Cart updated"
            });
        }

        await db.query(
            `
            INSERT INTO cart_items
            (user_id, product_id, size, color, quantity)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                id,
                productId,
                size,
                color,
                quantity
            ]
        );

        res.status(201).json({
            success: true,
            message: "Added to cart"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error: " + error
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const { id } = req.params;

        const [cart] = await db.query(
            `
            SELECT
                c.id,
                c.quantity,
                c.size,
                c.color,

                p.id AS productId,
                p.name,
                p.price,
                p.offerPrice,
                p.category

            FROM cart_items c

            JOIN products p
                ON c.product_id = p.id

            WHERE c.user_id = ?

            ORDER BY c.created_at DESC
            `,
            [id]
        );

        // Get all product images
        const [images] = await db.query(
            "SELECT product_id, images FROM product_images"
        );

        // Group images by product_id
        const imageMap = {};

        for (const img of images) {
            if (!imageMap[img.product_id]) {
                imageMap[img.product_id] = [];
            }

            try {
                imageMap[img.product_id].push(
                    JSON.parse(img.images)
                );
            } catch (e) {
                imageMap[img.product_id].push(img.images);
            }
        }

        // Attach images
        const result = cart.map((product) => ({
            ...product,
            images: imageMap[product.productId] || []
        }));

        return res.status(200).json({
            success: true,
            cart: result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error: " + error
        });
    }
};

export const updateCartQuantity = async (req, res) => {
    try {

        const { cartId, quantity } = req.body;

        await db.query(
            `
            UPDATE cart_items
            SET quantity = ?
            WHERE id = ?
            `,
            [quantity, cartId]
        );

        res.status(200).json({
            success: true,
            message: "Quantity updated"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const removeCartItem = async (req, res) => {
    try {

        await db.query(
            "DELETE FROM cart_items WHERE id = ?",
            [req.params.id]
        );

        res.status(200).json({
            success: true,
            message: "Item removed"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};