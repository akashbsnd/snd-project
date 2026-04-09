import "../css/vendor.css";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Footer from "../../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "./Academy.css";
import Logo from "../images/horizontal-logo.png";
import { usePost } from "../../../hooks/usePosts";

const portableTextComponents = {
  block: {
    h1: ({ children }) => <h1 style={{ color: "#13325c" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ color: "#13325c" }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ color: "#13325c" }}>{children}</h3>,
    normal: ({ children }) => (
      <p className="fs-5 lh-lg" style={{ color: "#444" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="blockquote border-start ps-4 my-4"
        style={{ borderColor: "#dca958 !important", color: "#555" }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: "#dca958" }}>
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="fs-5 lh-lg" style={{ color: "#444" }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="fs-5 lh-lg" style={{ color: "#444" }}>
        {children}
      </ol>
    ),
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { post, loading, error } = usePost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const openFacebook = (event) => {
    event.preventDefault();
    window.open("https://www.facebook.com/Supremenomads/", "_blank");
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const wordCount = (body) => {
    if (!Array.isArray(body)) return 0;
    return body
      .filter((b) => b._type === "block")
      .flatMap((b) => b.children || [])
      .map((c) => c.text || "")
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
  };

  useEffect(() => {
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    const iconifyScript = document.createElement("script");
    iconifyScript.src =
      "https://cdn.jsdelivr.net/npm/iconify-icon@1.0.7/dist/iconify-icon.min.js";
    iconifyScript.async = true;
    document.body.appendChild(iconifyScript);

    return () => {
      try {
        document.body.removeChild(bootstrapScript);
        document.body.removeChild(iconifyScript);
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar.fixed-top");
      if (navbar) {
        navbar.classList.toggle("bg-black", window.scrollY >= 200);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav className="navbar fixed-top navbar-expand-xl container-fluid p-sm-3 p-2">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="d-flex align-items-center gap-3 d-xl-none">
            <a href="tel:+17045611927" className="text-white pt-2">
              <iconify-icon icon="ic:baseline-call" style={{ fontSize: "1.5rem" }} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <iconify-icon icon="system-uicons:menu-hamburger" className="hamburger-menu" />
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
              <ul className="navbar-nav align-items-center justify-content-center flex-grow-1">
                {[
                  { path: "/", label: "Home" },
                  { path: "/gallery", label: "Gallery" },
                  { path: "/services", label: "Our Services" },
                  { path: "/about", label: "About Us" },
                  { path: "/academy", label: "Academy" },
                ].map(({ path, label }) => (
                  <li className="nav-item" key={path}>
                    <Link
                      className={`nav-link text-white text-uppercase fw-bold mx-2 px-1 mb-2 mb-lg-0 ${isActiveLink(path)}`}
                      to={path}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="d-flex align-items-center ms-auto mt-3 mt-xl-0 socials-booknow-wrapper">
                <div className="d-flex align-items-center justify-content-center social-div">
                  <ul className="d-flex flex-row gap-2 list-unstyled mb-0 social-ul">
                    {[
                      { href: "tel:+17045611927", icon: "ic:baseline-call" },
                      { href: "https://www.tiktok.com/@supremenomads704", icon: "ri:tiktok-fill" },
                      { href: "https://www.instagram.com/supremenomads", icon: "ri:instagram-line" },
                      { href: "https://www.youtube.com/@SupremeNomads", icon: "ri:youtube-fill" },
                      { href: "https://www.yelp.com/biz/supreme-nomads-detailing-charlotte", icon: "mdi:yelp" },
                    ].map(({ href, icon }) => (
                      <li className="nav-item" key={icon}>
                        <a
                          className="nav-link d-flex align-items-center p-0 m-0"
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <iconify-icon icon={icon} className="social-icon text-white" />
                        </a>
                      </li>
                    ))}
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center p-0 m-0"
                        href="https://www.facebook.com/Supremenomads/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={openFacebook}
                      >
                        <iconify-icon icon="ri:facebook-fill" className="social-icon text-white" />
                      </a>
                    </li>
                  </ul>
                </div>
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

      {/* Content */}
      <main style={{ paddingTop: "80px", minHeight: "60vh", background: "#fff" }}>
        {loading ? (
          <div className="text-center py-5 my-5">
            <div className="spinner-border" style={{ color: "#dca958" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error || !post ? (
          <div className="container text-center py-5 my-5">
            <h3 style={{ color: "#13325c" }}>Post not found</h3>
            <p className="text-muted">We couldn't find that article.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/academy")}
              style={{ background: "#dca958", borderColor: "#dca958", color: "#13325c" }}
            >
              ← Back to Academy
            </button>
          </div>
        ) : (
          <article className="container py-5" style={{ maxWidth: "860px" }}>
            {/* Back link */}
            <Link
              to="/academy"
              className="text-decoration-none mb-4 d-inline-block small"
              style={{ color: "#dca958" }}
            >
              ← Back to Academy
            </Link>

            {/* Title */}
            <h1 className="display-5 fw-bold mt-3 mb-3" style={{ color: "#13325c" }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className="d-flex align-items-center gap-3 mb-4">
              {post.authorImage && (
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                />
              )}
              <div>
                <div className="fw-semibold" style={{ color: "#13325c" }}>
                  {post.authorName}
                </div>
                <div className="small text-muted">
                  {formatDate(post.publishedAt)}
                  {post.body && ` · ${Math.max(1, Math.ceil(wordCount(post.body) / 200))} min read`}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                className="img-fluid rounded mb-4 w-100"
                style={{ maxHeight: "480px", objectFit: "cover" }}
              />
            )}

            {/* Body */}
            <div className="post-body">
              {post.body ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : (
                <p className="text-muted">This post has no content yet.</p>
              )}
            </div>

            {/* Footer nav */}
            <div className="mt-5 pt-4 border-top">
              <Link
                to="/academy"
                className="text-decoration-none"
                style={{ color: "#dca958" }}
              >
                ← Back to Academy
              </Link>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </>
  );
}
