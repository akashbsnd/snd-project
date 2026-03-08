import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/horizontal-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/style.css";
import "./PaintProtection.css";

const PAINT_FEATURES = {
  special: [
    '1-Step Paint Enhancement',
    '1 Year Ceramic Sealant',
    'Iron Removal Treatment',
    'Clay Treatment',
    'Wheel Surface, Barrel & Tire Wash',
    'Tire Dressing',
    'Foam Bath & Hand Wash',
    'Shampoo & Conditioner',
    'Headliner Spot Cleaning',
    'Steam Interior Surfaces',
    'Seats & Carpets Sanitized',
    'UV Protect and Sanitize Dash/Vents/Trims/Panels',
    'Deep Interior & Trunk Vacuum',
    'Windows and Door Jams Cleaned',
    'Rain-X® Window Treatment',
  ],
  ceramic: [
    'Hand Applied 2-Stage Ceramic Coating',
    '2-Step Paint Correction',
    'Iron Removal Treatment',
    'Clay Treatment',
    'Wheel Surface, Barrel & Tire Wash',
    'Tire Dressing',
    'Foam Bath & Hand Wash',
    'One free additional exterior maintenance wash!',
  ],
};

const PPF_DESCRIPTION = "Paint Protection Film (PPF) is a thin film made of thermoplastic polyurethane that is applied on your vehicle's paint, shielding it from daily elements. It combines ceramic coating benefits with a physical barrier, resisting minor rock chips and scratches due to its self-healing properties. Available in clear (most common) and colored options, PPF protects your vehicle while retaining your factory look or offering a new one. Lasting 5-7 years, with potential for up to 10 years with regular maintenance, PPF is a cost-effective alternative to repainting, ensuring a factory-quality finish.";

function PaintProtectionCard({ title, price, features, showCeramicInfo, ppfDescription }) {
  return (
    <div className="col-lg-4 pb-4">
      <div className="py-5 plan-post text-center">
        <p className="header-top">
          {title}
          {showCeramicInfo && (
            <span role="button" tabIndex={0} className="ms-1" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#ceramicModal" title="What is Ceramic Coating?">ⓘ</span>
          )}
        </p>
        <h2 className="display-5">{price}</h2>
        <div className="price-option mt-3">
          {features && features.map((line, i) => (
            <p key={i}>
              <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick" />
              {line.includes('1 Year Ceramic Sealant') ? (
                <span>1 Year Ceramic Sealant<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
              ) : (
                <span>{line}</span>
              )}
            </p>
          ))}
          {ppfDescription && (
            <>
              <p>{PPF_DESCRIPTION}</p>
              <p>PPF Coverage Options:</p>
              <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick" /> Partial Frontal</p>
              <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick" /> Full Frontal</p>
              <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick" /> Full Frontal and Full Rear</p>
              <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick" /> Full Body</p>
              <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick" /> Custom Coverage</p>
            </>
          )}
        </div>
        <Link to="/bookings" className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links">
          Book now
          <iconify-icon icon="tabler:arrow-right" className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
}

function AddOnCard({ icon, title, sup, text }) {
  return (
    <div className="col-md-6 col-lg-4 my-3">
      <div className="services-content text-center border py-3 py-md-5 px-3">
        <img src={icon} alt="" className="add-on-icons" />
        <h4 className="my-3 add-on-title">
          {title}
          {sup && <sup className="sup-line"><a href="#disclaimers">{sup}</a></sup>}
        </h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

const PAINT_TABS = {
  REGULAR: 'paint-regular',
  MEDIUM: 'paint-medium',
  VAN: 'paint-van',
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('regular-tab-pane');
  const [paintTab, setPaintTab] = useState(PAINT_TABS.REGULAR);


  useEffect(() => {
    // Load external CSS
    const swiperCSS = document.createElement('link');
    swiperCSS.rel = 'stylesheet';
    swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css';
    document.head.appendChild(swiperCSS);

    const datepickerCSS = document.createElement('link');
    datepickerCSS.rel = 'stylesheet';
    datepickerCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css';
    document.head.appendChild(datepickerCSS);

    // AOS CSS
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(aosCSS);

    // Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = '';
    document.head.appendChild(preconnect2);

    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Oswald:wght@500;600;700&display=swap';
    document.head.appendChild(googleFonts);

    // Load jQuery first (required for many scripts)
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
    jqueryScript.async = true;
    document.body.appendChild(jqueryScript);

    // Load Bootstrap JS
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    // Load Swiper JS
    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js';
    swiperScript.async = true;
    document.body.appendChild(swiperScript);

    // Load AOS JS
    const aosScript = document.createElement('script');
    aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosScript.async = true;
    document.body.appendChild(aosScript);

    // Load Isotope
    const isotopeScript = document.createElement('script');
    isotopeScript.src = 'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js';
    isotopeScript.async = true;
    document.body.appendChild(isotopeScript);

    // Load Iconify
    const iconifyScript = document.createElement('script');
    iconifyScript.src = 'https://cdn.jsdelivr.net/npm/iconify-icon@1.0.7/dist/iconify-icon.min.js';
    iconifyScript.async = true;
    document.body.appendChild(iconifyScript);

    // Load local scripts
    const modernizrScript = document.createElement('script');
    modernizrScript.src = '/snd-site/js/modernizr.js';
    modernizrScript.async = true;
    document.body.appendChild(modernizrScript);

    const pluginsScript = document.createElement('script');
    pluginsScript.src = '/snd-site/js/plugins.js';
    pluginsScript.async = true;
    document.body.appendChild(pluginsScript);

    const mainScript = document.createElement('script');
    mainScript.src = '/snd-site/js/main.js';
    mainScript.async = true;
    document.body.appendChild(mainScript);

    const scriptScript = document.createElement('script');
    scriptScript.src = '/snd-site/js/script.js';
    scriptScript.async = true;
    document.body.appendChild(scriptScript);

    // Initialize Swiper after scripts load
    setTimeout(() => {
      if (window.Swiper) {
        new window.Swiper('.project-swiper', {
          slidesPerView: 'auto',
          spaceBetween: 30,
          navigation: {
            nextEl: '.icon-arrow-right',
            prevEl: '.icon-arrow-left',
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
          }
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
    window.open('https://www.facebook.com/Supremenomads/', '_blank');
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Supreme Nomads Detailing - Charlotte - Mobile Auto Detailing</title>
      
      {/* Custom Styles */}
      <style jsx>{`
        .services-hero {
          background: linear-gradient(135deg, #1a1a2 0%, #0f172a 100%);
          padding: 80px 0;
          text-align: center;
        }
        
        .services-hero h2 {
          color: white;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .services-tabs {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 2rem;
          margin: 2rem 0;
        }
        
        .tab-button {
          background: transparent;
          border: 2px solid #007bff;
          color: #007bff;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .tab-button:hover {
          background: #007bff;
          color: white;
        }
        
        .tab-button.active {
          background: #007bff;
          color: white;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0 2rem;
        }
        
        .pricing-card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e9ecef;
        }
        
        .pricing-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .price-tag {
          background: #007bff;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .service-title {
          color: #007bff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .book-button {
          background: linear-gradient(45deg, #007bff, #0056b3);
          border: none;
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .book-button:hover {
          background: linear-gradient(45deg, #0056b3, #007bff);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 123, 255, 0.2);
        }
        
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          color: #6c757d;
        }
        
        .feature-icon {
          color: #007bff;
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 0 1rem;
          }
          
          .pricing-card {
            padding: 1.5rem;
          }
        }
      `}</style>
      
      {/* Nav */}
      <nav className="navbar fixed-top navbar-expand-xl container-fluid p-sm-3 p-2">
        {/* Logo */}
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="logo" />
          </a>
          
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
                  <a
                    className="nav-link text-white text-uppercase active mx-1 px-1 mb-2 mb-lg-0"
                    aria-current="page"
                    href="/"
                  >Home</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white text-uppercase mx-1 px-1 mb-2 mb-lg-0"
                    href="/snd-site/gallery"
                  >Gallery</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white text-uppercase mx-1 px-1 mb-2 mb-lg-0"
                    href="/snd-site/services"
                  >Our Services</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white text-uppercase mx-1 px-1 mb-2 mb-lg-0"
                    href="/snd-site/about"
                  >About Us</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white text-uppercase mx-1 px-1 mb-2 mb-lg-0"
                    href="/snd-site/academy"
                  >Academy</a>
                </li>
                {/* Socials */}
                <div className="d-flex mt-lg-0 align-items-center justify-content-center offcanvas-body social-div">
                  <ul className="d-flex flex-row list-unstyled mb-0 social-ul">
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center"
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
                        className="nav-link d-flex align-items-center"
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
                        className="nav-link d-flex align-items-center"
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
                        className="nav-link d-flex align-items-center"
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
                        className="nav-link d-flex align-items-center"
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
                        className="nav-link d-flex align-items-center"
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
                  <button 
                    onClick={() => window.location.href = '/bookings'}
                    className="book-now-button-custom"
                    type="button"
                  >
                    Book Now
                    <iconify-icon
                      icon="tabler:arrow-right"
                      className="arrow-icon-custom"
                    />
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section hero-services">
        <div className="container py-5 hero-content">
          <div className="row py-5">
            <div
              className="d-flex flex-wrap flex-column justify-content-center align-items-center my-5 py-5 text-white"
            >
              <h2 className="page-title display-3 mt-5 text-white">Our Services</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Detailing Packages Section */}
      <section id="detailingPrice" className="my-5">
        <div style={{ overflow: "hidden" }}>
          <div className="container py-5" data-aos="zoom-out">
            <h2 className="display-4 mb-5">Detailing Packages</h2>

            {/* Pricing Tabs */}
            <ul className="nav nav-tabs my-3" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link me-4 px-4 py-1 mb-2 active"
                  id="regular-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#regular-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="regular-tab-pane"
                  aria-selected="true"
                >
                  Sedan/Coupé
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link me-4 px-4 py-1 mb-2"
                  id="medium-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#medium-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="medium-tab-pane"
                  aria-selected="false"
                >
                  2 Row Suv/Small Truck
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link me-4 px-4 py-1 mb-2"
                  id="van-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#van-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="van-tab-pane"
                  aria-selected="false"
                >
                  3 Row Suv/Large Truck
                </button>
              </li>
            </ul>
            
            <div className="tab-content" id="myTabContent">
              {/* Regular Tab - Sedan/Coupé */}
              <div
                className="tab-pane fade show active"
                id="regular-tab-pane"
                role="tabpanel"
                aria-labelledby="regular-tab"
                tabIndex="0"
              >
                <div className="row py-4">
                  {/* Premium Package */}
                  <div className="col-lg-3 pb-4">
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Premium</p>
                      <h2 className="display-5">$300</h2>
                      <div className="price-option mt-3">
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>6 Month Ceramic Wax<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Iron Removal Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>Clay Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>Wheel Surfaces, Barrel, & Tire Clean</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath and Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Shampoo and Conditioner</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Headliner Spot Cleaning</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> UV Protect & Sanitize Dash/Vents/Trims/Panels</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Deep Interior & Trunk Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows and Door Jams Cleaned</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon><span>Rain-X<span className="sup-reg">®</span> Window Treatment</span></p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Exterior Package */}
                  <div className="col-lg-3 pb-4">
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Exterior</p>
                      <h2 className="display-5">$160</h2>
                      <div className="price-option mt-3">
                        <p>
                          <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>6 Month Ceramic Wax<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Iron Removal Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Clay Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Wheel Surface, Barrel & Tire Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath & Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows & Door Jams Cleaned</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon><span>Rain-X<span className="sup-reg">®</span> Window Treatment</span></p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Interior Package */}
                  <div className="col-lg-3 pb-4">
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Interior</p>
                      <h2 className="display-5">$160</h2>
                      <div className="price-option mt-3">
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Shampoo and Conditioner</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Headliner Spot Cleaning</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Steam Interior Surfaces</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> UV Protect and Sanitize Dash/Vents/Trims/Panels</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Deep Interior & Trunk Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows and Door Jams Cleaned</p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Express Package */}
                  <div className="col-lg-3 pb-4">
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Express</p>
                      <h2 className="display-5">$125</h2>
                      <div className="price-option mt-3">
                        <p>
                          <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>Basic Wax Coating<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Wheel Surface and Tire Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath & Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Dash/Vents/Trims/Panels Wipe Down</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Interior Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows Only</p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medium Tab - 2 Row Suv/Small Truck */}
              <div
                className="tab-pane fade"
                id="medium-tab-pane"
                role="tabpanel"
                aria-labelledby="medium-tab"
                tabIndex="0"
              >
                <div className="row py-4">
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="0"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Premium</p>
                      <h2 className="display-5">$350</h2>
                      <div className="price-option mt-3">
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>6 Month Ceramic Wax<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Iron Removal Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>Clay Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>Wheel Surfaces, Barrel, & Tire Clean</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath and Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Shampoo and Conditioner</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Headliner Spot Cleaning</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> UV Protect & Sanitize Dash/Vents/Trims/Panels</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Deep Interior & Trunk Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows and Door Jams Cleaned</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon><span>Rain-X<span className="sup-reg">®</span> Window Treatment</span></p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Exterior Package */}
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="300"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Exterior</p>
                      <h2 className="display-5">$180</h2>
                      <div className="price-option mt-3">
                        <p>
                          <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>6 Month Ceramic Wax<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Iron Removal Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Clay Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Wheel Surface, Barrel & Tire Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath & Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows & Door Jams Cleaned</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon><span>Rain-X<span className="sup-reg">®</span> Window Treatment</span></p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Interior Package */}
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="600"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Interior</p>
                      <h2 className="display-5">$180</h2>
                      <div className="price-option mt-3">
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Shampoo and Conditioner</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Headliner Spot Cleaning</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Steam Interior Surfaces</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> UV Protect and Sanitize Dash/Vents/Trims/Panels</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Deep Interior & Trunk Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows and Door Jams Cleaned</p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Express Package */}
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="900"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Express</p>
                      <h2 className="display-5">$150</h2>
                      <div className="price-option mt-3">
                        <p>
                          <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>Basic Wax Coating<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Wheel Surface and Tire Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath & Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Dash/Vents/Trims/Panels Wipe Down</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Interior Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows Only</p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Van Tab - 3 Row Suv/Large Truck */}
              <div
                className="tab-pane fade"
                id="van-tab-pane"
                role="tabpanel"
                aria-labelledby="van-tab"
                tabIndex="0"
              >
                <div className="row py-4">
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="0"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Premium</p>
                      <h2 className="display-5">$400</h2>
                      <div className="price-option mt-3">
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>6 Month Ceramic Wax<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Iron Removal Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>Clay Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>Wheel Surfaces, Barrel, & Tire Clean</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath and Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Shampoo and Conditioner</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Headliner Spot Cleaning</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> UV Protect & Sanitize Dash/Vents/Trims/Panels</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Deep Interior & Trunk Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows and Door Jams Cleaned</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon><span>Rain-X<span className="sup-reg">®</span> Window Treatment</span></p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Exterior Package */}
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="300"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Exterior</p>
                      <h2 className="display-5">$200</h2>
                      <div className="price-option mt-3">
                        <p>
                          <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>6 Month Ceramic Wax<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Iron Removal Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Clay Treatment</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Wheel Surface, Barrel & Tire Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath & Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows & Door Jams Cleaned</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon><span>Rain-X<span className="sup-reg">®</span> Window Treatment</span></p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Interior Package */}
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="600"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Interior</p>
                      <h2 className="display-5">$200</h2>
                      <div className="price-option mt-3">
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Shampoo and Conditioner</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Headliner Spot Cleaning</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Steam Interior Surfaces</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> UV Protect and Sanitize Dash/Vents/Trims/Panels</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Deep Interior & Trunk Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows and Door Jams Cleaned</p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Express Package */}
                  <div
                    className="col-lg-3 col-6 pb-4"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="900"
                  >
                    <div className="py-5 plan-post text-center">
                      <p className="header-top">Express</p>
                      <h2 className="display-5">$175</h2>
                      <div className="price-option mt-3">
                        <p>
                          <iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon>
                          <span>Basic Wax Coating<sup className="sup-line"><a href="#disclaimers">1</a></sup></span>
                        </p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Wheel Surface and Tire Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Tire Dressing</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Foam Bath & Hand Wash</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Seats & Carpets Sanitized</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Dash/Vents/Trims/Panels Wipe Down</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Interior Vacuum</p>
                        <p><iconify-icon icon="mdi:square-medium" className="bullet-icon price-tick"></iconify-icon> Windows Only</p>
                      </div>
                      <a
                        href="/snd-site/booking.html"
                        className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links"
                      >
                        Book now
                        <iconify-icon
                          icon="tabler:arrow-right"
                          className="arrow-icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paint Protection Section - tabs controlled by React state */}
      <section id="paintPrice" className="py-5 paint-packages">
        <div style={{ overflow: 'hidden' }}>
          <div className="container py-5" data-aos="zoom-out">
            <h2 className="display-4 mb-5">Paint Protection</h2>
            <ul className="nav nav-tabs my-3" id="paintProtectionTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  className={`nav-link me-4 px-4 py-1 mb-2 ${paintTab === PAINT_TABS.REGULAR ? 'active' : ''}`}
                  onClick={() => setPaintTab(PAINT_TABS.REGULAR)}
                  aria-selected={paintTab === PAINT_TABS.REGULAR}
                >
                  Sedan/Coupé
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  className={`nav-link me-4 px-4 py-1 mb-2 ${paintTab === PAINT_TABS.MEDIUM ? 'active' : ''}`}
                  onClick={() => setPaintTab(PAINT_TABS.MEDIUM)}
                  aria-selected={paintTab === PAINT_TABS.MEDIUM}
                >
                  2 Row SUV/Small Truck
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  className={`nav-link me-4 px-4 py-1 mb-2 ${paintTab === PAINT_TABS.VAN ? 'active' : ''}`}
                  onClick={() => setPaintTab(PAINT_TABS.VAN)}
                  aria-selected={paintTab === PAINT_TABS.VAN}
                >
                  3 Row SUV/Large Truck
                </button>
              </li>
            </ul>
            <div className="tab-content" id="paintProtectionTabContent">
              {paintTab === PAINT_TABS.REGULAR && (
                <div className="row py-4">
                  <PaintProtectionCard title="Supreme Nomads Special" price="$475" features={PAINT_FEATURES.special} showCeramicInfo={false} />
                  <PaintProtectionCard title="Ceramic Coating" price="$950+" features={PAINT_FEATURES.ceramic} showCeramicInfo />
                  <PaintProtectionCard title="Paint Protection Film (PPF)" price="$1000+" ppfDescription />
                </div>
              )}
              {paintTab === PAINT_TABS.MEDIUM && (
                <div className="row py-4">
                  <PaintProtectionCard title="Supreme Nomads Special" price="$550" features={PAINT_FEATURES.special} showCeramicInfo={false} />
                  <PaintProtectionCard title="Ceramic Coating" price="$1100+" features={PAINT_FEATURES.ceramic} showCeramicInfo />
                  <PaintProtectionCard title="Paint Protection Film (PPF)" price="$1100+" ppfDescription />
                </div>
              )}
              {paintTab === PAINT_TABS.VAN && (
                <div className="row py-4">
                  <PaintProtectionCard title="Supreme Nomads Special" price="$625" features={PAINT_FEATURES.special} showCeramicInfo={false} />
                  <PaintProtectionCard title="Ceramic Coating" price="$1300+" features={PAINT_FEATURES.ceramic} showCeramicInfo />
                  <PaintProtectionCard title="Paint Protection Film (PPF)" price="$1200+" ppfDescription />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans Section - always visible */}
      <section id="maintenancePrice" className="mt-5 pb-5 maintenance-packages">
        <div className="container py-5" data-aos="zoom-out">
          <h2 className="display-4 mb-5">Maintenance Plans</h2>
          <p className="mb-4">
            Our maintenance plans are designed to keep your vehicle looking like the day you got it detailed for an extended period of time. Let us take care of your vehicle for a 6 or 12 month timeframe prepaid! Maintenance plans are only available with the <a href="#paintPrice">protection packages</a>. Each wash must be scheduled within 40 days of the previous one or you lose the wash. If our calendar cannot accommodate the 40 day time frame, we will work with you to choose the next available slot.
          </p>
          <div className="row py-4">
            <div className="col-lg-6 pb-4">
              <div className="py-5 plan-post text-center">
                <p className="header-top">12 Washes</p>
                <h2 className="display-5">$800</h2>
                <Link to="/bookings" className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links">
                  Book now
                  <iconify-icon icon="tabler:arrow-right" className="arrow-icon" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 pb-4">
              <div className="py-5 plan-post text-center">
                <p className="header-top">6 Washes</p>
                <h2 className="display-5">$500</h2>
                <Link to="/bookings" className="btn btn-primary mt-3 px-4 py-3 mx-2 book-now-btn-links">
                  Book now
                  <iconify-icon icon="tabler:arrow-right" className="arrow-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-On Services Section - always visible */}
      <section id="add-ons-section">
        <div style={{ overflow: 'hidden' }}>
          <div className="container mt-5 pt-5" data-aos="zoom-out">
            <h2 className="display-4 mb-5">Add-On Services</h2>
            <div className="row">
              <AddOnCard icon="/images/maintenance-icons/icons8-air-quality-100.png" title="Cabin Air Filter Replacement" sup="2" text="Most manufacturers recommend replacing your cabin air filter at least once every year. In some cases, a cabin air filter should be replaced every six months, especially if the vehicle regularly travels through highly polluted areas or if the driver and/or passengers have allergies. We recommend letting us change this along with an Interior Package, Odor Removal, or Stain Treatment!" />
              <AddOnCard icon="/images/maintenance-icons/icons8-inhale-100.png" title="Odor Removal (Ozone Treatments)" text="Ozone, also known as O3 is aimed to attack smells at a molecular level. Ozone bonds to odor causing molecules effectively killing the smells. Ozone can also drown out organisms and bacteria that may be living in some of the deeper crevices of your vehicle. If you've been unable to identify the source of unpleasant odors in your vehicle, this treatment might just do the trick for you!" />
              <AddOnCard icon="/images/maintenance-icons/icons8-pets-100.png" title="Pet Hair Removal" text="We all love to take our furry friends with us wherever we go. In many cases, this means dander and hair gets left behind on the carpets and seats. Pet hair removal requires additional time, tools, and resources. Depending on the carpet quality and hair attribute, this can be a difficult process to restore the interior to a factory state." />
              <div id="stain-removal" className="col-md-6 col-lg-4 my-3">
                <div className="services-content text-center border py-3 py-md-5 px-3">
                  <img src="/images/maintenance-icons/icons8-splash-100.png" alt="splash icon" className="add-on-icons" />
                  <h4 className="my-3 add-on-title">Stain Removal<sup className="sup-line"><a href="#disclaimers">3</a></sup> (Extractor Vacuum)</h4>
                  <p>For some of the deeper stains in your vehicle's upholstery and carpets, shampoo and conditioner may not be enough. If you have excessive stains, deeply trapped dirt, or even smells coming from the fabrics in your vehicle, this would be a great add on service to an Interior Package. This also pairs well with an Ozone Treatment to completely refresh your interior.</p>
                </div>
              </div>
              <AddOnCard icon="/images/maintenance-icons/icons8-engine-100.png" title="Engine Bay Detail" text="Do you have dust and/or debris in your engine bay? Let us take care of cleaning your engine and bay! Some of the benefits of a clean engine bay include, removal of spilled oils and/or coolant that may potentially cause heating issues, a clean slate for easier identification of leaks, and a happier mechanic!" />
              <AddOnCard icon="/images/maintenance-icons/icons8-headlight-100.png" title="Headlight Restoration" text="Over time, the exposure to sunlight, weather, and environment, can cause headlight lenses to deteriorate, reducing their effectiveness. Headlight restoration is the process used to remove oxidation, yellowing, and cloudiness from vehicle headlights to improve their appearance and performance. Let us restore your headlights to their original clarity. Added benefits include increased night time visibility and increased resale value!" />
              <AddOnCard icon="/images/maintenance-icons/icons8-paint-brush-100.png" title="Paint Touch Up" text="Daily driving can expose your car to harsh conditions, leading to rock chips, scratches from mailboxes, or even scrapes from shopping carts. For minor paint damage, touch-up paint offers a cost-effective alternative to a full respray. While it won't completely erase the blemish, it will significantly reduce its visibility and shield your vehicle's metal from the elements." />
              <AddOnCard icon="/images/maintenance-icons/icons8-car-door-100.png" title="Trim Restoration" text="Cladding, garnishes, rubber seals, grilles, and other non-painted parts deal with harsh weather conditions. What was once shining black trims, are now faded gray after years of taking a beating. We can restore the look of your vehicle's trim accents to get it looking like new!" />
              <AddOnCard icon="/images/maintenance-icons/icons8-undercarriage-100.png" title="Undercarriage Cleaning" text="Whether you've recently been through salt, been on a road trip, or off roading, the underside of your vehicle may have accumulated dirt, grime, and/or salt. An undercarriage cleaning is the perfect solution to remove unwanted debris. Benefits include reduced risk of rust and corrosion, reduced suspension wear, and more!" />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <div id="disclaimers" className="container py-3">
        <ul className="list-unstyled">
          <li className="py-2"><sup className="sup-line"><a href="#detailingPrice">1</a></sup> Wax protection longevity varies based on vehicle condition, storage, and maintenance. Pre-existing paint damage or aftermarket paint may also affect the wax's lifespan. For optimal results, regular care and garaging are recommended.</li>
          <li className="py-2"><sup className="sup-line"><a href="#add-ons-section">2</a></sup> Cabin Air Filter Replacements need to be inquired prior to the detail. We would need to confirm make/model/year/vin as well as filter availability prior to confirming booking.</li>
          <li className="py-2"><sup className="sup-line"><a href="#stain-removal">3</a></sup> Each stain gets multiple steps of treatment for removal. Usually, we are able to remove the stain in question. However, in some cases, the stain might be etched deep into the fabric or surface we are treating, and is beyond repair. Refunds will not be provided once the add-on service has been completed.</li>
        </ul>
      </div>

      {/* Ceramic Coating modal */}
      <div className="modal fade" id="ceramicModal" tabIndex={-1} aria-labelledby="ceramicModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ceramicModalLabel">What is Ceramic Coating?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Ceramic coatings are a protective layer applied to your vehicle's paint to protect and enhance the look of your vehicle and extend the life of your paint. Once we are done with our extensive decontamination wash process, we lock in using our ceramic coating to give your vehicle its best look possible. The ceramic coatings we use are designed to make your vehicle easy to wash and dry, and protect your paint's clear coat from contaminants such as tree sap, and brake dust. With regular maintenance, your protective coating should last anywhere between 5-7 years.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container footer-containerG mt-5 mt-md-0 pt-2">
          <div>
            <img
              src="https://res.cloudinary.com/dnsc73sla/image/upload/v1752006942/logo-gold-horse-name_dmbkjk.svg"
              alt="Supreme Nomads Logo"
              className="footer-logo mx-auto d-block mt-5"
            />
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0 text-center">
              <div className="footer-section">
                <h5 className="fs-5 mt-3 mt-lg-0 mb-3">We Serve</h5>
                <div className="row row-cols-1 row-cols-lg-2 g-0">
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Charlotte</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Concord</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Harrisburg</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Huntersville</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Matthews</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Waxhaw</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Lake Norman</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Fort Mill, SC</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Indian Land, SC</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="#" className="nav-link text-uppercase p-0">Rock Hill, SC</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="col-lg-4 mb-4 mb-lg-0 text-center">
              <div className="footer-section">
                <h5 className="fs-5 mt-3 mt-lg-0 mb-3">Quick Links</h5>
                <div className="row row-cols-1 g-0">
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/index.html" className="nav-link text-uppercase p-0">Home</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/project.html" className="nav-link text-uppercase p-0">Gallery</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/services.html" className="nav-link text-uppercase p-0">Our Services</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/about.html" className="nav-link text-uppercase p-0">About Us</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/academy.html" className="nav-link text-uppercase p-0">Academy</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">© 2022 - 2025 | All Rights Reserved</p>
              <p className="mb-0">Supreme Nomads Detailing LLC</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
