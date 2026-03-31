import CollapsedPackageList from "../../components/CollapsedPackage/CollapsedPackageList";
import Cart from "../../components/Cart/Cart";
import "./Booking.css";
import Footer from "../../components/Footer";
import CartButtonsSection from "../../components/Cart/CartButtonsSection";
import Header from "../../components/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import { useState } from "react";

export default function Bookings() {
  const [mobileToggle, setMobileToggle] = useState(false);
  
  return (
    <div id="bookings">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-about">
        <div className="hero-overlay"></div>
        <div className="container py-5 hero-content">
          <div className="row py-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center my-5 py-5 text-white">
              <h2 className="page-title display-3 mt-5 text-white">Bookings</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white" id="root">
        <div className="mb-0 flex w-screen max-h-screen-svh min-h-screen-svh h-full overflow-hidden relative">
          <div className="flex flex-col flex-grow overflow-y-auto">

            <div className="flex justify-center flex-grow w-full max-w-lg mx-auto">
              {/* Package list */}
              <CollapsedPackageList />

              <aside className="transition-opacity delay-150 duration-500 ease-in-out opacity-100 hidden md-lg:block md-lg:px-4 max-w-cart-sidebar min-w-cart-sidebar ">
                <div className="sticky top-2">
                  <Cart />
                  <CartButtonsSection />
                </div>
              </aside>

              <MobileMenu mobileToggle={mobileToggle} setMobileToggle={setMobileToggle}>
                <Cart />
                <CartButtonsSection />
              </MobileMenu>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
