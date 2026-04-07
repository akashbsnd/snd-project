import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Booking.css";

const URABLE_VIRTUAL_SHOP_URL = import.meta.env.VITE_URABLE_VIRTUAL_SHOP_URL;

export default function Booking() {
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = "Book Now | Supreme Nomads Detailing";
  }, []);

  if (!URABLE_VIRTUAL_SHOP_URL) {
    return (
      <>
        <Header />
        <main className="booking-page">
          <div className="booking-placeholder">
            <h1>Online Booking Coming Soon</h1>
            <p>
              We're setting up our online booking system. In the meantime, you
              can reach us directly to schedule your appointment.
            </p>
            <div className="booking-contact-options">
              <a href="tel:+17045611927" className="booking-contact-btn">
                <span>Call Us</span>
                <span>(704) 561-1927</span>
              </a>
              <a
                href="https://www.instagram.com/supremenomads"
                target="_blank"
                rel="noopener noreferrer"
                className="booking-contact-btn"
              >
                <span>DM on Instagram</span>
                <span>@supremenomads</span>
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="booking-page">
        <iframe
          ref={iframeRef}
          src={URABLE_VIRTUAL_SHOP_URL}
          title="Book an appointment with Supreme Nomads Detailing"
          className="booking-iframe"
          allow="payment"
          loading="lazy"
        />
      </main>
      <Footer />
    </>
  );
}
