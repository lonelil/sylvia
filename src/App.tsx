import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Results from "./pages/Results";
import Channel from "./pages/Channel";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/results" element={<Results />} />
        <Route path="/channel/:id" element={<Channel />} />
      </Routes>
    </>
  );
}

export default App;
