import React, { useContext } from "react";
import MyContainer from "../components/MyContainer";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pass = event.target.password.value;
    console.log(email, pass);
    createUser(email, pass)
  }
  return (
    <div className="py-20">
      <MyContainer>
        <div className="max-w-150 mx-auto px-4">
          <div className="hero-content flex-col">
            {/* Header */}
            <h1 className="text-4xl 2xl:text-5xl font-bold font-serif mb-10 text-gray-900">
              Register
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    User Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              {/* Username */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    Photo <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Enter your photoURL..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              {/* Username/Email Field */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    Email address <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    Password <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              <div className="w-full flex items-center gap-2">
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-dotted transition-colors"
                >
                  Log In
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-5 bg-linear-to-br from-[#632ee3] to-[#9f62f2]  text-white font-bold uppercase tracking-[0.2em] text-sm rounded-full transition-all duration-300 transform active:scale-[0.98] shadow-md hover:shadow-lg mt-4"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Register;
