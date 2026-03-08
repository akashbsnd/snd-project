import { useEffect, useState, useRef } from 'react';
import "../css/vendor.css";
import 'swiper/css';
import Logo from '../images/horizontal-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/style.css";
import "./Home-Clean.css";
import "./Home-Clean-carousel.css";
import MediumTabPane from '../../../components/Home/MediumTabPane';

export default function Home() {
  const [activeTab, setActiveTab] = useState('regular-tab-pane');
  const [displayedImages, setDisplayedImages] = useState([]);
  const carouselRef = useRef(null);

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
        image: "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754182746/lp1_x8d33y.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto//v1754182746/lp1_x8d33y.png"
      },
      {
        id: 2,
        title: "Mercedes GLC 300",
        image: "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754182972/lp3_xmn6rm.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754182972/lp3_xmn6rm.png"
      },
      {
        id: 3,
        title: "Honda Civic Si",
        image: "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754182837/lp2_pyi66n.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754182837/lp2_pyi66n.png"
      },
      {
        id: 4,
        title: "Mercedes G Wagon",
        image: "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754359599/lp8_fxd3br.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754359599/lp8_fxd3br.png"
      },
      {
        id: 5,
        title: "BMW X3",
        image: "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754364681/lp5_arc7pw.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754364681/lp5_arc7pw.png"
      },
      {
        id: 6,
        title: "Tesla CyberTruck",
        image: "https://res.cloudinary.com/dnsc73sla/image/upload/c_limit,h_480,f_auto,q_auto/v1754359771/lp6_f23yy3.png",
        link: "https://res.cloudinary.com/dnsc73sla/image/upload/f_auto,q_auto/v1754359771/lp6_f23yy3.png"
      }
    ];
    
    // Create initial display: original + first 3 duplicates
    const initialDisplay = [...originalImages, ...originalImages.slice(0, 3)];
    setDisplayedImages(initialDisplay);
  }, []);

  // Carousel navigation using array manipulation
  const scrollCarousel = (direction) => {
    console.log('🎡🎡🎡🎡 SCROLL CLICKED 🎡🎡🎡🎡🎡');
    console.log('📍 Direction:', direction);
    console.log('� Current displayed images count:', displayedImages.length);
    
    let newDisplayedImages;
    
    if (direction === 'left') {
      console.log('⬅️ Moving left - removing last image, adding new one at start');
      // Remove last image, add new one at start
      const lastImage = displayedImages[displayedImages.length - 1];
      newDisplayedImages = [lastImage, ...displayedImages.slice(0, -1)];
    } else {
      console.log('➡️ Moving right - removing first image, adding new one at end');
      // Remove first image, add new one at end
      const firstImage = displayedImages[0];
      newDisplayedImages = [...displayedImages.slice(1), firstImage];
    }
    
    console.log('🔄 Updating displayed images array');
    setDisplayedImages(newDisplayedImages);
  };

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

  const scrollToQuickLinks = (event) => {
    event.preventDefault();
    const element = document.getElementById('quick-links');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const navbar = document.querySelector('.navbar.fixed-top');
      
      if (navbar) {
        if (scroll >= 200) {
          navbar.classList.add('bg-black');
        } else {
          navbar.classList.remove('bg-black');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Supreme Nomads Detailing - Charlotte - Mobile Auto Detailing</title>
      
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

      {/* Hero */}
      <section id="hero" className="homepage">
        {/* Background Video */}
        <video className="hero-video" autoPlay muted loop playsInline poster="https://res.cloudinary.com/dnsc73sla/image/upload/c_fill,g_auto,w_1920,h_1080,f_auto,q_auto,dpr_auto/hero-home-thumbnail_vss0vf.png">
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
                At <span className="sndName">Supreme Nomads Detailing</span>, our top
                priority is you.
              </p>
              <p className="hero-text mb-4">
                We strive for quality service, punctuality, and clear
                communication every time we see you.
              </p>
              <a href="#quick-links" className="btn mainbtn btn-outline-primary">
                <iconify-icon
                  icon="tabler:arrow-down"
                  className="arrow-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section id="quick-links">
        <div style={{ overflow: "hidden" }}>
          <div className="container-fluid border-bottom" data-aos="zoom-out" style={{ backgroundColor: '#dec49a' }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 padding-medium pe-lg-5 border-end">
                  <h2 className="display-4 text-center">Quick Links</h2>
                </div>
                <div className="col-md-6 padding-medium-2 ps-md-5 d-grid gap-3">
                  <a href="/bookings" className="btn btn-primary w-100 book-now-btn-links">
                    Book Now
                    <iconify-icon
                      icon="tabler:arrow-right"
                      className="arrow-icon"
                    />
                  </a>

                  <a href="/snd-site/academy" className="btn btn-primary w-100">
                    What is Detailing?
                    <iconify-icon
                      icon="tabler:arrow-right"
                      className="arrow-icon"
                    />
                  </a>

                  <a href="/snd-site/about" className="btn btn-primary w-100">
                    How do we Operate?
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
      </section>

      {/* Gallery */}
      <section
        id="project"
        className="py-5 home-gallery-section"
      >
        <div style={{ overflow: "hidden" }}>
          <div data-aos="zoom-out">
            <div className="container">
              <div className="row justify-content-center">
                <p className="header-top mb-3 text-center text-sm-start">Gallery</p>
                <h2 className="text-white display-4 text-center text-sm-start">
                  Latest Projects
                </h2>
              </div>
              <div
                className="swiper-arrow position-static position-md-absolute end-0 mt-md-5 w-100 d-flex justify-content-center pe-3"
              >
                <iconify-icon
                  icon="teenyicons:arrow-left-solid"
                  className="icon-arrow-left me-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => scrollCarousel('left')}
                />
                <iconify-icon
                  icon="teenyicons:arrow-right-solid"
                  className="icon-arrow-right"
                  style={{ cursor: 'pointer' }}
                  onClick={() => scrollCarousel('right')}
                />
              </div>
              {/* Horizontal Scrolling Carousel */}
                <div 
                  className="projects-carousel-container"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '0 -15px'
                  }}
                >
                  <div 
                    className="projects-carousel"
                    id="projectsCarousel"
                    ref={carouselRef}
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      gap: '30px',
                      padding: '0 15px',
                      scrollBehavior: 'smooth',
                      scrollbarWidth: 'none', // Hide scrollbar for cleaner look
                      msOverflowStyle: 'none' // Hide scrollbar for IE/Edge
                    }}
                  >
                    {displayedImages.map((image, index) => (
                      <div 
                        key={`${image.id}-${index}`}
                        style={{
                          flex: '0 0 calc(33.333% - 20px)',
                          minWidth: '300px',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '10px',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#000'
                        }}
                      >
                        <a
                          href={image.link}
                          title={image.title}
                          style={{
                            display: 'block',
                            position: 'relative',
                            overflow: 'hidden',
                            textDecoration: 'none'
                          }}
                        >
                          <img
                            src={image.image}
                            alt={image.title}
                            style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              display: 'block'
                            }}
                            onError={(e) => {
                              console.log('Home image failed to load:', e.target.src);
                            }}
                            onLoad={(e) => {
                              console.log('Home image loaded successfully:', e.target.src);
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              background: 'rgba(0, 0, 0, 0.6)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0,
                              transition: 'opacity 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                            onMouseLeave={(e) => e.target.style.opacity = '0'}
                          >
                            <h3 style={{ color: 'white', margin: '0' }}>{image.title}</h3>
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
          <a href="/snd-site/gallery" className="btn btn-primary mt-5">
            See More
            <iconify-icon
              icon="tabler:arrow-right"
              className="arrow-icon"
            />
          </a>
        </div>
      </section>

      {/* Detailing Packages Section */}
      <section id="detailingPrice" className="py-5 paint-packages">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="header-top mb-3">Our Services</p>
              <h2 className="display-4">Detailing Packages</h2>
            </div>
          </div>
          
          {/* Pricing Tabs */}
          <div className="nav-tabs mb-5" id="paintProtectionTab">
            <div className="row justify-content-center">
              <div className="col-md-auto">
                <button
                  className={`nav-link ${activeTab === 'regular-tab-pane' ? 'active' : ''}`}
                  onClick={() => handleTabClick('regular-tab-pane')}
                  type="button"
                >
                  Sedan/Coupé
                </button>
              </div>
              <div className="col-md-auto">
                <button
                  className={`nav-link ${activeTab === 'medium-tab-pane' ? 'active' : ''}`}
                  onClick={() => handleTabClick('medium-tab-pane')}
                  type="button"
                >
                  2 Row Suv/Small Truck
                </button>
              </div>
              <div className="col-md-auto">
                <button
                  className={`nav-link ${activeTab === 'van-tab-pane' ? 'active' : ''}`}
                  onClick={() => handleTabClick('van-tab-pane')}
                  type="button"
                >
                  3 Row Suv/Large Truck
                </button>
              </div>
            </div>
          </div>
          
          <div className="tab-content mt-4" id="paintProtectionTabContent">
            {activeTab === 'regular-tab-pane' && (
              <div className="row">
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Premium</div>
                    <h2 className="display-5 text-primary text-center">$300</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />6 Month Ceramic Wax1</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Iron Removal Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Clay Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Wheel Surfaces, Barrel, & Tire Clean</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Tire Dressing</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Foam Bath and Hand Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Shampoo and Conditioner</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Headliner Spot Cleaning</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Seats & Carpets Sanitized</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />UV Protect & Sanitize Dash/Vents/Trims/Panels</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Deep Interior & Trunk Vacuum</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows and Door Jams Cleaned</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Rain-X® Window Treatment</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Exterior</div>
                    <h2 className="display-5 text-primary text-center">$160</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />6 Month Ceramic Wax1</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Iron Removal Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Clay Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Wheel Surface, Barrel & Tire Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Tire Dressing</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Foam Bath & Hand Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows & Door Jams Cleaned</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Rain-X® Window Treatment</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Interior</div>
                    <h2 className="display-5 text-primary text-center">$160</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Shampoo and Conditioner</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Headliner Spot Cleaning</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Steam Interior Surfaces</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Seats & Carpets Sanitized</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />UV Protect and Sanitize Dash/Vents/Trims/Panels</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Deep Interior & Trunk Vacuum</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows and Door Jams Cleaned</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Express</div>
                    <h2 className="display-5 text-primary text-center">$125</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Basic Wax Coating1</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Wheel Surface and Tire Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Tire Dressing</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Foam Bath & Hand Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Seats & Carpets Sanitized</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Dash/Vents/Trims/Panels Wipe Down</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Interior Vacuum</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows Only</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'medium-tab-pane' && (
              <MediumTabPane />
            )}
            
            {activeTab === 'van-tab-pane' && (
              <div className="row">
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Premium</div>
                    <h2 className="display-5 text-primary text-center">$400</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />6 Month Ceramic Wax1</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Iron Removal Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Clay Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Wheel Surfaces, Barrel, & Tire Clean</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Tire Dressing</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Foam Bath and Hand Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Shampoo and Conditioner</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Headliner Spot Cleaning</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Seats & Carpets Sanitized</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />UV Protect & Sanitize Dash/Vents/Trims/Panels</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Deep Interior & Trunk Vacuum</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows and Door Jams Cleaned</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Rain-X® Window Treatment</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Exterior</div>
                    <h2 className="display-5 text-primary text-center">$200</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />6 Month Ceramic Wax1</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Iron Removal Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Clay Treatment</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Wheel Surface, Barrel & Tire Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Tire Dressing</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Foam Bath & Hand Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows & Door Jams Cleaned</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Rain-X® Window Treatment</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Interior</div>
                    <h2 className="display-5 text-primary text-center">$200</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Shampoo and Conditioner</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Headliner Spot Cleaning</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Steam Interior Surfaces</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Seats & Carpets Sanitized</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />UV Protect and Sanitize Dash/Vents/Trims/Panels</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Deep Interior & Trunk Vacuum</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows and Door Jams Cleaned</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 mb-4">
                  <div className="plan-post">
                    <div className="header-top mb-3 text-center">Express</div>
                    <h2 className="display-5 text-primary text-center">$175</h2>
                    <div className="price-option">
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Basic Wax Coating1</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Wheel Surface and Tire Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Tire Dressing</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Foam Bath & Hand Wash</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Seats & Carpets Sanitized</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Dash/Vents/Trims/Panels Wipe Down</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Interior Vacuum</p>
                      <p><iconify-icon icon="mdi:check" className="price-tick me-2" />Windows Only</p>
                    </div>
                    <div className="text-center mt-4">
                      <a href="/bookings" className="btn btn-primary">
                        Book Now
                        <iconify-icon icon="tabler:arrow-right" className="arrow-icon ms-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-3">
        <div className="container footer-containerG mt-3 mt-md-0 pt-2">
          <div>
            <img
              src="https://res.cloudinary.com/dnsc73sla/image/upload/v1752006942/logo-gold-horse-name_dmbkjk.svg"
              alt="Supreme Nomads Logo"
              className="footer-logo mx-auto d-block mt-5"
            />
          </div>

          {/* Main Footer */}
          <div className="row footer-content">
            {/* Mobile Detailing Unit */}
            <div className="col-lg-4 mb-4 mb-lg-0 text-center">
              <div className="footer-section">
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
                          style={{verticalAlign: 'middle', marginRight: '6px'}}
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
                          style={{verticalAlign: 'middle', marginRight: '6px'}}
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
                          className="me-3"
                          onClick={openFacebook}
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
                            className="social-icon-footer"
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
                      <p className="small">
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
            </div>

            {/* We Serve */}
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
                      <a href="/" className="nav-link text-uppercase p-0">Home</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/gallery" className="nav-link text-uppercase p-0">Gallery</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/services" className="nav-link text-uppercase p-0">Our Services</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/about" className="nav-link text-uppercase p-0">About Us</a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="footer-list mb-3">
                      <a href="/snd-site/academy" className="nav-link text-uppercase p-0">Academy</a>
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
