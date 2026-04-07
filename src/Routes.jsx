import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/snd-site/home/Home-Clean";
import About from "./pages/snd-site/about/About";
import Gallery from "./pages/snd-site/gallery/Gallery";
import Services from "./pages/snd-site/services/Services";
import Academy from "./pages/snd-site/academy/Academy";
import Booking from "./pages/booking/Booking";
import CabinAirFilterReplacement from "./pages/snd-site/services/add-ons/CabinAirFilterReplacement";
import OdorRemoval from "./pages/snd-site/services/add-ons/OdorRemoval";
import PetHairRemoval from "./pages/snd-site/services/add-ons/PetHairRemoval";
import StainRemoval from "./pages/snd-site/services/add-ons/StainRemoval";
import EngineBayDetail from "./pages/snd-site/services/add-ons/EngineBayDetail";
import HeadlightRestoration from "./pages/snd-site/services/add-ons/HeadlightRestoration";
import PaintTouchUp from "./pages/snd-site/services/add-ons/PaintTouchUp";
import TrimRestoration from "./pages/snd-site/services/add-ons/TrimRestoration";
import UndercarriageCleaning from "./pages/snd-site/services/add-ons/UndercarriageCleaning";

export default function BrowserRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/cabin-air-filter-replacement" element={<CabinAirFilterReplacement />} />
        <Route path="/services/odor-removal" element={<OdorRemoval />} />
        <Route path="/services/pet-hair-removal" element={<PetHairRemoval />} />
        <Route path="/services/stain-removal" element={<StainRemoval />} />
        <Route path="/services/engine-bay-detail" element={<EngineBayDetail />} />
        <Route path="/services/headlight-restoration" element={<HeadlightRestoration />} />
        <Route path="/services/paint-touch-up" element={<PaintTouchUp />} />
        <Route path="/services/trim-restoration" element={<TrimRestoration />} />
        <Route path="/services/undercarriage-cleaning" element={<UndercarriageCleaning />} />
        <Route path="/academy" element={<Academy />} />
      </Routes>
    </BrowserRouter>
  );
}
