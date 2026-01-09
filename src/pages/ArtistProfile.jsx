import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import MyContainer from "../components/MyContainer";
import { Fade } from "react-awesome-reveal";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";

const ArtistProfile = () => {
  const { id } = useParams();
  const { user: currentUser, setUser } = useContext(AuthContext);
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/artist-details/${id}`
        );
        setArtistData(res.data);
      } catch (err) {
        console.error("Error loading artist", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  // Handle Profile Update Logic
  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const bio = form.bio.value;

    try {
      // Update Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      // Update MongoDB
      await axios.put("http://localhost:3000/users", {
        email: currentUser.email,
        displayName: name,
        photoURL: photoUrl,
        bio: bio,
      });

      // Update Local State
      const updatedUser = {
        ...currentUser,
        displayName: name,
        photoURL: photoUrl,
        bio: bio,
      };
      setUser(updatedUser);
      setArtistData({ ...artistData, user: updatedUser });

      toast.success("Profile updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleFollow = async () => {
    if (!currentUser) return toast.error("Please login to follow!");

    try {
      const res = await axios.patch(
        `http://localhost:3000/users/follow/${artistData.user.email}`,
        {
          followerEmail: currentUser.email,
        }
      );
      if (res.status === 200) {
        const { user, followers } = artistData;
        let newFollowerList = [...(user.followerList || [])];

        if (res.data.isFollowing) {
          newFollowerList.push(currentUser.email);
        } else {
          newFollowerList = newFollowerList.filter(
            (email) => email !== currentUser.email
          );
        }

        setArtistData({
          ...artistData,
          followers: res.data.isFollowing
            ? followers + 1
            : Math.max(0, followers - 1),
          user: { ...user, followerList: newFollowerList },
        });
        toast.success(res.data.isFollowing ? "Followed!" : "Unfollowed!");
      }
    } catch (err) {
      toast.error("Error following artist");
    }
  };

  if (loading)
    return <div className="py-20 text-center">Loading Artist...</div>;

  if (!artistData)
    return <div className="py-20 text-center">Artist not found.</div>;

  const { user, artworks, totalArtworks, followers } = artistData || {};

  const isCurrentlyFollowing = user?.followerList?.includes(currentUser?.email);

  return (
    <div className="py-16">
      <MyContainer>
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Fade direction="down">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-40 h-40 rounded-full border-8 border-purple-100 shadow-2xl object-cover mb-6"
            />
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              {user.displayName}
              {currentUser?.email === user.email && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 hover:bg-purple-100 rounded-full text-purple-600 transition-all"
                  title="Edit Profile"
                >
                  <FaRegEdit size={20} />
                </button>
              )}
            </h1>
            {currentUser?.email !== user.email && (
              <button
                onClick={handleFollow}
                className={`btn rounded-full mt-4 ${
                  isCurrentlyFollowing
                    ? "btn-outline btn-secondary"
                    : "btn-primary"
                }`}
              >
                {isCurrentlyFollowing ? "Unfollow" : "Follow Artist"}
              </button>
            )}
            <p className="max-w-2xl text-lg mb-6">
              {user.bio || "This artist hasn't shared a bio yet."}
            </p>
          </Fade>

          {/* Stats Bar */}
          <div className="flex gap-12 px-10 py-6 rounded-3xl shadow-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {totalArtworks}
              </p>
              <p className=" uppercase tracking-widest">Artworks</p>
            </div>
            <div className="border-r border-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{followers}</p>
              <p className="uppercase tracking-widest">Followers</p>
            </div>
          </div>
        </div>

        {/* Artist Gallery */}
        <h2 className="text-2xl font-bold mb-8 border-b-2 border-purple-500 inline-block">
          Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 aspect-square"
            >
              <img
                src={art.imageUrl}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">
                  <Link to={`/artwork/details/${art._id}`}>
                    {art.title}
                  </Link>
                </h3>
                <p className="text-gray-300">{art.category}</p>
              </div>
            </div>
          ))}
        </div>
      </MyContainer>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaRegEdit size={24} className="text-purple-600" />
                Edit Profile
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
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

            <div className="p-6">
              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="form-control">
                  <label className="label font-bold text-gray-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.displayName}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-700">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoUrl"
                    defaultValue={user?.photoURL}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-700 flex items-center gap-2">
                    <MdOutlineDescription
                      className="text-purple-600"
                      size={20}
                    />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={user?.bio}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn flex-1 bg-gray-100 text-gray-700 border-none hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn flex-1 bg-purple-600 hover:bg-purple-700 text-white border-none"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
