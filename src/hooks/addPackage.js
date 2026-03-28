import { labels } from "../static/labels";
import { packageNameCamelCase } from "./packageNameCamelCase";

export function addPackage({
  packageOption,
  packageName,
  packageVersion,
  packagePrice,
  packageTimeAlloted,
  navigate,
  setCartItems,
}) {
  if (!packageOption) {
    document.querySelector("#noOptionSelected").innerHTML =
      "&#x26A0; Please select an option.";
    throw new Error("Please select an option.");
  }

  const cart = [
    {
      addOns: [],
      packageName: packageName,
      packagePrice: packagePrice,
      packageTimeAlloted: packageTimeAlloted,
      packageOption: packageOption,
      packageVersion: packageVersion,
    },
  ];

  setCartItems(cart);

  return navigate(
    `/${packageNameCamelCase({ packageName: packageName })}${labels.links.addOnsLink}`,
  );
}
