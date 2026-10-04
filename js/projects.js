// ==============================
// PROJECT DATA
// EDIT THIS SECTION
// ==============================
const projects = [
  {
    id: 1,
    title: "Faculty Deliverables Monitoring System",
    description: "Academic monitoring system concept for organizing faculty deliverables, requirements, deadlines, and submission status.",
    image: "assets/images/project-1.svg",
    categories: ["web", "database", "academic"],
    technologies: ["HTML", "CSS", "JavaScript", "SQL"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description: "Responsive portfolio website designed to showcase skills, projects, education, certificates, and contact information.",
    image: "assets/images/project-2.svg",
    categories: ["web", "academic"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    id: 3,
    title: "Student Attendance System",
    description: "Academic system concept for recording attendance and organizing student attendance information.",
    image: "assets/images/project-3.svg",
    categories: ["web", "database", "academic"],
    technologies: ["HTML", "CSS", "JavaScript", "SQL"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    id: 4,
    title: "Online Inventory System",
    description: "Simple inventory management concept for tracking items, quantities, and basic records.",
    image: "assets/images/project-1.svg",
    categories: ["web", "database"],
    technologies: ["HTML", "CSS", "JavaScript", "SQL"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    id: 5,
    title: "BMI Calculator",
    description: "A small calculator that accepts weight and height values and computes body mass index.",
    image: "assets/images/project-2.svg",
    categories: ["mobile", "academic"],
    technologies: ["MIT App Inventor", "Logic"],
    github: "https://github.com/",
    demo: "#"
  },
  {
    id: 6,
    title: "Responsive Web Application",
    description: "Frontend practice project focused on responsive layouts, reusable components, and interactive JavaScript behavior.",
    image: "assets/images/project-3.svg",
    categories: ["web", "desktop"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/",
    demo: "#"
  }
];

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const visible = projects.filter(project => filter === "all" || project.categories.includes(filter));

  grid.innerHTML = visible.map(project => `
    <article class="project-card reveal visible">
      <img class="project-image" src="${project.image}" alt="${project.title} preview" loading="lazy">
      <div class="project-body">
        <div class="tag-row">${project.categories.map(cat => `<span>${cat}</span>`).join("")}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tag-row">${project.technologies.map(tech => `<span>${tech}</span>`).join("")}</div>
        <div class="project-actions">
          <a class="small-btn" href="${project.github}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub</a>
          <a class="small-btn" href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>
          <button class="small-btn project-details" type="button" data-project-id="${project.id}">View Details</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".project-details").forEach(button => {
    button.addEventListener("click", () => openProjectModal(Number(button.dataset.projectId)));
  });
}

function openProjectModal(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;

  document.getElementById("projectModalTitle").textContent = project.title;
  document.getElementById("projectModalDescription").textContent = project.description;
  document.getElementById("projectModalImage").src = project.image;
  document.getElementById("projectModalImage").alt = `${project.title} project preview`;
  document.getElementById("projectModalTags").innerHTML = project.technologies.map(item => `<span>${item}</span>`).join("");
  document.getElementById("projectGithub").href = project.github;
  document.getElementById("projectDemo").href = project.demo;

  const modal = document.getElementById("projectModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderProjects(button.dataset.filter);
    });
  });
});
