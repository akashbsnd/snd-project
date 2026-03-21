import { labels } from "../../static/labels";
import CartHero from "./CartHero";
import CartArrowButton from "./CartArrowButton";
import PackageItemList from "./PackageItemList";
import { useState } from "react";

export default function Cart() {
  const [togglePackageItemList, setTogglePackageItemList] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };
  return (
    <>
      {cartItems.length ? (
        <div data-testid="desktop-cart" className="flex flex-col">
          <h2 className="mb-4 heading-20">
            {labels.bookings.appointmentSummary}
          </h2>

          <div className="desktop-cart mb-4 border border-solid border-black/[.05] rounded-md">
            <div
              data-testid="cart-accordion-label"
              className={`${
                togglePackageItemList ? "" : "cart-header"
              } px-4 my-4 flex items-center`}
            >
              <CartHero />

              <CartArrowButton
                togglePackageItemList={togglePackageItemList}
                setTogglePackageItemList={setTogglePackageItemList}
              />
            </div>

            {togglePackageItemList ? "" : <PackageItemList />}
          </div>
        </div>
      ) : (
        <div className="p-4">{labels.bookings.noServicesAddedYet}</div>
      )}
    </>
  );
}
