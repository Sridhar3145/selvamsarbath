import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Products = ({ addToCart }) => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});
  const [productt, setProductt] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <title>Traditional Sarbath Products | Sarbath | Syrup</title>

        <meta
          name="description"
          content="Explore Nannari, Rose, and Pineapple Sarbath products from Selvam Sarbath."
        />

        <link
          rel="canonical"
          href="https://selvamsarbath.onrender.com/product"
        />
      </Helmet>

      <div className="max-w-5xl mx-auto p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">

            <div className="w-14 h-14 border-4 border-[#e5e9fa] border-t-[#814BF6] rounded-full animate-spin"></div>

            <h2 className="text-2xl font-bold text-[#814BF6]">
              Loading Products...
            </h2>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productt.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item.slug}`)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-[#e5e9fa] rounded-xl p-4 mb-4">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${item.image}`}
                      alt={`${item.title} Sarbath`}
                      className="h-60 w-60 object-contain hover:scale-110 transition-all"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-[#1F2937]">
                    {item.title}
                  </h2>

                  <p className="text-sm text-[#6B7280] mt-1">
                    Traditional cooling drink
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-xl font-bold text-[#814BF6]">
                      ₹ {item.price}.00
                    </p>

                    <span className="text-sm text-[#6B7280]">
                      750 ml
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;

