import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Checkout = ({ cart }) => {
  const [loading, setLoading] = useState(false);


  const whatsappNumber = "9345866691";

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^[6-9]\d{9}$/,
        "Enter a valid 10-digit phone number"
      ),

    address: Yup.string()
      .required("Address is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const totalAmount = cart.reduce((total, item) => {
    const price = item.price ?? item.productId?.price ?? 0;
    const qty = item.quantity ?? item.qty ?? 1;

    return total + price * qty;
  }, 0);

  const onSubmit = async (data) => {
    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customer: data,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
          "Failed to save order"
        );
      }


      if (cart.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const products = cart
        .map((item) => {
          const title =
            item.title ?? item.productId?.title;

          const qty =
            item.quantity ?? item.qty ?? 1;

          const price =
            item.price ??
            item.productId?.price ??
            0;
          const image = item.title ?? item.productId?.title

          return `•${title} × ${qty} = ₹${price * qty
            }`;
        })
        .join("\n");

      const message = `
New Order - Selvam Sarbath

Customer Details

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Delivery Address

${data.address}

Order Details

${products}

Subtotal: ₹${totalAmount}

🚚 Launch Offer: Free Delivery Available

Thank you for choosing Selvam Sarbath! 😊

To complete your order, please make the payment using the details below and share the payment screenshot with us.

Your order will be confirmed once the payment is verified.
      `;
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );

      toast.success(
        "Redirecting to WhatsApp..."
      );

      reset();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(
        "Failed to open WhatsApp"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F4F6FD]">

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Checkout
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              <div>
                <label className="checkout-label">
                  Name
                </label>

                <input
                  {...register("name")}
                  className="checkout-input"
                />

                {errors.name && (
                  <p className="error-text">
                    {errors.name.message}
                  </p>
                )}
              </div>


              <div>
                <label className="checkout-label">
                  Email
                </label>

                <input
                  {...register("email")}
                  className="checkout-input"
                />

                {errors.email && (
                  <p className="error-text">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="checkout-label">
                  Phone
                </label>

                <input
                  {...register("phone")}
                  className="checkout-input"
                />

                {errors.phone && (
                  <p className="error-text">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="checkout-label">
                  Delivery Address
                </label>

                <textarea
                  rows="3"
                  {...register("address")}
                  className="checkout-input resize-none"
                />

                {errors.address && (
                  <p className="error-text">
                    {errors.address.message}
                  </p>
                )}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-lg transition-all
              ${loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95"
                }`}
            >
              {loading
                ? "Opening WhatsApp..."
                : "Order via WhatsApp"}
            </button>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">

              <h4 className="font-semibold text-green-700 mb-2">
                WhatsApp Ordering
              </h4>

              <p className="text-sm text-gray-600">
                After clicking{" "}
                <strong>
                  Order via WhatsApp
                </strong>
                , you'll be redirected
                to WhatsApp with your
                order details. We will
                confirm your order and
                share payment details.
              </p>

            </div>

            <div className="text-green-700 font-medium">
              🚚 Launch Offer: Free Delivery on All Orders!
            </div>

          </form>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">

          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm">

            {cart.length === 0 ? (
              <p className="text-gray-500">
                Your cart is empty
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={
                    item._id ??
                    item.productId?._id
                  }
                  className="flex justify-between"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${item.image ?? item.productId?.image}`}
                    alt={item.title ?? item.productId?.title}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <span>

                    {item.title ??
                      item.productId
                        ?.title}{" "}
                    ×{" "}
                    {item.quantity ??
                      item.qty}
                  </span>

                  <span className="font-medium">
                    ₹
                    {(item.price ??
                      item.productId
                        ?.price) *
                      (item.quantity ??
                        item.qty)}
                  </span>
                </div>
              ))
            )}

          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">

            <span>Total</span>

            <span className="text-green-700">
              ₹{totalAmount}
            </span>

          </div>

          <div className="mt-6 border rounded-lg p-4 bg-green-50">

            <h4 className="font-semibold text-green-700 mb-2">
              Free Delivery Offer 🎉
            </h4>

            <p className="text-sm text-gray-600">
              Enjoy free delivery on
              all orders for a limited
              time.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;
