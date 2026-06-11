import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import nannarisarbath from "../assets/syrup-sarbath.webp";



import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

const Home = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [productt, setProductt] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);
  console.log(import.meta.env.VITE_API_URL);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products`
        );


        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        setProductt(data);
      } catch (error) {
        console.error("Fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const increaseQty = (_id) => {
    setQuantities((prev) => ({
      ...prev,
      [_id]: (prev[_id] || 1) + 1,
    }));
  };

  const decreaseQty = (_id) => {
    setQuantities((prev) => ({
      ...prev,
      [_id]: prev[_id] > 1 ? prev[_id] - 1 : 1,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;

    addToCart(product, quantity);

    navigate("/cart");
  };

  return (
    <>
      <Helmet>
        <title>Buy Nannari Sarbath Online | Sarbath | Syrup</title>

        <meta
          name="description"
          content="Buy authentic Nannari Sarbath online from selvam sarbath. Traditional refreshing sarbath made with natural ingredients."
        />

        <link
          rel="canonical"
          href="https://selvamsarbath.onrender.com/"
        />
      </Helmet>

      <section className="hero-section">
        <img
          src={nannarisarbath}
          alt="Authentic Nannari Sarbath"
          title="nannari sarbath"
          data-aos="fade-right"
          className="w-[38%] h-[38%] object-contain"
        />

        <div className="text-center text-white px-4" data-aos="fade-left">
          <h1 className="text-5xl md:text-6xl font-bold text-[#814BF6]">
            Buy Authentic Nannari Sarbath Online
          </h1>

          <p className="text-lg md:text-xl mt-4 text-[#4B5563]">
            Order authentic Nannari Sarbath online from Selvam Sarbath. Enjoy traditional refreshing sarbath made with quality ingredients. 🍹
          </p>

          <button
            onClick={() => navigate("/product")}
            className="hero-btn"
            data-aos="zoom-in"
          >
            More Sarbath
          </button>
        </div>
      </section>

      <section className="mt-20 px-6 lg:px-28">
        <h2 className="text-3xl font-bold mb-8 text-center lg:text-left text-[#1F2937]">
          Our Traditional Sarbath Variety
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productt.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center">

                <div className="bg-[#e5e9fa] rounded-xl p-4 mb-4">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${item.image}`}
                    alt={`Buy ${item.title} Online from Selvam Sarbath`}
                    className="h-60 w-60 object-contain drop-shadow-lg hover:scale-110 transition-all"

                  />
                </div>

                <h2 className="text-xl font-semibold text-[#1F2937]">
                  {item.title}
                </h2>

                <p className="text-sm text-[#6B7280] mt-1">

                  Traditional cooling drink made using authentic ingredients.
                  Perfect for refreshing summer hydration.
                </p>


                <div className="flex items-center gap-4 mt-3">
                  <p className="text-xl font-bold text-[#814BF6]">
                    ₹ {item.price}.00
                  </p>
                  <span className="text-sm text-[#6B7280]">
                    750 ml
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-4 mt-6">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#814BF6] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#6d3df0] transition"
                  >
                    Add to Cart
                  </button>

                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 font-semibold">
                      {quantities[item._id] || 1}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center lg:text-left px-6 lg:px-28">
        <button
          onClick={() => navigate("/product")}
          className="text-2xl font-medium hover:scale-105 hover:underline transition-all text-[#1F2937]"
        >
          View All Sarbath Variety
        </button>
      </div>


      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-purple-100">

          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            Why Choose Selvam Sarbath?
          </h2>

          <p className="text-gray-600 leading-7 mb-8">
            Selvam Sarbath offers authentic Nannari Sarbath and traditional summer drinks prepared using quality ingredients. We focus on delivering refreshing flavors, maintaining traditional taste, and providing a convenient online ordering experience for our customers.
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            Benefits of Nannari Sarbath
          </h2>

          <p className="text-gray-600 leading-7">
            Nannari Sarbath is a traditional South Indian summer drink known for its refreshing taste. It is widely enjoyed during hot weather as a natural alternative to carbonated beverages. Its unique flavor and traditional preparation make it a popular choice among people seeking authentic summer refreshments.
          </p>

          <Link
            to={`/blog`}
            className="inline-flex items-center gap-2 mt-4 bg-[#814BF6] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6d3df0] hover:scale-105 transition-all duration-300"
          >
            Explore Nannari Benefits
          </Link>

        </div>
      </section>
    </>
  );
};

export default Home;

