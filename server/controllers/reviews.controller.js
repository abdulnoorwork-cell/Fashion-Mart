import db from '../config/db.js'
import { v2 as cloudinary } from 'cloudinary'

export const addReview = async (req, res) => {
    try {
        const { product_id, rating, review, images } = req.body;
        const { user_id } = req.params;

        // Check purchased product
        const [purchased] = await db.query(
            `
      SELECT oi.id
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = ?
      AND oi.product_id = ?
      AND o.order_status = 'DELIVERED'
      LIMIT 1
      `,
            [user_id, product_id]
        );

        if (purchased.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Only purchasers can review this product",
            });
        }

        // Check already reviewed
        const [exists] = await db.query(
            `SELECT id FROM reviews WHERE user_id = ? AND product_id = ?`,
            [user_id, product_id]
        );

        if (exists.length > 0) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product",
            });
        }

        let uploadedImages = [];

        if (images && images.length > 0) {
            for (const image of images) {
                const result = await cloudinary.uploader.upload(image, {
                    folder: "reviews",
                });

                uploadedImages.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        }

        await db.query(
            `
      INSERT INTO reviews
      (user_id, product_id, rating, review, images)
      VALUES (?, ?, ?, ?, ?)
      `,
            [
                user_id,
                product_id,
                rating,
                review,
                JSON.stringify(uploadedImages),
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { product_id } = req.params;

        const sql = `
      SELECT
        reviews.*,
        users.name,
        users.email,
        users.image,
        reviews_replies.reply,
        reviews_replies.created_at AS reply_created_at
      FROM reviews
      JOIN users
        ON reviews.user_id = users.id
      LEFT JOIN reviews_replies
        ON reviews.id = reviews_replies.review_id
      WHERE reviews.product_id = ?
      ORDER BY reviews.created_at DESC
    `;

        const [reviews] = await db.query(sql, [product_id]);

        const result = reviews.map((review) => ({
            ...review,
            images: review.images
                ? JSON.parse(review.images)
                : [],
            image: review.image
                ? JSON.parse(review.image)
                : null,
        }));

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const productRating = async (req, res) => {
    try {
        const { product_id } = req.params;

        const sql = `
      SELECT 
        AVG(rating) AS average_rating,
        COUNT(*) AS total_reviews
      FROM reviews
      WHERE product_id = ?
    `;

        const [data] = await db.query(sql, [product_id]);

        return res.json(data[0]);

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const sql = `
      SELECT 
        r.id,
        r.product_id,
        r.review,
        r.rating,
        r.created_at,
        r.images,
        u.name,
        u.email,
        u.image,
        p.name AS product_name,
        p.offerPrice
      FROM reviews r
      JOIN users u ON u.id = r.user_id
      JOIN products p ON p.id = r.product_id
    `;

        const [data] = await db.query(sql);

        const result = data.map(r => ({
            ...r,
            images: r.images ? JSON.parse(r.images) : [],
            image: r.image ? JSON.parse(r.image) : []
        }));

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const getSingleReview = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
      SELECT 
        reviews.id,
        reviews.review,
        reviews.images,
        users.name,
        users.email,
        users.image
      FROM reviews
      JOIN users ON users.id = reviews.user_id
      WHERE reviews.id = ?
    `;

        const [data] = await db.query(sql, [id]);

        if (!data.length) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        const review = {
            ...data[0],
            images: data[0].images ? JSON.parse(data[0].images) : []
        };

        return res.status(200).json(review);

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const adminReply = async (req, res) => {
    try {
        const { review_id, reply } = req.body;

        if (!review_id) {
            return res.status(400).json({ success: false, messege: "Invalid review ID" });
        }

        if (!reply) {
            return res.status(400).json({ success: false, messege: "Reply can't be empty!" });
        }

        const sql = `INSERT INTO reviews_replies (review_id, reply) VALUES (?, ?)`;

        await db.query(sql, [review_id, reply]);

        return res.status(201).json({
            success: true,
            messege: "Reply added successfully"
        });

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};