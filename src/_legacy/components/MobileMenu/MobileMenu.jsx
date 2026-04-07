import "./MobileMenu.css";
import { X, Menu } from "lucide-react";
import { useEffect, useRef } from "react";

export default function MobileMenu({ mobileToggle, setMobileToggle, children }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileToggle && menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileToggle, setMobileToggle]);

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileToggle(!mobileToggle)}
        aria-label={mobileToggle ? "Close menu" : "Open menu"}
      >
        {mobileToggle ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileToggle && (
        <div className="mobile-menu-overlay" onClick={() => setMobileToggle(false)} />
      )}

      <div
        ref={menuRef}
        className={`mobile-menu ${mobileToggle ? "open" : ""}`}
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button
            className="mobile-menu-close"
            onClick={() => setMobileToggle(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mobile-menu-content">
          {children}
        </div>
      </div>
    </>
  );
}
