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
};

const credentials = [
  {
    key: "introduction-to-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    preview: "images/certificates/previews/introduction-to-cybersecurity.png",
    pdf: "images/certificates/Introduction_to_Cybersecurity_certificate_2023-2-00309-lpunetwork-edu-ph_aee148c5-5dcc-40b0-8df9-7e27dbba8e1b.pdf"
  },
  {
    key: "networking-basics",
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    preview: "images/certificates/previews/networking-basics.png",
    pdf: "images/certificates/Networking_Basics_certificate_2023-2-00309-lpunetwork-edu-ph_da7a601b-9235-4d04-bef1-60127261fc3f.pdf"
  },
  {
    key: "ccna-introduction-to-networks",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    preview: "images/certificates/previews/ccna-introduction-to-networks.png",
    pdf: "images/certificates/CCNA-_Introduction_to_Networks_certificate_2023-2-00309-lpunetwork-edu-ph_2353dc8e-5de4-4336-ac66-6131bdb92eff.pdf"
  },
  {
    key: "python-essentials-2",
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    preview: "images/certificates/previews/python-essentials-2.png",
    pdf: "images/certificates/Python_Essentials_2_certificate_2023-2-00309-lpunetwork-edu-ph_42d36e9f-9fb0-49ad-bffb-71006343f383.pdf"
  }
];

// MODAL GALLERY
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalViewer = document.getElementById("modalViewer");
const modalGallery = document.getElementById("modalGallery");
const credentialControls = document.getElementById("credentialControls");
const credentialPdf = document.getElementById("credentialPdf");
const credentialPrevious = document.getElementById("credentialPrevious");
const credentialNext = document.getElementById("credentialNext");
const credentialSequence = document.getElementById("credentialSequence");
const closeButton = modal.querySelector(".close");
let currentImages = [];
let currentIndex = 0;
let lastTrigger = null;
let modalType = null;
let currentCredentialIndex = 0;

function closeModal() {
  modal.hidden = true;
  modal.classList.remove("credential-modal", "project-modal");
  document.body.classList.remove("modal-open");
  modalType = null;
  if (lastTrigger) lastTrigger.focus();
}

function openModal(key, trigger) {
  const project = projects[key];
  if (!project) return;

  lastTrigger = trigger;
  modalType = "project";
  modal.classList.remove("credential-modal");
  modal.classList.add("project-modal");
  modal.hidden = false;
  document.body.classList.add("modal-open");
  credentialControls.hidden = true;
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

function openCredentialModal(index, trigger) {
  const credential = credentials[index];
  if (!credential) return;

  lastTrigger = trigger;
  modalType = "credential";
  modal.classList.remove("project-modal");
  modal.classList.add("credential-modal");
  currentCredentialIndex = index;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalTitle.textContent = credential.title;
  modalDesc.textContent = credential.issuer;
  modalGallery.textContent = "";
  modalViewer.textContent = "";
  credentialControls.hidden = false;
  credentialPdf.href = credential.pdf;
  credentialSequence.textContent = `${index + 1} / ${credentials.length}`;

  const preview = document.createElement("img");
  preview.src = credential.preview;
  preview.alt = `${credential.title} certificate preview`;
  preview.loading = "eager";
  modalViewer.appendChild(preview);
  closeButton.focus();
}

function navigateCredential(step) {
  if (modalType !== "credential") return;
  currentCredentialIndex = (currentCredentialIndex + step + credentials.length) % credentials.length;
  openCredentialModal(currentCredentialIndex, lastTrigger);
}

document.querySelectorAll("[data-project]").forEach((card) => {
  const trigger = card.querySelector(".project-trigger");
  trigger.addEventListener("click", () => openModal(card.dataset.project, trigger));
});

document.querySelectorAll("[data-credential]").forEach((card) => {
  const trigger = card.querySelector(".credential-trigger");
  const index = credentials.findIndex((credential) => credential.key === card.dataset.credential);
  trigger.addEventListener("click", () => openCredentialModal(index, trigger));
});

closeButton.addEventListener("click", closeModal);
credentialPrevious.addEventListener("click", () => navigateCredential(-1));
credentialNext.addEventListener("click", () => navigateCredential(1));
document.addEventListener("keydown", (event) => {
  if (!modal.hidden && event.key === "Tab") {
    const focusable = [...modal.querySelectorAll("button, a[href]")].filter((element) => !element.disabled && !element.hidden && element.offsetParent !== null);
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
  if (!modal.hidden && modalType === "credential" && event.key === "ArrowRight") {
    event.preventDefault();
    navigateCredential(1);
  }
  if (!modal.hidden && modalType === "credential" && event.key === "ArrowLeft") {
    event.preventDefault();
    navigateCredential(-1);
  }
  if (!modal.hidden && modalType === "project" && event.key === "ArrowRight") {
    const next = Math.min(currentIndex + 1, currentImages.length - 1);
    const button = modalGallery.querySelectorAll("button")[next];
    if (button) button.click();
  }
  if (!modal.hidden && modalType === "project" && event.key === "ArrowLeft") {
    const previous = Math.max(currentIndex - 1, 0);
    const button = modalGallery.querySelectorAll("button")[previous];
    if (button) button.click();
  }
});
