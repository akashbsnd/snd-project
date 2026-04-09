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
            src="https://res.cloudinary.com/dnsc73sla/image/upload/q_auto/f_auto/v1775774653/Pink_White_jhrj1g.svg"
            alt="Supreme Nomads Logo"
            className="footer-logo mx-auto d-block mt-5"
          />
        </div>

        {/* Main Footer */}
        <footer className="footer-main-grid py-3">
          {/* Contact Us — 6 direct children: heading + 5 rows */}
          <div className="footer-col-subgrid">
            <h5 className="fs-5 fw-bold mt-3 mt-lg-0" style={{ color: "#dc6696" }}>Mobile Detailing Unit</h5>
            <div className="footer-list mb-3 mb-lg-0">
              <h6 className="mobile footer-heading2">We Come To You!</h6>
            </div>
            <div className="footer-list mb-3 mb-lg-0">
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
            <div className="footer-list mb-3 mb-lg-0">
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
            <div className="footer-list mb-3 mb-lg-0">
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
            <div className="footer-list mb-3 mb-lg-0">
              <span>
                <iconify-icon
                  icon="simple-icons:icons8"
                  style={{ verticalAlign: "middle", marginRight: "4px", fontSize: "14px" }}
                />
                Icons by
                <a
                  href="https://icons8.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-1"
                >
                  Icons8
                </a>
              </span>
            </div>
          </div>

          {/* Cities — 6 direct children: heading + 5 city rows */}
          <div className="footer-col-subgrid footer-col-cities">
            <h5 className="fs-5 fw-bold mt-3 mt-lg-0" style={{ color: "#dc6696" }}>We Serve</h5>
            <div className="cities-row">
              <a href="#" className="nav-link text-uppercase p-0">Charlotte</a>
              <a href="#" className="nav-link text-uppercase p-0">Concord</a>
              <a href="#" className="nav-link text-uppercase p-0">Cornelius</a>
            </div>
            <div className="cities-row">
              <a href="#" className="nav-link text-uppercase p-0">Harrisburg</a>
              <a href="#" className="nav-link text-uppercase p-0">Huntersville</a>
              <a href="#" className="nav-link text-uppercase p-0">Indian Trail</a>
            </div>
            <div className="cities-row">
              <a href="#" className="nav-link text-uppercase p-0">Matthews</a>
              <a href="#" className="nav-link text-uppercase p-0">Mooresville</a>
              <a href="#" className="nav-link text-uppercase p-0">Waxhaw</a>
            </div>
            <div className="cities-row">
              <a href="#" className="nav-link text-uppercase p-0">Lake Norman</a>
              <a href="#" className="nav-link text-uppercase p-0">Pineville</a>
              <a href="#" className="nav-link text-uppercase p-0" style={{ whiteSpace: "nowrap" }}>Fort Mill, SC</a>
            </div>
            <div className="cities-row">
              <a href="#" className="nav-link text-uppercase p-0" style={{ whiteSpace: "nowrap" }}>Indian Land, SC</a>
              <a href="#" className="nav-link text-uppercase p-0" style={{ whiteSpace: "nowrap" }}>Lake Wylie, SC</a>
              <a href="#" className="nav-link text-uppercase p-0">Rock Hill, SC</a>
            </div>
          </div>

          {/* Quick Links — 6 direct children: heading + 5 links */}
          <div className="footer-col-subgrid">
            <h5 className="fs-5 fw-bold mt-3 mt-lg-0" style={{ color: "#dc6696" }}>Quick Links</h5>
            <div className="footer-list mb-3 mb-lg-0">
              <Link to="/" className="nav-link text-uppercase p-0">Home</Link>
            </div>
            <div className="footer-list mb-3 mb-lg-0">
              <Link to="/gallery" className="nav-link text-uppercase p-0">Gallery</Link>
            </div>
            <div className="footer-list mb-3 mb-lg-0">
              <Link to="/services" className="nav-link text-uppercase p-0">Our Services</Link>
            </div>
            <div className="footer-list mb-3 mb-lg-0">
              <Link to="/about" className="nav-link text-uppercase p-0">About Us</Link>
            </div>
            <div className="footer-list mb-3 mb-lg-0">
              <Link to="/academy" className="nav-link text-uppercase p-0">Academy</Link>
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
