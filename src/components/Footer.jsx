import { Link } from "react-router-dom";

export default function Footer() {
  const openFacebook = (event) => {
    event.preventDefault();
    window.open("https://www.facebook.com/Supremenomads/", "_blank");
  };

  return (
    <section id="footer" style={{ background: "#1a1a1a", color: "white" }}>
      <div className="container footer-containerG mt-3 mt-md-0 pt-2" style={{ background: "#1a1a1a" }}>
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
            <h5 className="fs-5 mt-3 mt-lg-0 mb-3" style={{ color: "#dc6696" }}>Mobile Detailing Unit</h5>
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
            <h5 className="fs-5 mt-3 mt-lg-0 mb-3" style={{ color: "#dc6696" }}>We Serve</h5>
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
            <h5 className="fs-5 mt-3 mt-lg-0 mb-3" style={{ color: "#dc6696" }}>Quick Links</h5>
            <div className="row row-cols-1 g-0">
              <div className="col">
                <div className="footer-list mb-3">
                  <Link to="/" className="nav-link text-uppercase p-0">Home</Link>
                </div>
              </div>
              <div className="col">
                <div className="footer-list mb-3">
                  <Link to="/gallery" className="nav-link text-uppercase p-0">Gallery</Link>
                </div>
              </div>
              <div className="col">
                <div className="footer-list mb-3">
                  <Link to="/services" className="nav-link text-uppercase p-0">Our Services</Link>
                </div>
              </div>
              <div className="col">
                <div className="footer-list mb-3">
                  <Link to="/about" className="nav-link text-uppercase p-0">About Us</Link>
                </div>
              </div>
              <div className="col">
                <div className="footer-list mb-3">
                  <Link to="/academy" className="nav-link text-uppercase p-0">Academy</Link>
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
  );
}
