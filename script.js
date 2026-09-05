document.documentElement.classList.add("js");

const typingText = "BS Information Technology Student | Networking • Infrastructure • Data Analytics • Cybersecurity • Software Development";
const typingTarget = document.getElementById("typing");
let typingIndex = 0;

function type() {
  if (typingIndex < typingText.length) {
    typingTarget.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;
    setTimeout(type, 35);
  }
}

const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (typingTarget) {
  if (prefersReducedMotion) typingTarget.textContent = typingText;
  else type();
}

// THEME
const themeToggle = document.getElementById("toggleTheme");

function setTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  // Theme persistence is optional when storage is unavailable.
}

const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
setTheme(savedTheme ? savedTheme === "light" : prefersLight);

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  setTheme(isLight);
  try {
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  } catch (error) {
    // Theme still works for the current visit.
  }
});

// MOBILE NAVIGATION
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  mainNav.classList.remove("is-open");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.querySelector(".sr-only").textContent = "Open navigation menu";
}

mobileMenuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.querySelector(".sr-only").textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
});

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  reveals.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight - 100) element.classList.add("active");
  });
}

window.addEventListener("scroll", revealSections, { passive: true });
revealSections();

// PROJECT DATA
const projects = {
  NOC: {
    title: "NOC Monitoring Platform",
    desc: "Full-stack network and infrastructure monitoring with a Next.js dashboard, FastAPI/Python services, an independent collector, PostgreSQL persistence, persistent alerts, historical monitoring, and coverage-aware reliability analytics.",
    images: ["images/noc/dashboard-overview.png", "images/noc/monitoring-architecture.png"],
    imageAlts: [
      "NOC Monitoring Platform dashboard overview showing infrastructure health, service status, alerts, and monitoring metrics",
      "NOC Monitoring Platform monitoring architecture diagram showing the dashboard, services, collector, database, and monitored infrastructure"
    ]
  },
  DigiDocs: {
    title: "DigiDocs",
    desc: "Flutter/Dart desktop application with SQLite persistence, document and file workflows, role-based accounts, PBKDF2 password hashing, authorization, notes, calendar, and audit functionality.",
    images: [
      "images/DigiDocs/Login.png", "images/DigiDocs/AccountsAdmin.png", "images/DigiDocs/AdminDashboard.png",
      "images/DigiDocs/AuditLogsAdmin.png", "images/DigiDocs/Calendar.png", "images/DigiDocs/FileOpening.png",
      "images/DigiDocs/Notes.png", "images/DigiDocs/UserDashboard.png"
    ]
  },
  FloodFacts: {
    title: "FloodFacts",
    desc: "HTML, CSS, JavaScript, and Bootstrap awareness platform with Firebase Authentication, Cloud Firestore, preparedness guidance, checklists, a flood-safety quiz, and community stories.",
    images: [
      "images/FloodFacts/LandingPage.png", "images/FloodFacts/Login.png", "images/FloodFacts/AboutUs.png",
      "images/FloodFacts/CommunityStories.png", "images/FloodFacts/Preparedness.png", "images/FloodFacts/Quiz.png",
      "images/FloodFacts/StorySubmission.png"
    ]
  },
  Networking_Basics: {
    title: "Cisco Networking Basics",
    desc: "Networking Basics certificate.",
    images: ["images/Certificates/Networking_Basics_certificate.png"]
  },
  CCNA_Intro: {
    title: "CCNA: Introduction to Networks",
    desc: "CCNA Introduction to Networks certificate.",
    images: ["images/Certificates/CCNA-_Introduction_to_Networks_certificate.png"]
  },
  PacketTracer: {
    title: "Getting Started with Cisco Packet Tracer",
    desc: "Getting Started with Cisco Packet Tracer certificate.",
    images: ["images/Certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate.png"]
  },
  Python_Essentials_2: {
    title: "Python Essentials 2",
    desc: "Python Essentials 2 certificate.",
    images: ["images/Certificates/Python_Essentials_2_certificate.png"]
  }
};

// MODAL GALLERY
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalViewer = document.getElementById("modalViewer");
const modalGallery = document.getElementById("modalGallery");
const closeButton = modal.querySelector(".close");
let currentImages = [];
let currentIndex = 0;
let lastTrigger = null;

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastTrigger) lastTrigger.focus();
}

function openModal(key, trigger) {
  const project = projects[key];
  if (!project) return;

  lastTrigger = trigger;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalViewer.textContent = "";
  modalGallery.textContent = "";
  currentImages = project.images || [];
  currentIndex = 0;

  const mainImage = document.createElement("img");
  mainImage.alt = project.imageAlts?.[0] || `${project.title} screenshot`;
  modalViewer.appendChild(mainImage);

  const updateImage = (index) => {
    if (index < 0 || index >= currentImages.length) return;
    currentIndex = index;
    mainImage.src = currentImages[currentIndex];
    mainImage.alt = project.imageAlts?.[currentIndex] || `${project.title} screenshot ${currentIndex + 1}`;
    modalGallery.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === currentIndex);
      button.setAttribute("aria-current", buttonIndex === currentIndex ? "true" : "false");
    });
  };

  currentImages.forEach((src, index) => {
    const thumbnail = document.createElement("button");
    thumbnail.type = "button";
    thumbnail.className = "gallery-thumb";
    thumbnail.setAttribute("aria-label", `View ${project.title} image ${index + 1}${project.imageAlts?.[index] ? `: ${project.imageAlts[index]}` : ""}`);
    thumbnail.setAttribute("aria-current", index === 0 ? "true" : "false");
    const thumbnailImage = document.createElement("img");
    thumbnailImage.src = src;
    thumbnailImage.alt = "";
    thumbnail.appendChild(thumbnailImage);
    thumbnail.addEventListener("click", () => updateImage(index));
    modalGallery.appendChild(thumbnail);
  });

  updateImage(0);
  closeButton.focus();
}

document.querySelectorAll("[data-project]").forEach((card) => {
  const trigger = card.querySelector(".project-trigger");
  trigger.addEventListener("click", () => openModal(card.dataset.project, trigger));
});

closeButton.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (!modal.hidden && event.key === "Tab") {
    const focusable = [closeButton, ...modalGallery.querySelectorAll("button")].filter((element) => !element.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  if (event.key === "Escape") {
    if (!modal.hidden) closeModal();
    else if (mainNav.classList.contains("is-open")) closeMenu();
  }
  if (!modal.hidden && event.key === "ArrowRight") {
    const next = Math.min(currentIndex + 1, currentImages.length - 1);
    const button = modalGallery.querySelectorAll("button")[next];
    if (button) button.click();
  }
  if (!modal.hidden && event.key === "ArrowLeft") {
    const previous = Math.max(currentIndex - 1, 0);
    const button = modalGallery.querySelectorAll("button")[previous];
    if (button) button.click();
  }
});
