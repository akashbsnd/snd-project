import "../css/vendor.css";
import "swiper/css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "./Academy.css";
import Logo from "../images/horizontal-logo.png";

const Academy = () => {
  const location = useLocation();

  const openFacebook = (event) => {
    event.preventDefault();
    window.open("https://www.facebook.com/Supremenomads/", "_blank");
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Load Iconify and Bootstrap
  useEffect(() => {
    // Load Bootstrap JS
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    // Load Swiper JS
    const swiperScript = document.createElement("script");
    swiperScript.src =
      "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js";
    swiperScript.async = true;
    document.body.appendChild(swiperScript);

    // Load AOS JS
    const aosScript = document.createElement("script");
    aosScript.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    aosScript.async = true;
    document.body.appendChild(aosScript);

    // Load Iconify
    const iconifyScript = document.createElement("script");
    iconifyScript.src =
      "https://cdn.jsdelivr.net/npm/iconify-icon@1.0.7/dist/iconify-icon.min.js";
    iconifyScript.async = true;
    document.body.appendChild(iconifyScript);

    // Google Fonts
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "";
    document.head.appendChild(preconnect2);

    const googleFonts = document.createElement("link");
    googleFonts.rel = "stylesheet";
    googleFonts.href =
      "https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Oswald:wght@500;600;700&display=swap";
    document.head.appendChild(googleFonts);

    // Load local scripts
    const modernizrScript = document.createElement("script");
    modernizrScript.src = "/snd-site/js/modernizr.js";
    modernizrScript.async = true;
    document.body.appendChild(modernizrScript);

    const pluginsScript = document.createElement("script");
    pluginsScript.src = "/snd-site/js/plugins.js";
    pluginsScript.async = true;
    document.body.appendChild(pluginsScript);

    const scriptScript = document.createElement("script");
    scriptScript.src = "/snd-site/js/script.js";
    scriptScript.async = true;
    document.body.appendChild(scriptScript);

    // Initialize AOS
    setTimeout(() => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: true,
        });
      }
    }, 1000);

    // Cleanup
    return () => {
      try {
        document.head.removeChild(swiperCSS);
        document.head.removeChild(aosCSS);
        document.head.removeChild(preconnect1);
        document.head.removeChild(preconnect2);
        document.head.removeChild(googleFonts);
        document.body.removeChild(bootstrapScript);
        document.body.removeChild(swiperScript);
        document.body.removeChild(aosScript);
        document.body.removeChild(iconifyScript);
        document.body.removeChild(modernizrScript);
        document.body.removeChild(pluginsScript);
        document.body.removeChild(scriptScript);
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add netlify integration or other submission logic here
  };

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const navbar = document.querySelector(".navbar.fixed-top");

      if (navbar) {
        if (scroll >= 200) {
          navbar.classList.add("bg-black");
        } else {
          navbar.classList.remove("bg-black");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    {/* Nav */}
      <nav className="navbar fixed-top navbar-expand-xl container-fluid p-sm-3 p-2">
        {/* Logo */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="logo" />
          </Link>

          {/* Mobile Layout */}
          <div className="d-flex align-items-center gap-3 d-xl-none">
            <a href="tel:+17045611927" className="text-white pt-2">
              <iconify-icon
                icon="ic:baseline-call"
                className="call-icon"
                style={{ fontSize: "1.5rem" }}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <iconify-icon
                icon="system-uicons:menu-hamburger"
                className="hamburger-menu"
              />
            </button>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header my-2 mx-3">
              <img
                src="/images/logo-gold-text.svg"
                alt="Supreme Nomads Detailing Logo"
                className="hamburger-logo"
              />
            </div>
            <div className="offcanvas-body">
              {/* Routes - centered */}
              <ul className="navbar-nav align-items-center justify-content-center flex-grow-1">
                <li className="nav-item">
                  <Link
                    className={`nav-link text-white text-uppercase fw-bold mx-2 px-1 mb-2 mb-lg-0 ${isActiveLink("/")}`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-white text-uppercase fw-bold mx-2 px-1 mb-2 mb-lg-0 ${isActiveLink("/gallery")}`}
                    to="/gallery"
                  >
                    Gallery
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-white text-uppercase fw-bold mx-2 px-1 mb-2 mb-lg-0 ${isActiveLink("/services")}`}
                    to="/services"
                  >
                    Our Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-white text-uppercase fw-bold mx-2 px-1 mb-2 mb-lg-0 ${isActiveLink("/about")}`}
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-white text-uppercase fw-bold mx-2 px-1 mb-2 mb-lg-0 ${isActiveLink("/academy")}`}
                    to="/academy"
                  >
                    Academy
                  </Link>
                </li>
              </ul>
              {/* Socials + Book Now - right aligned */}
              <div className="d-flex align-items-center ms-auto mt-3 mt-xl-0 socials-booknow-wrapper">
                <div className="d-flex align-items-center justify-content-center social-div">
                  <ul className="d-flex flex-row gap-2 list-unstyled mb-0 social-ul">
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center p-0 m-0"
                        href="tel:+17045611927"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          icon="ic:baseline-call"
                          className="social-icon text-white"
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center m-0 p-0"
                        href="https://www.tiktok.com/@supremenomads704"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          icon="ri:tiktok-fill"
                          className="social-icon text-white"
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center p-0 m-0"
                        href="https://www.instagram.com/supremenomads"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          icon="ri:instagram-line"
                          className="social-icon text-white"
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center p-0 m-0"
                        href="https://www.facebook.com/Supremenomads/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={openFacebook}
                      >
                        <iconify-icon
                          icon="ri:facebook-fill"
                          className="social-icon text-white"
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center p-0 m-0"
                        href="https://www.yelp.com/biz/supreme-nomads-detailing-charlotte"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          icon="mdi:yelp"
                          className="social-icon text-white"
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center p-0 m-0"
                        href="https://www.youtube.com/@SupremeNomads"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          icon="ri:youtube-fill"
                          className="social-icon text-white"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Book Now */}
                <div className="book-now-div">
                  <Link
                    to="/booking"
                    className="btn btn-primary book-now-btn w-100 w-xl-auto ms-0 ms-xl-3"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero-section hero-academy">
        <div className="hero-overlay"></div>

        <div className="container py-5 hero-content">
          <div className="row py-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center my-5 py-5 text-white">
              <h2 className="page-title display-3 mt-5 text-white text-center">
                Supreme Nomads Academy
              </h2>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          background: "#111",
          padding: "3rem 0",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>
          <iframe
            className="academy-iframe"
            src="https://app.urable.com/form/hws1GTjmzNePWUFsFmWJ/JoQVFvA5IeMA8DS2W8bh"
            scrolling="no"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            width="100%"
            title="Supreme Nomads Academy Form"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Academy;
