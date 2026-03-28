import { labels } from "../../static/labels";
import CollapsedPackage from "./CollapsedPackage";
import { PackageSession } from "../../middleware/packageContext";
import { useContext } from "react";
import { packageNameCamelCase } from "../../hooks/packageNameCamelCase";

export default function CollapsedPackageList() {
  const { packages } = useContext(PackageSession);

  if (packages && packages.length) {

    return (
      <section
        aria-label="Main content"
        className="transition-opacity delay-150 duration-500 ease-in-out opacity-100 flex flex-col w-full px-4 md-lg:max-w-main-content "
      >
        <div data-testid="services-page" className="flex-col">
          <h2 className="sr-only">Services</h2>

          {packages.map((packageService) => {
            if (
              packageService &&
              packageService.descriptionPlaintext &&
              (packageService.name !== "Ceramic Coating" && packageService.name !== "Front Bumper Installation" && packageService.name !== "Rear Bumper Installation")
            ) {
              const camelCasedPackageName = packageNameCamelCase({
              packageName: packageService.name,
            });
              const splitDescriptionText =
                packageService.descriptionPlaintext.split("\n");
              const packagePrice = labels.packages[camelCasedPackageName].price;
              const packageTimeAlloted =
                labels.packages[camelCasedPackageName].timeAlloted;
              return (
                <CollapsedPackage
                  key={packageService.name}
                  packageRedirectLink={camelCasedPackageName}
                  packageName={packageService.name}
                  packageFirstService={splitDescriptionText[0]}
                  packageSecondService={splitDescriptionText[1]}
                  packagePrice={packagePrice}
                  packageTimeAlloted={packageTimeAlloted}
                />
              );
            }
          })}
        </div>
      </section>
    );
  }
}
