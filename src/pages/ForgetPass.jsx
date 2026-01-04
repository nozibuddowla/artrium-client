import React, { useState } from "react";
import MyContainer from "../components/MyContainer";
import { Link, useNavigate, useParams } from "react-router";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";

const ForgetPass = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formEmail = event.target.email.value;
    sendPasswordResetEmail(auth, formEmail)
      .then(() => {
        window.open("https://mail.google.com/", "_blank");
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="my-28">
      <MyContainer>
        <div className="max-w-150 mx-auto px-4">
          <div className="hero-content flex-col">
            {/* Header */}
            <h1 className="text-4xl 2xl:text-5xl font-bold font-serif mb-10 text-gray-900">
              Forget Password
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    Email address <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  placeholder="Enter your username or email address..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-full py-5 bg-linear-to-br from-[#632ee3] to-[#9f62f2]  text-white font-bold uppercase tracking-[0.2em] text-sm rounded-full transition-all duration-300 transform active:scale-[0.98] shadow-md hover:shadow-lg mt-4"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ForgetPass;
