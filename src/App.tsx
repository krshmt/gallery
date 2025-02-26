import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
import Description from "./components/Description";
import { LayoutGroup } from "framer-motion";

function App() {
  return (
      <Router>
        <LayoutGroup>
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/description" element={<Description />} />
            </Routes>
        </LayoutGroup>
      </Router>
  );
}

export default App;