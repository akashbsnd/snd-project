import { labels } from "../../../static/labels";
import CheckoutFormPhone from "./CheckoutFormPhone";
import CheckoutUserDataInput from "./CheckoutUserDataInput";

export default function CheckoutInfoSection({ handleChange }) {
  return (
    <div
      className="grid grid-cols-2 gap-2"
      data-testid="customer-information-form"
    >
      <CheckoutFormPhone handleChange={handleChange} />

      <CheckoutUserDataInput
        label={labels.checkout.firstName}
        htmlForId={"firstName"}
        type={"text"}
        handleChange={handleChange}
      />

      <CheckoutUserDataInput
        label={labels.checkout.lastName}
        htmlForId={"lastName"}
        type={"text"}
        handleChange={handleChange}
      />

      <CheckoutUserDataInput
        label={labels.checkout.email}
        htmlForId={"email"}
        type={"email"}
        handleChange={handleChange}
        className={"col-span-2"}
      />
    </div>
  );
}
