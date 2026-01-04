import React from "react";
import MyContainer from "./MyContainer";
import { ClimbingBoxLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <MyContainer>
        <div className="flex flex-col justify-center items-center my-10">
          <ClimbingBoxLoader
            color="#9f62f2"
            loading
            size={20}
            speedMultiplier={1}
          />
        </div>
      </MyContainer>
    </div>
  );
};

export default Loader;
