import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
import Description from "./components/Description";
import { AnimatePresence } from "framer-motion";
import Lenis from 'lenis';
import { useEffect } from "react";
import Menu from "./components/header/menu";

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Menu />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/description" element={<Description />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;