import Footer from "../../components/Footer";
import CheckoutCart from "../../components/Checkout/CheckoutCart/CheckoutCart";
import { labels } from "../../static/labels";
import "./checkout.css";
import CheckoutTimer from "../../components/Checkout/CheckoutCart/CheckoutTimer";
import CheckoutForm from "../../components/Checkout/CheckoutForm/CheckoutForm";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BookAppointment } from "../../hooks/BookAppointment";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { calculateItemsTotal } from "../../hooks/calculateItemsTotal";
import CheckoutCartTotals from "../../components/Checkout/CheckoutCart/CheckoutCartTotals";
import PackageItemList from "../../components/Cart/PackageItemList";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

export default function Checkout() {
  const navigate = useNavigate();
  const [isCurrUser, setIsCurrUser] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext);

  const syncCartFromStorage = useCallback(() => {
    const storedCart = localStorage.getItem("cart") || sessionStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0 && cartItems.length === 0) {
          setCartItems(parsedCart);
        }
      } catch (e) {
        console.error("Error parsing cart from storage:", e);
      }
    }
  }, [cartItems.length, setCartItems]);

  useEffect(() => {
    syncCartFromStorage();
    const pendingRedirect = sessionStorage.getItem("pendingOAuthRedirect");
    if (pendingRedirect === "true") {
      sessionStorage.removeItem("pendingOAuthRedirect");
    }
  }, [syncCartFromStorage]);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    zip: "",
    carYear: "",
    carMake: "",
    carModel: "",
    note: "",
  });
  const [authLink, setAuthLink] = useState("");

  useEffect(() => {
    async function fetchUserSession() {
      try {
        console.log('[Checkout] Fetching user session from /getJWT...');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/getJWT`,
          { withCredentials: true }
        );

        console.log('[Checkout] /getJWT response:', response.data);
        console.log('[Checkout] Full response:', response);

        const { userId, accessToken, refreshToken, locationId } = response.data;

        console.log('[Checkout] Extracted - userId:', userId);
        console.log('[Checkout] Extracted - locationId:', locationId);

        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        if (locationId) {
          sessionStorage.setItem("locationId", locationId);
          console.log('[Checkout] Stored locationId in sessionStorage:', locationId);
        } else {
          console.warn('[Checkout] WARNING: locationId is null/undefined from backend!');
        }

        setIsCurrUser(true);
      } catch (err) {
        console.error(
          `There was an error fetching user session: ${err.message}`,
        );
        setIsCurrUser(false);
      }
    }

    async function generateToken() {
      try {
        const generatedToken = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/generateToken`,
        );
        setAuthLink(generatedToken.data.url);
      } catch (err) {
        console.error(
          `There was an error grabbing the generateToken endpoint: ${err.message}`,
        );
      }
    }

    function extractAuthParamsFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const hasJwtParam = params.has("jwt");

      if (hasJwtParam) {
        const jwt = params.get("jwt");
        console.log("Extracted JWT from URL:", jwt);
        localStorage.setItem("jwt", jwt);
        window.history.replaceState({}, "", "/checkout");
        return true;
      }
      return false;
    }

    const hasUrlParams = extractAuthParamsFromUrl();
    
    // Always fetch user session - either from existing session or after OAuth redirect
    fetchUserSession();
    
    // Only generate new auth link if user is not signed in
    if (!hasUrlParams) {
      generateToken();
    }
  }, []);

  return (
    <div className="bg-white" id="root">
      <div className="mb-0 flex min-h-screen relative">
        <div className="flex flex-col flex-grow checkout-page">
          <div className="p-4">
            <h1>Checkout</h1>
          </div>
          <div className="flex justify-center flex-grow max-w-lg mx-auto">
            <form className="flex flex-col w-full items-center">
              <CheckoutTimer />

              <div className="flex md-lg:flex-row justify-between mt-8 w-full items-start gap-6">
                <CheckoutForm
                  isCurrUser={isCurrUser}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
                <aside className="checkout-desktop-cart hidden md-lg:flex flex-col w-full max-w-[340px] shrink-0">
                  <CheckoutCart
                    userInfo={userInfo}
                    BookAppointment={BookAppointment}
                    authLink={authLink}
                  />
                </aside>
              </div>
            </form>
          </div>
          
          {cartItems.length > 0 && (
            <div className="mobile-cart-container">
              <div
                className={`mobile-checkout-cart ${mobileCartOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="w-full px-4 py-3 flex items-center justify-between bg-white border-t border-gray-200"
                  onClick={() => setMobileCartOpen(!mobileCartOpen)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">
                      {labels.bookings.appointmentSummary}
                    </span>
                    <span className="text-sm text-core-text-20">
                      ${calculateItemsTotal()} ・ {cartItems.length} {cartItems.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileCartOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                
                <div className={`mobile-cart-content bg-white px-4 pb-4 ${mobileCartOpen ? 'block' : 'hidden'}`}>
                  <div className="border border-solid border-black/[.05] rounded-md mb-4">
                    <PackageItemList cartItems={cartItems} />
                    <CheckoutCartTotals />
                  </div>
                  <Button
                    className="button w-full"
                    onClick={async () => {
                      setIsBooking(true);
                      try {
                        await BookAppointment(userInfo, navigate);
                      } finally {
                        setIsBooking(false);
                      }
                    }}
                    label={isBooking ? "Booking..." : labels.checkout.bookApt}
                    disabled={isBooking}
                  />
                </div>
              </div>

              <MobileMenu mobileToggle={mobileToggle} setMobileToggle={setMobileToggle}>
                <div className="border border-solid border-black/[.05] rounded-md mb-4">
                  <PackageItemList cartItems={cartItems} />
                  <CheckoutCartTotals />
                </div>
                <Button
                  className="button w-full"
                  onClick={async () => {
                    setIsBooking(true);
                    try {
                      await BookAppointment(userInfo, navigate);
                    } finally {
                      setIsBooking(false);
                    }
                  }}
                  label={isBooking ? "Booking..." : labels.checkout.bookApt}
                  disabled={isBooking}
                />
              </MobileMenu>
            </div>
          )}
          
          <Footer />
        </div>
      </div>
    </div>
  );
}
