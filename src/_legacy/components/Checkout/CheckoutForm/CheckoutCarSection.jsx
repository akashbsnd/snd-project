import CheckoutCarForm from "./CheckoutCarForm";
import { labels } from "../../../static/labels";

export default function CheckoutCarSection({ handleChange }) {
  return (
    <div className="mt-8 separator">
      <CheckoutCarForm
        className="mb-4"
        carLabel={labels.checkout.year}
        htmlForId={"carYear"}
        handleChange={handleChange}
      />

      <CheckoutCarForm
        className="mb-4"
        carLabel={labels.checkout.make}
        htmlForId={"carMake"}
        handleChange={handleChange}
      />

      <CheckoutCarForm
        className="mb-4"
        carLabel={labels.checkout.model}
        htmlForId={"carModel"}
        handleChange={handleChange}
      />
    </div>
  );
}
