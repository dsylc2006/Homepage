const profile = window.PROFILE;

const byId = (id) => document.getElementById(id);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function addTags(container, tags = []) {
  tags.forEach((tag, index) => {
    const pill = el("span", `tag ${index === 1 ? "secondary" : index > 1 ? "warn" : ""}`, tag);
    container.appendChild(pill);
  });
}

function renderIntro() {
  byId("hero-summary").textContent = profile.summary.short;
  byId("bio").innerHTML = profile.summary.long.map((paragraph) => `<p>${paragraph}</p>`).join("");
  byId("contact-line").textContent = profile.contactLine;

  const actions = byId("hero-actions");
  profile.links.forEach((link, index) => {
    const anchor = el("a", `button ${index === 0 ? "primary" : ""}`, link.label);
    anchor.href = link.href;
    if (link.external) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    actions.appendChild(anchor);
  });

  const metrics = byId("metrics");
  profile.metrics.forEach((item) => {
    const card = el("div", "metric");
    card.appendChild(el("strong", "", item.value));
    card.appendChild(el("span", "", item.label));
    metrics.appendChild(card);
  });

  const facts = byId("profile-facts");
  profile.facts.forEach((fact) => {
    const row = el("div", "fact");
    row.appendChild(el("span", "", fact.label));
    row.appendChild(el("strong", "", fact.value));
    facts.appendChild(row);
  });
}

function renderExperience() {
  const list = byId("experience-list");
  profile.experience.forEach((item) => {
    const row = el("article", "timeline-item");
    row.appendChild(el("time", "", item.period));
    const body = el("div");
    body.appendChild(el("strong", "", item.role));
    body.appendChild(el("span", "", item.place));
    row.appendChild(body);
    list.appendChild(row);
  });
}

function renderServices() {
  const list = byId("service-list");
  profile.services.forEach((service) => {
    const card = el("article", "service-card");
    card.appendChild(el("h3", "", service.title));
    const ul = el("ul");
    service.items.forEach((item) => ul.appendChild(el("li", "", item)));
    card.appendChild(ul);
    list.appendChild(card);
  });
}

function renderCards(targetId, items, options = {}) {
  const list = byId(targetId);
  list.innerHTML = "";
  items.forEach((item) => {
    const card = el("article", "item-card");
    const meta = el("div", "meta");
    addTags(meta, item.tags || []);
    if (item.year) meta.appendChild(el("span", "tag secondary", item.year));
    if (item.period) meta.appendChild(el("span", "tag secondary", item.period));
    if (meta.children.length) card.appendChild(meta);
    card.appendChild(el("p", "", item.title || item.citation));
    if (item.note && options.showNote !== false) {
      const note = el("p", "", item.note);
      note.className = "note";
      card.appendChild(note);
    }
    list.appendChild(card);
  });
}

function renderPublicationFilters() {
  const years = ["全部", ...new Set(profile.publications.map((item) => item.year))];
  const filters = byId("year-filters");
  const search = byId("publication-search");
  let activeYear = "全部";

  const apply = () => {
    const query = search.value.trim().toLowerCase();
    const items = profile.publications.filter((item) => {
      const inYear = activeYear === "全部" || item.year === activeYear;
      const inQuery = !query || `${item.year} ${item.citation}`.toLowerCase().includes(query);
      return inYear && inQuery;
    });
    renderCards("publication-list", items);
  };

  years.forEach((year, index) => {
    const button = el("button", index === 0 ? "active" : "", year);
    button.type = "button";
    button.addEventListener("click", () => {
      activeYear = year;
      [...filters.children].forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      apply();
    });
    filters.appendChild(button);
  });

  search.addEventListener("input", apply);
  apply();
}

function drawResearchCanvas() {
  const canvas = byId("research-canvas");
  const ctx = canvas.getContext("2d");
  const labels = ["Data Security", "Power Big Data", "Data Mining", "Network Security", "Privacy", "CPS"];
  const points = labels.map((label, index) => ({
    label,
    angle: (Math.PI * 2 * index) / labels.length,
    radius: 150 + (index % 2) * 42,
    color: ["#ffffff", "#d7f7f1", "#f5d08a", "#cce0ff", "#ffd4d4", "#bfe6c6"][index],
  }));

  let tick = 0;
  function frame() {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let x = 40; x < width; x += 72) {
      for (let y = 36; y < height; y += 72) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const cx = width * 0.52;
    const cy = height * 0.42;
    const coords = points.map((point, index) => {
      const pulse = Math.sin(tick / 34 + index) * 12;
      return {
        ...point,
        x: cx + Math.cos(point.angle + tick / 420) * (point.radius + pulse),
        y: cy + Math.sin(point.angle + tick / 420) * (point.radius * 0.62 + pulse),
      };
    });

    ctx.lineWidth = 1.4;
    coords.forEach((from, index) => {
      coords.slice(index + 1).forEach((to) => {
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });
    });

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(cx, cy, 48 + Math.sin(tick / 22) * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#173b68";
    ctx.font = "700 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Energy", cx, cy - 5);
    ctx.fillText("Internet", cx, cy + 18);

    coords.forEach((point) => {
      ctx.fillStyle = point.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.94)";
      ctx.font = "700 15px Arial";
      ctx.textAlign = "center";
      ctx.fillText(point.label, point.x, point.y + 30);
    });

    tick += 1;
    requestAnimationFrame(frame);
  }
  frame();
}

renderIntro();
renderExperience();
renderServices();
renderPublicationFilters();
renderCards("project-list", profile.projects);
renderCards("patent-list", profile.patents, { showNote: false });
renderCards("award-list", profile.awards);
renderCards("standard-list", profile.standards);
drawResearchCanvas();
