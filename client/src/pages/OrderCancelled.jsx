import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaTimesCircle } from "react-icons/fa";

const OrderCancelled = () => {
    const { navigate } = useContext(AppContext);

    const query = new URLSearchParams(useLocation().search);
    const orderId = query.get("order_id");

    return (
        <section className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-5">
            <div
                className="
          w-full
          max-w-xl
          bg-[#1d1d1d]
          border
          border-white/10
          p-10
          text-center
          relative
          overflow-hidden
        "
            >
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-red-500/10 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-orange-500/10 blur-3xl rounded-full"></div>

                {/* Cancel Icon */}
                <div className="flex justify-center mb-6">
                    <div
                        className="
              w-24
              h-24
              rounded-full
              bg-red-500/10
              flex
              items-center
              justify-center
              border
              border-red-500/20
            "
                    >
                        <FaTimesCircle
                            size={55}
                            className="text-red-500"
                        />
                    </div>
                </div>

                {/* Heading */}
                <h1
                    className="
            sm:text-4xl text-3xl
            font-black
            uppercase
            italic
            mb-4
          "
                >
                    Order Cancelled
                </h1>

                <p className="text-gray-400 max-w-md mx-auto">
                    Your order process was cancelled and no payment was completed.
                    You can return to the store and place your order again anytime.
                </p>

                {/* Order Info */}
                {orderId && (
                    <div
                        className="
              mt-8
              bg-[#151515]
              border
              border-white/10
              p-5
            "
                    >
                        <h3 className="font-semibold mb-2">
                            Order Reference
                        </h3>

                        <p className="text-gray-400 text-sm break-all">
                            {orderId}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                    <button
                        onClick={() => {
                            navigate("/cart");
                            scrollTo(0, 0);
                        }}
                        className="
              bg-white
              text-black
              py-4
              font-bold
              uppercase
              hover:bg-gray-200
              transition
              cursor-pointer
            "
                    >
                        Back To Cart
                    </button>

                    <button
                        onClick={() => {
                            navigate("/");
                            scrollTo(0, 0);
                        }}
                        className="
              border
              border-white/20
              py-4
              font-bold
              uppercase
              hover:bg-white/5
              transition
              cursor-pointer
            "
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OrderCancelled;