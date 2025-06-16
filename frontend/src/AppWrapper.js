import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import App from "./App";

const AppWrapper = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Set a timeout to switch from landing page to main app after 5 seconds
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 3500);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLanding ? <LandingPage /> : <App />}
    </>
  );
};

export default AppWrapper;