import { labels } from "../static/labels";
import { packageNameCamelCase } from "./packageNameCamelCase";

export function updatePackage({ packageOption, packageName, navigate, cartItems, setCartItems }) {  

  if (packageOption) {
    const updatedCartPackageOption = cartItems.map((item) => {
      if (item.packageName === packageName) {
        item.packageOption = packageOption;
        return item;
      } else {
        return item;
      }
    });
    setCartItems(updatedCartPackageOption);
  }

  if (packageName !== "Ceramic Coating") {
    return navigate(
      `/${packageNameCamelCase({ packageName: packageName })}${labels.links.addOnsLink}`,
    );
  } else {
    return navigate(`${labels.links.appointmentsLink}`);
  }
}
