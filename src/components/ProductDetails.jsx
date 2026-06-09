import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProductDetails = ({ addToCart }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${slug}`
        );

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        setProduct(data);

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">

        <div className="w-14 h-14 border-4 border-[#e5e9fa] border-t-[#814BF6] rounded-full animate-spin"></div>

        <h2 className="text-2xl font-bold text-[#814BF6]">
          Loading Products...
        </h2>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="bg-[#e5e9fa] rounded-2xl p-8 flex justify-center">
          <img
            src={`${import.meta.env.VITE_API_URL}/${product.image}`}
            alt={`${product.title} Traditional Sarbath`}
            className="h-[300px] md:h-[500px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">

          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-bold text-[#814BF6]">
              ₹ {product.price}.00
            </p>

            <span className="text-gray-500">
              750 ml
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">
              Product Highlights
            </h2>

            <ul className="space-y-2 text-gray-600">
              <li>✓ Refreshing summer drink</li>
              <li>✓ Traditional South Indian flavour</li>
              <li>✓ Perfect for family gatherings</li>
              <li>✓ Best served chilled</li>
              <li>✓ 750 ml bottle</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8">

            <div className="flex items-center border rounded-full overflow-hidden">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="px-5 py-3 hover:bg-gray-100"
              >
                −
              </button>

              <span className="px-6 font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="px-5 py-3 hover:bg-gray-100"
              >
                +
              </button>

            </div>

            <button
              onClick={handleAddToCart}
              className="bg-[#814BF6] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6d3df0] transition"
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>


      <div className="mt-16 space-y-4">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <button
            onClick={() =>
              setOpenSection(
                openSection === "prepare"
                  ? null
                  : "prepare"
              )
            }
            className="w-full flex justify-between items-center px-8 py-6"
          >
            <span className="text-xl font-semibold">
              How To Prepare
            </span>

            {openSection === "prepare"
              ? <FiChevronUp size={24} />
              : <FiChevronDown size={24} />}
          </button>

          {openSection === "prepare" && (
            <div className="px-8 pb-6 border-t pt-6">

              <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                <li>Add 30–50 ml syrup.</li>
                <li>Add 150–200 ml chilled water.</li>
                <li>Add ice cubes.</li>
                <li>Mix well and serve chilled.</li>
              </ol>

            </div>
          )}

        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <button
            onClick={() =>
              setOpenSection(
                openSection === "faq"
                  ? null
                  : "faq"
              )
            }
            className="w-full flex justify-between items-center px-8 py-6"
          >
            <span className="text-xl font-semibold">
              Frequently Asked Questions
            </span>

            {openSection === "faq"
              ? <FiChevronUp size={24} />
              : <FiChevronDown size={24} />}
          </button>

          {openSection === "faq" && (
            <div className="px-8 pb-6 border-t pt-6 space-y-4">

              <div>
                <h3 className="font-semibold">
                  Is this product ready to drink?
                </h3>

                <p className="text-gray-600">
                  No. Mix with water before consumption.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Does this contain preservatives?
                </h3>

                <p className="text-gray-600">
                  Yes, permitted preservatives are used.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  How should I store this product?
                </h3>

                <p className="text-gray-600">
                  Store in a cool and dry place.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Is this suitable for summer?
                </h3>

                <p className="text-gray-600">
                  Yes, Sarbath is a refreshing drink
                  commonly enjoyed during hot weather.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;