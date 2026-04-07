import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../css/vendor.css";
import "swiper/css";
import Logo from "../images/horizontal-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "./Home-Clean.css";
import "./Home-Clean-carousel.css";
import MediumTabPane from "../../../components/Home/MediumTabPane";

export default function Home() {
  const [activeTab, setActiveTab] = useState("regular-tab-pane");
  const [displayedImages, setDisplayedImages] = useState([]);
  const carouselRef = useRef(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Initialize displayed images
  useEffect(() => {
    // Original 6 images + first 3 duplicated for infinite scroll
    const originalImages = [
      {
        id: 1,
        title: "Audi R8",
        image:
          "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754182746/lp1_x8d33y.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto//v1754182746/lp1_x8d33y.png",
      },
      {
        id: 2,
        title: "Mercedes GLC 300",
        image:
          "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754182972/lp3_xmn6rm.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754182972/lp3_xmn6rm.png",
      },
      {
        id: 3,
        title: "Honda Civic Si",
        image:
          "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754182837/lp2_pyi66n.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754182837/lp2_pyi66n.png",
      },
      {
        id: 4,
        title: "Mercedes G Wagon",
        image:
          "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754359599/lp8_fxd3br.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754359599/lp8_fxd3br.png",
      },
      {
        id: 5,
        title: "BMW X3",
        image:
          "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754364681/lp5_arc7pw.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754364681/lp5_arc7pw.png",
      },
      {
        id: 6,
        title: "Tesla CyberTruck",
        image:
          "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754359771/lp6_f23yy3.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754359771/lp6_f23yy3.png",
      },
    ];

    // Create initial display: original + first 3 duplicates
    const initialDisplay = [...originalImages, ...originalImages.slice(0, 3)];
    setDisplayedImages(initialDisplay);
  }, []);

  // Lightbox functions
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
      prev === 0 ? displayedImages.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === displayedImages.length - 1 ? 0 : prev + 1,
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
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
      }
    };

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, currentImageIndex]);

  // Carousel navigation using smooth scrolling
  const scrollCarousel = (direction) => {
    console.log("🎡🎡🎡🎡 SCROLL CLICKED 🎡🎡🎡🎡🎡");
    console.log("📍 Direction:", direction);

    const carousel = document.getElementById("projectsCarousel");
    if (carousel) {
      const scrollAmount = 330; // Width of one item + gap
      const currentScroll = carousel.scrollLeft;

      if (direction === "left") {
        console.log("⬅️ Moving left");
        carousel.scrollTo({
          left: Math.max(0, currentScroll - scrollAmount),
          behavior: "smooth",
        });
      } else {
        console.log("➡️ Moving right");
        carousel.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    // Load external CSS
    const swiperCSS = document.createElement("link");
    swiperCSS.rel = "stylesheet";
    swiperCSS.href =
      "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
    document.head.appendChild(swiperCSS);

    const datepickerCSS = document.createElement("link");
    datepickerCSS.rel = "stylesheet";
    datepickerCSS.href =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css";
    document.head.appendChild(datepickerCSS);

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

    // Load Isotope
    const isotopeScript = document.createElement("script");
    isotopeScript.src =
      "https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js";
    isotopeScript.async = true;
    document.body.appendChild(isotopeScript);

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

    const mainScript = document.createElement("script");
    mainScript.src = "/snd-site/js/main.js";
    mainScript.async = true;
    document.body.appendChild(mainScript);

    const scriptScript = document.createElement("script");
    scriptScript.src = "/snd-site/js/script.js";
    scriptScript.async = true;
    document.body.appendChild(scriptScript);

    // Initialize Swiper after scripts load
    setTimeout(() => {
      if (window.Swiper) {
        new window.Swiper(".project-swiper", {
          slidesPerView: "auto",
          spaceBetween: 30,
          navigation: {
            nextEl: ".icon-arrow-right",
            prevEl: ".icon-arrow-left",
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          },
        });
      }

      // Initialize AOS
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
        document.head.removeChild(datepickerCSS);
        document.head.removeChild(aosCSS);
        document.head.removeChild(preconnect1);
        document.head.removeChild(preconnect2);
        document.head.removeChild(googleFonts);
        document.body.removeChild(jqueryScript);
        document.body.removeChild(bootstrapScript);
        document.body.removeChild(swiperScript);
        document.body.removeChild(aosScript);
        document.body.removeChild(isotopeScript);
        document.body.removeChild(iconifyScript);
        document.body.removeChild(modernizrScript);
        document.body.removeChild(pluginsScript);
        document.body.removeChild(mainScript);
        document.body.removeChild(scriptScript);
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Event handlers
  const openFacebook = (event) => {
    event.preventDefault();
    window.open("https://www.facebook.com/Supremenomads/", "_blank");
  };

  // Close hamburger menu when clicking outside and navbar scroll effect
  useEffect(() => {
    const handleClickOutside = (event) => {
      const checkbox = document.getElementById("hamburger-toggle");
      const mobileMenu = document.querySelector(".mobile-nav-menu");
      const hamburgerLabel = document.querySelector(".hamburger-label");
      const navbar = document.querySelector(".navbar");

      // Only close if menu is open and click is outside menu and navbar
      if (
        checkbox &&
        checkbox.checked &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        navbar &&
        !navbar.contains(event.target)
      ) {
        checkbox.checked = false;
      }
    };

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

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

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
      <section id="hero" className="homepage">
        {/* Background Video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_1920,h_1080,f_auto,q_auto,dpr_auto/hero-home-thumbnail_vss0vf.png"
        >
          <source
            src="https://res.cloudinary.com/dnsc73sla/video/upload/v1754100999/SN_Export_lm5zjy.mp4"
            type="video/mp4"
          />
        </video>

        {/* Text Container */}
        <div className="hero-container">
          <div className="row justify-content-center">
            <div className="hero-text-div col-12 col-md-10 text-center px-3 px-sm-5">
              <p className="hero-text">
                At <span className="sndName">Supreme Nomads Detailing</span>,
                our top priority is you.
              </p>
              <p className="hero-text mb-4">
                We strive for quality service, punctuality, and clear
                communication every time we see you.
              </p>
              <div>
                <a
                  href="#quick-links"
                  className="btn mainbtn btn-outline-primary"
                >
                  <iconify-icon icon="tabler:arrow-down" className="arrow-icon" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section id="quick-links">
        <div style={{ overflow: "hidden" }}>
          <div
            className="container-fluid border-bottom"
            data-aos="zoom-out"
            style={{ backgroundColor: "#dec49a" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 padding-medium pe-lg-5 border-end">
                  <h2 className="display-4 text-center">Quick Links</h2>
                </div>
                <div className="col-md-6 padding-medium-2 ps-md-5 d-grid gap-3">
                  <Link
                    to="/booking"
                    className="btn btn-primary w-100 book-now-btn-links"
                  >
                    Book Now
                    <iconify-icon
                      icon="tabler:arrow-right"
                      className="arrow-icon"
                    />
                  </Link>

                  <Link
                    to="/academy"
                    className="btn btn-primary w-100"
                  >
                    What is Detailing?
                    <iconify-icon
                      icon="tabler:arrow-right"
                      className="arrow-icon"
                    />
                  </Link>

                  <Link to="/about" className="btn btn-primary w-100">
                    How do we Operate?
                    <iconify-icon
                      icon="tabler:arrow-right"
                      className="arrow-icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="project" className="py-5 home-gallery-section">
        <div style={{ overflow: "hidden" }}>
          <div data-aos="zoom-out">
            <div className="container">
              <div className="row justify-content-center">
                <p className="header-top mb-3 text-center text-sm-start">
                  Gallery
                </p>
                <h2 className="text-white display-4 text-left text-sm-start">
                  Latest Projects
                </h2>
              </div>
              <div className="swiper-arrow position-static position-md-absolute end-0 mt-md-5 w-100 d-flex justify-content-center pe-3">
                <iconify-icon
                  icon="teenyicons:arrow-left-solid"
                  className="icon-arrow-left me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => scrollCarousel("left")}
                />
                <iconify-icon
                  icon="teenyicons:arrow-right-solid"
                  className="icon-arrow-right"
                  style={{ cursor: "pointer" }}
                  onClick={() => scrollCarousel("right")}
                />
              </div>
              {/* Horizontal Scrolling Carousel */}
              <div
                className="projects-carousel-container"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  margin: "0 -15px",
                }}
              >
                <div
                  className="projects-carousel"
                  id="projectsCarousel"
                  ref={carouselRef}
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "30px",
                    padding: "0 15px",
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none", // Hide scrollbar for cleaner look
                    msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                  }}
                >
                  {displayedImages.map((image, index) => (
                    <div
                      key={`${image.id}-${index}`}
                      style={{
                        flex: "0 0 calc(33.333% - 20px)",
                        minWidth: "300px",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#000",
                      }}
                    >
                      <a
                        href={image.link}
                        title={image.title}
                        className="image-link"
                        onClick={(e) => {
                          e.preventDefault();
                          const index = displayedImages.findIndex(
                            (img) => img.id === image.id,
                          );
                          openLightbox(index);
                        }}
                      >
                        <img
                          src={image.image}
                          alt={image.title}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            objectPosition: "center",
                            display: "block",
                          }}
                          onError={(e) => {
                            console.log(
                              "Home image failed to load:",
                              e.target.src,
                            );
                          }}
                          onLoad={(e) => {
                            console.log(
                              "Home image loaded successfully:",
                              e.target.src,
                            );
                          }}
                        />
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
                          <h3 style={{ color: "white", margin: "0" }}>
                            {image.title}
                          </h3>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pb-5 mb-5">
          <Link to="/gallery" className="btn btn-primary mt-5">
            See More
            <iconify-icon icon="tabler:arrow-right" className="arrow-icon" />
          </Link>
        </div>
      </section>

      {/* Detailing Packages Section */}
      <section id="detailingPrice" className="py-5 paint-packages">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 text-left">
              <p className="header-top mb-3">Our Services</p>
              <h2 className="display-4 mb-4">Detailing Packages</h2>
            </div>
          </div>

          {/* Pricing Tabs */}
          <div className="nav-tabs mb-5" id="paintProtectionTab">
            <div className="row justify-content-left">
              <div className="col-md-auto">
                <button
                  className={`m-0 mb-2 nav-link ${activeTab === "regular-tab-pane" ? "active" : ""}`}
                  onClick={() => handleTabClick("regular-tab-pane")}
                  type="button"
                >
                  Sedan/Coupé
                </button>
              </div>
              <div className="col-md-auto">
                <button
                  className={`m-0 mb-2 nav-link ${activeTab === "medium-tab-pane" ? "active" : ""}`}
                  onClick={() => handleTabClick("medium-tab-pane")}
                  type="button"
                >
                  2 Row Suv/Small Truck
                </button>
              </div>
              <div className="col-md-auto">
                <button
                  className={`m-0 nav-link ${activeTab === "van-tab-pane" ? "active" : ""}`}
                  onClick={() => handleTabClick("van-tab-pane")}
                  type="button"
                >
                  3 Row Suv/Large Truck
                </button>
              </div>
            </div>
          </div>

          <div className="tab-content mt-4" id="paintProtectionTabContent">
            {activeTab === "regular-tab-pane" && (
              <div className="row">
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Premium</div>
                    <h2 className="display-5 text-primary text-center">$300</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        6 Month Ceramic Wax1
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Iron Removal Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Clay Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Wheel Surfaces, Barrel, & Tire Clean
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Tire Dressing
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Foam Bath and Hand Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Shampoo and Conditioner
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Headliner Spot Cleaning
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Seats & Carpets Sanitized
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        UV Protect & Sanitize Dash/Vents/Trims/Panels
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Deep Interior & Trunk Vacuum
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows and Door Jams Cleaned
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Rain-X® Window Treatment
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Exterior</div>
                    <h2 className="display-5 text-primary text-center">$160</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        6 Month Ceramic Wax1
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Iron Removal Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Clay Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Wheel Surface, Barrel & Tire Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Tire Dressing
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Foam Bath & Hand Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows & Door Jams Cleaned
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Rain-X® Window Treatment
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Interior</div>
                    <h2 className="display-5 text-primary text-center">$160</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Shampoo and Conditioner
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Headliner Spot Cleaning
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Steam Interior Surfaces
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Seats & Carpets Sanitized
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        UV Protect and Sanitize Dash/Vents/Trims/Panels
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Deep Interior & Trunk Vacuum
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows and Door Jams Cleaned
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Express</div>
                    <h2 className="display-5 text-primary text-center">$125</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Basic Wax Coating1
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Wheel Surface and Tire Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Tire Dressing
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Foam Bath & Hand Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Seats & Carpets Sanitized
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Dash/Vents/Trims/Panels Wipe Down
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Interior Vacuum
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows Only
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "medium-tab-pane" && <MediumTabPane />}

            {activeTab === "van-tab-pane" && (
              <div className="row">
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Premium</div>
                    <h2 className="display-5 text-primary text-center">$400</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        6 Month Ceramic Wax1
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Iron Removal Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Clay Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Wheel Surfaces, Barrel, & Tire Clean
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Tire Dressing
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Foam Bath and Hand Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Shampoo and Conditioner
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Headliner Spot Cleaning
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Seats & Carpets Sanitized
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        UV Protect & Sanitize Dash/Vents/Trims/Panels
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Deep Interior & Trunk Vacuum
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows and Door Jams Cleaned
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Rain-X® Window Treatment
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Exterior</div>
                    <h2 className="display-5 text-primary text-center">$200</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        6 Month Ceramic Wax1
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Iron Removal Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Clay Treatment
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Wheel Surface, Barrel & Tire Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Tire Dressing
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Foam Bath & Hand Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows & Door Jams Cleaned
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Rain-X® Window Treatment
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Interior</div>
                    <h2 className="display-5 text-primary text-center">$200</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Shampoo and Conditioner
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Headliner Spot Cleaning
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Steam Interior Surfaces
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Seats & Carpets Sanitized
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        UV Protect and Sanitize Dash/Vents/Trims/Panels
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Deep Interior & Trunk Vacuum
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows and Door Jams Cleaned
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Express</div>
                    <h2 className="display-5 text-primary text-center">$175</h2>
                    <div className="price-option">
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Basic Wax Coating1
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Wheel Surface and Tire Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Tire Dressing
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Foam Bath & Hand Wash
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Seats & Carpets Sanitized
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Dash/Vents/Trims/Panels Wipe Down
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Interior Vacuum
                      </p>
                      <p>
                        <iconify-icon
                          icon="mdi:check"
                          className="price-tick me-2"
                        />
                        Windows Only
                      </p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/booking" className="btn btn-primary">
                        Book Now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon ms-2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div id="disclaimers" className="container py-3">
              <ul className="list-unstyled">
                <li className="py-2">
                  <sup className="sup-line">
                    <a href="#detailingPrice">1</a>
                  </sup>{" "}
                  Wax protection longevity varies based on vehicle condition, storage,
                  and maintenance. Pre-existing paint damage or aftermarket paint may
                  also affect the wax's lifespan. For optimal results, regular care
                  and garaging are recommended.
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <a href="/services" className="btn btn-primary">
                View All Services
                <iconify-icon
                  icon="tabler:arrow-right"
                  className="arrow-icon ms-2"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

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
              src={displayedImages[currentImageIndex].link}
              alt={displayedImages[currentImageIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
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

      <Footer />
    </>
  );
}
