import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccessfull = () => {

    const hasCalled = useRef(false);

    const {
        navigate,
        backendUrl,
        fetchCart
    } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState("");

    const location = useLocation();

    const query = new URLSearchParams(location.search);

    const session_id = query.get("session_id");

    useEffect(() => {

        if (!session_id || hasCalled.current) {
            return;
        }

        hasCalled.current = true;

        const confirmOrder = async () => {

            try {

                setLoading(true);

                const response = await axios.post(
                    `${backendUrl}/api/order/confirm-order`,
                    {
                        session_id
                    },
                    {
                        withCredentials: true
                    }
                );

                console.log(
                    "Confirm order response:",
                    response.data
                );

                if (response.data.success) {

                    setOrderId(
                        response.data.order_id
                    );

                    await fetchCart();

                } else {

                    setError(
                        response.data.message ||
                        "Unable to confirm order"
                    );
                }

            } catch (error) {

                console.error(
                    "Confirm order error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    error.response?.data?.message ||
                    "Something went wrong while confirming your order."
                );

            } finally {

                setLoading(false);
            }
        };

        confirmOrder();

    }, [session_id]);

    if (loading) {

        return (
            <section className="min-h-screen bg-[#111] text-white flex items-center justify-center px-5">

                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>

                    <h1 className="text-2xl font-bold mb-2">
                        Confirming Your Order
                    </h1>

                    <p className="text-gray-400">
                        Please wait while we confirm your payment...
                    </p>

                </div>

            </section>
        );
    }

    if (error) {

        return (
            <section className="min-h-screen bg-[#111] text-white flex items-center justify-center px-5">

                <div className="max-w-xl text-center">

                    <h1 className="text-3xl font-bold mb-4">
                        Order Confirmation Issue
                    </h1>

                    <p className="text-red-400 mb-8">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/orders")}
                        className="bg-white text-black px-8 py-4 font-bold"
                    >
                        View Orders
                    </button>

                </div>

            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-5">

            <div className="w-full max-w-xl bg-[#1d1d1d] border border-white/10 p-10 text-center">

                <div className="flex justify-center mb-6">

                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">

                        <FaCheckCircle
                            size={55}
                            className="text-green-500"
                        />

                    </div>

                </div>

                <h1 className="sm:text-4xl text-3xl font-black uppercase italic mb-4">
                    Order Successful
                </h1>

                <p className="text-gray-400 max-w-md mx-auto">
                    Thank you for your purchase. Your payment has
                    been successfully processed and your order is
                    now being prepared for shipment.
                </p>

                {orderId && (
                    <div className="mt-8 bg-[#151515] border border-white/10 p-5">

                        <p className="text-gray-400 text-sm mb-1">
                            Order ID
                        </p>

                        <p className="text-xl font-bold">
                            #{orderId}
                        </p>

                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mt-8">

                    <button
                        onClick={() => {
                            navigate("/");
                            scrollTo(0, 0);
                        }}
                        className="bg-white text-black py-4 font-bold uppercase hover:bg-gray-200 transition"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => {
                            navigate("/orders");
                            scrollTo(0, 0);
                        }}
                        className="border border-white/20 py-4 font-bold uppercase hover:bg-white/5 transition"
                    >
                        View Orders
                    </button>

                </div>

            </div>

        </section>
    );
};

export default OrderSuccessfull;