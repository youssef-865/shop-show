import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { UserContext } from '../../context/userContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  <Helmet>
  <title>login</title>
</Helmet>
  let {setLogin} = useContext(UserContext)
  
  const [apiError, setapiError] = useState("");
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleLogin(formData) {
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formData)
      .then((response) => {
        // console.log("success", response);
        if (response.data.message === "success") {
          localStorage.setItem("userToken",response?.data?.token)
          setLogin(response?.data?.token)
          setLoading(false);
          navigate("/home");
        }
      })
      .catch((error) => {
        // console.log("error", error);
        setLoading(false);
        setapiError(error.response?.data?.message || "An error occurred");
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
            Login Now
          </h2>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                type="email"
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
                type="password"
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit Button */}

            <div>
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty) || isLoading}
                className="flex w-full justify-center rounded-md border border-transparent cursor-pointer bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner my-3 mx-3 fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
