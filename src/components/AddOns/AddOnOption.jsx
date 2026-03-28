import { handleOnOptionSelect } from "./handleOnOptionSelect";
import { useState, useEffect, useContext } from "react";
import { removeAddOn } from "./removeAddOn";
import { useNavigate } from "react-router";
import { CartContext } from "../../context/CartContext";

export default function AddOnOption({
  optionName,
  optionPrice,
  className,
  addOnOption,
  setAddOnOption,
  optionId,
  id,
  findPackage,
}) {
  const { cartItems } = useContext(CartContext);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isOptionInCart = async () => {
      const addOns = await cartItems[0]?.addOns;
      return addOns?.find((addOn) => addOn.optionName === optionName) ? true : false;
    };
    isOptionInCart().then((result) => {
      setIsChecked(result);
    });
  }, [cartItems, optionName]);

  let modifiers;
  let isDisabled;

  if (findPackage.modifiers) {
    modifiers = findPackage.modifiers.filter((modifier) => {
      if (modifier.modifierId === id) {
        return modifier;
      }
    })[0];

    isDisabled = modifiers.hiddenOnlineOverride === "YES" ? true : false;
  }

  return (
    <label
      aria-selected="true"
      id="option-form"
      htmlFor={optionName}
      className={`add-on-option option-form-container market-row has-slotted-control ${className}`}
    >
      <div className={`radio-label-container ${isDisabled ? "disabled" : ""}`}>
        <label slot="label">{optionName}</label>
        <span>${optionPrice}</span>
      </div>

      <input
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => {
          if (isChecked) {
            setIsChecked(false);
            removeAddOn({
              addOnItemName: optionName,
              navigate: navigate,
            });
          } else {
            setIsChecked(true);
            handleOnOptionSelect({
              isDisabled,
              optionName,
              optionPrice,
              optionId,
              addOnOption,
              setAddOnOption,
            });
          }
        }}
        type="checkbox"
        aria-label={optionName}
        name="options"
        id={optionName}
      />
    </label>
  );
}
