import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MyContainer from "../components/MyContainer";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photoUrl = event.target.photoUrl.value;

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {
        // console.log(userCredential.user);
        setUser({
          ...user,
          displayName: name,
          photoURL: photoUrl,
        });
        toast.success("Your profile updated!");
        setIsModalOpen(false);
        event.target.reset();
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-indigo-100 py-20">
      <title>My Profile</title>
      <MyContainer>
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
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
                  <h1 className="text-3xl font-bold text-gray-800">
                    {user?.displayName || "Anonymous User"}
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center justify-center gap-2">
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaRegEdit size={24} color="#9810fa" />
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
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

                {/* Name Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold text-gray-800">
                      Display Name
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    defaultValue={user?.displayName}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  />
                </div>

                {/* Photo URL Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold text-gray-800">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="url"
                    id="photo-input"
                    defaultValue={user?.photoURL}
                    placeholder="Enter your photo URL"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter a valid image URL (e.g., from Imgur, Cloudinary)
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      const name = document.getElementById("name-input").value;
                      const photoUrl =
                        document.getElementById("photo-input").value;

                      updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: photoUrl,
                      })
                        .then(() => {
                          setUser({
                            ...user,
                            displayName: name,
                            photoURL: photoUrl,
                          });
                          toast.success("Profile updated successfully!");
                          setIsModalOpen(false);
                        })
                        .catch((error) => {
                          console.error("Profile update error:", error);
                          toast.error("Failed to update profile");
                        });
                    }}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
