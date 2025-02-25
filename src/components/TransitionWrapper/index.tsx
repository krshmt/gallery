import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [location]);

  return <div ref={containerRef}>{children}</div>;
};

export default TransitionWrapper;