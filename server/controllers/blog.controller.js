import { v2 as cloudinary } from 'cloudinary';
import db from '../config/db.js'

export const addBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const { image } = req.files || {};

        if (!title || !description || !image || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (title.length > 120 || title.length < 12) {
            return res.status(400).json({
                success: false,
                message: "Title must be between 12–120 characters"
            });
        }

        if (description.length < 256) {
            return res.status(400).json({
                success: false,
                message: "Description must be at least 256 characters"
            });
        }

        const allowedFormat = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid format (jpg, jpeg, png, webp only)"
            });
        }

        // Upload to Cloudinary
        const upload = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "blogs"
        });

        const imageData = {
            publicid: upload.publicid,
            url: upload.secure_url
        };

        // Insert into DB
        await db.query(
            "INSERT INTO blogs (title, description, category, image) VALUES (?, ?, ?, ?)",
            [title, description, category, JSON.stringify(imageData)]
        );

        res.status(201).json({
            success: true,
            message: "Blog added successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error
        });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const [blogs] = await db.query(
            "SELECT id, title, category, image, created_at FROM blogs"
        );

        const result = blogs.map(blog => ({
            ...blog,
            image: JSON.parse(blog.image)
        }));

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching blogs: " + error
        });
    }
};

export const relatedBlogs = async (req, res) => {
    try {
        const { category } = req.body;
        const [blogs] = await db.query("SELECT id, title, category, image, created_at FROM blogs WHERE category = ?", [category]);
        const result = blogs.map(blog => ({
            ...blog,
            image: JSON.parse(blog.image)
        }))
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching blogs: " + error
        });
    }
}

export const singleBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const [rows] = await db.query(
            "SELECT id, title, description, category, image, created_at FROM blogs WHERE id = ?",
            [blogId]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const blog = rows[0];

        blog.image = JSON.parse(blog.image);

        res.status(200).json(blog);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching blog"
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        // 1. Get blog image
        const [rows] = await db.query(
            "SELECT image FROM blogs WHERE id = ?",
            [blogId]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const imageData = JSON.parse(rows[0].image);

        // 2. Delete from Cloudinary
        if (imageData.publicid) {
            await cloudinary.uploader.destroy(imageData.publicid);
        }

        // 3. Delete from DB
        await db.query("DELETE FROM blogs WHERE id = ?", [blogId]);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting blog"
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, description,category } = req.body;
        const imageFile = req.files?.image;

        // 1. Validation
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        if (title.length > 120 || title.length < 12) {
            return res.status(400).json({
                success: false,
                message: "Title must be between 12–120 characters"
            });
        }

        if (description.length < 256) {
            return res.status(400).json({
                success: false,
                message: "Description must be at least 256 characters"
            });
        }

        // 2. Get existing blog
        const [rows] = await db.query(
            "SELECT image FROM blogs WHERE id = ?",
            [blogId]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        let imageData = JSON.parse(rows[0].image);

        // 3. If new image uploaded
        if (imageFile) {
            const allowedFormat = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

            if (!allowedFormat.includes(imageFile.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid format (jpg, jpeg, png, webp only)"
                });
            }

            // 🔥 delete old image
            if (imageData.publicid) {
                await cloudinary.uploader.destroy(imageData.publicid);
            }

            // upload new image
            const upload = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                folder: "blogs"
            });

            imageData = {
                publicid: upload.publicid,
                url: upload.secure_url
            };
        }

        // 4. Update blog
        await db.query(
            "UPDATE blogs SET title = ?, description = ?, category = ?, image = ? WHERE id = ?",
            [title, description, category, JSON.stringify(imageData), blogId]
        );

        res.status(200).json({
            success: true,
            message: "Blog updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getLatestBlogs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3;

        const [blogs] = await db.query(
            "SELECT id, title, category, image, created_at FROM blogs ORDER BY created_at DESC LIMIT ?",
            [limit]
        );

        const result = blogs.map(blog => ({
            ...blog,
            image: JSON.parse(blog.image)
        }));

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};