"use client";
import Tilt from "react-parallax-tilt";

const CreatePageTitle = () => {
  return (
    <div>
      <Tilt>
        <h1 className="p-9 m-10 text-5xl font-extrabold text-center uppercase rounded-lg border border-r-0 border-b-0 opacity-80 border-neutral-400/50 bg-white/15 backdrop-blur-lg text-neutral-200 px-[100px] md:px-[150px] lg:px-[250px]">
          <span>
            Submit <br /> Your Startup
          </span>
        </h1>
      </Tilt>
    </div>
  );
};

export default CreatePageTitle;
