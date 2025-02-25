import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './components/Gallery';
import Description from './components/Description';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
              <Gallery />
          }
        />
        <Route
          path="/description"
          element={
              <Description />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;