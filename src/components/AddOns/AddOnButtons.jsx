import { useNavigate } from "react-router";
import { labels } from "../../static/labels";
import { updateModifier } from "./AddModifier";
import Button from "../Button";
import { packageNameCamelCase } from "../../hooks/packageNameCamelCase";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function AddButtons({ packageName, addOnOption }) {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  return (
    <div className="package-button-container">
      <a className="button remove-button flex items-center justify-center"
        href={`/${packageNameCamelCase({ packageName })}`}>
        <Button
          label={labels.services.backButton}
        >
        </Button></a>

      <Button
        className="button"
        onClick={() =>
          updateModifier({ packageName, addOnItems: addOnOption, navigate, cartItems, setCartItems })
        }
        label={labels.services.updateButton}
      />
    </div>
  );
}
