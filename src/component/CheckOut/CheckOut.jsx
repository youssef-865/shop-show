import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // ✅ Import Yup
import { useParams } from 'react-router-dom';

export default function CheckOut() {
  let { cartId } = useParams();
  // console.log("Cart ID from URL:", cartId);

  async function handleCheckout(formData) {
    // console.log('Checkout Data:', formData);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, 
        { 'shippingAddress': formData },
        {
          headers: {
            token: localStorage.getItem("userToken")
          },
          params: {
            url: 'http://localhost:5173',
          }
        }
      );

      // console.log('Checkout Success:', response.data);
      location.href = response.data.session.url;

      if (response.data.message === 'success') {
        alert('Order placed successfully!');
      }
    } catch (error) {
      // console.error('Checkout Error:', error);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone is required'), //  Required field
      city: Yup.string().required('City is required'), // Required field
    }),
    onSubmit: handleCheckout,
  });

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
            CheckOut
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Details */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Details
              </label>
              <input
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                id="details"
                type="text"
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                id="phone"
                type="tel"
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              ) : null}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                id="city"
                type="text"
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              {formik.touched.city && formik.errors.city ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent cursor-pointer bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
