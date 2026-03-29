import Package from "./pages/package/Package";
import Bookings from "./pages/bookings/Bookings";
import Appointments from "./pages/appointments/Appointments";
import AddOns from "./pages/add-ons/AddOns";
import Checkout from "./pages/checkout/Checkout";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { labels } from "./static/labels";
import axios from "axios";
import { PackageSession, ModifierSession } from "./middleware/packageContext";
import { packageNameCamelCase } from "./hooks/packageNameCamelCase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import Home from "./pages/snd-site/home/Home-Clean";
import About from "./pages/snd-site/about/About";
import Gallery from "./pages/snd-site/gallery/Gallery";
import Services from "./pages/snd-site/services/Services";
import Academy from "./pages/snd-site/academy/Academy";
import { CartProvider } from "./context/CartContext";

export default function BrowserRoutes() {
  const [packages, setPackages] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jwtToken, setJwtToken] = useState(() => {
    return localStorage.getItem("jwt") || null;
  });

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/packages`,
        );
        setModifiers(response.data.modifierList);
        setPackages(response.data.packageList);
        setError(null);
      } catch (err) {
        console.error("Error fetching packages:", err);
        const errorMsg = "Failed to load packages. Please try again later.";
        setError(errorMsg);
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Check for JWT in URL on page visit
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwtParam = urlParams.get("jwt");
    
    if (jwtParam) {
      setJwtToken(jwtParam);
      localStorage.setItem("jwt", jwtParam);
      
      // Clean URL without triggering re-render
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // Refresh oAuth Token
  useEffect(() => {
    const refreshToken = "";
    const refreshTimeout = setTimeout(() => {
      async function refreshToken() {
        try {
          await axios.get(
            `${import.meta.env.VITE_BACKEND_API_URL}/refreshToken`,
            {
              refreshToken: refreshToken,
            },
          );
        } catch (err) {
          console.error(`Error refreshing token: ${err}`);
          toast.error("Session refresh failed. Please log in again.", {
            position: "top-center",
          });
        }
      }
      refreshToken();
    }, 518400000);

    return () => clearTimeout(refreshTimeout);
  }, []);

  // Loading state UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <TailSpin height={80} width={80} color="#4f46e5" ariaLabel="loading" />
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="text-red-600 text-xl font-semibold mb-4">
          Oops! Something went wrong
        </div>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CartProvider>
        <PackageSession.Provider value={{ packages }}>
          <ModifierSession.Provider value={{ modifiers }}>
            <BrowserRouter>
              <Routes>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/" element={<Home />} />
                <Route path="/bookings" element={<Bookings />} />

                {/* snd-site routes */}
                <Route path="/snd-site/about" element={<About />} />
                <Route path="/snd-site/gallery" element={<Gallery />} />
                <Route path="/snd-site/services" element={<Services />} />
                <Route path="/snd-site/academy" element={<Academy />} />
                {packages.map((packageService) => {
                  if (packageService.name !== "Touch Up Labor (Hourly)") {
                    const camelCasedPackageName = packageNameCamelCase({
                      packageName: packageService.name,
                    });
                    return (
                      <Route
                        key={`${camelCasedPackageName}-addons`}
                        path={`/${camelCasedPackageName}/addOns`}
                        element={<AddOns packageName={packageService.name} />}
                      />
                    );
                  }
                  return null;
                })}
                {packages.map((packageService) => {
                  if (packageService.name !== "Touch Up Labor (Hourly)") {
                    const camelCasedPackageName = packageNameCamelCase({
                      packageName: packageService.name,
                    });
                    const packagePrice =
                      labels.packages[camelCasedPackageName]?.price || 0;
                    const packageTimeAlloted =
                      labels.packages[camelCasedPackageName]?.timeAlloted || 0;

                    return (
                      <Route
                        path={`/${camelCasedPackageName}`}
                        key={camelCasedPackageName}
                        element={
                          <Package
                            packageVersion={packageService.version}
                            packageName={packageService.name}
                            packagePrice={packagePrice}
                            packageTimeAlloted={packageTimeAlloted}
                            packageFeatureList={
                              packageService.descriptionPlaintext
                            }
                            packageOptionList={packageService.variations}
                          />
                        }
                      />
                    );
                  }
                  return null;
                })}
              </Routes>
            </BrowserRouter>
          </ModifierSession.Provider>
        </PackageSession.Provider>
      </CartProvider>
    </>
  );
}
