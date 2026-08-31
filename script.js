document.documentElement.classList.add("js");

const typingText = "BS Information Technology Student | Networking • Infrastructure • Data & Software Development";
const typingTarget = document.getElementById("typing");
let typingIndex = 0;

function type() {
  if (typingIndex < typingText.length) {
    typingTarget.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;
    setTimeout(type, 35);
  }
}

if (typingTarget) type();

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
  DigiDocs: {
    title: "DigiDocs",
    desc: "Documentation system with admin and user dashboards, account administration, audit logs, calendar features, file viewing, and notes.",
    images: [
      "images/DigiDocs/Login.png", "images/DigiDocs/AccountsAdmin.png", "images/DigiDocs/AdminDashboard.png",
      "images/DigiDocs/AuditLogsAdmin.png", "images/DigiDocs/Calendar.png", "images/DigiDocs/FileOpening.png",
      "images/DigiDocs/Notes.png", "images/DigiDocs/UserDashboard.png"
    ]
  },
  Ebarola_Student_Information: {
    title: "Student Information",
    desc: "Student records app for registration, login, and profile management.",
    images: [
      "images/Ebarola_Student_Information/LandingPage.png", "images/Ebarola_Student_Information/LoginPage.png",
      "images/Ebarola_Student_Information/RegisNewStud.png", "images/Ebarola_Student_Information/StudInfo.png"
    ]
  },
  FloodFacts: {
    title: "FloodFacts",
    desc: "Awareness app with community stories, quizzes, preparedness guides, and story submission screens.",
    images: [
      "images/FloodFacts/LandingPage.png", "images/FloodFacts/Login.png", "images/FloodFacts/AboutUs.png",
      "images/FloodFacts/CommunityStories.png", "images/FloodFacts/Preparedness.png", "images/FloodFacts/Quiz.png",
      "images/FloodFacts/StorySubmission.png"
    ]
  },
  DeadTrials: {
    title: "DeadTrials",
    desc: "Game development project with gameplay systems.",
    images: [
      "images/DeadTrials/2.png", "images/DeadTrials/3.png", "images/DeadTrials/4.png", "images/DeadTrials/5.png",
      "images/DeadTrials/6.png", "images/DeadTrials/7.png", "images/DeadTrials/8.png", "images/DeadTrials/9.png",
      "images/DeadTrials/10.png", "images/DeadTrials/11.png", "images/DeadTrials/12.png"
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
  mainImage.alt = `${project.title} screenshot`;
  modalViewer.appendChild(mainImage);

  const updateImage = (index) => {
    if (index < 0 || index >= currentImages.length) return;
    currentIndex = index;
    mainImage.src = currentImages[currentIndex];
    modalGallery.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === currentIndex);
      button.setAttribute("aria-current", buttonIndex === currentIndex ? "true" : "false");
    });
  };

  currentImages.forEach((src, index) => {
    const thumbnail = document.createElement("button");
    thumbnail.type = "button";
    thumbnail.className = "gallery-thumb";
    thumbnail.setAttribute("aria-label", `View ${project.title} image ${index + 1}`);
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
