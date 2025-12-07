let projects = [
  { id: "AI-001", title: "Ustawa o sztucznej inteligencji", topic: "AI", stage: "sejm", progressPct: 62, owner: "MC", nextMilestone: "II czytanie", impact: { finance: 55, operations: 40, social: 70 }, consultations: [
    { phase: "prekonsultacje", from: "2025-02-10", to: "2025-03-01" },
    { phase: "konsultacje", from: "2025-03-15", to: "2025-04-10" },
  ] },
  { id: "CYB-014", title: "Nowelizacja ustawy o krajowym systemie cyberbezpieczeństwa", topic: "Cybersecurity", stage: "rząd", progressPct: 38, owner: "KPRM", nextMilestone: "Komitet Stały RM", impact: { finance: 35, operations: 60, social: 45 }, consultations: [
    { phase: "prekonsultacje", from: "2025-01-20", to: "2025-02-05" },
  ] },
  { id: "DATA-022", title: "Ustawa o ochronie danych w usługach cyfrowych", topic: "Data", stage: "prekonsultacje", progressPct: 12, owner: "UODO", nextMilestone: "Publikacja założeń", impact: { finance: 25, operations: 30, social: 50 }, consultations: [] },
  { id: "AI-009", title: "Zmiana ustawy – prawo zamówień publicznych (AI w zamówieniach)", topic: "AI", stage: "senat", progressPct: 78, owner: "UZP", nextMilestone: "Posiedzenie Senatu", impact: { finance: 40, operations: 55, social: 35 }, consultations: [
    { phase: "konsultacje", from: "2025-04-01", to: "2025-04-20" },
  ] },
  { id: "CYB-020", title: "Rozporządzenie o incydentach w sektorze publicznym", topic: "Cybersecurity", stage: "publikacja", progressPct: 100, owner: "ABW", nextMilestone: "Wejście w życie", impact: { finance: 30, operations: 65, social: 30 }, consultations: [] }
];

const stagesOrder = ["prekonsultacje","konsultacje","rząd","sejm","senat","prezydent","publikacja"];
const lines = [
  { key: "AI", label: "Temat: Sztuczna inteligencja" },
  { key: "Cybersecurity", label: "Temat: Cyberbezpieczeństwo" },
  { key: "Data", label: "Temat: Dane i prywatność" },
];

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
  return `<span class="badge bg-body border text-dark d-inline-flex align-items-center gap-2"><span class="dot ${m.cls}"></span>${m.label}</span>`;
}

function renderTrainBoard() {
  const board = document.getElementById("trainBoard");
  if (!board) return;
  board.innerHTML = "";

  const topicFilter = (document.getElementById("priority") || {}).value || "all";
  const stageFilter = (document.getElementById("stage") || {}).value || "all";
  const query = ((document.getElementById("search") || {}).value || "").trim().toLowerCase();

  lines.forEach(line => {
    const items = projects.filter(p =>
      p.topic === line.key &&
      (topicFilter === "all" || p.topic === topicFilter) &&
      (stageFilter === "all" || p.stage === stageFilter) &&
      (query === "" || p.title.toLowerCase().includes(query) || p.id.toLowerCase().includes(query))
    );
    if (items.length === 0) return;

    const lineEl = document.createElement("div");
    lineEl.className = "train-line";
    lineEl.innerHTML = `<h3 class="h6 m-0 mb-2">${line.label}</h3><div class="wagons" role="list" aria-label="Wagony projektów"></div>`;
    const wagonsEl = lineEl.querySelector(".wagons");

    items.sort((a,b) => stagesOrder.indexOf(a.stage) - stagesOrder.indexOf(b.stage));

    items.forEach(p => {
      const w = document.createElement("div");
      w.className = "wagon";
      w.setAttribute("role","listitem");
      w.innerHTML = `
        <div class="title">${p.title}</div>
        <div class="meta">ID: ${p.id} • Właściciel: ${p.owner}</div>
        <div class="status">${formatStageTag(p.stage)} • Następny krok: <span class="status-tag">${p.nextMilestone}</span></div>
        <div class="progress"><div class="bar" style="width:${p.progressPct}%"></div></div>
        <div class="actions">
          <button class="btn btn-sm btn-outline-secondary" aria-label="Szczegóły projektu" onclick="openProject('${p.id}')">Szczegóły</button>
          <button class="btn btn-sm btn-outline-secondary" aria-label="Dodaj alert" onclick="addAlert('${p.id}')">Alert</button>
          <button class="btn btn-sm btn-outline-secondary" aria-label="Dodaj do raportu" onclick="addToReport('${p.id}')">Do raportu</button>
          <button class="btn btn-sm btn-outline-secondary" aria-label="Pokaż konsultacje" onclick="openConsultations('${p.id}')">Konsultacje</button>
          <button class="btn btn-sm btn-outline-secondary" aria-label="Analiza wpływu" onclick="openImpact('${p.id}')">Impact</button>
        </div>
      `;
      wagonsEl.appendChild(w);
    });

    board.appendChild(lineEl);
  });

  if (!board.innerHTML) {
    board.innerHTML = `<p>Brak projektów dla wybranych filtrów.</p>`;
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
            <button class="btn btn-sm btn-outline-secondary" onclick="simulateRisk('${p.id}')">Symuluj ryzyka</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="addToReport('${p.id}')">Dodaj do raportu</button>
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
function simplifyText(input) {
  if (!input || input.trim().length === 0) return "Wklej tekst, a uprościmy go.";
  let t = input;
  const map = [
    { from: /niniejsze rozporządzenie/gmi, to: "ten dokument" },
    { from: /podmiot zobowiązany/gmi, to: "instytucja lub firma, która musi to zrobić" },
    { from: /niezwłocznie/gmi, to: "tak szybko, jak to możliwe" },
    { from: /właściwy organ/gmi, to: "odpowiedni urząd" },
    { from: /regulamin/gmi, to: "zasady" },
    { from: /uchyla się/gmi, to: "przestaje obowiązywać" },
    { from: /wchodzi w życie/gmi, to: "zaczyna obowiązywać" },
    { from: /akt normatywny/gmi, to: "przepis" },
  ];
  map.forEach(r => { t = t.replace(r.from, r.to); });
  const effects = [];
  if (/opłaty|koszt/i.test(input)) effects.push("Może zmienić opłaty lub koszty.");
  if (/termin|deadline|dni/i.test(input)) effects.push("Wprowadza konkretne terminy wykonania.");
  if (/obowiązek|zobowiązany/i.test(input)) effects.push("Nakłada obowiązki na wskazane podmioty.");
  if (/kary|sankcje|mandat/i.test(input)) effects.push("Przewiduje sankcje za niewykonanie.");
  const summary = effects.length ? "\n\nSkutki prawne (prostym językiem):\n- " + effects.join("\n- ") : "";
  return t + summary;
}

// -------------------- Section switching (SPA-like) --------------------
const sectionIds = ['legislative','consultations','tracking','tracking-console','impact','alerts','simple','access'];

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

  // Center wagons only in legislative
  document.querySelectorAll('.wagons').forEach(w => {
    w.style.justifyContent = (id === 'legislative') ? 'center' : 'flex-start';
  });

  // Update nav active
  document.querySelectorAll('nav .nav-link').forEach(a => a.classList.remove('active'));
  document.querySelector(`nav .nav-link[data-section="${id}"]`)?.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------- Wire up events --------------------
document.addEventListener('DOMContentLoaded', () => {
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
    globalSearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = e.target.value.toLowerCase();
        const localSearch = document.getElementById("search");
        if (localSearch) localSearch.value = query;
        showSection('legislative');
        renderTrainBoard();
        e.target.value = "";
        const leg = document.getElementById("legislative");
        if (leg) leg.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Simple language
  const simplifyBtn = document.getElementById('simplifyBtn');
  if (simplifyBtn) {
    simplifyBtn.addEventListener('click', () => {
      const src = (document.getElementById('plainInput') || {}).value || '';
      const outEl = document.getElementById('plainOutput');
      if (!src.trim()) { if (outEl) outEl.textContent = 'Wklej tekst do uproszczenia.'; return; }
      if (outEl) outEl.textContent = simplifyText(src);
    });
  }

  // Quick actions basic handlers (same UX as original)
  document.getElementById('configureAlerts')?.addEventListener('click', () => alert('Konfiguracja alertów…'));
  document.getElementById('viewFullChangelog')?.addEventListener('click', () => alert('Pełny dziennik zmian…'));
  document.getElementById('compareVersions')?.addEventListener('click', () => alert('Porównywanie wersji…'));

  // Initial renders
  renderTrainBoard();
  renderSummary();
  renderConsultations();
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
function openProject(id) { alert("Szczegóły projektu: " + id); }
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

// Add project with role check
function addProject() {
  const userRole = (document.getElementById('userRole') || {}).value || localStorage.getItem('userRole');
  if (userRole !== 'official') { alert('Dodawanie projektów jest dostępne tylko dla urzędników.'); return; }
  const title = prompt('Nazwa projektu ustaw (krótka):');
  if (!title) return;
  const id = 'NEW-' + Math.random().toString(36).slice(2,8).toUpperCase();
  const newP = { id, title, topic: 'AI', stage: 'prekonsultacje', progressPct: 5, owner: 'Anon', nextMilestone: 'Rejestracja', impact: { finance: 0, operations: 0, social: 0 }, consultations: [] };
  projects.unshift(newP);
  renderTrainBoard();
  renderSummary();
  renderImpactGrid();
  alert('Projekt dodany: ' + title);
}

// Bind Add button (also managed by role logic)
document.getElementById('addProjectBtn')?.addEventListener('click', () => addProject());
