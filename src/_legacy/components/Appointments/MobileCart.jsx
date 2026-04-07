export default function MobileCart() {
  return (
    <aside
      id="mobile-cart"
      data-testid="mobile-cart"
      className="mobile-cart md-lg:hidden z-below-market-context-manager absolute inset-x-0 bottom-0 bg-white shadow-[0_-4px_30px_-10px_rgba(0,0,0,0.3)] rounded-t-3xl max-h-full flex flex-col"
    >
      <div
        data-testid="cart-accordion-label"
        className="cart-header px-4 my-4 flex items-center"
      >
        <div className="flex-grow flex-col overflow-wrap-anywhere">
          <div className="line-clamp-3 font-semibold">2 services</div>
          <div className="text-sm text-core-text-20">$775.00 ・ 7 hr</div>
        </div>
        <market-button
          aria-label="Expand cart"
          rank="primary"
          data-testid="toggle-cart-button"
          className="ml-2 rounded-full bg-gray-100 text-black w-8 h-8 flex items-center justify-center shrink-0 market-button"
          size="medium"
          type="button"
          variant="regular"
          hydrated=""
        >
          <template shadowrootmode="open">
            <button
              className="inner-tag"
              type="button"
              aria-label="Expand cart"
            >
              <slot name="icon"></slot>
              <span className="button-text" part="button-text">
                <slot></slot>
              </span>
            </button>
          </template>
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
        </market-button>
      </div>
    </aside>
  );
}
