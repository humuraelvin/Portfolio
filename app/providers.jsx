"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./components/loading-spinner";

const Providers = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to simulate initial loading for 20 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingSpinner minDuration={20000} />
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        {children}
      </div>
    </>
  );
};

export default Providers; 