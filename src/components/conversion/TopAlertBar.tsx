import React, { useEffect, useState } from "react";

const TopAlertBar = () => {
  const [shouldWiggle, setShouldWiggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldWiggle(true);
      setTimeout(() => setShouldWiggle(false), 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full z-50">
      <div 
        className="text-white py-2 px-4 text-center"
        style={{ backgroundColor: '#2563eb' }}
      >
        <a 
          href="https://pplx.ai/andrewmurr96762" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium ${shouldWiggle ? 'animate-wiggle' : ''}`}
        >
          Download Comet and Get Perplexity Pro For FREE. Click Here
        </a>
      </div>
    </div>
  );
};

export default TopAlertBar;
