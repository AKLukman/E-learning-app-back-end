import React from "react";

const Forbidden = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p
        className="text-xl md:text-4xl text-red-700 font-semibold
      "
      >
        {" "}
        403 - ACCESS DENIED
      </p>
    </div>
  );
};

export default Forbidden;
