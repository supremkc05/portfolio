(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Theme ─────────────────────────────────────────── */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemDark ? "dark" : "light");
  applyTheme(initialTheme);

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (!themeIcon) return;
    themeIcon.classList.toggle("fa-moon", theme !== "dark");
    themeIcon.classList.toggle("fa-sun", theme === "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => { themeToggle.style.transform = ""; }, 150);
  });

  /* ── Nav ───────────────────────────────────────────── */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];

  const onScroll = () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle?.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu?.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.classList.remove("open");
      navMenu?.classList.remove("open");
    });
  });

  const sections = [...document.querySelectorAll("section[id]")];
  const spy = () => {
    const y = window.scrollY + 100;
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= y) current = section.id;
    }
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* ── Reveal on scroll ──────────────────────────────── */
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add("visible"), delay);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ── Typewriter ────────────────────────────────────── */
  const nameEl = document.getElementById("hero-name");
  const fullName = "Suprem Khatri";

  async function typewriter(el, text, speed = 70) {
    if (!el) return;
    if (prefersReduced) {
      el.textContent = text;
      el.classList.add("done");
      return;
    }
    el.textContent = "";
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await wait(speed);
    }
    el.classList.add("done");
  }

  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  /* ── Role rotation ─────────────────────────────────── */
  const roles = ["Software Engineer", "Data Analyst", "Full-Stack Builder"];
  const roleEl = document.getElementById("role-rotate");
  let roleIndex = 0;

  async function rotateRole() {
    if (!roleEl || prefersReduced) return;
    while (true) {
      await wait(2200);
      roleEl.style.opacity = "0";
      roleEl.style.transform = "translateY(6px)";
      await wait(280);
      roleIndex = (roleIndex + 1) % roles.length;
      roleEl.textContent = roles[roleIndex];
      roleEl.style.opacity = "1";
      roleEl.style.transform = "translateY(0)";
    }
  }

  if (roleEl) {
    roleEl.style.transition = "opacity 0.28s ease, transform 0.28s ease";
  }

  typewriter(nameEl, fullName).then(rotateRole);

  /* ── Projects ──────────────────────────────────────── */
  const projects = [
    {
      title: "PulseScope",
      image: "assets/images/pulsescope.jpeg",
      description:
        "Production-ready financial news analytics platform processing 50K+ articles with 87% sentiment accuracy (FinBERT + VADER), cutting manual analysis time by ~40%. React/TypeScript dashboard with BERTopic topic modelling and FastAPI backends.",
      tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "FinBERT", "BERTopic"],
      github: "https://github.com/supremkc05/PulseScope",
      demo: null,
    },
    {
      title: "Ecommerce Analytics & Sales Forecasting",
      image: "assets/images/ecommerce.jpeg",
      description:
        "End-to-end ETL pipeline for 10K+ transactions in PostgreSQL with Docker. Facebook Prophet 90-day forecasting under 8% MAE, plus Power BI dashboards for segments, revenue trends, and country-level performance.",
      tags: ["Python", "PostgreSQL", "Docker", "Prophet", "Power BI", "ETL"],
      github: "https://github.com/supremkc05/ecommerce-analytics-forecasting",
      demo: null,
    },
    {
      title: "DokanDaftar",
      image: "assets/images/dokandaftar.jpeg",
      description:
        "Nepal-first multi-tenant SaaS for inventory, sales billing, customer credit (udhaaro), and IRD-oriented VAT invoicing with Nepali fiscal-year rules, replacing paper khata for retailers.",
      tags: ["Django", "React", "PostgreSQL", "Multi-tenant", "VAT"],
      github: "https://github.com/supremkc05/Capstone",
      demo: null,
    },
  ];

  const grid = document.getElementById("projects-grid");
  if (grid) {
    grid.innerHTML = projects
      .map(
        (p, i) => `
      <article class="project-card reveal" data-delay="${i * 90}">
        <div class="project-thumb">
          <img class="project-thumb-img" src="${p.image}" alt="${p.title} preview" loading="lazy">
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-tags">
            ${p.tags.map((t) => `<span>${t}</span>`).join("")}
          </div>
          <div class="project-links">
            <a class="btn btn-sm btn-primary" href="${p.github}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-github"></i> GitHub
            </a>
            ${
              p.demo
                ? `<a class="btn btn-sm btn-ghost" href="${p.demo}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live demo
                  </a>`
                : `<button class="btn btn-sm btn-ghost" type="button" data-demo-soon>
                    <i class="fas fa-external-link-alt"></i> Demo soon
                  </button>`
            }
          </div>
        </div>
      </article>`
      )
      .join("");

    // observe newly added reveals
    if (!prefersReduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add("visible"), delay);
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    } else {
      grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    }

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-demo-soon]");
      if (!btn) return;
      btn.textContent = "Demo coming soon";
      setTimeout(() => {
        btn.innerHTML = `<i class="fas fa-external-link-alt"></i> Demo soon`;
      }, 1800);
    });
  }

  /* ── Contact form (mailto fallback) ────────────────── */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      status.classList.add("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Enter a valid email address.";
      status.classList.add("error");
      return;
    }

    status.classList.remove("error");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n- ${name}\n${email}`);
    window.location.href = `mailto:Supremekc83.work@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email client…";
    form.reset();
  });

  /* ── Footer year ───────────────────────────────────── */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
