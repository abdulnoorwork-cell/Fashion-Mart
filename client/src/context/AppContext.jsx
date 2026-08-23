import axios from "axios";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [blogLoading, setBlogLoading] = useState(false)
    const [latestItemsLoading, setLatestItemsLoading] = useState(false)
    const [latestBlogLoading, setLatestBlogLoading] = useState(false)
    const [orderLoading, setOrderLoading] = useState(false)
    const initAuthUser = localStorage.getItem('User');
    const [authenticated, setAuthenticated] = useState(initAuthUser ? JSON.parse(initAuthUser) : undefined)
    const token = authenticated?.token;
    const userId = authenticated?.user?.id;
    const isAdmin = localStorage.getItem('token');
    const [orders, setOrders] = useState([])
    const [adminOrders, setAdminOrders] = useState([])
    const [blogs, setBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([])
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([])
    const [qty, setQty] = useState(1)
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const navigate = useNavigate()
    const currency = "Rs"
    const discount = 28

    const logout = () => {
        localStorage.removeItem("User");
        localStorage.removeItem("expiryTime");

        setTimeout(() => {
            toast.success("logout successfully")
            navigate('/login')
            window.location.reload()
        }, 800)
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const fetchBlogs = async () => {
        try {
            setBlogLoading(true)
            let response = await axios.get(`${backendUrl}/api/blog/get-blogs`, { withCredentials: true });
            if (response.data) {
                setBlogs(response.data)
                setBlogLoading(false)
            }
            setBlogLoading(false)
        } catch (error) {
            setBlogLoading(false)
            console.log(error)
        }
    }
    const fetchLatestBlogs = async () => {
        try {
            setLatestBlogLoading(true)
            let response = await axios.get(`${backendUrl}/api/blog/latest-blogs`, { withCredentials: true })
            if (response.data) {
                setLatestBlogs(response.data)
                setLatestBlogLoading(false)
            }
            setLatestBlogLoading(false)
        } catch (error) {
            console.log(error)
            setLatestBlogLoading(false)
        }
    }
    const fetchProducts = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendUrl}/api/product/get-products`, { withCredentials: true });
            if (response.data) {
                setProducts(response.data)
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const fetchLatestProducts = async () => {
        try {
            setLatestItemsLoading(true)
            let response = await axios.get(`${backendUrl}/api/product/latest-products`, { withCredentials: true })
            if (response.data) {
                setLatestProducts(response.data)
                setLatestItemsLoading(false)
            }
            setLatestItemsLoading(false)
        } catch (error) {
            console.log(error)
            setLatestItemsLoading(false)
        }
    }

    const isInWishlist = (productId) => {
        return wishlist.some(
            item => item.id === productId
        );
    };

    const fetchWishlist = async () => {
        if (userId) {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/wishlist/${userId}`,
                    {
                        headers: {
                            Authorization: `${token}`
                        },
                        withCredentials: true
                    }
                );

                if (response.data) {
                    setWishlist(response.data);
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const toggleWishlist = async (productId) => {
        if (!userId || userId.length < 1) {
            toast.error("Please login first");
            navigate("/login");
            scrollTo(0, 0)
            return;
        }
        try {
            const response = await axios.post(
                `${backendUrl}/api/wishlist/toggle-wishlist/${userId}`,
                { productId },
                {
                    headers: {
                        Authorization: `${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {

                if (response.data.action === "added") {

                    setWishlist(prev => [
                        ...prev,
                        { id: productId }
                    ]);

                    await fetchWishlist()

                    toast.success(response.data.message)

                } else {

                    setWishlist(prev =>
                        prev.filter(
                            item => item.id !== productId
                        )
                    );

                    await fetchWishlist()

                    toast.success(response.data.message)
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const fetchWishlistProducts = async () => {
        try {
            let response = await axios.get(`${backendUrl}/api/wishlist/get-wishlist-products`, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            })
            if (response.data) {
                setWishlistProducts(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (
        productId,
        size,
        color,
        quantity = qty
    ) => {
        if (!userId || userId.length < 1) {
            toast.error("Please login first");
            navigate("/login");
            scrollTo(0, 0)
            return;
        }
        if (!size || size.length < 1) {
            toast.error("Please select size");
            return;
        }
        if (!color || color.length < 1) {
            toast.error("Please select color");
            return;
        }
        try {

            const response = await axios.post(
                `${backendUrl}/api/cart/add-cart/${userId}`,
                {
                    productId,
                    size,
                    color,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {

                toast.success(response.data.message);
                setQty(1)

                await fetchCart();
            }

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const fetchCart = async () => {
        if (userId) {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/cart/${userId}`,
                    {
                        headers: {
                            Authorization: `${token}`
                        },
                        withCredentials: true
                    }
                );

                if (response.data.success) {
                    setCartItems(response.data.cart);
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const removeCartItem = async (cartId) => {
        if (!userId || userId.length < 1) {
            toast.error("Please login first");
            navigate("/login");
            scrollTo(0, 0)
            return;
        }
        try {

            const response = await axios.delete(
                `${backendUrl}/api/cart/${cartId}`,
                {
                    headers: {
                        Authorization: `${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {

                toast.success(response.data.message);

                setCartItems((prev) =>
                    prev.filter((item) => item.id !== cartId)
                );
            }

        } catch (error) {
            console.log(error);
        }
    };

    const updateCartQuantity = async (
        cartId,
        quantity
    ) => {
        if (!userId || userId.length < 1) {
            toast.error("Please login first");
            navigate("/login");
            scrollTo(0, 0)
            return;
        }
        try {

            const response = await axios.put(
                `${backendUrl}/api/cart/cart-quantity`,
                {
                    cartId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                await fetchCart();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserOrders = async () => {
        if (token) {
            try {
                setOrderLoading(true)
                let response = await axios.get(`${backendUrl}/api/order/user-orders/${userId}`, {
                    headers: {
                        Authorization: `${token}`
                    },
                    withCredentials: true
                })
                if (response.data) {
                    setOrders(response.data)
                    setOrderLoading(false)
                }
            } catch (error) {
                setOrderLoading(false)
                console.log(error)
            }
        }
    }

    const fetchAllReviews = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendUrl}/api/review/all-reviews`, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            })

            if (response.data) {
                setAllReviews(response.data)
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const fetchAdminOrders = async () => {
        try {
            setOrderLoading(true)
            let response = await axios.get(`${backendUrl}/api/order/get-orders`, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            })
            if (response.data) {
                setAdminOrders(response.data)
                setOrderLoading(false)
            } else {
                setOrderLoading(false)
                console.log(error.response.data.messege);
            }
        } catch (error) {
            setOrderLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
        fetchLatestBlogs()
        fetchProducts();
        fetchLatestProducts()
        fetchAllReviews();
        fetchAdminOrders();
        fetchWishlistProducts();
    }, [])

    useEffect(() => {
        if (userId && token) {
            fetchCart()
            fetchWishlist();
            fetchUserOrders();
        }
    }, [userId, token])

    return (
        <AppContext.Provider value={{
            navigate,
            userId,
            discount,
            backendUrl,
            token,
            logout,
            blogs,
            fetchBlogs,
            fetchLatestBlogs,
            latestBlogs,
            latestBlogLoading,
            isAdmin,
            products,
            setProducts,
            fetchProducts,
            fetchLatestProducts,
            latestProducts,
            currency,
            toggleWishlist,
            isInWishlist,
            fetchWishlist,
            wishlist,
            orders,
            fetchUserOrders,
            loading,
            blogLoading,
            orderLoading,
            setOrderLoading,
            fetchAllReviews,
            allReviews,
            latestBlogLoading,
            fetchAdminOrders,
            adminOrders,
            latestItemsLoading,
            wishlistProducts,
            fetchWishlistProducts,
            cartItems,
            cartCount,
            fetchCart,
            addToCart,
            removeCartItem,
            updateCartQuantity,
            qty, setQty,
        }}>{children}</AppContext.Provider>
    )
}

export default React.memo(AppContextProvider);