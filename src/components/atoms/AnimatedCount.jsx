import React, { useState, useEffect } from "react";

const AnimatedCount = ({ finalCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 500;
    const steps = 30;
    const increment = finalCount / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.round(currentStep * increment);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(finalCount);
      } else {
        setCount(newCount);
      }
    }, duration / steps);

    return () => {
      clearInterval(timer);
    };
  }, [finalCount]);

  return (
    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
      {count}
    </span>
  );
};

export default AnimatedCount;
