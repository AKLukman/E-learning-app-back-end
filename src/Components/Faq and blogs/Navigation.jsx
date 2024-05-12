import React, { useState } from "react";
import Blogs from "./Blogs";
import Faq from "./Faq";

const Navigation = () => {
  const [mode, setMode] = useState(1);
  return (
    <>
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setMode(1)}
          className={`btn  ${mode === 1 ? "btn-accent" : "btn-ghost"}`}
        >
          Blog
        </button>
        <button
          onClick={() => setMode(2)}
          className={`btn  ${mode === 2 ? "btn-accent" : "btn-ghost"}`}
        >
          FAQ
        </button>
      </div>
      {(() => {
        switch (mode) {
          case 1:
            return <Blogs />;
          case 2:
            return <Faq />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Navigation;
