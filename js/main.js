// ==============================
// PERSONAL INFORMATION
// EDIT THIS SECTION
// ==============================
const portfolioConfig = {
  name: "YOUR NAME",
  email: "your.email@example.com",
  phone: "+63 000 000 0000",
  location: "Philippines"
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("primaryMenu");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const typingText = document.getElementById("typingText");
  const loader = document.getElementById("pageLoader");

  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("hidden"), 250);
  });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Sticky header + back to top
  const handleScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 30);
    backToTop?.classList.toggle("visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Active section navigation
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));

  // Theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (systemDark ? "dark" : "light"));

  themeToggle?.addEventListener("click", () => {
    const next = body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  function setTheme(theme) {
    if (theme === "dark") {
      body.dataset.theme = "dark";
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      body.dataset.theme = "light";
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  // Typing effect
  const titles = ["Web Developer", "Frontend Developer", "Software Developer", "UI/UX Enthusiast", "IT Student"];
  if (typingText) {
    if (prefersReducedMotion) {
      typingText.textContent = titles[0];
    } else {
      let titleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeLoop() {
        const current = titles[titleIndex];
        typingText.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);

        let delay = deleting ? 45 : 85;
        if (!deleting && charIndex > current.length) {
          deleting = true;
          delay = 1200;
        } else if (deleting && charIndex < 0) {
          deleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          charIndex = 0;
          delay = 350;
        }
        setTimeout(typeLoop, delay);
      }
      typeLoop();
    }
  }

  // Contact form validation only; no fake sending
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
      showFormMessage("Please complete all required fields.", "error");
      return;
    }

    if (!email.checkValidity()) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    showFormMessage("Validation successful. Connect this form to an email service or backend before using it to send messages.", "success");
    contactForm.reset();
  });

  function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
  }

  // Modal handling
  document.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeAllModals);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAllModals();
  });

  document.querySelectorAll(".certificate-view").forEach(button => {
    button.addEventListener("click", () => {
      const modal = document.getElementById("certificateModal");
      document.getElementById("certificateModalImage").src = button.dataset.image;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      body.classList.add("modal-open");
    });
  });

  document.querySelectorAll(".service-more").forEach(button => {
    button.addEventListener("click", () => {
      const service = button.dataset.service;
      window.alert(`${service}: customize this service description and add your preferred contact workflow.`);
    });
  });

  function closeAllModals() {
    document.querySelectorAll(".modal.open").forEach(modal => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });
    body.classList.remove("modal-open");
  }
});
