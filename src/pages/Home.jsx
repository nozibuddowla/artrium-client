import React from "react";
import Slider from "../components/Slider";
import FeaturedArtworks from "../components/FeaturedArtworks";
import TopArtists from "../components/TopArtists";

const Home = () => {
  return (
      <div>
          <title>Home</title>
      <Slider />
          <FeaturedArtworks />
          <TopArtists />
    </div>
  );
};

export default Home;
