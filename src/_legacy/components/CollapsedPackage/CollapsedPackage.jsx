import { labels } from "../../static/labels";
import { checkIfPackageAdded } from "../../hooks/checkIfPackageAdded";

export default function CollapsedPackage({
  packageRedirectLink,
  packageName,
  packageFirstService,
  packageSecondService,
  packagePrice,
  packageTimeAlloted,
}) {
  return (
    <div className="collapsedPackageHoverContainer">
      <div className="collapsedPackage">
        <a href={packageRedirectLink}>
          <label slot="label" className="overflow-wrap-anywhere">
            {packageName}
          </label>
          <div
            data-testid="service-row-description"
            className="flex flex-col items-start paragraph-20 text-ellipsis overflow-hidden line-clamp-2"
          >
            {packageFirstService && packageSecondService ? (
              <>
                <span>{packageFirstService}</span>
                <span>{packageSecondService}</span>
              </>
            ) : (
              ""
            )}
          </div>
          <p className="text-core-text-10">
            {packagePrice} ・ {packageTimeAlloted}
          </p>
          <p className="check-mark-added">
            {checkIfPackageAdded({ packageName }) ? (
              <>&#10003; {labels.bookings.added}</>
            ) : (
              ""
            )}
          </p>
        </a>
      </div>
    </div>
  );
}
