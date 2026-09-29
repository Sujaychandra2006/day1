/* =========================================================
   EDIT YOUR DETAILS HERE
   Put your photo in the same folder and name it photo.jpg
   ========================================================= */
const profile = {
  name: "Your Full Name",
  title: "B.E. in Computer Science & Engineering",
  photo: "photo.jpg",
  about:
    "A motivated engineering student who enjoys solving problems, building projects and learning new technologies.",

  contact: {
    email: "yourname@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    linkedin: "https://www.linkedin.com/in/your-profile"
  },

  education: [
    {
      level: "School (SSLC / 10th)",
      institution: "Your School Name",
      course: "Karnataka State Board",
      place: "City, Karnataka",
      years: "2016 – 2019",
      score: "Percentage: 92%"
    },
    {
      level: "PU College (12th)",
      institution: "Your PU College Name",
      course: "PCMC (Physics, Chemistry, Maths, Computer Science)",
      place: "City, Karnataka",
      years: "2019 – 2021",
      score: "Percentage: 88%"
    },
    {
      level: "Engineering College",
      institution: "Your Engineering College Name",
      course: "B.E. in Computer Science & Engineering",
      place: "City, Karnataka",
      years: "2021 – 2025",
      score: "CGPA: 8.5 / 10"
    }
  ],

  achievements: [
    { title: "1st Place – College Hackathon", year: "2024", detail: "Built a web app with a team of four in 24 hours." },
    { title: "Paper Presentation", year: "2023", detail: "Presented a paper at a national-level technical symposium." },
    { title: "Online Certification", year: "2023", detail: "Completed a course in Python programming." },
    { title: "School Topper", year: "2019", detail: "Secured the highest marks in SSLC in my school." }
  ],

  skills: ["HTML", "CSS", "JavaScript", "Python", "C", "Teamwork", "Communication"]
};

/* =========================================================
   PAGE LOGIC (no need to edit below this line)
   ========================================================= */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function getInitials(name) {
  return name.trim().split(/\s+/).slice(0, 2)
    .map((word) => word[0].toUpperCase()).join("");
}

function renderHeader() {
  document.title = profile.name + " | Profile";
  document.getElementById("name").textContent = profile.name;
  document.getElementById("title").textContent = profile.title;
  document.getElementById("about").textContent = profile.about;

  const photo = document.getElementById("photo");
  const fallback = document.getElementById("photoFallback");
  fallback.textContent = getInitials(profile.name);

  // If the photo is missing, show initials instead
  photo.onerror = function () {
    photo.style.display = "none";
    fallback.style.display = "flex";
  };
  photo.src = profile.photo;
  photo.alt = "Photo of " + profile.name;

  const contactList = document.getElementById("contact");
  const c = profile.contact;
  const items = [
    { icon: "📧", text: c.email, href: "mailto:" + c.email },
    { icon: "📞", text: c.phone, href: "tel:" + c.phone.replace(/\s/g, "") },
    { icon: "📍", text: c.location },
    { icon: "🔗", text: "LinkedIn", href: c.linkedin }
  ];

  items.forEach((item) => {
    if (!item.text) return;
    const li = el("li");
    li.append(item.icon + " ");
    if (item.href) {
      const a = el("a", "", item.text);
      a.href = item.href;
      if (item.href.startsWith("http")) a.target = "_blank";
      li.appendChild(a);
    } else {
      li.append(item.text);
    }
    contactList.appendChild(li);
  });
}

function renderEducation() {
  const box = document.getElementById("education");
  profile.education.forEach((edu) => {
    const card = el("div", "edu-item");
    card.appendChild(el("span", "edu-level", edu.level));
    card.appendChild(el("h3", "", edu.institution));
    card.appendChild(el("p", "edu-meta", edu.course));
    card.appendChild(el("p", "edu-meta", edu.place + "  •  " + edu.years));
    card.appendChild(el("p", "edu-score", edu.score));
    box.appendChild(card);
  });
}

function renderAchievements() {
  const box = document.getElementById("achievements");
  profile.achievements.forEach((ach) => {
    const card = el("div", "achievement");
    const top = el("div", "achievement-top");
    top.appendChild(el("h3", "", "🏆 " + ach.title));
    top.appendChild(el("span", "achievement-year", ach.year));
    card.appendChild(top);
    card.appendChild(el("p", "", ach.detail));
    box.appendChild(card);
  });
}

function renderSkills() {
  const box = document.getElementById("skills");
  profile.skills.forEach((skill) => box.appendChild(el("span", "skill", skill)));
}

function setupTheme() {
  const button = document.getElementById("themeToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    button.textContent = dark ? "☀️" : "🌙";
  }

  applyTheme(prefersDark);
  button.addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
  });
}

function renderFooter() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("footerName").textContent = profile.name;
}

renderHeader();
renderEducation();
renderAchievements();
renderSkills();
setupTheme();
renderFooter();