import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyContainer from "../components/MyContainer";
import Loader from "../components/Loader";

const ArtWorkDetails = () => {
  const [artworks, setArtworks] = useState([]);
  const [artWorksDetails, setArtWorksDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch("/artworks.json")
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  //   console.log(artworks);

  useEffect(() => {
    if (artworks.length > 0) {
      const findResult = artworks.find((artWork) => artWork.artworkId === id);
      //   console.log("Found artwork:", findResult);
      setArtWorksDetails(findResult);
    }
  }, [id, artworks]);

  //   console.log("Artwork Details:", artWorksDetails);

  if (loading) {
    return (
      <div>
        <MyContainer>
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        </MyContainer>
      </div>
    );
  }

  if (!artWorksDetails) {
    return (
      <div>
        <MyContainer>
          <div className="flex flex-col justify-center items-center my-10">
            <h1 className="font-bold text-2xl">Artwork not found!</h1>
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <MyContainer>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">{artworks?.title}</h1>
          <h1 className="text-4xl font-bold">{artWorksDetails?.title}</h1>
          <p className="text-xl text-gray-600 mt-2">
            By {artWorksDetails?.artistName}
          </p>
          <div className="mt-8">
            <img
              src={artWorksDetails.imageUrl}
              alt={artWorksDetails.title}
              className="w-full max-h-150 object-contain rounded-lg shadow-xl"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Details</h3>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {artWorksDetails.category}
                </p>
                <p>
                  <span className="font-semibold">Medium:</span>{" "}
                  {artWorksDetails.medium}
                </p>
                <p>
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {artWorksDetails.dimensions}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> $
                  {artWorksDetails.price}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {artWorksDetails.description}
              </p>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ArtWorkDetails;
