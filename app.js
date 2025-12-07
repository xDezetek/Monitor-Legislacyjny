let projects = [
  {
    id: "UD260",
    title: "Projekt ustawy o zmianie ustawy – Prawo upadłościowe, ustawy – Prawo restrukturyzacyjne oraz ustawy o Krajowym Rejestrze Zadłużonych",
    topic: "UPADŁOŚCIOWE PRAWO",
    stage: "sejm",
    created: "05-12-2025",
    modified: "05-12-2025",
    progressPct: 60,
    owner: "Minister Sprawiedliwości",
    nextMilestone: "II czytanie",
    impact: { finance: 55, operations: 40, social: 70 },
    consultations: [
      { phase: "prekonsultacje", from: "2025-02-10", to: "2025-03-01" },
      { phase: "konsultacje", from: "2025-03-15", to: "2025-04-10" }
    ]
  },
  {
    id: "UD327",
    title: "Projekt ustawy o zmianie ustawy o podatku od towarów i usług",
    topic: "PODATKI",
    stage: "rząd",
    created: "04-12-2025",
    modified: "05-12-2025",
    progressPct: 38,
    owner: "Minister Finansów i Gospodarki",
    nextMilestone: "Opiniowanie",
    impact: { finance: 35, operations: 60, social: 45 },
    consultations: [ { phase: "prekonsultacje", from: "2025-01-20", to: "2025-02-05" } ]
  },
  {
    id: "UD296",
    title: "Projekt ustawy o osobistych kontach inwestycyjnych",
    topic: "RYNEK KAPITAŁOWY",
    stage: "prekonsultacje",
    created: "03-12-2025",
    modified: "03-12-2025",
    progressPct: 22,
    owner: "Minister Finansów i Gospodarki",
    nextMilestone: "Publikacja założeń",
    impact: { finance: 25, operations: 30, social: 50 },
    consultations: []
  },
  {
    id: "UD199",
    title: "Zmiana ustawy – prawo zamówień publicznych (AI w zamówieniach)",
    topic: "AI",
    stage: "SENAT",
    created: "03-05-2025",
    modified: "04-05-2025",
    progressPct: 78,
    owner: "Minister Sprawiedliwości",
    nextMilestone: "Posiedzenie Senatu",
    impact: { finance: 40, operations: 55, social: 35 },
    consultations: [ { phase: "konsultacje", from: "2025-04-01", to: "2025-04-20" } ]
  },
  {
    id: "UD311",
    title: "Rozporządzenie o incydentach w sektorze publicznym",
    topic: "CYBERBEZPIECZEŃSTWO",
    stage: "publikacja",
    created: "03-05-2025",
    modified: "04-05-2025",
    progressPct: 100,
    owner: "Minister Finansów i Gospodarki",
    nextMilestone: "Wejście w życie",
    impact: { finance: 30, operations: 65, social: 30 },
    consultations: []
  }
];

const stagesOrder = ["prekonsultacje","konsultacje","rząd","sejm","senat","prezydent","publikacja"];
const lines = [
  { key: "UPADŁOŚCIOWE PRAWO", label: "Temat: Upadłościowe Prawo" },
  { key: "PODATKI", label: "Temat: Podatki" },
  { key: "RYNEK KAPITAŁOWY", label: "Temat: Rynek Kapitałowy" },
  { key: "AI", label: "Temat: Sztuczna inteligencja" },
  { key: "CYBERBEZPIECZEŃSTWO", label: "Temat: Cyberbezpieczeństwo" },
];

// Current sort state for the projects table
let currentSort = { key: 'created', dir: 'desc' }; // default: sort by created date descending

function parseDateDMY(s) {
  // expects format DD-MM-YYYY or DD-MM-YYYY
  if (!s || typeof s !== 'string') return null;
  const parts = s.split('-');
  if (parts.length !== 3) return null;
  const d = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const y = parseInt(parts[2], 10);
  return new Date(y, m, d);
}

function populateTopicFilter() {
  const sel = document.getElementById('priority');
  if (!sel) return;
  // Preserve the first 'all' option if present
  const first = sel.querySelector('option[value="all"]');
  // Clear existing options
  sel.innerHTML = '';
  if (first) sel.appendChild(first);

  // Collect unique topics from projects
  const topics = Array.from(new Set(projects.map(p => (p.topic || '').trim()).filter(Boolean)));
  // Use lines mapping if available to get friendly labels
  topics.forEach(t => {
    let mapped = (lines.find(l => l.key === t) || {}).label || t;
    // If label is like "Temat: ...", strip the prefix for the select option
    mapped = String(mapped).replace(/^Temat:\s*/i, '');
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = mapped;
    sel.appendChild(opt);
  });
}


const alerts = [
  { title: "Zmiana terminu konsultacji: Ustawa o AI", time: "Dziś, 10:15", detail: "Przedłużono konsultacje do 10.04.2025" },
  { title: "Aktualizacja tekstu: KSC", time: "Wczoraj, 16:02", detail: "Dodano rozdział dot. wymogów raportowania" },
  { title: "Publikacja: Incydenty w sektorze publicznym", time: "Wczoraj, 09:30", detail: "Rozporządzenie opublikowane w Dz.U." },
];

const consultations = [
  { title: "Ustawa o AI – konsultacje", from: "2025-03-15", to: "2025-04-10", link: "#", owner: "MC", status: "aktywne" },
  { title: "Prawo zamówień publicznych – AI", from: "2025-04-01", to: "2025-04-20", link: "#", owner: "UZP", status: "nadchodzące" },
  { title: "Ochrona danych – prekonsultacje", from: "2025-02-10", to: "2025-03-01", link: "#", owner: "UODO", status: "zakończone" },
];

const changes = [
  { date: "2025-12-05", project: "Ustawa o AI", change: "Aktualizacja tekstu - dodano rozdział o przejrzystości", type: "update" },
  { date: "2025-12-04", project: "KSC", change: "Zmiana terminu: sesja przesunięta na 10.12", type: "schedule" },
  { date: "2025-12-03", project: "Prawo zamówień publicznych", change: "Rozpoczęcie konsultacji społecznych", type: "consultation" },
  { date: "2025-12-02", project: "Ustawa o AI", change: "Nowy projekt dodany - faza prekonsultacji", type: "new" },
  { date: "2025-12-01", project: "Ochrona danych", change: "Opublikowany raport OSR", type: "report" },
  { date: "2025-11-30", project: "Cyberbezpieczeństwo", change: "Zatwierdzono przez Radę Ministrów", type: "approved" },
  { date: "2025-11-29", project: "Ustawa o AI", change: "Dodano opinię Sejmu", type: "opinion" },
];

const reportTemplates = [
  { name: "Raport tygodniowy", period: "7 dni" },
  { name: "Raport miesięczny", period: "30 dni" },
  { name: "Raport tematyczny", period: "custom" },
  { name: "Raport do zarządzania ryzykiem", period: "all" },
];

// In-memory user-generated alerts and comments
let userAlerts = [];
let userComments = [];

function renderAlertsAndComments() {
  const alertsContainer = document.getElementById('alertsList');
  const commentsContainer = document.getElementById('commentsList');
  if (alertsContainer) {
    alertsContainer.innerHTML = '';
    userAlerts.slice().reverse().forEach(a => {
      const item = document.createElement('div');
      item.className = 'list-group-item';
      item.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1 small fw-semibold">${a.projectTitle}</h5>
          <small class="text-muted">${a.ts}</small>
        </div>
        <div class="small text-muted">Alert dodany</div>
      `;
      alertsContainer.appendChild(item);
    });
    if (userAlerts.length === 0 && alertsContainer) {
      alertsContainer.innerHTML = '<div class="text-muted small">Brak alertów.</div>';
    }
  }
  if (commentsContainer) {
    commentsContainer.innerHTML = '';
    userComments.slice().reverse().forEach(c => {
      const item = document.createElement('div');
      item.className = 'list-group-item';
      item.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1 small fw-semibold">${c.projectTitle}</h5>
          <small class="text-muted">${c.ts}</small>
        </div>
        <p class="mb-1">${escapeHtml(c.text)}</p>
      `;
      commentsContainer.appendChild(item);
    });
    if (userComments.length === 0 && commentsContainer) {
      commentsContainer.innerHTML = '<div class="text-muted small">Brak komentarzy.</div>';
    }
  }
}

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatStageTag(stage) {
  const map = {
    "prekonsultacje": { label: "Prekonsultacje", cls: "pre" },
    "konsultacje": { label: "Konsultacje społeczne", cls: "consult" },
    "rząd": { label: "Rząd", cls: "gov" },
    "sejm": { label: "Sejm", cls: "sejm" },
    "senat": { label: "Senat", cls: "senat" },
    "prezydent": { label: "Prezydent", cls: "prez" },
    "publikacja": { label: "Publikacja (Dz.U.)", cls: "pub" },
  };
  const m = map[stage] || { label: stage, cls: "gov" };
  return `<span class="badge bg-body border text-dark d-inline-flex align-items-center gap-2">${m.label}</span>`;
}

function renderStageTimelineHTML(p) {
  const displayStages = ["prekonsultacje","konsultacje","rząd","sejm","senat","prezydent"];
  const labels = { "prekonsultacje": "Prekonsultacje", "konsultacje": "Konsultacje", "rząd": "Rząd", "sejm": "Sejm", "senat": "Senat", "prezydent": "Prezydent" };
  const current = String((p.stage||'').toLowerCase());
  const idx = displayStages.indexOf(current);
  let html = `<div class="stage-timeline" role="list" aria-label="Etapy projektu">`;
  // For specific projects (e.g. UD311 - Rozporządzenie o incydentach...) we want all circles filled
  const forceAllFilled = (String(p.id || '').toUpperCase() === 'UD311') || (String(p.title || '').toLowerCase().includes('incydent') || String(p.title || '').toLowerCase().includes('incydenty'));
  displayStages.forEach((st, i) => {
    const isReached = forceAllFilled ? true : (idx >= i && idx !== -1);
    let cls;
    if (forceAllFilled) {
      // mark all as completed, and mark the last one as current for emphasis
      cls = (i === displayStages.length - 1) ? 'stage-item current' : 'stage-item completed';
    } else {
      cls = isReached ? (i === idx ? 'stage-item current' : 'stage-item completed') : 'stage-item';
    }
    html += `<div class="${cls}"><div class="stage-dot" aria-hidden="true"></div><div class="stage-label">${labels[st] || st}</div></div>`;
    if (i < displayStages.length - 1) html += `<div class="stage-connector" aria-hidden="true"></div>`;
  });
  html += `</div>`;
  // current stage label and owner/next info
  const currentLabel = labels[current] || current;
  html += `<div class="mt-2 small text-muted">Aktualny etap: <strong>${currentLabel}</strong> • Wnioskodawca: ${p.owner || ''} ${p.nextMilestone ? '• Następny: ' + p.nextMilestone : ''}</div>`;
  return html;
}

function renderTrainBoard() {
  const board = document.getElementById("trainBoard");
  if (!board) return;
  board.innerHTML = "";

  const topicFilter = (document.getElementById("priority") || {}).value || "all";
  const stageFilter = (document.getElementById("stage") || {}).value || "all";
  const query = ((document.getElementById("search") || {}).value || "").trim().toLowerCase();

  // Collect all matching projects across all topics (use actual project topics)
  let allItems = projects.filter(p =>
    (topicFilter === 'all' || p.topic === topicFilter) &&
    (stageFilter === 'all' || p.stage === stageFilter) &&
    (query === '' || (p.title || '').toLowerCase().includes(query) || (p.id || '').toLowerCase().includes(query))
  );

  if (allItems.length === 0) {
    board.innerHTML = `<p>Brak projektów dla wybranych filtrów.</p>`;
    return;
  }

  // Sort according to currentSort state (fallback to stage order)
  const dir = currentSort.dir === 'asc' ? 1 : -1;
  allItems.sort((a, b) => {
    try {
      const k = currentSort.key;
      if (k === 'title') return dir * String(a.title || '').localeCompare(String(b.title || ''), undefined, { sensitivity: 'base' });
      if (k === 'owner') return dir * String(a.owner || '').localeCompare(String(b.owner || ''), undefined, { sensitivity: 'base' });
      if (k === 'id') return dir * String(a.id || '').localeCompare(String(b.id || ''));
      if (k === 'stage') return dir * (stagesOrder.indexOf(String(a.stage).toLowerCase()) - stagesOrder.indexOf(String(b.stage).toLowerCase()));
      if (k === 'postep' || k === 'progress') return dir * ((a.progressPct || 0) - (b.progressPct || 0));
      if (k === 'created' || k === 'modified') {
        const da = parseDateDMY(k === 'created' ? a.created : a.modified);
        const db = parseDateDMY(k === 'created' ? b.created : b.modified);
        if (!da && !db) return 0;
        if (!da) return dir * 1;
        if (!db) return dir * -1;
        return dir * (da - db);
      }
    } catch (e) {
      // ignore and fallback
    }
    // fallback: stage order
    return dir * (stagesOrder.indexOf(String(a.stage).toLowerCase()) - stagesOrder.indexOf(String(b.stage).toLowerCase()));
  });

  // Build table with sortable headers (data-sort attributes)
  const indicator = (key) => (currentSort.key === key ? (currentSort.dir === 'asc' ? ' ▲' : ' ▼') : '');
  let tableHTML = `
    <div class="table-responsive">
      <table class="table table-hover" role="grid" aria-label="Tabela projektów">
        <thead class="table-light">
          <tr>
            <th scope="col" class="text-start" data-sort="title"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Tytuł</span><span class="sort-indicator">${indicator('title')}</span></div></th>
            <th scope="col" class="text-start" data-sort="owner"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Wnioskodawca</span><span class="sort-indicator">${indicator('owner')}</span></div></th>
            <th scope="col" class="text-center" data-sort="id"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Numer</span><span class="sort-indicator">${indicator('id')}</span></div></th>
            <th scope="col" class="text-center" data-sort="stage"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Etap</span><span class="sort-indicator">${indicator('stage')}</span></div></th>
            <th scope="col" class="text-center" data-sort="postep"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Postęp</span><span class="sort-indicator">${indicator('postep')}</span></div></th>
            <th scope="col" class="text-center" data-sort="created"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Utworzony</span><span class="sort-indicator">${indicator('created')}</span></div></th>
            <th scope="col" class="text-center" data-sort="modified"><div class="th-sort" style="display:flex;justify-content:space-between;align-items:center"><span>Zmodyfikowany</span><span class="sort-indicator">${indicator('modified')}</span></div></th>
            <th scope="col" class="text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
  `;

  allItems.forEach(p => {
    const safeId = String(p.id).replace(/[^a-zA-Z0-9_-]/g, '_');
    tableHTML += `
      <tr role="row" class="align-middle" data-project-id="${safeId}">
        <td class="text-start">
          <a href="#" onclick="toggleProjectDetails('${safeId}'); return false;" class="text-decoration-none fw-semibold project-title-link">
            ${p.title}
          </a>
        </td>
        <td class="text-start">${p.owner}</td>
        <td class="text-center"><code>${p.id}</code></td>
        <td class="text-center">${formatStageTag(p.stage.toLowerCase())}</td>
        <td class="text-center">
          <div style="width: 120px; height: 20px; background: #e0e0e0; border-radius: 3px; overflow: hidden; margin: 0 auto;">
            <div style="height: 100%; background: var(--primary); width: ${p.progressPct}%; transition: width 0.3s ease;"></div>
          </div>
          <small>${p.progressPct}%</small>
        </td>
        <td class="text-center">${p.created}</td>
        <td class="text-center">${p.modified}</td>
        <td class="text-center">
          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <button class="btn btn-sm btn-outline-danger" onclick="showProjectAlert('${p.id}', '${p.title}')" title="Dodaj alert">
              🔔 Alert
            </button>
            <button class="btn btn-sm btn-outline-primary" onclick="showProjectComment('${p.id}', '${p.title}')" title="Dodaj komentarz">
              💬 Komentarz
            </button>
          </div>
        </td>
      </tr>
      <tr class="project-details-row" id="details-${safeId}" style="display:none;">
        <td colspan="8">
          ${renderStageTimelineHTML(p)}
        </td>
      </tr>
    `;

  });

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  board.innerHTML = tableHTML;

  // Attach click handlers to sortable headers
  try {
    const ths = board.querySelectorAll('th[data-sort]');
    ths.forEach(th => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const key = th.getAttribute('data-sort');
        if (!key) return;
        if (currentSort.key === key) {
          currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
        } else {
          currentSort.key = key;
          currentSort.dir = 'asc';
        }
        renderTrainBoard();
      });
    });
  } catch (e) {
    console.warn('Failed to attach sort handlers', e);
  }
}

function renderSummary() {
  const box = document.getElementById("dailySummary");
  if (!box) return;
  box.innerHTML = "";
  projects.slice(0, 3).forEach(p => {
    const item = document.createElement("div");
    item.className = "border rounded p-2";
    item.innerHTML = `
      <div class="fw-semibold">${p.title}</div>
      <div class="text-muted small">Etap: ${p.stage} • Następny krok: ${p.nextMilestone}</div>
    `;
    box.appendChild(item);
  });
}

function renderConsultations() {
  const box = document.getElementById("consultationsFeed");
  if (!box) return;
  box.innerHTML = "";
  consultations.forEach(c => {
    const item = document.createElement("div");
    item.className = "border rounded p-3";
    item.innerHTML = `
      <div class="fw-semibold">${c.title}</div>
      <div class="text-muted small mb-1">${c.status} • ${c.from} → ${c.to} • Organizator: ${c.owner}</div>
      <div>Link: <a href="${c.link}" aria-label="Przejdź do konsultacji">Strona konsultacji</a></div>
      <div class="mt-2 d-flex gap-2 flex-wrap">
        <button class="btn btn-sm btn-outline-secondary" onclick="subscribeConsultation('${c.title}')">Subskrybuj</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="commentConsultation('${c.title}')">Dodaj opinię</button>
      </div>
    `;
    box.appendChild(item);
  });
}

function renderImpactGrid() {
  const grid = document.getElementById("impactGrid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach(p => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h4 class="h6">${p.title}</h4>

          <div class="impact-meter" aria-label="Wskaźnik wpływu finansowego">
            <div class="mbar" style="width:${p.impact.finance}%"></div>
          </div>
          <div class="text-muted small">Finanse publiczne: ${p.impact.finance}%</div>

          <div class="impact-meter mt-2" aria-label="Wskaźnik wpływu operacyjnego">
            <div class="mbar" style="width:${p.impact.operations}%"></div>
          </div>
          <div class="text-muted small">Operacje: ${p.impact.operations}%</div>

          <div class="impact-meter mt-2" aria-label="Wskaźnik wpływu społecznego">
            <div class="mbar" style="width:${p.impact.social}%"></div>
          </div>
          <div class="text-muted small">Społeczne: ${p.impact.social}%</div>

          <div class="mt-2 d-flex gap-2 flex-wrap">
            <button class="btn btn-sm btn-outline-secondary" onclick="openOsr('${p.id}')">OSR / szczegóły</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

function renderAlerts() {
  const box = document.getElementById("alertsFeed");
  if (!box) return;
  box.innerHTML = "";
  alerts.forEach(a => {
    const item = document.createElement("div");
    item.className = "border rounded p-3";
    item.innerHTML = `
      <div class="fw-semibold">${a.title}</div>
      <div class="text-muted small">${a.time}</div>
      <div>${a.detail}</div>
    `;
    box.appendChild(item);
  });
}

function renderChangeLog() {
  const box = document.getElementById("changeLog");
  if (!box) return;
  box.innerHTML = "";
  const recentChanges = changes.slice(0, 5);
  recentChanges.forEach(c => {
    const item = document.createElement("div");
    item.className = "border rounded p-3";
    const typeLabel = {
      "new": "🆕 Nowy projekt",
      "update": "📝 Aktualizacja",
      "consultation": "💬 Konsultacje",
      "schedule": "📅 Zmiana harmonogramu",
      "report": "📊 Raport",
      "approved": "✅ Zatwierdzone",
      "opinion": "💭 Opinia"
    }[c.type] || "📌 Zmiana";
    item.innerHTML = `
      <div class="fw-semibold">${typeLabel} - ${c.project}</div>
      <div class="text-muted small">${c.date}</div>
      <div>${c.change}</div>
    `;
    box.appendChild(item);
  });
}

// -------------------- Tracking / Access / Actions --------------------
function initializeTracking() {
  const trackingScope = document.getElementById("trackingScope");
  const notificationMethod = document.getElementById("notificationMethod");
  const saveBtn = document.getElementById("saveTracking");
  const trackingStatus = document.getElementById("trackingStatus");
  if (!saveBtn) return;

  saveBtn.addEventListener("click", () => {
    const scope = trackingScope ? trackingScope.value : 'all';
    const method = notificationMethod ? notificationMethod.value : 'none';

    let earlyProjects = projects;
    if (scope === "early") earlyProjects = projects.filter(p => p.stage === "prekonsultacje");
    else if (scope === "consultation") earlyProjects = projects.filter(p => ["prekonsultacje", "konsultacje"].includes(p.stage));
    else if (scope === "active") earlyProjects = projects.filter(p => !["publikacja"].includes(p.stage));

    localStorage.setItem("trackingScope", scope);
    localStorage.setItem("notificationMethod", method);
    localStorage.setItem("trackedProjects", JSON.stringify(earlyProjects.map(p => p.id)));

    if (trackingStatus) {
      trackingStatus.style.display = "block";
      setTimeout(() => trackingStatus.style.display = "none", 3000);
    }
    console.log(`Śledzenie ${scope} - powiadomienia: ${method}`);
  });
}

function initializeUserAccess() {
  const userRole = document.getElementById("userRole");
  if (!userRole) return;

  function applyRole(role) {
    // Elements grouped by access
    const officialOnlyBlocks = [
      document.getElementById('quickAddItem'),
      document.getElementById('exportItem'),
    ];
    const officialOnlyButtons = [
      document.getElementById('viewFullChangelog'),
      document.getElementById('compareVersions'),
      document.getElementById('addProjectBtn'),
      // If you have a separate "configureAlerts" area outside Quick Actions and want it official-only, add it here.
    ];

    // Alerts item should be visible for both roles
    const alertsItem = document.getElementById('configureAlertsItem');
    if (alertsItem) alertsItem.style.display = '';

    // Toggle official-only features
    const isOfficial = role === 'official';
    officialOnlyBlocks.forEach(el => { if (el) el.style.display = isOfficial ? '' : 'none'; });
    officialOnlyButtons.forEach(el => { if (el) el.style.display = isOfficial ? '' : 'none'; });

    // Enforce role in Add Project action
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) {
      addBtn.onclick = () => {
        if (!isOfficial) {
          alert('Dodawanie projektów jest dostępne tylko dla urzędników.');
          return;
        }
        addProject();
      };
    }
  }

  userRole.addEventListener("change", (e) => {
    const role = e.target.value;
    applyRole(role);
    localStorage.setItem("userRole", role);
  });

  const initRole = localStorage.getItem('userRole') || userRole.value;
  userRole.value = initRole;
  applyRole(initRole);
}


function initializeVersionComparison() {
  const compareBtn = document.getElementById("compareVersions");
  if (!compareBtn) return;
  compareBtn.addEventListener("click", () => {
    alert("Porównanie wersji:\n\n" +
      "Wersja 1 (2025-12-01): Tekst 1000 słów\n" +
      "Wersja 2 (2025-12-05): Tekst 1150 słów\n\n" +
      "Zmiany:\n" +
      "- Dodano 150 słów\n" +
      "- Zmieniono 8 paragrafów\n" +
      "- Usunięto 1 rozdział");
  });
}

function initializeFullChangelog() {
  const viewBtn = document.getElementById("viewFullChangelog");
  if (!viewBtn) return;
  viewBtn.addEventListener("click", () => {
    let log = "PEŁNY DZIENNIK ZMIAN\n\n";
    changes.forEach(c => { log += `${c.date} - ${c.project}: ${c.change}\n`; });
    alert(log);
  });
}

// -------------------- Simple language --------------------
async function simplifyText(input) {
if (!input || input.trim().length === 0) {
return 'Wklej tekst, a uprościmy go.';
}

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 120000);

try {
console.log('[simplifyText] Sending request to http://localhost:8001/api/simplify');
const res = await fetch('http://localhost:8001/api/simplify', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text: input }),
signal: controller.signal
});

console.log('[simplifyText] Response status:', res.status, res.statusText);

if (!res.ok) {
const body = await res.text().catch(() => '');
console.error('[simplifyText] Error response body:', body);
  throw new Error(`HTTP ${res.status} ${res.statusText} ${body}`);
}

const data = await res.json();
console.log('[simplifyText] Response data:', data);
return (data && data.result) ? String(data.result) : 'Brak odpowiedzi z serwera.';
} catch (e) {
console.error('[simplifyText] Error caught:', e.name, e.message);
if (e.name === 'AbortError') {
return 'Przekroczono czas oczekiwania. Spróbuj ponownie.';
}
return 'Wystąpił problem podczas upraszczania tekstu: ' + e.message;
} finally {
clearTimeout(timeoutId);
}
}

// -------------------- Section switching (SPA-like) --------------------
const sectionIds = ['legislative','tracking','tracking-console','impact','alerts','simple','access'];

function showSection(id) {
  // Hide all top-level sections
  sectionIds.forEach(sid => {
    const el = document.getElementById(sid);
    if (el) el.style.display = 'none';
  });

  // Show selected section
  const el = document.getElementById(id);
  if (el) el.style.display = '';

  // Show tracking-console only with tracking
  const tc = document.getElementById('tracking-console');
  if (tc) tc.style.display = (id === 'tracking') ? '' : 'none';

  // Quick Actions aside: only on "access"
  const quickAside = document.getElementById('quickActionsAside');
  if (quickAside) quickAside.style.display = (id === 'access') ? '' : 'none';

  // Update nav active
  document.querySelectorAll('nav .nav-link').forEach(a => a.classList.remove('active'));
  document.querySelector(`nav .nav-link[data-section="${id}"]`)?.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------- Fragment loader for index.html --------------------
async function loadSectionFragments() {
  const fragSections = document.querySelectorAll('[data-fragment]');
  if (!fragSections || fragSections.length === 0) return;

  const loads = Array.from(fragSections).map(async (sec) => {
    const path = sec.getAttribute('data-fragment');
    if (!path) return;
    try {
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) {
        console.warn('Failed to load fragment', path, res.status);
        return;
      }
      const html = await res.text();
      sec.innerHTML = html;
    } catch (e) {
      console.warn('Error loading fragment', path, e);
    }
  });

  await Promise.all(loads);
}

// -------------------- Wire up events --------------------
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize accessibility features first
  initializeAccessibility();
  
  // Load section fragments (if any) before initializing renders
  await loadSectionFragments();
  // Populate topic filter based on actual projects
  populateTopicFilter();
  // Nav
  document.querySelectorAll('nav [data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-section');
      showSection(id);
    });
  });

  // Filters
  const priority = document.getElementById('priority');
  const stage = document.getElementById('stage');
  const searchInput = document.getElementById('search');
  const resetBtn = document.getElementById('resetFilters');

  function onFiltersChanged() { renderTrainBoard(); }
  if (priority) priority.addEventListener('change', onFiltersChanged);
  if (stage) stage.addEventListener('change', onFiltersChanged);
  if (searchInput) searchInput.addEventListener('input', onFiltersChanged);
  if (resetBtn) resetBtn.addEventListener('click', () => {
    if (priority) priority.value = 'all';
    if (stage) stage.value = 'all';
    if (searchInput) searchInput.value = '';
    renderTrainBoard();
  });

  // Global search enter-to-filter
  const globalSearch = document.getElementById("globalSearch");
  if (globalSearch) {
    // Improved global search behaviour:
    // - Enter or search button will perform a site-wide search
    // - Copies query to the local search input, shows legislative section and renders results
    // - Highlights the first matching row when present
    function performGlobalSearch(q) {
      const query = String(q || '').trim();
      if (!query) return;
      const localSearch = document.getElementById('search');
      if (localSearch) localSearch.value = query;
      showSection('legislative');
      renderTrainBoard();

      // Clear header search box
      globalSearch.value = '';

      // Try to highlight the first matching row in the table
      setTimeout(() => {
        const table = document.querySelector('#trainBoard table');
        if (!table) return;
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const qlow = query.toLowerCase();
        const match = rows.find(r => {
          return r.textContent.toLowerCase().includes(qlow);
        });
        if (match) {
          match.style.transition = 'box-shadow 0.3s ease, background-color 0.3s ease';
          match.style.boxShadow = '0 0 0 3px rgba(13,110,253,0.25)';
          match.style.backgroundColor = '#fff9db';
          match.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            match.style.boxShadow = '';
            match.style.backgroundColor = '';
          }, 2200);
        } else {
          // optionally, show a small message
          console.info('No matching project found for query:', query);
        }
      }, 150);
    }

    // Enter key triggers search
    globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performGlobalSearch(e.target.value);
      }
    });

    // Find the search button adjacent to the input and hook click
    const searchBtn = (globalSearch.parentElement || {}).querySelector('button[type="submit"]');
    if (searchBtn) {
      searchBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        performGlobalSearch(globalSearch.value);
      });
    }
  }

  // Simple language
  const simplifyBtn = document.getElementById('simplifyBtn');
  if (simplifyBtn) {
  simplifyBtn.addEventListener('click', async () => {
  const src = (document.getElementById('plainInput') || {}).value || '';
  const outEl = document.getElementById('plainOutput');
  console.log('[simplifyBtn] Click detected, input length:', src.length);
  if (!src.trim()) {
  if (outEl) outEl.textContent = 'Wklej tekst do uproszczenia.';
  return;
  }
  if (outEl) outEl.textContent = 'Upraszczanie…';

  try {
  console.log('[simplifyBtn] Calling simplifyText()');
  const simplified = await simplifyText(src); // now async, calls backend
  console.log('[simplifyBtn] Got result:', simplified.substring(0, 50));
  if (outEl) outEl.textContent = simplified;
  } catch (err) {
  console.error('[simplifyBtn] Error:', err);
  if (outEl) outEl.textContent = 'Nie udało się uprościć tekstu. Spróbuj ponownie.';
  }
  });
  }

  // Quick actions basic handlers (same UX as original)
  document.getElementById('configureAlerts')?.addEventListener('click', () => alert('Konfiguracja alertów…'));
  document.getElementById('viewFullChangelog')?.addEventListener('click', () => alert('Pełny dziennik zmian…'));
  document.getElementById('compareVersions')?.addEventListener('click', () => alert('Porównywanie wersji…'));

  // Initial renders
  renderTrainBoard();
  renderSummary();
  renderImpactGrid();
  renderAlerts();
  renderChangeLog();

  // Initialize features
  initializeTracking();
  initializeUserAccess();
  initializeVersionComparison();
  initializeFullChangelog();

  // Default view
  showSection('legislative');
});

// Ensure cookie consent is shown when the legislative section is displayed on index.html
// We call consent check from `showSection` so a deny will cause the widget to reappear on next visit.
const originalShowSection = showSection;
showSection = function(id) {
  originalShowSection(id);
  try {
    const isIndex = (location.pathname === '/' || location.pathname.endsWith('/index.html') || location.pathname === '');
    if (isIndex && id === 'legislative' && typeof initCookieConsent === 'function') {
      initCookieConsent();
    }
  } catch (e) {
    console.warn('Consent check failed', e);
  }
};

// -------------------- Cookie consent widget --------------------
function initCookieConsent() {
  // If consent cookie exists, do nothing
  if (document.cookie.split(';').some(c => c.trim().startsWith('cookie_consent='))) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'cookieOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.right = 0;
  overlay.style.bottom = 0;
  overlay.style.background = 'rgba(0,0,0,0.6)';
  overlay.style.zIndex = 9999;
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';

  const box = document.createElement('div');
  box.style.background = '#fff';
  box.style.color = '#000';
  box.style.padding = '20px';
  box.style.maxWidth = '700px';
  box.style.borderRadius = '8px';
  box.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  box.innerHTML = `
    <h3 style="margin-top:0">Polityka cookies</h3>
    <p>Ten serwis używa plików cookies. Aby korzystać z serwisu, zaakceptuj lub odmów użycia plików cookies.</p>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:18px">
      <button id="cookieDeny" class="btn btn-outline-secondary">Odmów</button>
      <button id="cookieAccept" class="btn btn-primary">Akceptuję</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Prevent tabbing outside overlay
  const prevTabIndex = document.body.getAttribute('tabindex');
  document.body.setAttribute('aria-hidden', 'true');

  document.getElementById('cookieAccept').addEventListener('click', async () => {
    // Set cookie for 5 minutes
    const expires = new Date(Date.now() + 5 * 60 * 1000).toUTCString();
    document.cookie = `cookie_consent=accepted; Expires=${expires}; Path=/`;

    // Send logging request to server
    try {
      await fetch('/log_accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accepted: true, ts: new Date().toISOString() })
      });
    } catch (e) {
      console.warn('Logging failed', e);
    }

    cleanupOverlay();
  });

  document.getElementById('cookieDeny').addEventListener('click', () => {
    // Do not set cookie and do not log
    cleanupOverlay();
  });

  function cleanupOverlay() {
    document.body.removeAttribute('aria-hidden');
    if (prevTabIndex !== null) document.body.setAttribute('tabindex', prevTabIndex);
    overlay.remove();
  }
}

// -------------------- Actions (same as original) --------------------
function toggleProjectDetails(safeId) {
  const el = document.getElementById('details-' + safeId);
  if (!el) return;
  // Use computed style so we detect visibility correctly even when display is set via CSS
  const isVisible = window.getComputedStyle(el).display !== 'none';
  if (!isVisible) {
    // Hide any other open details
    document.querySelectorAll('.project-details-row').forEach(r => { if (r.id !== el.id) r.style.display = 'none'; });
    el.style.display = '';
    // Smooth scroll to the details
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    el.style.display = 'none';
  }
}

function openProject(id) { toggleProjectDetails(String(id).replace(/[^a-zA-Z0-9_-]/g, '_')); }
function addAlert(id) { alert("Dodano alert dla projektu: " + id); }
function addToReport(id) { alert("Dodano do raportu: " + id); }
function openConsultations(id) {
  const p = projects.find(x => x.id === id);
  if (!p || !p.consultations || p.consultations.length === 0) { alert("Brak konsultacji dla: " + id); return; }
  const info = p.consultations.map(c => `${c.phase}: ${c.from} → ${c.to}`).join("\n");
  alert("Konsultacje dla " + p.title + ":\n" + info);
}
function openImpact(id) { alert("Analiza wpływu dla: " + id); }
function subscribeConsultation(title) { alert("Subskrypcja konsultacji: " + title); }
function commentConsultation(title) { alert("Dodaj opinię do: " + title); }
function openOsr(id) { alert("OSR dla projektu: " + id); }
function simulateRisk(id) { alert("Symulacja ryzyk dla: " + id); }

// Show Alert modal for project
function showProjectAlert(projectId, projectTitle) {
  // Add project to in-memory alerts and update UI
  const ts = new Date().toLocaleString('pl-PL');
  userAlerts.push({ projectId, projectTitle, ts });
  renderAlertsAndComments();
  // Visual confirmation
  const alertsContainer = document.getElementById('alertsList');
  if (alertsContainer) {
    // flash the container briefly
    alertsContainer.style.transition = 'box-shadow 0.2s ease';
    alertsContainer.style.boxShadow = '0 0 0 4px rgba(255,193,7,0.2)';
    setTimeout(() => alertsContainer.style.boxShadow = '', 900);
  }
  alert(`✓ Projekt "${projectTitle}" (ID: ${projectId}) został dodany do sekcji "Alert"`);
}

// Add or update a project comment (centralised)
function addProjectComment(projectId, projectTitle, commentText) {
  const existingCommentIndex = userComments.findIndex(c => c.projectId === projectId);
  const ts = new Date().toISOString();
  const displayTime = new Date().toLocaleString('pl-PL');
  let isUpdate = false;
  if (existingCommentIndex !== -1) {
    userComments[existingCommentIndex] = { projectId, projectTitle, text: commentText, ts, displayTime };
    isUpdate = true;
  } else {
    userComments.push({ projectId, projectTitle, text: commentText, ts, displayTime });
  }
  saveAlertsComments();
  renderAlertsAndComments();
  return { isUpdate, ts, displayTime };
}

// Show Comment modal for project (improved)
function showProjectComment(projectId, projectTitle) {
  const modalEl = document.getElementById('projectCommentModal');
  if (!modalEl) {
    // Create modal if it doesn't exist
    const modalHTML = `
      <div id="projectCommentModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="commentModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="commentModalTitle">💬 Dodaj komentarz</h5>
              <button type="button" class="btn-close" onclick="closeProjectCommentModal()" aria-label="Zamknij"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label"><strong>Projekt:</strong></label>
                <div class="alert alert-light border">
                  <div class="fw-semibold">${escapeHtml(projectTitle)}</div>
                  <small class="text-muted">ID: ${escapeHtml(projectId)}</small>
                </div>
              </div>
              <div class="mb-3">
                <label for="projectCommentText" class="form-label"><strong>Twój komentarz</strong></label>
                <textarea class="form-control" id="projectCommentText" rows="6" placeholder="Wpisz swój komentarz do tego projektu..." required></textarea>
                <div class="form-text">
                  Komentarz zostanie zapisany i będzie widoczny w zakładce "Alerty i Komentarze".
                </div>
              </div>
              <!-- Informacja removed as requested -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" onclick="closeProjectCommentModal()">Anuluj</button>
              <button type="button" class="btn btn-primary" id="submitProjectComment">Zapisz komentarz</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Attach a dedicated click handler to the modal submit button to avoid global handler collisions
  const commentModalNew = document.getElementById('projectCommentModal');
  const modalSubmitBtn = commentModalNew.querySelector('#submitProjectComment');
  if (modalSubmitBtn && !modalSubmitBtn.dataset.handlerAttached) {
    const commentSubmitHandler = async (ev) => {
      // Prevent double-processing
      if (modalSubmitBtn.dataset.processing === 'true') return;
      modalSubmitBtn.dataset.processing = 'true';

      const commentTextarea = document.getElementById('projectCommentText');
      const commentText = commentTextarea ? commentTextarea.value.trim() : '';
      if (!commentText) {
        alert('Wpisz treść komentarza!');
        delete modalSubmitBtn.dataset.processing;
        return;
      }
      if (commentText.length > 1000) {
        alert('Komentarz jest zbyt długi. Maksymalnie 1000 znaków.');
        delete modalSubmitBtn.dataset.processing;
        return;
      }

      const projectId = modalSubmitBtn.dataset.projectId;
      const projectTitle = modalSubmitBtn.dataset.projectTitle;

      // centralize comment add/update
      const addResult = addProjectComment(projectId, projectTitle, commentText);
      const isUpdate = addResult.isUpdate;

      // UI feedback
      modalSubmitBtn.textContent = '✓ Zapisano';
      modalSubmitBtn.classList.remove('btn-primary');
      modalSubmitBtn.classList.add('btn-success');
      modalSubmitBtn.disabled = true;
      if (commentTextarea) commentTextarea.disabled = true;

      setTimeout(() => {
        try { showSection('alerts'); } catch(e) { console.warn(e); }
      }, 400);

      setTimeout(() => {
        alert(`${isUpdate ? '✅ Zaktualizowano' : '✅ Dodano'} komentarz do projektu:\n"${projectTitle}"`);
      }, 600);

      setTimeout(() => {
        closeProjectCommentModal();
        // reset
        modalSubmitBtn.textContent = isUpdate ? 'Zaktualizuj komentarz' : 'Zapisz komentarz';
        modalSubmitBtn.classList.remove('btn-success');
        modalSubmitBtn.classList.add('btn-primary');
        modalSubmitBtn.disabled = false;
        if (commentTextarea) { commentTextarea.disabled = false; commentTextarea.value = ''; }
        delete modalSubmitBtn.dataset.processing;
      }, 1200);
    };
    modalSubmitBtn.addEventListener('click', commentSubmitHandler);
    modalSubmitBtn.dataset.handlerAttached = 'true';
  }

  // Show modal with project info
  const commentModal = document.getElementById('projectCommentModal');
  // Keep the modal's static title (do not inject project name into the header)
  
  // Znajdź lub zaktualizuj sekcję projektu w modal
  const projectInfoDiv = commentModal.querySelector('.alert.alert-light.border');
  if (projectInfoDiv) {
    projectInfoDiv.innerHTML = `
      <div class="fw-semibold">${escapeHtml(projectTitle)}</div>
      <small class="text-muted">ID: ${escapeHtml(projectId)}</small>
    `;
  }
  
  // Sprawdź czy istnieje już komentarz dla tego projektu
  const existingComment = userComments.find(c => c.projectId === projectId);
  const commentTextarea = document.getElementById('projectCommentText');
  if (commentTextarea) {
    commentTextarea.value = existingComment ? existingComment.text : '';
    commentTextarea.disabled = false;
    commentTextarea.focus();
  }
  const submitBtn = document.getElementById('submitProjectComment');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = existingComment ? 'Zaktualizuj komentarz' : 'Zapisz komentarz';
    submitBtn.dataset.projectId = projectId;
    submitBtn.dataset.projectTitle = projectTitle;
    submitBtn.dataset.isUpdate = existingComment ? 'true' : 'false';
  }

  // Add backdrop to prevent click-through
  let backdrop = document.getElementById('projectCommentBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'projectCommentBackdrop';
    backdrop.className = 'modal-backdrop fade show';
    backdrop.style.zIndex = 1040;
    backdrop.addEventListener('click', () => closeProjectCommentModal());
    document.body.appendChild(backdrop);
  }

  // Show modal
  commentModal.style.zIndex = 1050;
  commentModal.style.display = 'block';
  commentModal.classList.add('show');
  commentModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
}

  // Close comment modal (reintroduced)
  function closeProjectCommentModal() {
    const modalEl = document.getElementById('projectCommentModal');
    if (modalEl) {
      modalEl.style.display = 'none';
      modalEl.classList.remove('show');
      modalEl.setAttribute('aria-hidden', 'true');
    }
    // Remove backdrop if present
    const backdrop = document.getElementById('projectCommentBackdrop');
    if (backdrop) backdrop.remove();

    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  }

// Add project modal (opens form to collect id and owner)
function addProject() {
  const userRole = (document.getElementById('userRole') || {}).value || localStorage.getItem('userRole');
  if (userRole !== 'official') { alert('Dodawanie projektów jest dostępne tylko dla urzędników.'); return; }

  if (!document.getElementById('addProjectModal')) {
    const modalHTML = `
      <div id="addProjectModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="addProjectTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addProjectTitle">➕ Nowy projekt</h5>
              <button type="button" class="btn-close" onclick="closeAddProjectModal()" aria-label="Zamknij"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Nazwa projektu</label>
                <input class="form-control" id="newProjectTitle" placeholder="Krótka nazwa projektu" />
              </div>
              <div class="mb-3">
                <label class="form-label">Numer projektu (ID)</label>
                <input class="form-control" id="newProjectId" placeholder="Np. UD123" />
              </div>
              <div class="mb-3">
                <label class="form-label">Wnioskodawca / właściciel</label>
                <input class="form-control" id="newProjectOwner" placeholder="Np. Ministerstwo" />
              </div>
              <div class="mb-3">
                <label class="form-label">Etap</label>
                <select id="newProjectStage" class="form-select">
                  <option value="prekonsultacje">Prekonsultacje</option>
                  <option value="konsultacje">Konsultacje społeczne</option>
                  <option value="rząd">Rząd</option>
                  <option value="sejm">Sejm</option>
                  <option value="senat">Senat</option>
                  <option value="prezydent">Prezydent</option>
                  <option value="publikacja">Publikacja</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="closeAddProjectModal()">Anuluj</button>
              <button type="button" class="btn btn-primary" id="submitAddProject">Dodaj projekt</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Reset fields and show
  document.getElementById('newProjectTitle').value = '';
  document.getElementById('newProjectId').value = '';
  document.getElementById('newProjectOwner').value = '';
  document.getElementById('newProjectStage').value = 'prekonsultacje';

  const modal = document.getElementById('addProjectModal');
  modal.style.display = 'block';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeAddProjectModal() {
  const modal = document.getElementById('addProjectModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// -------------------- Accessibility Features --------------------
let currentFontSize = 100; // percentage
let darkModeEnabled = false;
let readingModeEnabled = false;
let contrastModeEnabled = false;

// Initialize accessibility from localStorage
function initializeAccessibility() {
  // Load saved preferences
  const savedFontSize = localStorage.getItem('fontSizePercent');
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const savedReadingMode = localStorage.getItem('readingMode') === 'true';
  const savedContrastMode = localStorage.getItem('contrastMode') === 'true';
  
  if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    applyFontSize(currentFontSize);
  }

  if (savedDarkMode) {
    darkModeEnabled = true;
    enableDarkMode();
  }

  if (savedReadingMode) {
    readingModeEnabled = true;
    enableReadingMode();
  }

  if (savedContrastMode) {
    contrastModeEnabled = true;
    enableContrastMode();
  }
}

// Font size control
function applyFontSize(percent) {
  document.documentElement.style.fontSize = percent + '%';
  localStorage.setItem('fontSizePercent', percent);
}

document.getElementById('increaseFont')?.addEventListener('click', () => {
  currentFontSize = Math.min(currentFontSize + 10, 150);
  applyFontSize(currentFontSize);
  document.getElementById('increaseFont').textContent = currentFontSize === 150 ? '✓ A+' : 'A+';
  setTimeout(() => {
    document.getElementById('increaseFont').textContent = 'A+';
  }, 1500);
});

// Decrease font button (new)
document.getElementById('decreaseFont')?.addEventListener('click', () => {
  currentFontSize = Math.max(currentFontSize - 10, 70);
  applyFontSize(currentFontSize);
  document.getElementById('decreaseFont').textContent = currentFontSize === 70 ? '✓ A-' : 'A-';
  setTimeout(() => {
    document.getElementById('decreaseFont').textContent = 'A-';
  }, 1500);
});

// Legacy reset (keep for compatibility)
document.getElementById('resetFont')?.addEventListener('click', () => {
  currentFontSize = 100;
  applyFontSize(currentFontSize);
  const el = document.getElementById('resetFont');
  if (el) el.textContent = '✓ A';
  setTimeout(() => {
    if (el) el.textContent = 'A';
  }, 1500);
});

// Dark mode
function enableDarkMode() {
  document.body.style.backgroundColor = '#1a1a1a';
  document.body.style.color = '#e0e0e0';
  
  // Apply dark mode to all cards and containers
  document.querySelectorAll('.card').forEach(el => {
    el.style.backgroundColor = '#2a2a2a';
    el.style.color = '#e0e0e0';
    el.style.borderColor = '#444';
  });

  document.querySelectorAll('.bg-light').forEach(el => {
    el.style.backgroundColor = '#2a2a2a !important';
    el.style.color = '#e0e0e0';
  });

  document.querySelectorAll('table').forEach(table => {
    table.style.color = '#e0e0e0';
    table.querySelectorAll('th, td').forEach(cell => {
      cell.style.borderColor = '#444';
    });
  });

  document.querySelectorAll('.form-control, .form-select').forEach(input => {
    input.style.backgroundColor = '#333';
    input.style.color = '#e0e0e0';
    input.style.borderColor = '#555';
  });

  document.getElementById('darkMode').textContent = '✓ 🌓';
  darkModeEnabled = true;
  localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
  document.body.style.backgroundColor = '';
  document.body.style.color = '';
  
  document.querySelectorAll('.card').forEach(el => {
    el.style.backgroundColor = '';
    el.style.color = '';
    el.style.borderColor = '';
  });

  document.querySelectorAll('.bg-light').forEach(el => {
    el.style.backgroundColor = '';
    el.style.color = '';
  });

  document.querySelectorAll('table').forEach(table => {
    table.style.color = '';
    table.querySelectorAll('th, td').forEach(cell => {
      cell.style.borderColor = '';
    });
  });

  document.querySelectorAll('.form-control, .form-select').forEach(input => {
    input.style.backgroundColor = '';
    input.style.color = '';
    input.style.borderColor = '';
  });

  document.getElementById('darkMode').textContent = '🌓';
  darkModeEnabled = false;
  localStorage.setItem('darkMode', 'false');
}

document.getElementById('darkMode')?.addEventListener('click', () => {
  if (darkModeEnabled) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Contrast mode - high contrast colors for accessibility
function enableContrastMode() {
  const style = document.createElement('style');
  style.id = 'contrastModeStyle';
  style.textContent = `
    body.contrast-mode {
      background-color: #fff !important;
      color: #000 !important;
    }
    body.contrast-mode .card,
    body.contrast-mode .container,
    body.contrast-mode nav {
      background-color: #fff !important;
      color: #000 !important;
      border: 2px solid #000 !important;
    }
    body.contrast-mode .table {
      background-color: #fff !important;
      color: #000 !important;
      border: 2px solid #000 !important;
    }
    body.contrast-mode a {
      color: #0000cc !important;
      text-decoration: underline !important;
      font-weight: 600 !important;
    }
    body.contrast-mode button:not(:disabled) {
      background-color: #003300 !important;
      color: #fff !important;
      border: 2px solid #000 !important;
      font-weight: bold !important;
    }
    body.contrast-mode .btn-light {
      background-color: #003300 !important;
      color: #fff !important;
      border: 2px solid #000 !important;
    }
    body.contrast-mode .form-control,
    body.contrast-mode .form-select {
      background-color: #fff !important;
      color: #000 !important;
      border: 2px solid #000 !important;
    }
    body.contrast-mode .table thead th {
      background-color: #ccc !important;
      color: #000 !important;
      border: 2px solid #000 !important;
      font-weight: bold !important;
    }
    body.contrast-mode .table tbody tr {
      border: 1px solid #000 !important;
    }
    body.contrast-mode .table tbody td {
      border: 1px solid #000 !important;
      color: #000 !important;
    }
    body.contrast-mode .badge {
      background-color: #003300 !important;
      color: #fff !important;
      border: 2px solid #000 !important;
      font-weight: bold !important;
    }
    body.contrast-mode h1,
    body.contrast-mode h2,
    body.contrast-mode h3,
    body.contrast-mode h4,
    body.contrast-mode h5,
    body.contrast-mode h6 {
      color: #000 !important;
      font-weight: bold !important;
    }
  `;
  document.head.appendChild(style);
  
  document.body.classList.add('contrast-mode');
  document.getElementById('contrastMode').textContent = '✓ 🌗';
  contrastModeEnabled = true;
  localStorage.setItem('contrastMode', 'true');
}

function disableContrastMode() {
  const style = document.getElementById('contrastModeStyle');
  if (style) style.remove();
  
  document.body.classList.remove('contrast-mode');
  document.getElementById('contrastMode').textContent = '🌗 Kontrast';
  contrastModeEnabled = false;
  localStorage.setItem('contrastMode', 'false');
}

document.getElementById('contrastMode')?.addEventListener('click', () => {
  if (contrastModeEnabled) {
    disableContrastMode();
  } else {
    enableContrastMode();
  }
});

// Reading mode - increase line height, adjust margins, reduce visual clutter
function enableReadingMode() {
  const style = document.createElement('style');
  style.id = 'readingModeStyle';
  style.textContent = `
    body { line-height: 1.8; }
    p { margin-bottom: 1.5rem; }
    .card { margin-bottom: 2rem; }
    .table { font-size: 1.1rem; line-height: 1.8; }
    h1, h2, h3, h4, h5, h6 { margin-top: 2rem; margin-bottom: 1rem; line-height: 1.4; }
    .btn { padding: 0.75rem 1.25rem; }
  `;
  document.head.appendChild(style);
  
  document.getElementById('readingMode').textContent = '✓ 📖';
  readingModeEnabled = true;
  localStorage.setItem('readingMode', 'true');
}

function disableReadingMode() {
  const style = document.getElementById('readingModeStyle');
  if (style) style.remove();
  
  document.getElementById('readingMode').textContent = '📖';
  readingModeEnabled = false;
  localStorage.setItem('readingMode', 'false');
}

document.getElementById('readingMode')?.addEventListener('click', () => {
  if (readingModeEnabled) {
    disableReadingMode();
  } else {
    enableReadingMode();
  }
});

// Bind Add button (also managed by role logic)
document.getElementById('addProjectBtn')?.addEventListener('click', () => addProject());
