import Footer from "../../components/Footer";
import CheckoutCart from "../../components/Checkout/CheckoutCart/CheckoutCart";
import { labels } from "../../static/labels";
import "./checkout.css";
import CheckoutTimer from "../../components/Checkout/CheckoutCart/CheckoutTimer";
import CheckoutForm from "../../components/Checkout/CheckoutForm/CheckoutForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { BookAppointment } from "../../hooks/BookAppointment";

export default function Checkout() {
  const [isCurrUser, setIsCurrUser] = useState(false);
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
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/getJWT`,
          { withCredentials: true }
        );

        const { userId, accessToken, refreshToken } = response.data;

        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);

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
      const jwt = params.get("jwt");
      const userId = params.get("userId");

      if (jwt && userId) {
        console.log("Extracted auth params from URL:");
        console.log("JWT:", jwt);
        console.log("UserId:", userId);

        sessionStorage.setItem("jwt_token", jwt);
        sessionStorage.setItem("userId", userId);
        setIsCurrUser(true);

        window.history.replaceState({}, "", "/checkout");
        return true;
      }
      return false;
    }

    const hasUrlParams = extractAuthParamsFromUrl();
    if (!hasUrlParams) {
      fetchUserSession();
    }
    generateToken();
  }, []);

  return (
    <div className="bg-white" id="root">
      <div className="mb-0 flex min-h-screen relative">
        <div className="flex flex-col flex-grow">
          <div className="p-4">
            <h1>Checkout</h1>
          </div>
          <div className="flex justify-center flex-grow w-full max-w-lg mx-auto">
            <form className="flex flex-col w-full items-center">
              <CheckoutTimer />

              <aside className="flex justify-between mt-8 w-full items-start">
                <CheckoutForm
                  isCurrUser={isCurrUser}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
                <CheckoutCart
                  userInfo={userInfo}
                  BookAppointment={BookAppointment}
                  authLink={authLink}
                />
              </aside>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
