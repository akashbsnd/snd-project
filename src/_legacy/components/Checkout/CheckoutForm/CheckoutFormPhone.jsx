import { labels } from "../../../static/labels";
import Button from "../../Button";

export default function CheckoutFormPhone({ handleChange }) {
  return (
    <>
      <div className="col-span-2 relative">
        <div className="flex justify-between items-center gap-2">
          <Button
            className="market-button mr-1 market-accessory"
            label={
              <>
                <span className="text-3xl">🇺🇸</span>
                <span
                  className="ml-3 text-black font-medium text-base pointer-events-none"
                  aria-label="Calling code"
                >
                  +1
                </span>
              </>
            }
          />

          <div className="field">
            <input
              name={"phone"}
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              id="phoneNumber"
              placeholder=" "
              required
            />
            <label htmlFor="phoneNumber">{labels.checkout.phoneNumber}</label>
          </div>
        </div>
      </div>

      <div className="col-span-2  paragraph-10">
        <div className="textConsent mt-2 text-subtext leading-4 line-clamp-2 md-lg:line-clamp-none">
          {labels.checkout.textConsent}
        </div>
      </div>
    </>
  );
}
