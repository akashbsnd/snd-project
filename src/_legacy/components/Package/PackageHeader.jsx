import { labels } from "../../static/labels";
import { useState } from "react";
import MobileHeader from "./mobileHeader";

export default function PackageHeader() {
  const [toggleMobileView, setToggleMobileView] = useState(false);

  return (
    <header className="flex items-center py-2 pl-4 pr-2 mb-2 justify-between">
      <a className="!text-black" href={labels.links.homeLink}>
        <img
          className="rounded-xl object-contain h-12"
          aria-hidden="true"
          src="https://seller-brand-assets-f.squarecdn.com/ML22SA78W688X/03849d2363963a8e996df8f711f242d0.png?height=250"
        />
        <h1 className="sr-only">{labels.services.SupremeNomadsDetailing}</h1>
      </a>
      <button
        className="p-0 bg-transparent border-none cursor-pointer"
        aria-label="Menu"
      >
        <svg
          data-testid="menu-hamburger"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          role="presentation"
          className="!text-black h-auto w-auto p-2"
          aria-hidden="true"
          onClick={() => setToggleMobileView(true)}
          style={{ style: "color: var(--color-ultra-dark)" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6ZM2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12ZM3 17C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H3Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {toggleMobileView && (
        <MobileHeader setToggleMobileView={setToggleMobileView} />
      )}
    </header>
  );
}
