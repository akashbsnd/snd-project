import CheckoutUserDataInput from "./CheckoutUserDataInput";
import { labels } from "../../../static/labels";

export default function CheckoutLocationForm({ handleChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 separator">
      <CheckoutUserDataInput
        label={labels.checkout.address}
        htmlForId={"streetAddress"}
        type={"text"}
        handleChange={handleChange}
        className={"col-span-2"}
      />

      <CheckoutUserDataInput
        label={labels.checkout.aptSuite}
        htmlForId={"aptSuite"}
        type={"text"}
        handleChange={handleChange}
        className={"col-span-2"}
      />

      <CheckoutUserDataInput
        label={labels.checkout.city}
        htmlForId={"city"}
        type={"text"}
        handleChange={handleChange}
        className={"col-span-2"}
      />

      <CheckoutUserDataInput
        label={labels.checkout.state}
        htmlForId={"state"}
        type={"text"}
        handleChange={handleChange}
      />

      <CheckoutUserDataInput
        label={labels.checkout.zip}
        htmlForId={"zip"}
        type={"text"}
        handleChange={handleChange}
      />
    </div>
  );
}
