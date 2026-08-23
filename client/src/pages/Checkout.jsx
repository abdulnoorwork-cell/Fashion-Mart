import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const { cartItems, backendUrl, userId, token, fetchCart, currency, discount, fetchAdminOrders, navigate } = useContext(AppContext)

    const [payment, setPayment] = useState("ONLINE");
    const [deliveryInfo, setDeliveryInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        postal_code: "",
        address: ""
    })
    const onChangeHandler = (e) => {
        setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value })
    }
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.offerPrice * item.quantity,
        0
    );
    
    const shipping = subtotal >= 5000 ? 0 : 80;
    const total = subtotal + shipping - discount;
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!token) {
            return toast.error("Please login first")
        }
        if (token) {
            try {
                if (!cartItems || cartItems.length === 0) {
                    return toast.error("You didn,t have any cart items")
                }
                setLoading(true)
                const response = await axios.post(
                    `${backendUrl}/api/order/place-order`,
                    {
                        user_id: userId,
                        items: cartItems,
                        total_amount: total,
                        payment_method: payment,
                        address: deliveryInfo,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                        withCredentials: true,
                    }
                );

                if (!response.data.success) {
                    throw new Error(
                        response.data.message || "Unable to place order"
                    );
                }

                if (payment === "COD") {
                    setLoading(false)
                    await fetchCart();
                    await fetchAdminOrders()

                    toast.success("Order placed successfully!");

                    navigate("/my-account");

                } else {
                    setLoading(false)

                    // DO NOT clear cart here.
                    // Stripe payment has not completed yet.

                    window.location.href = response.data.url;
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        } else {
            if (error.response.status === 500) {
                localStorage.removeItem('User')
                window.location.href = "/login";
                window.location.reload()
            }
        }
    }

    return (
        <div className="min-h-screen text-white bg-[#0b0b0b]">
            {/* Hero */}
            <div className="relative h-[300px]">
                <img
                    src="/images/slide-img-5.jpg"
                    alt="Cart Banner"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/70"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic">
                        Checkout
                    </h1>

                    <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4">
                        Complete your order securely.
                    </p>
                </div>
            </div>

            <section className="container mx-auto px-5 py-16 lg:py-20">
                <form
                    onSubmit={onSubmitHandler}
                    className="grid xl:grid-cols-[1.8fr_1fr] gap-8"
                >
                    {/* Billing Details */}
                    <div className="bg-[#202020] border border-gray-800 p-8 lg:p-10">

                        <h2 className="text-3xl font-bold mb-8 uppercase">
                            Billing Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <label className="text-gray-400 mb-2 block">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={deliveryInfo.firstName}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 mb-2 block">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={deliveryInfo.lastName}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 mb-2 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={deliveryInfo.email}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 mb-2 block">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={deliveryInfo.phone}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 mb-2 block">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={deliveryInfo.city}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 mb-2 block">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    placeholder="Postal Code"
                                    value={deliveryInfo.postal_code}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-gray-400 mb-2 block">
                                    Address
                                </label>
                                <textarea
                                    rows="4"
                                    name="address"
                                    placeholder="Your Address"
                                    value={deliveryInfo.address}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-4 py-3.5 outline-none focus:border focus:border-[#E46254] text-[15px] bg-[#111111]"
                                />
                            </div>

                        </div>

                        {/* Payment */}
                        <div className="mt-10">

                            <h3 className="text-2xl font-bold uppercase mb-5">
                                Payment Method
                            </h3>

                            <div className="space-y-4">

                                <label
                                    className={`flex items-center justify-between p-4 cursor-pointer transition bg-[#111111] ${payment === "COD"
                                        ? "border border-[#E46254]"
                                        : ""
                                        }`}
                                >
                                    <div>
                                        <p className="font-medium">
                                            Cash On Delivery
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Pay when your order arrives
                                        </p>
                                    </div>

                                    <input
                                        type="radio"
                                        checked={payment === "COD"}
                                        onChange={() => setPayment("COD")}
                                    />
                                </label>

                                <label
                                    className={`flex items-center justify-between p-4 cursor-pointer transition bg-[#111111] ${payment === "ONLINE"
                                        ? "border border-[#E46254]"
                                        : ""
                                        }`}
                                >
                                    <div>
                                        <p className="font-medium">
                                            Online Payment
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Debit / Credit Card
                                        </p>
                                    </div>

                                    <input
                                        type="radio"
                                        checked={payment === "ONLINE"}
                                        onChange={() => setPayment("ONLINE")}
                                    />
                                </label>

                            </div>

                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-28 h-fit">

                        <div className="bg-[#202020] border border-gray-800 p-7">

                            <h2 className="text-2xl font-bold uppercase mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 sm:max-h-[450px] max-h-[400px] overflow-y-auto">

                                {cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 border-b border-gray-800 pb-4"
                                    >
                                        <img
                                            src={item.images?.[0]?.url}
                                            alt=""
                                            className="w-20 h-20 object-cover bg-white"
                                        />

                                        <div className="flex-1">
                                            <h4 className="font-medium line-clamp-2">
                                                {item.name}
                                            </h4>

                                            <p className="text-sm text-gray-400">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <h6 className="text-[#E46254] pr-2">
                                            {currency}.{" "}
                                            {(item.offerPrice * item.quantity).toLocaleString()}
                                        </h6>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <h6>Subtotal</h6>
                                    <h6>
                                        {currency}. {subtotal.toLocaleString()}
                                    </h6>
                                </div>

                                <div className="flex justify-between">
                                    <h6>Shipping</h6>
                                    <h6>
                                        {currency}. {shipping.toLocaleString()}
                                    </h6>
                                </div>

                                <div className="flex justify-between text-red-400">
                                    <h6>Discount</h6>
                                    <h6>
                                        -{currency}. {discount.toLocaleString()}
                                    </h6>
                                </div>

                                <hr className="border-gray-700" />

                                <div className="flex justify-between text-xl font-bold">
                                    <h6>Total</h6>
                                    <h6 className="text-[#E46254]">
                                        {currency}. {total.toLocaleString()}
                                    </h6>
                                </div>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-8 bg-[#E46254] hover:bg-orange-600 py-4 uppercase font-bold transition text-black"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>

                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Checkout