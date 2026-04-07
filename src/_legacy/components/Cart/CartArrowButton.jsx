import Button from "../Button";

export default function CartArrowButton({
  togglePackageItemList,
  setTogglePackageItemList,
}) {
  if (togglePackageItemList) {
    return (
      <Button
        onClick={() => setTogglePackageItemList(false)}
        className="inner-tag ml-2 rounded-full bg-gray-100 text-black w-8 h-8 flex items-center justify-center shrink-0 market-button cursor-pointer"
        type="button"
        aria-label="Expand"
        label={
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.70703 7.70711C7.31651 8.09763 6.68334 8.09763 6.29282 7.70711L0.292818 1.70711L1.70703 0.292892L6.99992 5.58579L12.2928 0.292893L13.707 1.70711L7.70703 7.70711Z"
              fill="black"
              fillOpacity="0.9"
            ></path>
          </svg>
        }
      ></Button>
    );
  } else {
    return (
      <Button
        onClick={() => setTogglePackageItemList(true)}
        aria-label="Collapse cart"
        rank="primary"
        data-testid="toggle-cart-button"
        className="ml-2 rounded-full bg-gray-100 text-black w-8 h-8 flex items-center justify-center shrink-0 market-button cursor-pointer"
        size="medium"
        type="button"
        variant="regular"
        hydrated=""
        label={
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 0.585786C6.89052 0.195262 7.52369 0.195262 7.91421 0.585786L13.9142 6.58579L12.5 8L7.20711 2.70711L1.91421 8L0.5 6.58579L6.5 0.585786Z"
              fill="black"
              fillOpacity="0.9"
            ></path>
          </svg>
        }
      ></Button>
    );
  }
}
