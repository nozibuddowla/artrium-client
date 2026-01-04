import React from "react";
import Slider from "../components/Slider";
import FeaturedArtworks from "../components/FeaturedArtworks";
import TopArtists from "../components/TopArtists";
import CommunityHighlights from "../components/communityHighlights";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <title>Home</title>
      <Slider />
      <FeaturedArtworks />
      <TopArtists />
      <CommunityHighlights />
      <Newsletter />
    </div>
  );
};

export default Home;
