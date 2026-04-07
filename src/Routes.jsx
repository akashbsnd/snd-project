import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/snd-site/home/Home-Clean";
import About from "./pages/snd-site/about/About";
import Gallery from "./pages/snd-site/gallery/Gallery";
import Services from "./pages/snd-site/services/Services";
import Academy from "./pages/snd-site/academy/Academy";
import Booking from "./pages/booking/Booking";

export default function BrowserRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/academy" element={<Academy />} />
      </Routes>
    </BrowserRouter>
  );
}
