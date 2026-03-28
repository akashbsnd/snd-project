import { labels } from "../../static/labels";
import PackageNav from "../../components/Package/PackageNav";
import PackageList from "../../components/Package/PackageList";
import PackageButtons from "../../components/Package/PackageButtons";
import PackageServiceList from "../../components/Package/PackageServiceList";
import "./Package.css";
import { useState } from "react";
import Footer from "../../components/Footer";

export default function Package({
  packageName,
  packagePrice,
  packageTimeAlloted,
  packageFeatureList,
  packageOptionList,
  packageVersion,
}) {
  const [packageOption, setPackageOption] = useState(null);
  /*
  Add verbage to scheduling page:
  need service sooner than the available time slots? Call us (link to phone number) for additional availability.
  */

  return (
    <div className="packageContainer mb-0 flex w-screen max-h-screen-svh min-h-screen-svh h-full overflow-hidden relative">
      <div className="flex flex-col flex-grow overflow-y-auto">
        <div className="p-4">
          <h1>Book a Service</h1>
        </div>
        <div className="flex justify-center flex-grow w-full max-w-lg mx-auto">
          <div className="w-full">
            <div className="flex justify-center h-full">
              <section
                aria-label="Main content"
                className="transition-opacity delay-150 duration-500 ease-in-out opacity-100 flex flex-col w-full px-4 md-lg:max-w-main-content flex-grow justify-between sm:justify-normal"
              >
                <PackageNav packageNavName={packageName} />

                {/* Body */}
                <div className="h-full sm:h-auto">
                  <h2 className="mb-2 overflow-wrap-anywhere">{packageName}</h2>
                  <div>
                    <div
                      className="paragraph-20 mb-2 flex flex-col"
                      data-testid="variation-details-summary"
                    >
                      <span>
                        {packagePrice} ・ {packageTimeAlloted}
                      </span>
                    </div>

                    <PackageServiceList
                      packageFeatureList={packageFeatureList}
                    />

                    {/* Options & Buttons */}
                    <div className="mt-8 mb-4">
                      <h3 className="mb-1" slot="compact">
                        {labels.services.options}
                      </h3>

                      <span id="noOptionSelected"></span>

                      <PackageList
                        packageOption={packageOption}
                        packageName={packageName}
                        setPackageOption={setPackageOption}
                        packageOptionList={packageOptionList}
                      />

                      <PackageButtons
                        packageVersion={packageVersion}
                        packageName={packageName}
                        packageOption={packageOption}
                        packagePrice={packagePrice}
                        packageTimeAlloted={packageTimeAlloted}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
