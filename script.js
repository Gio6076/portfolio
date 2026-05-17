const text = "Aspiring Developer | Game Dev | BSIT Student";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 50);
  }
}
type();

// THEME
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("light");
};

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) el.classList.add("active");
  });
});

// PROJECT DATA
const projects = {
  DigiDocs: {
    title: 'DigiDocs',
    desc: 'Documentation system with admin and user dashboards.',
    images: [
      'images/DigiDocs/Login.png',
      'images/DigiDocs/AccountsAdmin.png',
      'images/DigiDocs/AdminDashboard.png',
      'images/DigiDocs/AuditLogsAdmin.png',
      'images/DigiDocs/Calendar.png',
      'images/DigiDocs/FileOpening.png',
      'images/DigiDocs/Notes.png',
      'images/DigiDocs/UserDashboard.png'
    ]
  },

  Ebarola_Student_Information: {
    title: 'Student Information',
    desc: 'Student records app for registration and profile management.',
    images: [
      'images/Ebarola_Student_Information/LandingPage.png',
      'images/Ebarola_Student_Information/LoginPage.png',
      'images/Ebarola_Student_Information/RegisNewStud.png',
      'images/Ebarola_Student_Information/StudInfo.png'
    ]
  },

  FloodFacts: {
    title: 'FloodFacts',
    desc: 'Awareness app with stories, quizzes, and preparedness guides.',
    images: [
      'images/FloodFacts/LandingPage.png',
      'images/FloodFacts/Login.png',
      'images/FloodFacts/AboutUs.png',
      'images/FloodFacts/CommunityStories.png',
      'images/FloodFacts/Preparedness.png',
      'images/FloodFacts/Quiz.png',
      'images/FloodFacts/StorySubmission.png'
    ]
  },

  DeadTrials: {
    title: 'DeadTrials',
    desc: 'Game development assets and screenshots.',
    images: [
      'images/DeadTrials/2.png',
      'images/DeadTrials/3.png',
      'images/DeadTrials/4.png',
      'images/DeadTrials/5.png',
      'images/DeadTrials/6.png',
      'images/DeadTrials/7.png',
      'images/DeadTrials/8.png',
      'images/DeadTrials/9.png',
      'images/DeadTrials/10.png',
      'images/DeadTrials/11.png',
      'images/DeadTrials/12.png'
    ]
  },

  Networking_Basics: {
    title: 'Networking Basics',
    desc: 'Cisco Networking Basics certificate.',
    images: ['images/Certificates/Networking_Basics_certificate.png']
  },

  CCNA_Intro: {
    title: 'CCNA Introduction to Networks',
    desc: 'CCNA Introduction to Networks certificate.',
    images: ['images/Certificates/CCNA-_Introduction_to_Networks_certificate.png']
  },

  PacketTracer: {
    title: 'Cisco Packet Tracer',
    desc: 'Getting Started with Cisco Packet Tracer certificate.',
    images: ['images/Certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate.png']
  },

  Python_Essentials_2: {
    title: 'Python Essentials 2',
    desc: 'Python Essentials 2 certificate.',
    images: ['images/Certificates/Python_Essentials_2_certificate.png']
  }
};

let currentImages = [];
let currentIndex = 0;

function openModal(key) {
  const project = projects[key];
  if (!project) return;

  document.getElementById("modal").style.display = "block";
  document.getElementById("modalTitle").innerText = project.title;
  document.getElementById("modalDesc").innerText = project.desc;

  const viewer = document.getElementById("modalViewer");
  const gallery = document.getElementById("modalGallery");

  viewer.innerHTML = "";
  gallery.innerHTML = "";

  currentImages = project.images || [];
  currentIndex = 0;

  const mainImg = document.createElement("img");
  mainImg.src = currentImages[0];
  viewer.appendChild(mainImg);

  function updateImage(index) {
    if (index < 0 || index >= currentImages.length) return;
    currentIndex = index;
    mainImg.src = currentImages[currentIndex];

    document.querySelectorAll(".gallery img").forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });
  }

  currentImages.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;

    if (i === 0) thumb.classList.add("active");

    thumb.onclick = () => updateImage(i);
    gallery.appendChild(thumb);
  });

  document.onkeydown = (e) => {
    if (document.getElementById("modal").style.display !== "block") return;

    if (e.key === "ArrowRight") updateImage(currentIndex + 1);
    if (e.key === "ArrowLeft") updateImage(currentIndex - 1);
    if (e.key === "Escape") closeModal();
  };
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}