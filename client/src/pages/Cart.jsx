import React, { useContext, useState } from "react";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaLock,
  FaShoppingBag,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const {
    token,
    cartItems,
    currency,
    navigate,
    removeCartItem,
    updateCartQuantity,
  } = useContext(AppContext);

  const [coupon, setCoupon] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.offerPrice || 0) * Number(item.quantity || 0),
    0
  );

  const shipping = subtotal >= 5000 ? 0 : 80;
  const total = subtotal + shipping;

  const increaseQty = (id, quantity) => {
    updateCartQuantity(id, quantity + 1);
  };

  const decreaseQty = (id, quantity) => {
    if (quantity <= 1) return;

    updateCartQuantity(id, quantity - 1);
  };

  return (
    <section className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="/images/slide-img-5.jpg"
          alt="Cart Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">
            Your Selection
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">
            Shopping Cart
          </h1>

          <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4">
            Review your selected products and complete your order.
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-12 md:py-16">
        {cartItems.length === 0 ? (
          /* ================= EMPTY CART ================= */
          <div className="min-h-[450px] flex items-center justify-center">
            <div className="text-center max-w-md">

              <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <FaShoppingBag
                  className="text-gray-500"
                  size={28}
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Your Cart Is Empty
              </h2>

              <p className="text-gray-500 mt-3 mb-8">
                Looks like you haven't added anything to your cart yet.
                Discover something you'll love.
              </p>

              <button
                onClick={() => {
                  navigate("/");
                  scrollTo(0, 0);
                }}
                className="
                  inline-flex items-center gap-3
                  bg-white text-black
                  px-8 py-4
                  font-semibold
                  uppercase text-sm
                  tracking-wide
                  hover:bg-gray-200
                  transition
                "
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ================= TOP INFO ================= */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
                  Shopping Bag
                </p>

                <h2 className="text-2xl md:text-3xl font-bold">
                  Your Items
                </h2>
              </div>

              <h6 className="text-sm text-gray-500">
                {cartItems.reduce(
                  (total, item) => total + Number(item.quantity),
                  0
                )}{" "}
                {cartItems.length === 1 ? "item" : "items"}
              </h6>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

              {/* ================= CART ITEMS ================= */}
              <div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="
                        group
                        bg-[#151515]
                        border border-white/[0.07]
                        hover:border-white/[0.15]
                        transition
                      "
                    >
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-5">

                        {/* IMAGE */}
                        <div className="relative w-full sm:w-[150px] h-[180px] sm:h-[170px] bg-[#202020] overflow-hidden shrink-0">

                          <img
                            onClick={() => { navigate(`/collection/${(item.category).toLowerCase()}/${(item.name).toLowerCase()}/${item.productId}`); scrollTo(0, 0) }}
                            src={item.images?.[0]?.url}
                            alt={item.name}
                            className="
                              w-full h-full
                              object-cover
                              transition duration-500
                              group-hover:scale-105
                            "
                          />

                          <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider">
                            {item.quantity}{" "}
                            {item.quantity === 1 ? "Item" : "Items"}
                          </div>
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="flex-1 flex flex-col">

                          <div className="flex justify-between gap-4">

                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
                                {item.category || "Premium Collection"}
                              </p>

                              <h3 onClick={() => { navigate(`/collection/${(item.category).toLowerCase()}/${(item.name).toLowerCase()}/${item.productId}`); scrollTo(0, 0) }}
                                className="text-lg sm:text-xl font-semibold leading-tight cursor-pointer hover:text-gray-300 transition duration-200">
                                {item.name}
                              </h3>
                            </div>

                            {/* REMOVE */}
                            <button
                              onClick={() =>
                                removeCartItem(item.id)
                              }
                              className="
                                w-9 h-9
                                flex items-center justify-center
                              text-red-400
                              bg-red-500/10
                              "
                              aria-label="Remove product"
                            >
                              <FaTrash size={13} />
                            </button>
                          </div>

                          {/* VARIANTS */}
                          <div className="flex flex-wrap gap-2 mt-4">

                            {item.size && (
                              <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-gray-300">
                                Size:{" "}
                                <strong className="text-white">
                                  {item.size}
                                </strong>
                              </span>
                            )}

                            {item.color && (
                              <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-gray-300">
                                Color:{" "}
                                <strong className="text-white">
                                  {item.color}
                                </strong>
                              </span>
                            )}
                          </div>

                          {/* BOTTOM */}
                          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mt-auto pt-6">

                            {/* QUANTITY */}
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                                Quantity
                              </p>

                              <div className="inline-flex items-center border border-white/10 bg-[#101010]">

                                <button
                                  onClick={() =>
                                    decreaseQty(
                                      item.id,
                                      item.quantity
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="
                                    w-10 h-10
                                    flex items-center justify-center
                                    text-gray-400
                                    hover:text-white
                                    disabled:opacity-30
                                    transition
                                  "
                                >
                                  <FaMinus size={10} />
                                </button>

                                <span className="w-10 text-center text-sm font-semibold">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() =>
                                    increaseQty(
                                      item.id,
                                      item.quantity
                                    )
                                  }
                                  className="
                                    w-10 h-10
                                    flex items-center justify-center
                                    text-gray-400
                                    hover:text-white
                                    transition
                                  "
                                >
                                  <FaPlus size={10} />
                                </button>

                              </div>
                            </div>

                            {/* PRICE */}
                            <div className="sm:text-right">
                              <h6 className="text-xs text-gray-500 mb-1">
                                {currency}.{" "}
                                {Number(
                                  item.offerPrice
                                ).toLocaleString()}{" "}
                                each
                              </h6>

                              <p className="text-xl font-semibold">
                                {currency}{" "}
                                {(
                                  Number(item.offerPrice) *
                                  Number(item.quantity)
                                ).toLocaleString()}
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CONTINUE SHOPPING */}
                <button
                  onClick={() => {
                    navigate("/");
                    scrollTo(0, 0);
                  }}
                  className="
                    mt-8
                    inline-flex items-center gap-3
                    text-sm
                    text-gray-400
                    hover:text-white
                    transition
                  "
                >
                  <FaArrowLeft size={12} />
                  Continue Shopping
                </button>

                {/* BENEFITS */}
                <div className="grid sm:grid-cols-3 gap-4 mt-12">

                  <div className="bg-[#111] border border-white/[0.06] p-5">
                    <FaTruck className="text-xl text-gray-400 mb-4" />
                    <h4 className="text-sm font-semibold">
                      Fast Delivery
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Reliable delivery across Pakistan
                    </p>
                  </div>

                  <div className="bg-[#111] border border-white/[0.06] p-5">
                    <FaShieldAlt className="text-xl text-gray-400 mb-4" />
                    <h4 className="text-sm font-semibold">
                      Secure Shopping
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Your information stays protected
                    </p>
                  </div>

                  <div className="bg-[#111] border border-white/[0.06] p-5">
                    <FaLock className="text-xl text-gray-400 mb-4" />
                    <h4 className="text-sm font-semibold">
                      Safe Checkout
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Secure and trusted payments
                    </p>
                  </div>

                </div>
              </div>

              {/* ================= SUMMARY ================= */}
              <aside className="lg:sticky lg:top-24">

                <div className="bg-[#151515] border border-white/[0.08]">

                  {/* HEADER */}
                  <div className="p-6 border-b border-white/[0.08]">
                    <h2 className="text-xl font-bold">
                      Order Summary
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Review your order before checkout
                    </p>
                  </div>

                  <div className="p-6">

                    {/* COUPON */}
                    <div className="mb-7">

                      <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-3">
                        <FaTag size={11} />
                        Discount Code
                      </label>

                      <div className="flex">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) =>
                            setCoupon(e.target.value)
                          }
                          placeholder="Enter code"
                          className="
                            min-w-0 flex-1
                            bg-[#0d0d0d]
                            border border-white/10
                            px-4 py-3
                            text-sm
                            outline-none
                            focus:border-white/30
                            transition
                          "
                        />

                        <button
                          className="
                            px-5
                            bg-white
                            text-black
                            text-xs
                            font-bold
                            uppercase
                            hover:bg-gray-200
                            transition
                          "
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* TOTALS */}
                    <div className="space-y-4 border-t border-white/[0.08] pt-6">

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Subtotal
                        </span>

                        <span>
                          {currency}.{" "}
                          {subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Shipping
                        </span>

                        <span>
                          {shipping === 0
                            ? "FREE"
                            : `${currency} ${shipping.toLocaleString()}`}
                        </span>
                      </div>

                      {shipping === 0 && (
                        <p className="text-xs text-green-400">
                          You qualify for free shipping.
                        </p>
                      )}

                      <div className="border-t border-white/[0.08] pt-5 mt-5">

                        <div className="flex justify-between items-end">

                          <div>
                            <p className="text-xs uppercase tracking-wider">
                              Total
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Including shipping
                            </p>
                          </div>

                          <h6 className="text-2xl text-[#E46254]">
                            {currency}.{" "}
                            {total.toLocaleString()}
                          </h6>

                        </div>
                      </div>
                    </div>

                    {/* CHECKOUT */}

                    {token ? <button onClick={() => { navigate('/checkout'); scrollTo(0, 0) }}
                      className="w-full
                        mt-7
                        bg-white
                        text-black
                        py-4
                        font-bold
                        uppercase
                        text-sm
                        tracking-wide
                        hover:bg-gray-200
                        transition">
                      Proceed to Checkout
                    </button> : <button onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                      className="w-full
                        mt-7
                        bg-white
                        text-black
                        py-4
                        font-bold
                        uppercase
                        text-sm
                        tracking-wide
                        hover:bg-gray-200
                        transition">
                      Proceed to Checkout
                    </button>}

                    <div className="flex items-center justify-center gap-2 mt-5 text-[11px] text-gray-500">
                      <FaLock size={10} />
                      Secure checkout
                    </div>

                  </div>
                </div>

                {/* FREE SHIPPING MESSAGE */}
                {shipping > 0 && subtotal < 5000 && (
                  <div className="mt-4 bg-[#111] border border-white/[0.06] p-4 text-center">
                    <p className="text-xs text-gray-400">
                      Add{" "}
                      <span className="text-white font-semibold">
                        {currency}{" "}
                        {(5000 - subtotal).toLocaleString()}
                      </span>{" "}
                      more to unlock{" "}
                      <span className="text-white font-semibold">
                        FREE SHIPPING
                      </span>
                    </p>
                  </div>
                )}

              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;