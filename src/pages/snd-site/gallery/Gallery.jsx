import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../css/vendor.css";
import "swiper/css";
import Logo from "../images/horizontal-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "./Gallery.css";

export default function Gallery() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_500,h_500/v1754362192/gal1_uc2v15.png",
      largeSrc:
        "https://res.cloudinary.com/dnsc73sla/image/upload/v1754362192/gal1_uc2v15.png",
      title: "Porsche Macan",
      category: "polish",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_500,h_500/v1754361140/gal4_ulohwf.png",
      largeSrc:
        "https://res.cloudinary.com/dnsc73sla/image/upload/v1754361140/gal4_ulohwf.png",
      title: "Jeep Grand Cherokee",
      category: "express",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_500,h_500/v1754184608/gal1_rtpi1d.png",
      largeSrc:
        "https://res.cloudinary.com/dnsc73sla/image/upload/v1754184608/gal1_rtpi1d.png",
      title: "Lexus ES 350",
      category: "express",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_500,h_500/v1754182837/lp2_pyi66n.png",
      largeSrc:
        "https://res.cloudinary.com/dnsc73sla/image/upload/v1754182837/lp2_pyi66n.png",
      title: "Honda Civic Si",
      category: "polish",
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_500,h_500/v1754359599/lp8_fxd3br.png",
      largeSrc:
        "https://res.cloudinary.com/dnsc73sla/image/upload/v1754359599/lp8_fxd3br.png",
      title: "Mercedes G Wagon",
      category: "polish",
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_500,h_500/v1754364681/lp5_arc7pw.png",
      largeSrc:
        "https://res.cloudinary.com/dnsc73sla/image/upload/v1754364681/lp5_arc7pw.png",
      title: "BMW X3",
      category: "express",
    },
  ];

  // Event handlers
  const openFacebook = (event) => {
    event.preventDefault();
    window.open("https://www.facebook.com/Supremenomads/", "_blank");
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };
  
  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleKeyDown = (event) => {
    if (!isLightboxOpen) return;

    switch (event.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        goToPrevious();
        break;
      case "ArrowRight":
        goToNext();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Load external CSS
    const swiperCSS = document.createElement("link");
    swiperCSS.rel = "stylesheet";
    swiperCSS.href =
      "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
    document.head.appendChild(swiperCSS);

    // AOS CSS
    const aosCSS = document.createElement("link");
    aosCSS.rel = "stylesheet";
    aosCSS.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
    document.head.appendChild(aosCSS);

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

    // Load jQuery first (required for many scripts)
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-1.11.0.min.js";
    jqueryScript.async = true;
    document.body.appendChild(jqueryScript);

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
        document.body.removeChild(jqueryScript);
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

  // Keyboard event listener for lightbox
  useEffect(() => {
    const handleKeyDownGlobal = (event) => {
      handleKeyDown(event);
    };

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDownGlobal);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, [isLightboxOpen, currentImageIndex]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const navbar = document.querySelector(".navbar.fixed-top");

      // Only apply scroll effect on larger screens (xl and above)
      const isLargeScreen = window.innerWidth >= 1200;

      if (navbar && isLargeScreen) {
        if (scroll >= 200) {
          navbar.classList.add("bg-black");
        } else {
          navbar.classList.remove("bg-black");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
              <div className="d-flex align-items-center ms-auto mt-3 mt-xl-0">
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

      {/* Hero */}
      <section className="hero-section hero-gallery">
        <div className="container py-5">
          <div className="row py-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center my-5 py-5 text-white">
              <h2 className="page-title display-3 mt-5 text-white">Gallery</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="pb-5">
        <div className="container mb-3 py-5">
          <h2 className="display-4 text-center mb-5">Explore Our Work</h2>
          <div className="isotope-container">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="col-12 col-sm-6 col-md-4"
                style={{ padding: "0 15px", marginBottom: "30px" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                    borderRadius: "10px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    backgroundColor: "#000",
                  }}
                  onClick={() => openLightbox(image.id - 1)}
                >
                  {/* Test: Direct image tag with minimal styling */}
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* Simple overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = "1")}
                    onMouseLeave={(e) => (e.target.style.opacity = "0")}
                  >
                    <h3
                      style={{
                        color: "white",
                        margin: "0",
                        textAlign: "center",
                      }}
                    >
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center pb-5 mb-5 social-media-button-container">
          <div className="social-button-wrapper">
            <a
              href="https://www.instagram.com/supremenomads"
              target="_blank"
              rel="noopener noreferrer"
              className="gallerySocials btn btn-primary"
            >
              Explore Our Instagram
            </a>
          </div>
          <div className="social-button-wrapper">
            <a
              href="https://www.tiktok.com/@supremenomads704"
              target="_blank"
              rel="noopener noreferrer"
              className="gallerySocials btn btn-primary mt-3"
            >
              Explore Our Tiktok
            </a>
          </div>
        </div>
      </section>

      {/* YouTube Embed */}
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/BnKc-n4MM9c?si=5RnSswOmSIbUd_1a"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <Footer />

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 9999 }}
          onClick={closeLightbox}
        >
          {/* Previous Button - Outside Image */}
          <button
            className="position-absolute top-50 start-0 translate-middle-y text-white border-0 bg-transparent"
            style={{
              zIndex: 10001,
              left: "2rem",
              fontSize: "3rem",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <iconify-icon icon="mdi:chevron-left" />
          </button>

          {/* Image */}
          <div
            className="position-relative"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          >
            <img
              src={galleryImages[currentImageIndex].largeSrc}
              alt={galleryImages[currentImageIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />

            {/* Image Info */}
            <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white p-3">
              <h5 className="mb-0">{galleryImages[currentImageIndex].title}</h5>
            </div>
          </div>

          {/* Next Button - Outside Image */}
          <button
            className="position-absolute top-50 end-0 translate-middle-y text-white border-0 bg-transparent"
            style={{
              zIndex: 10001,
              right: "2rem",
              fontSize: "3rem",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <iconify-icon icon="mdi:chevron-right" />
          </button>
        </div>
      )}
    </>
  );
}
