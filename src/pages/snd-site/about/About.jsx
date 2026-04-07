import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/vendor.css";
import "swiper/css";
import Logo from "../images/horizontal-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "./About.css";

export default function About() {
  const location = useLocation();

  // Helper function to get dynamic dates
  const getCurrentYear = () => new Date().getFullYear();
  const getDynamicDate = (startYear, endYear) => {
    const currentYear = getCurrentYear();
    if (currentYear >= startYear && currentYear <= endYear) {
      return currentYear;
    }
    return endYear; // Return end year as fallback
  };

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
              {/* Routes */}
              <ul className="navbar-nav align-items-center justify-content-end justify-content-xxl-center flex-grow-1">
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
                {/* Socials */}
                <div className="d-flex mt-lg-0 align-items-center justify-content-center offcanvas-body social-div">
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
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section hero-about">
        <div className="hero-overlay"></div>
        <div className="container py-5 hero-content">
          <div className="row py-5">
            <div className="d-flex flex-wrap flex-column justify-content-center align-items-center my-5 py-5 text-white">
              <h2 className="page-title display-3 mt-5 text-white">About Us</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section id="about-us" className="py-5">
        <div style={{ overflow: "hidden" }}>
          <div className="vertical-element" data-aos="zoom-out">
            <div className="container pt-2">
              <div className="row d-flex align-items-center">
                <div className="col-lg-6 col-12 order-2 order-md-1">
                  <div className="image-holder">
                    <img
                      src="https://res.cloudinary.com/dnsc73sla/image/upload/w_auto,dpr_auto,c_fit,q_auto,f_auto/v1754103603/who-are-we_qmajj7.png"
                      alt="Who Are We"
                      className="about-us-team-img"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12 order-1 order-md-2">
                  <div className="p-4 p-md-5">
                    <h2 className="element-title text-uppercase mb-4">
                      Who are we?
                    </h2>
                <p className="fs-5 text-[rgba(102,102,102)] lh-base">
                      Supreme Nomads Detailing sparked from a shared passion for
                      ensuring that every vehicle we touch is left in the most
                      pristine condition possible through our detailing
                      services. No matter the make or model, we deliver the
                      highest level of care in every detail. Whether innovating
                      with new techniques or meeting new enthusiasts, we strive
                      for a single outcome: to make you proud of your ride. We
                      are grateful for our support systems from our families,
                      friends, mentors, the car community, and most importantly,
                      you, the customer that allows us to deliver on our
                      passion. Through continuous feedback and unconditional
                      support, we are able to further our endeavors in being
                      perfectionists in the art of auto detailing. Thank you to
                      our team for their unwavering support, and to our loyal
                      customers for making this journey possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className="vertical-element py-3" data-aos="zoom-out">
            <div className="container">
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-lg-6 col-12">
                  <div className="p-4 p-md-5">
                    <h2 className="element-title text-uppercase mb-4 about-supreme">
                      CHOOSE US FOR THE SUPREME TREATMENT
                    </h2>
                <p className="fs-5 text-[rgba(102,102,102)] lh-base">
                      At Supreme Nomads, perfection is at the heart of how we
                      operate. Even as a respected name in the Charlotte Auto
                      Industry, we're committed to continuous improvement and
                      applying our expertise. A clean environment allows for
                      some peace amongst the chaos in the day to day, and that
                      extends to your second-largest investment, your vehicle.
                      Between work, family, road trips, or just leisure driving,
                      it's easy to use your vehicle, but hard to find time to
                      keep it clean. We understand this need and seek to find a
                      personalized detailing plan for every customer. These
                      words resonate deeply with us at supreme nomads detailing.
                      even as a respected name in the Charlotte auto industry,
                      we're committed to continuous improvement and sharing our
                      expertise. stay tuned as we develop the supreme nomads
                      academy, where we'll offer insights and training to
                      elevate your detailing skills! click below to subscribe
                      for updates and be the first to know when we launch!
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="image-holder">
                    <img
                      src="https://res.cloudinary.com/dnsc73sla/image/upload/w_auto,dpr_auto,c_fit,q_auto,f_auto/v1754104066/choose-us-for-the-supreme-treatment_giqhd3.png"
                      alt="Choose us for the supreme treatment"
                      className="about-us-team-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Info */}
      <section id="team">
        <div style={{ overflow: "hidden" }}>
          <div className="container my-5 py-5" data-aos="zoom-out">
            <p className="header-top text-center mb-3">Meet our team</p>
            <h2 className="display-4 text-center">Our Team Members</h2>

            {/* Team Member 1 */}
            <div className="row align-items-center my-5 mx-auto">
              <div className="col-md-4 col align-items-center">
                <img
                  src="https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto,c_limit,w_1200/v1754439571/about-us-akash_gnm3s8.png"
                  className="img-fluid member-photo"
                  alt="Akash"
                />
                <div className="social-links mt-3 d-flex justify-content-center gap-3">
                  <a
                    href="https://www.instagram.com/akashcar19?igsh=MXZqdmNybjd5ZmEwaQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <iconify-icon
                      icon="ri:instagram-line"
                      className="social-icon text-secondary"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhardwaj97?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <iconify-icon
                      icon="ri:linkedin-fill"
                      className="social-icon text-secondary"
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-8 text-center">
                <h5 className="element-title text-uppercase mt-3">Akash</h5>
                <h6 className="heading-color">Co-CEO</h6>
                <p className="fs-5 text-[rgba(102,102,102)] lh-base">
                  I was born and raised in New Jersey. I've moved around a lot
                  and have even lived in Texas for a couple of years. I finished
                  high school in Cary, NC and have lived in Charlotte since
                  {getDynamicDate(2015, 2025)}. I majored in Computer Science at University of North
                  Carolina at Charlotte Class of '19 and have a masters in Data
                  Science and Business Analytics {getDynamicDate(2020, 2025)}. Since my childhood, I have
                  always been interested in 2 things. Cars, and tech. After
                  working in the tech industry for several years, I decided to
                  pursue my other passion for cars. I learned to work on my 2006
                  Honda Civic in college to save money, especially because I
                  couldn't afford to pay for a new starter when it went out and
                  I had to get to classes. Today that vehicle has over 300,000
                  miles and I've helped countless other friends with oil
                  changes, and other diagnostic and maintenance items for their
                  vehicles. But detailing has always stuck out to me because no
                  matter how far you go with it, you can never be perfect.
                  Because of the nature of detailing, you create your own
                  definition of done. As someone who chases perfection,
                  detailing will always challenge me and push me to get closer
                  to perfect, while also striving for efficiency with every car
                  we work on. I met Tenzin in 2023 through a mutual friend, and
                  realized I'd found someone with the same mindset and attitude
                  about detailing. And from there, the rest is history.
                </p>
              </div>
            </div>

            {/* Team Member 2 (Alternate Layout) */}
            <div className="row align-items-center my-5 mx-auto">
              <div className="col-md-4 col align-items-center">
                <img
                  src="https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto,c_limit,w_1200/v1754439521/about-us-tenzin_tqo4xu.png"
                  className="img-fluid member-photo"
                  alt="Tenzin"
                />
              </div>
              <div className="col-md-8 text-center">
                <h5 className="element-title text-uppercase mt-3">Tenzin</h5>
                <h6 className="heading-color">Co-CEO</h6>
                <p className="fs-5 text-[rgba(102,102,102)] lh-base">
                  Growing up in New York City, vehicles were luxury items as
                  trains were my primary mode of transportation. My fascination
                  for cars started in 2005, when I picked up one of my childhood
                  favorite games, Need for Speed: Underground. From the plethora
                  of imported cars (Civic Si, 350Z, Integra, and RX-7),
                  different race modes, endless car customization, to the
                  intriguing plot line, this game opened my eyes to the niche of
                  car culture. I studied different brands, car specs, and would
                  actively look for these vehicles when roaming the city. My
                  passion for cars evolved after the 2012 New York International
                  Auto Show, when I learned about the meticulous work that went
                  into the design and production of the Lexus LFA, as I aspired
                  to own one. The first vehicle I detailed was my family-owned
                  RAV4, which I eventually got to take to college in my final
                  semester. After moving to Charlotte, it came time to get my
                  own vehicle. The ES 350 F sport model contained the same
                  sliding speedometer and many design aspects of the LFA so it
                  was a no brainer: I had to have it! After purchasing a {getDynamicDate(2020, 2025)} model, I have
                  gone to great lengths to take great care of my Lexus. Through
                  my appreciation of my ES, I was able to learn a lot about
                  detailing and the proper way to maintain a vehicle. I would
                  constantly get asked about detailing services, and eventually,
                  Supreme Nomads Detailing was formed to help others take care of
                  their prized possessions. Akash and I connected through our
                  shared enthusiasm for cars and detailing.
                  through our shared enthusiasm for cars and detailing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="footer">
        <div className="container footer-containerG mt-3 mt-md-0 pt-2">
          <div>
            <img
              src="https://res.cloudinary.com/dnsc73sla/image/upload/v1752006942/logo-gold-horse-name_dmbkjk.svg"
              alt="Supreme Nomads Logo"
              className="footer-logo mx-auto d-block mt-5"
            />
          </div>

          {/* Main Footer */}
          <footer className="row py-3">
            {/* Contact Us */}
            <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center">
              <h5 className="fs-5 mt-3 mt-lg-0 mb-3">Mobile Detailing Unit</h5>
              <div className="row row-cols-1 g-0">
                <div className="col">
                  <div className="footer-list mb-3">
                    <h6 className="mobile footer-heading2">We Come To You!</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a
                      href="tel:+1704-561-1927"
                      className="nav-link text-uppercase p-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <iconify-icon
                        icon="mdi:phone"
                        style={{ verticalAlign: "middle", marginRight: "6px" }}
                      />
                      704-561-1927
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a
                      href="mailto:info@supremenomads.com"
                      className="nav-link text-uppercase p-0 footer-em"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <iconify-icon
                        icon="mdi:email"
                        style={{ verticalAlign: "middle", marginRight: "6px" }}
                      />
                      info@supremenomads.com
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <div className="d-flex justify-content-center align-items-center">
                      <a
                        href="https://www.tiktok.com/@supremenomads704"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="me-3"
                      >
                        <iconify-icon
                          className="social-icon-footer"
                          icon="ri:tiktok-fill"
                        />
                      </a>
                      <a
                        href="https://www.instagram.com/supremenomads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="me-3"
                      >
                        <iconify-icon
                          className="social-icon-footer"
                          icon="mdi:instagram"
                        />
                      </a>
                      <a
                        href="https://www.facebook.com/Supremenomads/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={openFacebook}
                        className="me-3"
                      >
                        <iconify-icon
                          className="social-icon-footer"
                          icon="mdi:facebook"
                        />
                      </a>
                      <a
                        href="https://www.yelp.com/biz/supreme-nomads-detailing-charlotte"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="me-3"
                      >
                        <iconify-icon
                          className="social-icon-footer pe-4"
                          icon="mdi:yelp"
                        />
                      </a>
                      <a
                        href="https://www.youtube.com/@SupremeNomads"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          className="social-icon-footer"
                          icon="mdi:youtube"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <p>
                      Icons by
                      <a
                        href="https://icons8.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-1"
                      >
                        Icons8
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cities */}
            <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center">
              <h5 className="fs-5 mt-3 mt-lg-0 mb-3">We Serve</h5>
              <div className="row row-cols-1 row-cols-lg-2 g-0">
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Charlotte
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Concord
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Harrisburg
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Huntersville
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Matthews
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Waxhaw
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Lake Norman
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Fort Mill, SC
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Indian Land, SC
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <a href="#" className="nav-link text-uppercase p-0">
                      Rock Hill, SC
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center">
              <h5 className="fs-5 mt-3 mt-lg-0 mb-3">Quick Links</h5>
              <div className="row row-cols-1 g-0">
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link to="/" className="nav-link text-uppercase p-0">
                      Home
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link
                      to="/gallery"
                      className="nav-link text-uppercase p-0"
                    >
                      Gallery
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link
                      to="/services"
                      className="nav-link text-uppercase p-0"
                    >
                      Our Services
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link
                      to="/about"
                      className="nav-link text-uppercase p-0"
                    >
                      About Us
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link
                      to="/academy"
                      className="nav-link text-uppercase p-0"
                    >
                      Academy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Copyright */}
        <div className="container">
          <footer className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center py-2 border-top">
            <p className="font-rgb(102, 102, 102) mb-1 mb-md-0 footer-copy">
              © 2022 - {new Date().getFullYear()} | All Rights Reserved
            </p>
            <p className="font-rgb(102, 102, 102) mb-0 footer-copy">Supreme Nomads Detailing LLC</p>
          </footer>
        </div>
      </section>
    </>
  );
}
