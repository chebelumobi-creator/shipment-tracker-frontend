import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TrackResults from "./TrackResults";
import EmailWidget from "./components/EmailWidget";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track/:trackingNumber" element={<TrackResults />} />
      </Routes>
      <EmailWidget />
    </>
  );
}

export default App;