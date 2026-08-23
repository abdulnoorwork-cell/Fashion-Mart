import db from '../config/db.js'
import 'dotenv/config'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
    try {
        const {
            user_id,
            items,
            total_amount,
            payment_method,
            address,
        } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        if (!address || !address.firstName) {
            return res.status(400).json({
                success: false,
                message: "Invalid address",
            });
        }

        // =====================================================
        // COD
        // =====================================================

        if (payment_method === "COD") {

            const conn = await db.getConnection();

            try {
                await conn.beginTransaction();

                const [orderResult] = await conn.execute(
                    `
                    INSERT INTO orders
                    (
                        user_id,
                        total_amount,
                        payment_method,
                        address,
                        payment_status
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        user_id,
                        total_amount,
                        "COD",
                        JSON.stringify(address),
                        "PENDING",
                    ]
                );

                const order_id = orderResult.insertId;

                for (const item of items) {

                    // IMPORTANT:
                    // item.productId = actual product ID
                    // item.id = cart item ID

                    const productId = item.productId;

                    if (!productId) {
                        throw new Error(
                            "Product ID missing from cart item"
                        );
                    }

                    await conn.execute(
                        `
                        INSERT INTO order_items
  (order_id, product_id, quantity, price, size, color)
  VALUES (?, ?, ?, ?, ?, ?)
                        `,
                        [
                            order_id,
                            productId,
                            Number(item.quantity) || 1,
                            Number(item.offerPrice) || Number(item.price) || 0,
                            item.size,
                            item.color
                        ]
                    );
                }

                await conn.execute(
                    "DELETE FROM cart_items WHERE user_id = ?",
                    [user_id]
                );

                await conn.commit();

                return res.status(200).json({
                    success: true,
                    message: "Order placed successfully",
                    order_id,
                });

            } catch (error) {

                await conn.rollback();
                throw error;

            } finally {
                conn.release();
            }
        }

        // =====================================================
        // ONLINE / STRIPE
        // =====================================================

        if (payment_method === "ONLINE") {

            const stripeItems = items.map((item) => {

                const price = Number(item.offerPrice) || Number(item.price) || 0;

                return {
                    price_data: {
                        currency: "pkr",

                        product_data: {
                            name: item.name,
                        },

                        unit_amount: Math.round(price * 100),
                    },

                    quantity: Number(item.quantity) || 1,
                };
            });

            // Store ONLY the information required to create
            // the order after successful payment.
            const orderItems = items.map((item) => ({
                productId: item.productId,
                quantity: Number(item.quantity) || 1,
                price: Number(item.offerPrice) || Number(item.price) || 0,
                size: item.size || null,
                color: item.color || null,
            }));

            const session = await stripe.checkout.sessions.create({

                payment_method_types: ["card"],

                line_items: stripeItems,

                mode: "payment",

                success_url:
                    `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

                cancel_url:
                    `${process.env.FRONTEND_URL}/cancel`,

                metadata: {
                    user_id: String(user_id),

                    items: JSON.stringify(orderItems),

                    address: JSON.stringify(address),

                    total_amount: String(total_amount),
                },
            });

            return res.status(200).json({
                success: true,
                url: session.url,
                session_id: session.id,
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid payment method",
        });

    } catch (error) {

        console.error("PLACE ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const confirmOrder = async (req, res) => {

    const { session_id } = req.body;

    console.log("=================================");
    console.log("CONFIRM ORDER START");
    console.log("Session ID:", session_id);

    if (!session_id) {
        return res.status(400).json({
            success: false,
            message: "Session ID is required",
        });
    }

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        // =====================================================
        // 1. Get Stripe session
        // =====================================================

        const session =
            await stripe.checkout.sessions.retrieve(session_id);

        console.log(
            "Stripe payment status:",
            session.payment_status
        );

        console.log(
            "Stripe session:",
            session.id
        );

        if (session.payment_status !== "paid") {

            await conn.rollback();

            return res.status(400).json({
                success: false,
                message: "Payment not completed",
            });
        }

        // =====================================================
        // 2. Check if order already exists
        // =====================================================

        const [existingOrder] = await conn.query(
            `
            SELECT id
            FROM orders
            WHERE stripe_session_id = ?
            LIMIT 1
            `,
            [session_id]
        );

        console.log(
            "Existing order:",
            existingOrder
        );

        if (existingOrder.length > 0) {

            await conn.rollback();

            return res.status(200).json({
                success: true,
                alreadyExists: true,
                message: "Order already exists",
                order_id: existingOrder[0].id,
            });
        }

        // =====================================================
        // 3. Get metadata
        // =====================================================

        const metadata = session.metadata;

        if (!metadata) {
            throw new Error("Stripe metadata is missing");
        }

        console.log("Stripe metadata:", metadata);

        const user_id = metadata.user_id;

        const items = JSON.parse(metadata.items);

        const address = JSON.parse(metadata.address);

        const total_amount =
            Number(metadata.total_amount);

        console.log("USER ID:", user_id);
        console.log("ITEMS:", items);
        console.log("ADDRESS:", address);
        console.log("TOTAL:", total_amount);

        // =====================================================
        // 4. Validate
        // =====================================================

        if (!user_id) {
            throw new Error("User ID missing");
        }

        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("Order items are empty");
        }

        // =====================================================
        // 5. Create order
        // =====================================================

        console.log("Creating order...");

        const [orderResult] = await conn.query(
            `
            INSERT INTO orders
            (
                user_id,
                total_amount,
                payment_method,
                address,
                payment_status,
                stripe_session_id
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                user_id,
                total_amount,
                "ONLINE",
                JSON.stringify(address),
                "PAID",
                session_id,
            ]
        );

        const order_id = orderResult.insertId;

        console.log(
            "ORDER CREATED:",
            order_id
        );

        // =====================================================
        // 6. Insert order items
        // =====================================================

        for (const item of items) {

            console.log(
                "Inserting order item:",
                item
            );

            if (!item.productId) {
                throw new Error(
                    "Product ID missing from order item"
                );
            }

            await conn.query(
                `
                INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    quantity,
                    price,
                    size,
                    color
                )
                VALUES (?, ?, ?, ?,?,?)
                `,
                [
                    order_id,

                    // IMPORTANT
                    item.productId,

                    Number(item.quantity) || 1,

                    Number(item.offerPrice) || Number(item.price) || 0,
                    item.size,
                    item.color
                ]
            );
        }

        console.log(
            "ORDER ITEMS INSERTED"
        );

        // =====================================================
        // 7. Clear cart
        // =====================================================

        await conn.query(
            `
            DELETE FROM cart_items
            WHERE user_id = ?
            `,
            [user_id]
        );

        console.log(
            "CART CLEARED"
        );

        // =====================================================
        // 8. Commit
        // =====================================================

        await conn.commit();

        console.log(
            "TRANSACTION COMMITTED"
        );

        console.log(
            "ORDER SUCCESS:",
            order_id
        );

        console.log(
            "================================="
        );

        return res.status(200).json({
            success: true,
            message: "Order confirmed successfully",
            order_id,
        });

    } catch (error) {

        await conn.rollback();

        console.error(
            "CONFIRM ORDER ERROR:",
            error
        );

        console.error(
            "MESSAGE:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    } finally {

        conn.release();
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { user_id } = req.params;

        const sql = `
      SELECT 
        o.*,
        oi.product_id,
        oi.quantity,
        oi.price,
        p.name,
        p.category,
        CONCAT('[', GROUP_CONCAT(pi.images), ']') AS images
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE NOT (o.payment_method = "ONLINE" AND o.payment_status = "PENDING")
      AND o.user_id = ?
      GROUP BY oi.id
    `;

        const [data] = await db.query(sql, [user_id]);

        const result = data.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : [],
            address: item.address ? JSON.parse(item.address) : []
        }));

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ success: false, messege: 'Server Error: ' + err });
    }
};

export const getLatetUserOrders = async (req, res) => {
    try {
        const { user_id } = req.params;
        const limit = parseInt(req.query.limit) || 3;

        const sql = `
      SELECT
        o.*,
        oi.product_id,
        oi.quantity,
        oi.price,
        p.name,
        CONCAT('[', GROUP_CONCAT(pi.images), ']') AS images
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE NOT (
        o.payment_method = 'ONLINE'
        AND o.payment_status = 'PENDING'
      )
      AND o.user_id = ?
      GROUP BY oi.id
      ORDER BY o.created_at DESC
      LIMIT ?
    `;

        const [data] = await db.query(sql, [user_id, limit]);

        const result = data.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : [],
            address: item.address ? JSON.parse(item.address) : []
        }));

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error: " + err
        });
    }
};

export const fetchAllOrders = async (req, res) => {
    try {
        const sql = `
      SELECT
    o.*,
    oi.product_id,
    oi.quantity,
    oi.price,
    oi.size,
    oi.color,
    p.name,
    CONCAT('[', GROUP_CONCAT(pi.images), ']') AS images
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
LEFT JOIN product_images pi ON pi.product_id = p.id
WHERE NOT (
    o.payment_method = 'ONLINE'
    AND o.payment_status = 'PENDING'
)
GROUP BY oi.id
    `;

        const [data] = await db.query(sql);

        const result = data.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : [],
            address: item.address ? JSON.parse(item.address) : [],
        }));

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};

export const getLatestOrders = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3;

        const sql = `
      SELECT 
        o.*,
        oi.product_id,
        oi.quantity,
        oi.price,
        oi.size,
    oi.color,
        p.name,
        CONCAT('[', GROUP_CONCAT(pi.images), ']') AS images
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE NOT (o.payment_method = "ONLINE" AND o.payment_status = "PENDING")
      GROUP BY oi.id
      ORDER BY o.created_at DESC
      LIMIT ?
    `;

        const [data] = await db.query(sql, [limit]);

        const result = data.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : [],
            address: item.address ? JSON.parse(item.address) : [],
        }));

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ messege: err.message });
    }
};

export const deleteUserOrder = async (req, res) => {
    try {
        const { order_id } = req.params;

        await db.query("DELETE FROM order_items WHERE order_id = ?", [order_id]);
        await db.query("DELETE FROM orders WHERE _id = ?", [order_id]);

        return res.status(200).json({
            success: true,
            messege: "Order Cancelled"
        });

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { order_status } = req.body;

        if (!order_status) {
            return res.status(400).json({
                success: false,
                messege: "Status can't be null"
            });
        }

        await db.query(
            "UPDATE orders SET order_status = ? WHERE id = ?",
            [order_status, order_id]
        );

        return res.status(200).json({
            success: true,
            messege: "Order status updated"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: err.message
        });
    }
};