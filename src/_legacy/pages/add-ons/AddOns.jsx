import Footer from "../../components/Footer";
import { useContext, useState } from "react";
import {
  ModifierSession,
  PackageSession,
} from "../../middleware/packageContext";
import AddOnOption from "../../components/AddOns/AddOnOption";
import "./AddOn.css";
import AddOnButtons from "../../components/AddOns/AddOnButtons";
import Cart from "../../components/Cart/Cart";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

export default function AddOns({ packageName }) {
  const { modifiers } = useContext(ModifierSession);
  const { packages } = useContext(PackageSession);
  const [addOnOption, setAddOnOption] = useState([]);
  const [mobileToggle, setMobileToggle] = useState(false);

  const findPackage = packages.find(
    (packages) => packages.name === packageName,
  );

  return (
    <div className="bg-white" id="addOn">
      <div className="mb-0 flex w-screen max-h-screen-svh min-h-screen-svh h-full overflow-hidden relative">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            <h1>Choose an Add-on</h1>
          </div>
          <div className="flex justify-center flex-grow w-full max-w-lg mx-auto">
            <ul
              aria-multiselectable="false"
              className="flex flex-col justify-center flex-grow w-full max-w-lg mx-auto"
              aria-labelledby="service-variations-header"
            >
              {modifiers.map((addOn) => {
                return (
                  <AddOnOption
                    findPackage={findPackage}
                    id={addOn.id}
                    key={addOn.id}
                    optionName={addOn.name}
                    optionPrice={addOn.priceAmt}
                    optionId={addOn.id}
                    addOnOption={addOnOption}
                    setAddOnOption={setAddOnOption}
                  />
                );
              })}

              <AddOnButtons
                packageName={packageName}
                addOnOption={addOnOption}
              />
            </ul>

            <aside className="transition-opacity delay-150 duration-500 ease-in-out opacity-100 hidden md-lg:block md-lg:px-4 max-w-cart-sidebar min-w-cart-sidebar ">
              <div className="sticky top-2">
                <Cart />
              </div>
            </aside>

            <MobileMenu mobileToggle={mobileToggle} setMobileToggle={setMobileToggle}>
              <Cart />
            </MobileMenu>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
