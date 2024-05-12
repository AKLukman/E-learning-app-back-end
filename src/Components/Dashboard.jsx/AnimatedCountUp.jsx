import React from "react";

import AnimatedNumbers from "react-animated-numbers";
const AnimatedCountUp = ({ endValue, title }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-2xl md:text-4xl font-semibold font-sans text-center capitalize">
        {title}
      </p>
      <AnimatedNumbers
        includeComma
        animateToNumber={endValue}
        fontStyle={{ fontSize: 40 }}
        locale="en-US"
        configs={[{ mass: 1, tension: 220, friction: 100 }]}
      />
    </div>
  );
};

export default AnimatedCountUp;
