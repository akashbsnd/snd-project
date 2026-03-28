import { addPackage } from "../../hooks/addPackage";
import { removePackage } from "../../hooks/removePackage";
import { updatePackage } from "../../hooks/updatePackage";
import { checkForDupPackages } from "../../hooks/checkForDupPackages";
import { labels } from "../../static/labels";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function PackageButtons({
  packageName,
  packageVersion,
  packageOption,
  packagePrice,
  packageTimeAlloted,
}) {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  return checkForDupPackages({ packageName }) ? (
    <div className="package-button-container">
      <button
        className="button remove-button"
        onClick={() => removePackage({ packageName, navigate, cartItems, setCartItems })}
      >
        {labels.services.removeButton}
      </button>
      <button
        className="button"
        onClick={() => updatePackage({ packageOption, packageName, navigate })}
      >
        {labels.services.updateButton}
      </button>
    </div>
  ) : (
    <div className="package-button-container">
      <button className="button remove-button">
        <a href="/bookings">{labels.services.backButton}</a>
      </button>
      <button
        className="button"
        onClick={() =>
          addPackage({
            packageName,
            packageVersion,
            packagePrice,
            packageTimeAlloted,
            packageOption,
            navigate,
            setCartItems,
          })
        }
      >
        {labels.services.addButton}
      </button>
    </div>
  );
}
