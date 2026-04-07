import { useEffect, useState } from "react";

export default function MobileHeader({ setToggleMobileView }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setToggleMobileView(false), 300); // Wait for exit animation
  };

  const handleBackdropClick = (event) => {
    // Only close if clicking on the backdrop itself, not on the panel
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    // Trigger enter animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ease-in-out ${
        isVisible ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white w-150 h-full shadow-xl overflow-y-auto transform transition-all duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside panel from closing
      >
        <div className="p-4">
          <button
            onClick={handleClose}
            className="mb-4 p-2 bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.71004 18.71L12 13.41L17.29 18.71L18.71 17.29L13.41 12L18.71 6.71004L17.29 5.29004L12 10.59L6.71004 5.29004L5.29004 6.71004L10.59 12L5.29004 17.29L6.71004 18.71Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-black pb-4 border-b">
            Supreme Nomads Detailing
          </h2>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-b transition-all duration-200 hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-sm text-black">Location</h3>
                <p className="text-sm text-gray-500">We'll come to you!</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border-b transition-all duration-200 hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-sm text-black">Phone</h3>
                <p className="text-sm text-gray-500">(704) 561-1927</p>
              </div>
              <a
                href="tel:(704) 561-1927"
                className="p-2 bg-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.19801 2.3125L11.7949 7.9094L9.48262 10.2217C10.7195 11.7795 12.1639 13.2282 13.719 14.4706L16.0375 12.152L21.6944 17.8089L18.6623 20.841C18.0175 21.4858 17.0714 21.8439 16.0997 21.6493C9.50577 20.3287 3.67823 14.5011 2.35763 7.90718C2.16302 6.93545 2.52115 5.98935 3.16593 5.34458L6.19801 2.3125Z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center justify-between p-3 border-b transition-all duration-200 hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-sm text-black">Hours</h3>
                <p className="text-sm text-gray-500">Open until 5:00 PM</p>
              </div>
              <button
                className="p-2 bg-gray-100 rounded-lg rounded-2xl transition-all duration-200 hover:bg-gray-200"
                style={{ borderRadius: "0.5rem" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mx-auto"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border-b transition-all duration-200 hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-sm text-black">Follow</h3>
              </div>
              <a
                href="/"
                rel="noopener"
                className="p-2 bg-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79.37L10 12.5V19.93zM11 12.5L8.21 9.37c.58-.16 1.17-.37 1.79-.37 3.08 0 5.93 1.58 7.55 4.13L11 12.5zm1 0l6.55 1.63C16.93 16.42 14.08 18 11 18v-5.5zm0-1V6c3.08 0 5.93 1.58 7.55 4.13L12 11.5zm-1 0L4.45 9.87C6.07 7.32 8.92 6 12 6c.62 0 1.21.08 1.79.21L11 11.5z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center justify-between p-3 transition-all duration-200 hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-sm text-black">Text us</h3>
                <p className="text-sm text-gray-500">
                  We'll reply as soon as we can
                </p>
              </div>
              <button
                className="p-2 bg-gray-100 rounded-lg rounded-2xl transition-all duration-200 hover:bg-gray-200"
                style={{ borderRadius: "0.5rem" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.279 1.35742C14.0938 1.35742 11.5117 3.93951 11.5117 7.12467C11.5117 8.05977 11.735 8.94493 12.1314 9.72763L11.0004 13.4032L14.676 12.2723C15.4587 12.6687 16.3439 12.8919 17.279 12.8919C20.4641 12.8919 23.0462 10.3098 23.0462 7.12467C23.0462 3.93951 20.4641 1.35742 17.279 1.35742Z" />
                  <path d="M9 5.35742C7.89543 5.35742 7 6.25285 7 7.35742V19.3574C7 20.462 7.89543 21.3574 9 21.3574H15C16.1046 21.3574 17 20.462 17 19.3574V14.8574H19V19.3574C19 21.5666 17.2091 23.3574 15 23.3574H9C6.79086 23.3574 5 21.5666 5 19.3574V7.35742C5 5.14828 6.79086 3.35742 9 3.35742H10V5.35742H9Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 text-left font-medium hover:shadow-sm hover:translate-x-1">
              My account
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M11.7071 7.29285C12.0976 7.68337 12.0976 8.31654 11.7071 8.70706L5.70711 14.7071L4.29289 13.2928L9.58579 7.99995L4.29289 2.70706L5.70711 1.29285L11.7071 7.29285Z" />
              </svg>
            </button>

            <a
              href="https://app.squareup.com/logout?app=appointments&return_to=https://book.squareup.com/appointments/bvvj6fvmjuosjt/location/LP3QWMTHKC1DJ/services"
              className="block w-full p-3 text-center text-sm underline text-gray-600 hover:text-gray-800 transition-all duration-200 hover:bg-gray-50 rounded-lg"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
