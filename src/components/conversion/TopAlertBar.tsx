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
          href="https://referworkspace.app.goo.gl/32oU" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`text-white hover:text-blue-200 transition-colors duration-200 font-medium ${shouldWiggle ? 'animate-wiggle' : ''} flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4`}
        >
          <span>Get Gemini Pro for FREE (included with Google Workspace.)</span>
          <span>Click to Activate Offer.</span>
        </a>
      </div>
    </div>
  );
};

export default TopAlertBar;
