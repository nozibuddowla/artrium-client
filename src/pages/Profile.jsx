import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MyContainer from "../components/MyContainer";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { MdEmail, MdOutlineDescription } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const bio = form.bio.value;

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      await axios.put("http://localhost:3000/users", {
        email: user.email,
        displayName: name,
        photoURL: photoUrl,
        bio: bio,
      });

      setUser({ ...user, displayName: name, photoURL: photoUrl, bio: bio });
      toast.success("Profile synced!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="py-20">
      <title>My Profile</title>
      <MyContainer>
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Background */}
            <div className="h-32 bg-linear-to-r from-purple-600 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Profile Content */}
            <div className="relative px-8 pb-8">
              {/* Avatar */}
              <div className="flex flex-col items-center -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-gray-200">
                    <img
                      src={
                        user?.photoURL ||
                        "https://ui-avatars.com/api/?name=" +
                          (user?.displayName || "User") +
                          "&background=667eea&color=fff&size=200"
                      }
                      alt={user?.displayName || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mt-4">
                  <h1 className="text-3xl font-bold">
                    {user?.displayName || "Anonymous User"}
                  </h1>
                  <p className="mt-1 flex items-center justify-center gap-2">
                    <MdEmail size={20} />
                    {user?.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="btn px-8 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <FaRegEdit size={20} color="#ffffff" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-base-content rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-base-100 flex items-center gap-2">
                  <FaRegEdit size={24} color="#9810fa" />
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className=" text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body - Form */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Current Avatar Preview */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-200">
                    <img
                      src={
                        user?.photoURL ||
                        "https://ui-avatars.com/api/?name=" +
                          (user?.displayName || "User") +
                          "&background=667eea&color=fff&size=200"
                      }
                      alt={user?.displayName || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <form onSubmit={handleUpdate}>
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-bold text-base-100">
                        Display Name
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      defaultValue={user?.displayName}
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                    />
                  </div>

                  {/* Photo URL Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-bold text-base-100">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      id="photo-input"
                      defaultValue={user?.photoURL}
                      name="photoUrl"
                      placeholder="Enter your photo URL"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                    />
                    <p className="text-xs text-base-100 mt-2">
                      Enter a valid image URL (e.g., from Imgur, Cloudinary)
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-bold text-base-100">
                        Bio <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <textarea
                      name="bio"
                      defaultValue={user?.bio}
                      rows="4"
                      placeholder="Describe your artwork..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border dark:border-gray-200 border-slate-700  focus:ring-2 focus:ring-purple-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
