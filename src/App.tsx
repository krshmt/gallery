import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
import Description from "./components/Description";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
      <Router>
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