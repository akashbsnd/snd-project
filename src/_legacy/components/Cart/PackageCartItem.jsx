import {
  packageNameCamelCase,
  getPackageBaseUrl,
} from "../../hooks/packageNameCamelCase";
import RenderAddOnsCart from "../AddOns/RenderAddOnsInCart";

export default function PackageCartItem({
  packageName,
  optionName,
  optionPrice,
  addOns,
}) {
  return (
    <div data-testid="service-staff-row" className="packageCartItem flex-col">
      <div className="relative flex flex pl-0 mb-3">
        <div className="flex relative items-center grow">
          <div className="flex flex-col flex-grow gap-0.5 text-core-text-20 text-sm font-normal">
            <span className="text-black text-base font-medium overflow-wrap-anywhere">
              {packageName}
            </span>
            <span>{optionName}</span>
          </div>
          <div className="text-base font-normal ml-4 ">${optionPrice}</div>

          <a
            href={getPackageBaseUrl({ packageName })}
            aria-label={`Edit selection: ${packageName}`}
            data-testid="edit-service"
            className="ml-4 flex market-link"
            hydrated=""
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 4.17188C17.72 4.17188 18.45 4.45187 19 5.00187C20.1 6.10187 20.1 7.90188 19 9.00187L17 11.0019L8 20.0019H4V16.0019L13 7.00187L15 5.00187C15.55 4.45187 16.28 4.17188 17 4.17188ZM17.01 6.17188C16.88 6.17188 16.63 6.20187 16.42 6.41187L15.84 7.01188L17.01 8.18187L17.6 7.59188C17.81 7.37188 17.84 7.13188 17.84 7.00187C17.84 6.87187 17.82 6.62187 17.6 6.41187C17.38 6.20187 17.14 6.17188 17.01 6.17188ZM6 18.0019H7.17L15.58 9.59188L14.41 8.42188L6 16.8319V18.0019ZM12 18.002H20V20.002H12V18.002Z"
                fill="black"
                fillOpacity="0.42"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <RenderAddOnsCart addOns={addOns} />
    </div>
  );
}
