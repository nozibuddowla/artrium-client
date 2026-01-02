import React from "react";
import Slider from "../components/Slider";
import FeaturedArtworks from "../components/FeaturedArtworks";
import TopArtists from "../components/TopArtists";
import CommunityHighlights from "../components/communityHighlights";

const Home = () => {
  return (
    <div>
      <title>Home</title>
      <Slider />
      <FeaturedArtworks />
      <TopArtists />
      <CommunityHighlights />
    </div>
  );
};

export default Home;
