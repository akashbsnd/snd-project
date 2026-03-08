import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import './Academy.css';
import Logo from '../images/horizontal-logo.png';

const Academy = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Load Iconify and Bootstrap
  useEffect(() => {
    // Load Iconify
    const iconifyScript = document.createElement('script');
    iconifyScript.src = 'https://cdn.jsdelivr.net/npm/iconify-icon@1.0.7/dist/iconify-icon.min.js';
    iconifyScript.async = true;
    document.body.appendChild(iconifyScript);

    // Load Bootstrap JS
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    return () => {
      document.body.removeChild(iconifyScript);
      document.body.removeChild(bootstrapScript);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add netlify integration or other submission logic here
  };

  return (
    <>
      {/* Nav */}
      <nav className="navbar fixed-top navbar-expand-xl container-fluid p-sm-3 p-2">
        {/* Logo */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/snd-site/home">
            <img src={Logo} alt="logo" />
          </Link>

          {/* Mobile Layout */}
          <div className="d-flex align-items-center gap-3 d-xl-none">
            <a href="tel:+17045611927" className="text-white pt-2">
              <iconify-icon
                icon="ic:baseline-call"
                className="call-icon"
                style={{ fontSize: '1.5rem' }}
              ></iconify-icon>
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
              ></iconify-icon>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header my-2 mx-3">
              <img
                src="/images/logo-gold-text.svg"
                alt="Supreme Nomads Detailing Logo"
                className="hamburger-logo"
              />
              <button
                type="button"
                className="btn-close btn-close-white text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              {/* Routes */}
              <ul className="navbar-nav align-items-center justify-content-end justify-content-xxl-center flex-grow-1">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white text-uppercase mx-2 px-1 mb-2 mb-lg-0"
                    to="/snd-site/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white text-uppercase mx-2 px-1 mb-2 mb-lg-0"
                    to="/snd-site/gallery"
                  >
                    Gallery
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white text-uppercase mx-2 px-1 mb-2 mb-lg-0"
                    to="/snd-site/services"
                  >
                    Our Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white text-uppercase mx-2 px-1 mb-2 mb-lg-0"
                    to="/snd-site/about"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white text-uppercase mx-2 px-1 mb-2 mb-lg-0 active"
                    to="/snd-site/academy"
                  >
                    Academy
                  </Link>
                </li>
              </ul>

              {/* Socials */}
              <div className="d-flex mt-lg-0 align-items-center justify-content-center offcanvas-body social-div">
                <ul className="d-flex flex-row gap-2 list-unstyled mb-0 social-ul">
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
                      ></iconify-icon>
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
                      ></iconify-icon>
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
                      ></iconify-icon>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link d-flex align-items-center"
                      href="https://www.facebook.com/Supremenomads/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => window.open(e.target.href, '_blank')}
                    >
                      <iconify-icon
                        icon="ri:facebook-fill"
                        className="social-icon text-white"
                      ></iconify-icon>
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
                      ></iconify-icon>
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
                      ></iconify-icon>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Book Now */}
              <div className="book-now-div">
                <Link
                  to="/bookings"
                  className="btn btn-primary book-now-btn w-100 w-xl-auto ms-0 ms-xl-3"
                >
                  Book Now
                </Link>
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

      <div className="pb-5 academy-quote">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center hero-overlay">
              <p className="fs-3 my-5 pt-5">
                As Richard Feynman says, "If you want to master something, teach it."
                Whether you're looking to start your own detailing business or just want
                to learn some tips and tricks to take care of your own vehicle in
                between details, you've come to the right spot. Even if you have no
                interest in detailing, we encourage you to stick around as we share our
                passion for automobiles and the art of preserving them. We've got
                something for all of you. Want to know when this section releases?
              </p>
            </div>
          </div>

          <div className="row justify-content-center py-3">
            <div className="col-md-6 text-center">
              <h2 className="fs-3 text-uppercase mb-4">Join The Mailing List!</h2>
              <form
                id="form"
                method="post"
                action="#"
                onSubmit={handleSubmit}
                className="form-group flex-wrap"
              >
                <div className="d-flex flex-column gap-3 mb-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Write Your Name Here"
                    className="form-control ps-3"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Write Your Email Here"
                    className="form-control ps-3"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg text-uppercase btn-rounded-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <section id="footer">
        <div className="container footer-containerG mt-5 mt-md-0 pt-2">
          <div>
            <img
              src="https://res.cloudinary.com/dnsc73sla/image/upload/v1752006942/logo-gold-horse-name_dmbkjk.svg"
              alt="Supreme Nomands Logo"
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
                        style={{ verticalAlign: 'middle', marginRight: '6px' }}
                      ></iconify-icon>
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
                        style={{ verticalAlign: 'middle', marginRight: '6px' }}
                      ></iconify-icon>
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
                      >
                        <iconify-icon
                          className="social-icon-footer pe-4"
                          icon="ri:tiktok-fill"
                        ></iconify-icon>
                      </a>
                      <a
                        href="https://www.instagram.com/supremenomads"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          className="social-icon-footer pe-4"
                          icon="mdi:instagram"
                        ></iconify-icon>
                      </a>
                      <a
                        href="https://www.facebook.com/Supremenomads/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => window.open(e.target.href, '_blank')}
                      >
                        <iconify-icon
                          className="social-icon-footer pe-4"
                          icon="mdi:facebook"
                        ></iconify-icon>
                      </a>
                      <a
                        href="https://www.yelp.com/biz/supreme-nomads-detailing-charlotte"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          className="social-icon-footer pe-4"
                          icon="mdi:yelp"
                        ></iconify-icon>
                      </a>
                      <a
                        href="https://www.youtube.com/@SupremeNomads"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <iconify-icon
                          className="social-icon-footer"
                          icon="mdi:youtube"
                        ></iconify-icon>
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

            {/* Quick Links */}
            <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center">
              <h5 className="fs-5 mt-3 mt-lg-0 mb-3">Quick Links</h5>
              <div className="row row-cols-1 g-0">
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link to="/snd-site/home" className="nav-link text-uppercase p-0">Home</Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link to="/snd-site/gallery" className="nav-link text-uppercase p-0">Gallery</Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link to="/snd-site/services" className="nav-link text-uppercase p-0">Our Services</Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link to="/snd-site/about" className="nav-link text-uppercase p-0">About Us</Link>
                  </div>
                </div>
                <div className="col">
                  <div className="footer-list mb-3">
                    <Link to="/snd-site/academy" className="nav-link text-uppercase p-0">Academy</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Copyright */}
        <div className="container">
          <footer className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center py-2 border-top">
            <p className="mb-1 mb-md-0 footer-copy">
              © 2022 - 2025 | All Rights Reserved
            </p>
            <p className="mb-0 footer-copy">Supreme Nomads Detailing LLC</p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Academy;
