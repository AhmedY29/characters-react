import React from "react";

// React icon
import { LuLoaderCircle } from "react-icons/lu";

function Loading() {
  return (
    <section className="loader-section w-full h-screen flex justify-center">
      <div className="loader-content flex justify-center items-center  w-[80%] my-10">
        <h1 className="flex items-center gap-2 text-black text-5xl">
          <LuLoaderCircle className="animate-spin text-blue-700" />
          Loading ...
        </h1>
      </div>
    </section>
  );
}

export default Loading;
