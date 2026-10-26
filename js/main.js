(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Dropdown */
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = dropdown.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown.is-open").forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
  });

  /* Hero carousel */
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dotsWrap = document.querySelector(".hero-dots");
  const prev = document.querySelector(".hero-prev");
  const next = document.querySelector(".hero-next");
  let index = 0;
  let timer;

  if (slides.length && dotsWrap) {
    const dots = slides.map((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
      btn.addEventListener("click", () => go(i));
      dotsWrap.appendChild(btn);
      return btn;
    });

    const go = (nextIndex) => {
      slides[index].classList.remove("is-active");
      dots[index].classList.remove("is-active");
      index = (nextIndex + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index].classList.add("is-active");
      restart();
    };

    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 7000);
    };

    prev?.addEventListener("click", () => go(index - 1));
    next?.addEventListener("click", () => go(index + 1));
    dots[0].classList.add("is-active");
    restart();

    document.querySelector(".hero")?.addEventListener("mouseenter", () => clearInterval(timer));
    document.querySelector(".hero")?.addEventListener("mouseleave", restart);
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Active nav highlight */
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
