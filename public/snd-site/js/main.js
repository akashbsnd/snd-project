// Navigation Active State Management
document.addEventListener("DOMContentLoaded", function () {
  // Get current page URL
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Remove active class from all nav links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  // Set active states based on current page
  if (currentPage === "index.html" || currentPage === "") {
    // Home page
    const homeLink = document.querySelector('a[href="index.html"]');
    if (homeLink) homeLink.classList.add("active");
  } else if (currentPage === "project.html") {
    // Gallery page
    const galleryLink = document.querySelector('a[href="project.html"]');
    if (galleryLink) galleryLink.classList.add("active");
  } else if (currentPage === "services.html") {
    // Services page - highlight the main "Our Services" dropdown toggle
    const servicesDropdown = document.querySelector(
      'a[href="services.html"].dropdown-toggle',
    );
    if (servicesDropdown) servicesDropdown.classList.add("active");
  } else if (currentPage === "about.html") {
    // About page
    const aboutLink = document.querySelector('a[href="about.html"]');
    if (aboutLink) aboutLink.classList.add("active");
  } else if (currentPage === "services-single.html") {
    // Academy page
    const academyLink = document.querySelector(
      'a[href="services-single.html"]',
    );
    if (academyLink) academyLink.classList.add("active");
  }

  // Handle dropdown clicks - prevent dropdown items from affecting parent
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Don't add active to dropdown toggle when dropdown item is clicked
      const dropdownToggle =
        this.closest(".dropdown").querySelector(".dropdown-toggle");
      if (dropdownToggle) {
        // Remove any accidentally added active states
        dropdownToggle.classList.remove("show");
      }
    });
  });

  // Handle dropdown toggle behavior
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("shown.bs.dropdown", function () {
      // When dropdown opens, don't add active class
      this.classList.remove("active");
    });

    toggle.addEventListener("hidden.bs.dropdown", function () {
      // When dropdown closes, restore active state only if we're on services page
      if (
        currentPage === "services.html" &&
        this.getAttribute("href") === "services.html"
      ) {
        this.classList.add("active");
      }
    });
  });
});
