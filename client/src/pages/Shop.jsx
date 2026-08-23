import React, { useEffect, useState, useContext } from "react";
import {
    FaSearch,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import QuickViewModel from "../components/QuickViewModel";
import { AppContext } from "../context/AppContext";

const Shop = () => {
    const { products, currency } = useContext(AppContext);

    const [selectedProduct, setSelectedProduct] = useState(null)

    // Filters
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [maxPrice, setMaxPrice] = useState(15000);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);

    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 1280) {
                setProductsPerPage(6)
            }
            else if (window.innerWidth < 1536) {
                setProductsPerPage(8)
            }
            else {
                setProductsPerPage(10)
            }
        }
        updateItems()
        window.addEventListener('resize', updateItems)
        return () => window.removeEventListener('resize', updateItems)
    }, [])

    // ==========================================
    // FILTER + SEARCH + PRICE
    // ==========================================

    const filteredProducts = products
        .filter((product) => {
            // Search
            const matchesSearch = product.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

            // Category
            const matchesCategory =
                selectedCategory === "All" ||
                product.category?.toLowerCase() ===
                selectedCategory.toLowerCase();

            // Price
            const productPrice = Number(
                product.offerPrice || product.price || 0
            );

            const matchesPrice = productPrice <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        })

        // ==========================================
        // SORTING
        // ==========================================

        .sort((a, b) => {
            const priceA = Number(
                a.offerPrice || a.price || 0
            );

            const priceB = Number(
                b.offerPrice || b.price || 0
            );

            if (sortBy === "price-low") {
                return priceA - priceB;
            }

            if (sortBy === "price-high") {
                return priceB - priceA;
            }

            if (sortBy === "newest") {
                return (
                    new Date(b.created_at) -
                    new Date(a.created_at)
                );
            }

            if (sortBy === "name-az") {
                return a.name.localeCompare(b.name);
            }

            if (sortBy === "name-za") {
                return b.name.localeCompare(a.name);
            }

            return 0;
        });

    // ==========================================
    // RESET PAGE WHEN FILTER CHANGES
    // ==========================================

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        selectedCategory,
        sortBy,
        maxPrice,
    ]);

    // ==========================================
    // YOUR PAGINATION
    // ==========================================

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const endIndex =
        startIndex + productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            startIndex,
            endIndex
        );

    return (
        <>
            <QuickViewModel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <section className="text-white">

                {/* Hero */}
                <div className="relative h-[300px]">
                    <img
                        src="/images/slide-img-5.jpg"
                        alt="Shop"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/70"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-4xl md:text-6xl font-black uppercase italic">
                            Shop
                        </h1>

                        <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4 text-center px-4">
                            Explore premium activewear, footwear, and accessories
                            designed for performance and style.
                        </p>
                    </div>
                </div>

                <div className="px-5 md:px-8 lg:px-12 py-13 min-h-screen">

                    <div className="grid lg:grid-cols-4 gap-10">

                        {/* ==========================================
                        SIDEBAR
                    ========================================== */}

                        <aside className="lg:col-span-1">

                            {/* Search */}
                            <div className="bg-[#222] p-5 mb-6">

                                <h3 className="font-bold mb-4">
                                    Search
                                </h3>

                                <div className="relative">

                                    <FaSearch
                                        className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-500
                                    "
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search products..."
                                        className="
                                        w-full
                                        bg-[#151515]
                                        border border-white/10
                                        py-3
                                        pl-11
                                        pr-4
                                        outline-none
                                    "
                                    />

                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-[#222] p-5 mb-6">

                                <h3 className="font-bold mb-4">
                                    Categories
                                </h3>

                                <div className="space-y-3">

                                    {[
                                        "All",
                                        "Men",
                                        "Women",
                                        "Footwear",
                                        "Gymwear",
                                        "Apparel",
                                        "Activewear"
                                    ].map((category) => (

                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCategory(category);
                                            }}
                                            className={`
                                            block
                                            transition
                                            ${selectedCategory === category
                                                    ? "text-white font-semibold"
                                                    : "text-gray-400 hover:text-white"
                                                }
                                        `}
                                        >
                                            {category}
                                        </button>

                                    ))}

                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="bg-[#222] p-5">

                                <h3 className="font-bold mb-4">
                                    Price Range
                                </h3>

                                <input
                                    type="range"
                                    min="10"
                                    max="15000"
                                    step="100"
                                    value={maxPrice}
                                    onChange={(e) =>
                                        setMaxPrice(
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-full"
                                />

                                <div className="flex justify-between mt-3 text-sm text-gray-400 font-medium">
                                    <span>
                                        {currency}. 10
                                    </span>

                                    <span>
                                        {currency}.{" "}
                                        {maxPrice.toLocaleString()}
                                    </span>
                                </div>

                            </div>

                        </aside>

                        {/* ==========================================
                        PRODUCTS
                    ========================================== */}

                        <div className="lg:col-span-3">

                            {/* Top Bar */}
                            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 items-center">

                                <p className="text-gray-400">
                                    Showing{" "}
                                    {filteredProducts.length === 0
                                        ? 0
                                        : startIndex + 1}
                                    {" - "}
                                    {Math.min(
                                        endIndex,
                                        filteredProducts.length
                                    )}
                                    {" of "}
                                    {filteredProducts.length}{" "}
                                    products
                                </p>

                                {/* Sorting */}
                                <select
                                    value={sortBy}
                                    onChange={(e) =>
                                        setSortBy(e.target.value)
                                    }
                                    className="
                                    bg-[#222]
                                    border border-white/10
                                    px-4 py-3
                                    outline-none
                                "
                                >
                                    <option value="default">
                                        Default Sorting
                                    </option>

                                    <option value="price-low">
                                        Price Low To High
                                    </option>

                                    <option value="price-high">
                                        Price High To Low
                                    </option>

                                    <option value="newest">
                                        Newest
                                    </option>

                                    <option value="name-az">
                                        Name A-Z
                                    </option>

                                    <option value="name-za">
                                        Name Z-A
                                    </option>
                                </select>

                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">

                                {currentProducts.length > 0 ? (

                                    currentProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            setSelectedProduct={setSelectedProduct}
                                        />
                                    ))

                                ) : (

                                    <div className="col-span-full text-center py-20">

                                        <h3 className="text-xl font-semibold">
                                            No Products Found
                                        </h3>

                                        <p className="text-gray-400 mt-2">
                                            Try changing your search or filters.
                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* ==========================================
                            PROFESSIONAL PAGINATION
                            KEPT YOUR PAGINATION STRUCTURE
                        ========================================== */}

                            {totalPages > 1 && <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">

                                {/* Previous */}
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => {
                                        setCurrentPage(
                                            (prev) => prev - 1
                                        );
                                        scrollTo(0, 0);
                                    }}
                                    className="
                                    px-5 py-3
                                    bg-[#222]
                                    border border-white/10
                                    hover:border-white/30
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition
                                "
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((page) => (

                                    <button
                                        key={page}
                                        onClick={() => {
                                            setCurrentPage(page);
                                            scrollTo(0, 0);
                                        }}
                                        className={`
                                        w-12 h-12
                                        font-semibold
                                        transition
                                        ${currentPage === page
                                                ? "bg-white text-black"
                                                : "bg-[#222] border border-white/10 hover:border-white/30"
                                            }
                                    `}
                                    >
                                        {page}
                                    </button>

                                ))}

                                {/* Next */}
                                <button
                                    disabled={
                                        currentPage === totalPages ||
                                        totalPages === 0
                                    }
                                    onClick={() => {
                                        setCurrentPage(
                                            (prev) => prev + 1
                                        );
                                        scrollTo(0, 0);
                                    }}
                                    className="
                                    px-5 py-3
                                    bg-[#222]
                                    border border-white/10
                                    hover:border-white/30
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition
                                "
                                >
                                    Next
                                </button>

                            </div>}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;