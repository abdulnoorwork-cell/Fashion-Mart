import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import QuickViewModel from "../components/QuickViewModel";
import Fade from '../components/Fade'

const categoryProducts = ({ category }) => {

  const [selectedProduct, setSelectedProduct] = useState(null)

  // Filters
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { backendUrl } = useContext(AppContext);

  const filteredProducts = products
    .filter((product) => {
      // Search
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch
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
    sortBy
  ]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`${backendUrl}/api/product/category-products/${category}`, { withCredentials: true })
      if (response.data) {
        setProducts(response.data)
        setLoading(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  // const filteredProducts = products.filter(
  //   (item) =>
  //     item.category === category
  // );
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  )
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  )

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 1024) {
        setProductsPerPage(6)
      }
      else if (window.innerWidth < 1280) {
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

  useEffect(() => {
    fetchCategoryProducts();
  }, [category])

  return (
    <>
      <QuickViewModel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <section className="text-white">
        {/* Hero */}
        <div className="relative h-[300px]">
          <img
            src="/images/slide-img-5.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic">
              {category} Collection
            </h1>

            <p className="mt-4 text-gray-300 max-w-xl text-center">
              Discover premium footwear crafted for
              comfort, performance and everyday style.
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="px-5 md:px-8 lg:px-12 py-13 min-h-screen">
          <div className="flex justify-between items-center mb-10">

            <h3 className="text-2xl sm:text-3xl">Products ({products.length})</h3>

            {/* Sort Products + Sort Products */}
            <div className="flex items-center gap-5">

              {/* Search */}
              <div className="relative bg-[#222] border border-white/10">

                <FaSearch
                  className="
                                                  absolute
                                                  left-4
                                                  top-1/2
                                                  -translate-y-1/2
                                                  text-gray-400
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
                                                  py-3
                                                  pl-11
                                                  pr-4
                                                  outline-none
                                              "
                />

              </div>

              {/* Sort Products */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                                    bg-[#222]
                                    border border-white/10
                                    px-4 py-3
                                    outline-none
                                ">
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
          </div>

          {currentProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-3">
                No Products Found
              </h2>

              <p className="text-gray-400">
                No products available in this sub category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {currentProducts.map((product,index) => (
                <Fade key={product.id} delay={index * 0.2}>
                  <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct} />
                </Fade>
              ))}
            </div>
          )}

          {/* Results Info */}
          <div className="mt-12 text-center text-gray-400">
            Showing{" "}
            <span className="text-white font-semibold">
              {filteredProducts.length === 0 ? 0 : startIndex + 1}
            </span>
            -
            <span className="text-white font-semibold">
              {Math.min(endIndex, filteredProducts.length)}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>

          {/* Professional Pagination */}
          {totalPages > 1 && <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">

            {/* Previous */}
            <button
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage((prev) => prev - 1); scrollTo(0, 0) }}
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
                onClick={() => { setCurrentPage(page); scrollTo(0, 0) }}
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
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => { setCurrentPage((prev) => prev + 1); scrollTo(0, 0) }}
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
      </section>
    </>
  );
};

export default React.memo(categoryProducts);