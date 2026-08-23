import db from '../config/db.js'

export const toggleWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.body;

        const [existing] = await db.query(
            `SELECT id
             FROM wishlist
             WHERE user_id = ? AND product_id = ?`,
            [id, productId]
        );

        if (existing.length > 0) {

            await db.query(
                `DELETE FROM wishlist
                 WHERE user_id = ? AND product_id = ?`,
                [id, productId]
            );

            return res.status(200).json({
                success: true,
                action: "removed",
                message: "Removed from wishlist"
            });
        }

        await db.query(
            `INSERT INTO wishlist (user_id, product_id)
             VALUES (?, ?)`,
            [id, productId]
        );

        res.status(200).json({
            success: true,
            action: "added",
            message: "Added to wishlist"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error: " + error
        });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const { id } = req.params;

        const [wishlist] = await db.query(
            `
            SELECT
                p.id, p.name, p.category, p.price, p.offerPrice, p.sizes, p.colors
            FROM wishlist w
            INNER JOIN products p
                ON p.id = w.product_id
            WHERE w.user_id = ?
            ORDER BY w.created_at DESC
            `,
            [id]
        );

        // 2. Get all images in ONE query (NO LOOP QUERIES)
        const [images] = await db.query(
            "SELECT product_id, images FROM product_images"
        );

        // 3. Group images by product_id
        const imageMap = {};

        for (const img of images) {
            if (!imageMap[img.product_id]) {
                imageMap[img.product_id] = [];
            }

            try {
                imageMap[img.product_id].push(JSON.parse(img.images));
            } catch (e) {
                imageMap[img.product_id].push(img.images);
            }
        }

        // 4. Attach images
        const result = wishlist.map(product => {
            try {
                product.sizes = product.sizes ? JSON.parse(product.sizes) : []
                product.colors = product.colors ? JSON.parse(product.colors) : []
            } catch (error) {
                product.sizes = [];
                product.colors = []
            }
            return {
                ...product,
                images: imageMap[product.id] || []
            }
        });

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error: " + error
        });
    }
};

export const getWishlistProducts = async (req, res) => {
    try {
        const sql = `
      SELECT 
        p.id,
        p.name,
        p.category,
        p.offerPrice,
        COUNT(w.product_id) AS total_wishes,
        CONCAT('[', GROUP_CONCAT(pi.images), ']') AS images
      FROM wishlist w
      JOIN products p ON p.id = w.product_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id
      ORDER BY total_wishes DESC
    `;

        const [data] = await db.query(sql);

        const result = data.map(product => ({
            ...product,
            images: product.images ? JSON.parse(product.images) : []
        }));

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: err.message
        });
    }
};

export const removeWishlistProduct = async (req, res) => {
    try {
        const { product_id } = req.params;

        const sql = "DELETE FROM wishlist WHERE product_id = ?";
        const [result] = await db.query(sql, [product_id]);

        if (result.affectedRows === 0) {
            return res.json({
                success: false,
                messege: "No product found with this ID"
            });
        }

        return res.json({
            success: true,
            messege: "Product removed from wishlist"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: err.message
        });
    }
};