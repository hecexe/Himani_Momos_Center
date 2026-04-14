const loader = document.getElementById("loader");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".topbar");
const slides = Array.from(document.querySelectorAll(".hero__slide"));
const dots = Array.from(document.querySelectorAll(".hero__dot"));
const revealItems = document.querySelectorAll(".reveal");
const particlesRoot = document.getElementById("heroParticles");
const addCartButtons = document.querySelectorAll(".add-cart");
const toast = document.getElementById("toast");
const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
const galleryButtons = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const parallaxCards = document.querySelectorAll(".parallax-card");
const contactForm = document.querySelector(".contact-form");

let activeSlide = 0;
let toastTimer;
let testimonialIndex = 0;

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("is-hidden"), 850);
});

const showSlide = (index) => {
  activeSlide = index;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
};

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
  });
});

setInterval(() => {
  showSlide((activeSlide + 1) % slides.length);
}, 4500);

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

const chiliIcon = String.fromCodePoint(127798, 65039);
const sparkIcon = String.fromCodePoint(10024);
const spiceIcons = [chiliIcon, sparkIcon, chiliIcon, "."];
for (let i = 0; i < 18; i += 1) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.textContent = spiceIcons[i % spiceIcons.length];
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${8 + Math.random() * 10}s`;
  particle.style.animationDelay = `${Math.random() * 6}s`;
  particle.style.opacity = `${0.08 + Math.random() * 0.22}`;
  particlesRoot.appendChild(particle);
}

window.addEventListener("mousemove", (event) => {
  const { innerWidth, innerHeight } = window;
  const offsetX = (event.clientX / innerWidth - 0.5) * 2;
  const offsetY = (event.clientY / innerHeight - 0.5) * 2;

  parallaxCards.forEach((card) => {
    const depth = Number(card.dataset.depth || 12);
    card.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
  });
});

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1700);
};

addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Added";
    button.classList.add("is-added");
    showToast("Added to cart");

    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.classList.remove("is-added");
    }, 1400);
  });
});

const showTestimonial = (index) => {
  testimonialCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === index);
  });
};

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  showTestimonial(testimonialIndex);
}, 3800);

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.lightbox;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  showToast("Inquiry sent successfully");
});
