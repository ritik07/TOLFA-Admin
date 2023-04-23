import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import LayoutWrapper from "./layout";
import "./static/style/main.css";
import Admission from "./pages/admission";
import RescueType from "./pages/master/rescue/rescueType";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/rescue-type" element={<RescueType />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
