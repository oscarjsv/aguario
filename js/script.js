// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mainNav.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (mainNav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow on scroll
  if (currentScroll > 50) {
    header.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
  } else {
    header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
  }

  lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
  ".about-card, .service-card, .objective-item, .project-card, .impact-card, .value-item"
);

animatedElements.forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `all 0.4s ease ${index * 0.1}s`;
  observer.observe(el);
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (
      navLink &&
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.style.color = "";
        link.style.background = "";
      });
      navLink.style.color = "#1E88E5";
      navLink.style.background = "#F5F9FC";
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// ===================================
// Touch-friendly Enhancements
// ===================================
// Add touch feedback to buttons
const buttons = document.querySelectorAll(
  ".btn, .whatsapp-button, .social-link"
);

buttons.forEach((button) => {
  button.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.95)";
  });

  button.addEventListener("touchend", function () {
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

// ===================================
// Performance: Lazy Load Background Images
// ===================================
if ("IntersectionObserver" in window) {
  const heroSection = document.querySelector(".hero");
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Hero background is already loaded via CSS
        heroObserver.unobserve(entry.target);
      }
    });
  });

  if (heroSection) {
    heroObserver.observe(heroSection);
  }
}

// ===================================
// Console Welcome Message
// ===================================
console.log(
  "%c🌊 AGUARIO - Integración para un territorio vivo",
  "color: #1E88E5; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c🌿 Desarrollado con tecnologías web modernas",
  "color: #43A047; font-size: 12px;"
);
// ===================================
// Slider Dots Logic (Generic)
// ===================================
function setupSliderDots(gridSelector, dotsSelector, cardSelector) {
  const grid = document.querySelector(gridSelector);
  const dotsContainer = document.querySelector(dotsSelector);

  if (grid && dotsContainer) {
    const dots = dotsContainer.querySelectorAll(".dot");

    if (dots.length > 0) {
      // Update dots on scroll
      grid.addEventListener("scroll", () => {
        const scrollPosition = grid.scrollLeft;
        const card = grid.querySelector(cardSelector);
        if (!card) return;

        const cardWidth = card.offsetWidth;
        const gap = 24;
        const activeIndex = Math.round(scrollPosition / (cardWidth + gap));

        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      });

      // Click dot to scroll
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          const card = grid.querySelector(cardSelector);
          if (!card) return;
          const cardWidth = card.offsetWidth;
          const gap = 24;
          grid.scrollTo({
            left: index * (cardWidth + gap),
            behavior: "smooth",
          });
        });
      });
    }
  }
}

// Initialize sliders
document.addEventListener("DOMContentLoaded", () => {
  setupSliderDots(".about-grid", ".about-dots", ".about-card");
  setupSliderDots(".services-grid", ".services-dots", ".service-card");
});
