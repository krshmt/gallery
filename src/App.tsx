import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Lenis from 'lenis';
import Gallery from "./components/Gallery";
import Description from "./components/Description";
import Menu from "./components/header/menu";
import About from "./components/About";

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
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;