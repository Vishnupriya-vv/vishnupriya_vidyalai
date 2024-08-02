import { useState, useEffect } from 'react';

// Custom hook for window width
const useWindowWidth = () => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsSmallerDevice(window.innerWidth < 500);
      };

      handleResize(); // Set initial value
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { isSmallerDevice };
};

export default useWindowWidth;
