const profile = window.PROFILE;

const byId = (id) => document.getElementById(id);
const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function tags(items = []) {
  const meta = create("div", "meta");
  items.forEach((item, index) => {
    meta.appendChild(create("span", `tag ${index === 1 ? "secondary" : index > 1 ? "warn" : ""}`, item));
  });
  return meta;
}

function renderProfile() {
  byId("bio").innerHTML = profile.summary.long.map((paragraph) => `<p>${paragraph}</p>`).join("");
  byId("contact-line").textContent = profile.contactLine;

  const links = byId("profile-links");
  profile.links.forEach((link) => {
    const anchor = create("a", "", link.label);
    anchor.href = link.href;
    if (link.external) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    links.appendChild(anchor);
  });

  const facts = byId("profile-facts");
  profile.facts.forEach((fact) => {
    const item = create("div", "contact-item");
    item.appendChild(create("span", "", fact.label));
    item.appendChild(create("strong", "", fact.value));
    facts.appendChild(item);
  });

  const metrics = byId("metrics");
  profile.metrics.forEach((metric) => {
    const item = create("div", "metric");
    item.appendChild(create("strong", "", metric.value));
    item.appendChild(create("span", "", metric.label));
    metrics.appendChild(item);
  });

  const research = byId("research-tags");
  profile.researchInterests.forEach((interest) => {
    research.appendChild(create("span", "", interest));
  });
}

function renderNews() {
  const list = byId("news-list");
  profile.news.forEach((item) => {
    const row = create("article", "news-item");
    row.appendChild(tags([item.period, ...(item.tags || [])]));
    row.appendChild(create("p", "", item.title));
    list.appendChild(row);
  });
}

function renderExperience() {
  const list = byId("experience-list");
  profile.experience.forEach((item) => {
    const row = create("article", "timeline-item");
    row.appendChild(create("time", "", item.period));
    const body = create("div");
    body.appendChild(create("strong", "", item.role));
    body.appendChild(create("span", "", item.place));
    row.appendChild(body);
    list.appendChild(row);
  });
}

function renderServices() {
  const list = byId("service-list");
  profile.services.forEach((service) => {
    const row = create("article", "service-item");
    row.appendChild(create("h3", "", service.title));
    const ul = create("ul");
    service.items.forEach((item) => ul.appendChild(create("li", "", item)));
    row.appendChild(ul);
    list.appendChild(row);
  });
}

function renderCompactList(targetId, items, options = {}) {
  const list = byId(targetId);
  list.innerHTML = "";
  items.forEach((item) => {
    const row = create("article", "list-item");
    const metaItems = [];
    if (item.period) metaItems.push(item.period);
    if (item.year) metaItems.push(item.year);
    metaItems.push(...(item.tags || []));
    if (metaItems.length) row.appendChild(tags(metaItems));
    row.appendChild(create("p", "", item.title || item.citation));
    if (item.note && options.showNote !== false) {
      row.appendChild(create("p", "note", item.note));
    }
    list.appendChild(row);
  });
}

function renderPublications() {
  const list = byId("publication-list");
  const filters = byId("year-filters");
  const search = byId("publication-search");
  const years = ["全部", ...new Set(profile.publications.map((item) => item.year))];
  let activeYear = "全部";

  const draw = () => {
    const query = search.value.trim().toLowerCase();
    const items = profile.publications.filter((item) => {
      const inYear = activeYear === "全部" || item.year === activeYear;
      const inQuery = !query || `${item.year} ${item.citation} ${(item.tags || []).join(" ")}`.toLowerCase().includes(query);
      return inYear && inQuery;
    });

    list.innerHTML = "";
    items.forEach((item) => {
      const row = create("li");
      row.appendChild(create("span", "", item.citation));
      row.appendChild(tags([item.year, ...(item.tags || [])]));
      list.appendChild(row);
    });
  };

  years.forEach((year, index) => {
    const button = create("button", index === 0 ? "active" : "", year);
    button.type = "button";
    button.addEventListener("click", () => {
      activeYear = year;
      [...filters.children].forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      draw();
    });
    filters.appendChild(button);
  });

  search.addEventListener("input", draw);
  draw();
}

renderProfile();
renderNews();
renderExperience();
renderServices();
renderPublications();
renderCompactList("project-list", profile.projects);
renderCompactList("patent-list", profile.patents);
renderCompactList("award-list", profile.awards);
renderCompactList("standard-list", profile.standards);
