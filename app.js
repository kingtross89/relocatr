// ── Particles ──────────────────────────────────────────────────────────────
(function spawnParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 0.5;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      --d:${Math.random()*4+2}s; --delay:-${Math.random()*5}s;
    `;
    container.appendChild(p);
  }
})();

// ── Nav scroll effect ──────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 50
    ? 'rgba(8,11,20,0.95)' : 'rgba(8,11,20,0.6)';
});

// ── Country Search Dropdowns ────────────────────────────────────────────────
function buildDropdown(inputId, dropdownId, onSelect) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    if (!q) { dropdown.classList.remove('open'); return; }
    const matches = COUNTRIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, 10);
    if (!matches.length) { dropdown.classList.remove('open'); return; }
    matches.forEach(c => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.innerHTML = `<span class="flag">${c.flag}</span><span>${c.name}</span>`;
      item.addEventListener('mousedown', e => {
        e.preventDefault();
        input.value = c.name;
        input.dataset.code = c.code;
        dropdown.classList.remove('open');
        onSelect(c);
      });
      dropdown.appendChild(item);
    });
    dropdown.classList.add('open');
  });

  input.addEventListener('blur', () => setTimeout(() => dropdown.classList.remove('open'), 150));
  input.addEventListener('focus', () => { if (input.value) input.dispatchEvent(new Event('input')); });
}

let fromCountry = null, toCountry = null;
let _currentFrom = null, _currentTo = null;

buildDropdown('from-input', 'from-dropdown', c => { fromCountry = c; });
buildDropdown('to-input', 'to-dropdown', c => { toCountry = c; });

document.getElementById('swap-btn').addEventListener('click', () => {
  const fi = document.getElementById('from-input');
  const ti = document.getElementById('to-input');
  [fi.value, ti.value] = [ti.value, fi.value];
  [fi.dataset.code, ti.dataset.code] = [ti.dataset.code || '', fi.dataset.code || ''];
  [fromCountry, toCountry] = [toCountry, fromCountry];
});

document.getElementById('search-btn').addEventListener('click', doSearch);
const navBtn = document.getElementById('nav-cta-btn');
if (navBtn) navBtn.addEventListener('click', () => {
  document.getElementById('from-input').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function doSearch() {
  if (!fromCountry || !toCountry) {
    const missing = !fromCountry ? 'from-input' : 'to-input';
    const el = document.getElementById(missing);
    el.style.borderColor = '#ef4444';
    el.focus();
    setTimeout(() => el.style.borderColor = '', 2000);
    return;
  }
  showResults(fromCountry, toCountry);
}

// ── Show Results ────────────────────────────────────────────────────────────
function showResults(from, to) {
  _currentFrom = from; _currentTo = to;
  document.getElementById('results-panel').classList.remove('hidden');
  document.getElementById('results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  const routeEl = document.getElementById('results-route');
  routeEl.innerHTML = `${from.flag} ${from.name} <span style="color:var(--accent);margin:0 0.5rem">→</span> ${to.flag} ${to.name}`;

  // Default to overview tab
  setTab('overview', from, to);

  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      setTab(t.dataset.tab, from, to);
    });
  });
}

document.getElementById('back-btn').addEventListener('click', () => {
  document.getElementById('results-panel').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function setTab(tab, from, to) {
  const content = document.getElementById('tab-content');
  const toData = COUNTRY_DATA[to.code];
  const fromData = COUNTRY_DATA[from.code];

  if (tab === 'overview') content.innerHTML = renderOverview(from, to, toData);
  else if (tab === 'visa') content.innerHTML = renderVisa(from, to, toData);
  else if (tab === 'costs') content.innerHTML = renderCosts(from, to, fromData, toData);
  else if (tab === 'checklist') content.innerHTML = renderChecklist();
  else if (tab === 'tips') content.innerHTML = renderTips(to, toData);

  if (tab === 'costs') animateBars();
  if (tab === 'checklist') initChecklist();
}

// ── Overview ────────────────────────────────────────────────────────────────
function renderOverview(from, to, d) {
  if (!d) return genericOverview(from, to);
  const diff = d.visaDifficulty;
  const badgeClass = diff === 'Easy' ? 'badge-green' : diff === 'Medium' ? 'badge-yellow' : 'badge-red';
  return `
    <div class="overview-hero">
      <div class="overview-flags">${from.flag}<span class="overview-arrow">→</span>${to.flag}</div>
      <div class="overview-text">
        <h2>Moving to ${to.name}</h2>
        <p>Key facts and what to expect when relocating from ${from.name}</p>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card">
        <div class="card-icon">🛂</div>
        <div class="card-label">Visa Difficulty</div>
        <div class="card-value"><span class="badge ${badgeClass}">${d.visaDifficulty}</span></div>
        <div class="card-sub">${d.visaType}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">⏱</div>
        <div class="card-label">Processing Time</div>
        <div class="card-value">${d.visaTime}</div>
        <div class="card-sub">Average timeline</div>
      </div>
      <div class="info-card">
        <div class="card-icon">💰</div>
        <div class="card-label">Est. Monthly Cost</div>
        <div class="card-value">${d.currency} ${(d.cost.rent+d.cost.food+d.cost.transport+d.cost.utilities).toLocaleString()}</div>
        <div class="card-sub">Rent + food + transport + utilities</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🏥</div>
        <div class="card-label">Healthcare</div>
        <div class="card-value" style="font-size:1rem">${d.healthcare}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🗣</div>
        <div class="card-label">Language</div>
        <div class="card-value" style="font-size:1rem">${d.language}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🌤</div>
        <div class="card-label">Climate</div>
        <div class="card-value" style="font-size:1rem">${d.climate}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">⭐</div>
        <div class="card-label">Quality of Life</div>
        <div class="card-value">${d.qualityOfLife}/10</div>
        <div class="card-sub">${renderStars(d.qualityOfLife)}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">💵</div>
        <div class="card-label">Currency</div>
        <div class="card-value">${d.currency}</div>
      </div>
    </div>
  `;
}

function genericOverview(from, to) {
  return `
    <div class="overview-hero">
      <div class="overview-flags">${from.flag}<span class="overview-arrow">→</span>${to.flag}</div>
      <div class="overview-text">
        <h2>Moving to ${to.name}</h2>
        <p>General relocation guide from ${from.name}</p>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card"><div class="card-icon">🛂</div><div class="card-label">First Step</div><div class="card-value" style="font-size:0.95rem">Check ${to.name}'s official immigration website</div></div>
      <div class="info-card"><div class="card-icon">🌐</div><div class="card-label">Region</div><div class="card-value">${to.region}</div></div>
      <div class="info-card"><div class="card-icon">📋</div><div class="card-label">Key Action</div><div class="card-value" style="font-size:0.95rem">Use the Checklist tab to plan your move</div></div>
      <div class="info-card"><div class="card-icon">💡</div><div class="card-label">Tip</div><div class="card-value" style="font-size:0.9rem">Join expat forums specific to ${to.name} for on-the-ground advice</div></div>
    </div>
    <div class="tip-card" style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
      <div class="tip-category">General Advice</div>
      <p style="color:var(--muted);font-size:0.9rem;line-height:1.7">While we don't have specific data for ${to.name} yet, our universal checklist, visa guide, and cost comparison tools can still help you plan. Visit the other tabs above!</p>
    </div>
  `;
}

function renderStars(score) {
  const full = Math.floor(score / 2);
  const half = score % 2 >= 1 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

// ── Visa ────────────────────────────────────────────────────────────────────
function renderVisa(from, to, d) {
  const govLinks = renderGovLinks(to.code);
  const deepDive = renderDeepDiveAccordion('visa', to.code);
  if (!d) {
    return `<div class="visa-card" style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:2rem;margin-bottom:1.5rem">
      <h3>Visa Requirements for ${to.name}</h3>
      <p style="color:var(--muted);margin-top:1rem;line-height:1.7">We recommend checking the official immigration or embassy website for ${to.name} to get accurate, up-to-date visa information. Requirements vary significantly by nationality.</p>
      <p style="color:var(--accent);margin-top:1rem;font-size:0.9rem">💡 Tip: Search for "${from.name} citizens visa requirements for ${to.name}" on Google for the most accurate info.</p>
    </div>
    ${govLinks}${deepDive}`;
  }
  return `
    <div class="visa-grid" style="margin-bottom:1.5rem">
      <div class="visa-card">
        <h3>Visa Options</h3>
        <p style="color:var(--text);font-size:1.05rem;font-weight:600;margin-bottom:0.75rem">${d.visaType}</p>
        <p style="color:var(--muted);font-size:0.88rem;line-height:1.6">The main pathways for ${from.name} citizens moving to ${to.name}. Requirements and eligibility vary by nationality — always verify with the official embassy.</p>
        <div style="margin-top:1rem"><span class="badge ${d.visaDifficulty==='Easy'?'badge-green':d.visaDifficulty==='Medium'?'badge-yellow':'badge-red'}">${d.visaDifficulty} to obtain</span></div>
      </div>
      <div class="visa-card">
        <h3>Processing Timeline</h3>
        <div class="timeline-steps">
          <div class="timeline-step"><div class="step-dot"></div><div class="step-text">Gather documents &amp; certifications — 2–8 weeks</div></div>
          <div class="timeline-step"><div class="step-dot"></div><div class="step-text">Submit application — 1–3 days</div></div>
          <div class="timeline-step"><div class="step-dot"></div><div class="step-text">Processing &amp; biometrics — ${d.visaTime}</div></div>
          <div class="timeline-step"><div class="step-dot"></div><div class="step-text">Visa issued &amp; travel</div></div>
        </div>
      </div>
      <div class="visa-card">
        <h3>Typical Documents Required</h3>
        <ul class="doc-list">
          <li>Valid passport (6+ months validity)</li>
          <li>Completed visa application form</li>
          <li>Passport-size photographs</li>
          <li>Proof of funds / bank statements</li>
          <li>Employment offer letter or proof of income</li>
          <li>Accommodation proof (lease or hotel booking)</li>
          <li>Health insurance documentation</li>
          <li>Criminal background check (apostilled)</li>
        </ul>
      </div>
      <div class="visa-card">
        <h3>Important Notes</h3>
        <ul class="doc-list">
          <li>Always apply well before your planned move date</li>
          <li>Use a certified translator for non-English documents</li>
          <li>Apostille documents via your country's notary system</li>
          <li>Keep multiple copies of all submissions</li>
          <li>Immigration rules change — verify on official gov sites</li>
          <li>Consider hiring an immigration lawyer for complex cases</li>
        </ul>
      </div>
    </div>
    ${govLinks}
    ${deepDive}
  `;
}

// ── Costs ───────────────────────────────────────────────────────────────────
function renderCosts(from, to, fromData, toData) {
  const fd = fromData || { cost:{rent:1200,food:300,transport:100,utilities:120,dining:180}, currency:'USD' };
  const td = toData || { cost:{rent:1000,food:250,transport:80,utilities:100,dining:150}, currency:'USD' };
  const cities = CITY_DATA[to.code] || [];
  const fromCities = CITY_DATA[from.code] || [];
  const citySelector = cities.length ? `
    <div class="city-selector-bar">
      <label>📍 Show costs for</label>
      <select class="city-select" id="to-city-select">
        <option value="-1">${to.name} (national average)</option>
        ${cities.map((c,i)=>`<option value="${i}">${c.name}</option>`).join('')}
      </select>
      <label style="margin-left:1rem">vs.</label>
      <select class="city-select" id="from-city-select">
        <option value="-1">${from.name} (national average)</option>
        ${fromCities.map((c,i)=>`<option value="${i}">${c.name}</option>`).join('')}
      </select>
      <span class="city-note">💡 Costs vary significantly by city</span>
    </div>` : `<div class="city-selector-bar"><span class="city-note">💡 National average shown. City-level data not yet available for ${to.name}.</span></div>`;

  const categories = [
    { label:'Monthly Rent', key:'rent', icon:'🏠' },
    { label:'Groceries', key:'food', icon:'🛒' },
    { label:'Transport', key:'transport', icon:'🚇' },
    { label:'Utilities', key:'utilities', icon:'💡' },
    { label:'Dining Out', key:'dining', icon:'🍽' },
  ];

  // Use city data if available, fall back to national
  let activeFd = fd, activeTd = td;

  const maxVal = Math.max(...categories.map(c => Math.max(activeFd.cost[c.key], activeTd.cost[c.key])));

  let rows = categories.map(c => {
    const fv = activeFd.cost[c.key];
    const tv = activeTd.cost[c.key];
    const diff = tv - fv;
    const pct = Math.round((diff/fv)*100);
    const diffStr = diff >= 0 ? `+${pct}%` : `${pct}%`;
    const diffColor = diff <= 0 ? 'var(--green)' : 'var(--red)';
    const fBar = Math.round((fv/maxVal)*100);
    const tBar = Math.round((tv/maxVal)*100);
    return `
      <div class="cost-row">
        <div class="cost-label">${c.icon} ${c.label}</div>
        <div class="cost-bars">
          <div class="cost-bar-wrap">
            <div class="cost-bar-bg"><div class="cost-bar-fill bar-from" data-width="${fBar}" style="width:0%"></div></div>
            <div class="cost-bar-val" style="color:var(--muted)">${fd.currency} ${fv.toLocaleString()}</div>
          </div>
          <div class="cost-bar-wrap">
            <div class="cost-bar-bg"><div class="cost-bar-fill bar-to" data-width="${tBar}" style="width:0%"></div></div>
            <div class="cost-bar-val" style="color:var(--text)">${td.currency || 'USD'} ${tv.toLocaleString()}</div>
          </div>
        </div>
        <div style="font-size:0.8rem;font-weight:700;color:${diffColor};width:48px;text-align:right;flex-shrink:0">${diffStr}</div>
      </div>
    `;
  }).join('');

  const totalFrom = Object.values(activeFd.cost).reduce((a,b)=>a+b,0) - (activeFd.cost.dining||0);
  const totalTo = Object.values(activeTd.cost).reduce((a,b)=>a+b,0) - (activeTd.cost.dining||0);
  const totalDiff = Math.round(((totalTo-totalFrom)/totalFrom)*100);
  const saving = totalDiff < 0;

  const deepLinks = renderDeepDiveLinks('costs', to.code);
  return `
    ${citySelector}
    <div class="cost-section" id="cost-breakdown">
      <h3>Monthly Cost Breakdown</h3>
      ${rows}
      <div class="cost-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div>${from.name}</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--teal)"></div>${to.name}</div>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card">
        <div class="card-icon">${saving ? '💚' : '📊'}</div>
        <div class="card-label">Cost Difference</div>
        <div class="card-value" style="color:${saving?'var(--green)':'var(--red)'}">${saving?'':'+'} ${totalDiff}%</div>
        <div class="card-sub">${saving ? `You could save ~${Math.abs(totalTo-totalFrom).toLocaleString()} ${td.currency}/mo` : `Expect to spend more than in ${from.name}`}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🏠</div>
        <div class="card-label">Avg Rent in ${to.name}</div>
        <div class="card-value">${td.currency} ${activeTd.cost.rent.toLocaleString()}/mo</div>
        <div class="card-sub">1–2 bedroom, city centre</div>
      </div>
      <div class="info-card">
        <div class="card-icon">💡</div>
        <div class="card-label">Note</div>
        <div class="card-value" style="font-size:0.85rem">Figures are estimates</div>
        <div class="card-sub">Costs vary by city & lifestyle. Research your specific destination.</div>
      </div>
    </div>
    ${deepLinks}
  `;
}

function animateBars() {
  // Wire up city selectors
  const toSel = document.getElementById('to-city-select');
  const fromSel = document.getElementById('from-city-select');
  if (toSel) {
    toSel.addEventListener('change', () => rebuildCostBars());
  }
  if (fromSel) {
    fromSel.addEventListener('change', () => rebuildCostBars());
  }
  setTimeout(() => {
    document.querySelectorAll('.cost-bar-fill[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 100);
}

function rebuildCostBars() {
  const toSel = document.getElementById('to-city-select');
  const fromSel = document.getElementById('from-city-select');
  if (!toSel) return;
  const toIdx = parseInt(toSel.value);
  const fromIdx = fromSel ? parseInt(fromSel.value) : -1;
  const toCities = CITY_DATA[_currentTo ? _currentTo.code : ''] || [];
  const fromCities = CITY_DATA[_currentFrom ? _currentFrom.code : ''] || [];
  const activeTd = toIdx >= 0 ? toCities[toIdx] : null;
  const activeFd = fromIdx >= 0 ? fromCities[fromIdx] : null;
  const cats = ['rent','food','transport','utilities','dining'];
  const toData = COUNTRY_DATA[_currentTo ? _currentTo.code : ''] || { cost:{rent:1000,food:250,transport:80,utilities:100,dining:150}, currency:'USD' };
  const fromData = COUNTRY_DATA[_currentFrom ? _currentFrom.code : ''] || { cost:{rent:1200,food:300,transport:100,utilities:120,dining:180}, currency:'USD' };
  const tdCost = activeTd ? activeTd.cost : toData.cost;
  const fdCost = activeFd ? activeFd.cost : fromData.cost;
  const maxVal = Math.max(...cats.map(k => Math.max(fdCost[k]||0, tdCost[k]||0)));
  const bars = document.querySelectorAll('#cost-breakdown .cost-bar-wrap');
  cats.forEach((k, i) => {
    const fBar = bars[i*2], tBar = bars[i*2+1];
    if (!fBar || !tBar) return;
    const ff = fBar.querySelector('.cost-bar-fill');
    const tf = tBar.querySelector('.cost-bar-fill');
    const fv = fdCost[k] || 0, tv = tdCost[k] || 0;
    if (ff) { ff.dataset.width = Math.round((fv/maxVal)*100); ff.style.width = ff.dataset.width+'%'; }
    if (tf) { tf.dataset.width = Math.round((tv/maxVal)*100); tf.style.width = tf.dataset.width+'%'; }
    const fVal = fBar.querySelector('.cost-bar-val');
    const tVal = tBar.querySelector('.cost-bar-val');
    if (fVal) fVal.textContent = `${fromData.currency} ${fv.toLocaleString()}`;
    if (tVal) tVal.textContent = `${toData.currency} ${tv.toLocaleString()}`;
  });
}

// ── Checklist ───────────────────────────────────────────────────────────────
function renderChecklist() {
  return `<div class="checklist-phases" id="checklist-phases">
    ${CHECKLIST_PHASES.map((phase, pi) => `
      <div class="phase-card ${pi===0?'open':''}" id="phase-${pi}">
        <div class="phase-header" onclick="togglePhase(${pi})">
          <div class="phase-icon">${phase.icon}</div>
          <div class="phase-title">${phase.title}</div>
          <div class="phase-progress" id="phase-prog-${pi}">0 / ${phase.items.length}</div>
          <div class="phase-chevron">▾</div>
        </div>
        <div class="phase-body">
          <div class="checklist-progress-bar"><div class="checklist-progress-fill" id="phase-bar-${pi}" style="width:0%"></div></div>
          ${phase.items.map((item, ii) => `
            <div class="check-item">
              <input type="checkbox" id="chk-${pi}-${ii}" onchange="updatePhaseProgress(${pi})"/>
              <label for="chk-${pi}-${ii}">${item}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>`;
}

function initChecklist() { CHECKLIST_PHASES.forEach((_,i) => updatePhaseProgress(i)); }

function togglePhase(pi) {
  const card = document.getElementById(`phase-${pi}`);
  card.classList.toggle('open');
}

function updatePhaseProgress(pi) {
  const phase = CHECKLIST_PHASES[pi];
  const checked = phase.items.filter((_,ii) => {
    const el = document.getElementById(`chk-${pi}-${ii}`);
    return el && el.checked;
  }).length;
  const pct = Math.round((checked / phase.items.length) * 100);
  const progEl = document.getElementById(`phase-prog-${pi}`);
  const barEl = document.getElementById(`phase-bar-${pi}`);
  if (progEl) progEl.textContent = `${checked} / ${phase.items.length}`;
  if (barEl) barEl.style.width = pct + '%';
}

// ── Tips ────────────────────────────────────────────────────────────────────
function renderTips(to, d) {
  const genericTips = [
    { cat:"Banking", title:"Open a Multi-Currency Account", body:"Wise or Revolut are essential for expats — no foreign transaction fees and real exchange rates." },
    { cat:"Community", title:"Join Expat Groups", body:`Search Facebook for "${to.name} Expats" and Reddit for r/${to.name.replace(/\s+/g,'').toLowerCase()} to get real local advice.` },
    { cat:"Documents", title:"Keep Digital Copies", body:"Store all documents on Google Drive or iCloud — passport, visa, lease, bank statements. You'll need them often." },
    { cat:"Tax", title:"Understand Your Tax Obligations", body:"Hire a local accountant familiar with expat taxation. Many countries have tax treaties that affect how you're taxed." },
    { cat:"Housing", title:"Use Local Property Sites", body:`Research local property listing sites specific to ${to.name} for the most accurate rental prices before committing.` },
    { cat:"Health", title:"Get Insurance Before Departure", body:"International health insurance (Cigna Global, AXA) bridges the gap before you qualify for local healthcare." },
  ];
  const tips = d ? d.tips.map((t, i) => {
    const cats = ["Local Tip", "Banking", "Documents", "Housing", "Health", "Culture", "Tax", "Transport"];
    return { cat: cats[i % cats.length], title: t.split('—')[0].trim(), body: t };
  }) : genericTips;
  const deepDive = renderDeepDiveLinks('tips', to.code);
  return `<div class="tips-grid">
    ${tips.map(t => `
      <div class="tip-card">
        <div class="tip-category">${t.cat}</div>
        <h3>${t.title}</h3>
        <p>${t.body}</p>
      </div>
    `).join('')}
    ${genericTips.slice(0, 3).map(t => `
      <div class="tip-card">
        <div class="tip-category">${t.cat}</div>
        <h3>${t.title}</h3>
        <p>${t.body}</p>
      </div>
    `).join('')}
  </div>${deepDive}`;
}

// ── Destinations Grid ───────────────────────────────────────────────────────
(function buildDestinations() {
  const grid = document.getElementById('destinations-grid');
  TRENDING.forEach(dest => {
    const c = COUNTRIES.find(x => x.code === dest.code);
    if (!c) return;
    const card = document.createElement('div');
    card.className = 'dest-card';
    card.innerHTML = `
      <div class="dest-flag">${c.flag}</div>
      <div class="dest-name">${c.name}</div>
      <div class="dest-tagline">${dest.tagline}</div>
      <div class="dest-trend">📈 ${dest.trend}</div>
    `;
    card.addEventListener('click', () => {
      toCountry = c;
      document.getElementById('to-input').value = c.name;
      document.getElementById('to-input').dataset.code = c.code;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.getElementById('to-input').focus();
    });
    grid.appendChild(card);
  });
})();

// ── Compare Grid ────────────────────────────────────────────────────────────
(function buildCompare() {
  const grid = document.getElementById('compare-grid');
  COMPARE_COUNTRIES.forEach(code => {
    const c = COUNTRIES.find(x => x.code === code);
    const d = COUNTRY_DATA[code];
    if (!c || !d) return;
    const total = d.cost.rent + d.cost.food + d.cost.transport + d.cost.utilities;
    const card = document.createElement('div');
    card.className = 'compare-card';
    card.innerHTML = `
      <div class="compare-flag">${c.flag}</div>
      <div class="compare-country">${c.name}</div>
      <div class="compare-metric"><span class="metric-label">Rent</span><span class="metric-val">${d.currency} ${d.cost.rent.toLocaleString()}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Food</span><span class="metric-val">${d.currency} ${d.cost.food}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Transport</span><span class="metric-val">${d.currency} ${d.cost.transport}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Total Est.</span><span class="metric-val" style="color:var(--accent)">${d.currency} ${total.toLocaleString()}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Visa</span><span class="metric-val"><span class="badge ${d.visaDifficulty==='Easy'?'badge-green':d.visaDifficulty==='Medium'?'badge-yellow':'badge-red'}" style="font-size:0.7rem">${d.visaDifficulty}</span></span></div>
    `;
    grid.appendChild(card);
  });
})();

// ── Static Checklist Section ────────────────────────────────────────────────
(function buildStaticChecklist() {
  const container = document.getElementById('checklist-container');
  container.innerHTML = renderChecklist();
  initChecklist();
})();

// ── Helper: Gov Links ────────────────────────────────────────────────────────
function renderGovLinks(code) {
  const links = GOV_LINKS[code];
  if (!links || !links.length) return '';
  return `<div class="gov-links-section">
    <h3>🏛️ Official Government Resources</h3>
    <div class="gov-links-grid">
      ${links.map(l => `
        <a class="gov-link-card" href="${l.url}" target="_blank" rel="noopener">
          <span class="gov-link-icon">${l.icon}</span>
          <span class="gov-link-text">
            <span class="gov-link-cat">${l.cat}</span>
            <span class="gov-link-label">${l.label}</span>
          </span>
          <span class="gov-link-arrow">↗</span>
        </a>`).join('')}
    </div>
  </div>`;
}

// ── Helper: Deep Dive Accordion ───────────────────────────────────────────────
function renderDeepDiveAccordion(section, code) {
  const sectionData = DEEP_DIVE[section];
  if (!sectionData) return '';
  const d = sectionData[code] || sectionData['DEFAULT'];
  if (!d) return '';
  const id = `acc-${section}-${code}`;
  return `<div class="deep-dive-section">
    <div class="deep-dive-header">
      <h3>📖 Go Deeper</h3>
      <div class="deep-dive-line"></div>
    </div>
    <div class="accordion">
      <div class="acc-item" id="${id}">
        <button class="acc-trigger" onclick="toggleAcc('${id}')">
          <span>🔍 ${d.heading}</span>
          <span class="acc-chevron">▾</span>
        </button>
        <div class="acc-body">
          ${d.body ? `<p>${d.body}</p>` : ''}
          <div class="acc-links">
            ${d.links.map(l=>`<a class="acc-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderDeepDiveLinks(section, code) {
  const sectionData = DEEP_DIVE[section];
  if (!sectionData) return '';
  const d = sectionData[code] || sectionData['DEFAULT'];
  if (!d) return '';
  return `<div class="gov-links-section">
    <h3>🔗 ${d.heading || 'Further Resources'}</h3>
    <div class="gov-links-grid">
      ${d.links.map(l=>`
        <a class="gov-link-card" href="${l.url}" target="_blank" rel="noopener">
          <span class="gov-link-icon">🔗</span>
          <span class="gov-link-text"><span class="gov-link-label">${l.label}</span></span>
          <span class="gov-link-arrow">↗</span>
        </a>`).join('')}
    </div>
  </div>`;
}

function toggleAcc(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// ── Safety Warning ────────────────────────────────────────────────────────────
function renderSafetyBanner(code) {
  const w = SAFETY_WARNINGS[code];
  if (!w) return '';
  const lvl = w.level >= 4 ? 'level-4' : 'level-3';
  const icon = w.level >= 4 ? '🚨' : '⚠️';
  const title = w.level >= 4 ? 'Level 4: Do Not Travel' : 'Level 3: Reconsider Travel';
  return `<div class="safety-banner ${lvl}">
    <div class="sb-icon">${icon}</div>
    <div class="sb-text">
      <h4>${title}</h4>
      <p>${w.msg}</p>
      <p class="sb-source">Source: <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/" target="_blank" rel="noopener">US State Department Travel Advisory</a> — always check your own country's advisory too.</p>
    </div>
  </div>`;
}

// ── Visa Special ──────────────────────────────────────────────────────────────
function renderVisaSpecial(fromCode, toCode) {
  const key = `${fromCode}→${toCode}`;
  const v = VISA_SPECIALS[key];
  if (!v) return '';
  return `<div class="visa-special">
    <div class="visa-special-badge">${v.badge}</div>
    <p>${v.info}</p>
    <div class="visa-special-links">
      ${v.links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener">↗ ${l.label}</a>`).join('')}
    </div>
  </div>`;
}

// Patch renderOverview to include safety warning
const _origRenderOverview = renderOverview;
window.renderOverview = function(from, to, d) {
  const safety = renderSafetyBanner(to.code);
  const base = _origRenderOverview(from, to, d);
  return safety + base;
};

// Patch renderVisa to include special visas
const _origRenderVisa = renderVisa;
window.renderVisa = function(from, to, d) {
  const special = renderVisaSpecial(from.code, to.code);
  return special + _origRenderVisa(from, to, d);
};

// Patch setTab to use window versions
const _origSetTab = setTab;
window.setTab = function(tab, from, to) {
  const content = document.getElementById('tab-content');
  const toData = COUNTRY_DATA[to.code];
  const fromData = COUNTRY_DATA[from.code];
  if (tab === 'overview') content.innerHTML = window.renderOverview(from, to, toData);
  else if (tab === 'visa') content.innerHTML = window.renderVisa(from, to, toData);
  else if (tab === 'costs') content.innerHTML = renderCosts(from, to, fromData, toData);
  else if (tab === 'checklist') content.innerHTML = renderChecklistWithLinks();
  else if (tab === 'tips') content.innerHTML = renderTips(to, toData);
  if (tab === 'costs') animateBars();
  if (tab === 'checklist') initChecklist();
};

// Rebuild showResults to use window.setTab
const _origShowResults = showResults;
window.showResults = function(from, to) {
  _currentFrom = from; _currentTo = to;
  document.getElementById('results-panel').classList.remove('hidden');
  document.getElementById('results-panel').scrollIntoView({behavior:'smooth',block:'start'});
  const routeEl = document.getElementById('results-route');
  routeEl.innerHTML = `${from.flag} ${from.name} <span style="color:var(--accent);margin:0 0.5rem">→</span> ${to.flag} ${to.name}`;
  window.setTab('overview', from, to);
  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      window.setTab(t.dataset.tab, from, to);
    });
  });
};

// Override doSearch to use window.showResults
document.getElementById('search-btn').addEventListener('click', () => {
  if (!fromCountry || !toCountry) {
    const missing = !fromCountry ? 'from-input' : 'to-input';
    const el = document.getElementById(missing);
    el.style.borderColor = '#ef4444';
    el.focus();
    setTimeout(() => el.style.borderColor = '', 2000);
    return;
  }
  window.showResults(fromCountry, toCountry);
}, true);

// ── Checklist with Links ──────────────────────────────────────────────────────
function renderChecklistWithLinks() {
  return `<div class="checklist-phases" id="checklist-phases">
    ${CHECKLIST_PHASES.map((phase, pi) => `
      <div class="phase-card ${pi===0?'open':''}" id="phase-${pi}">
        <div class="phase-header" onclick="togglePhase(${pi})">
          <div class="phase-icon">${phase.icon}</div>
          <div class="phase-title">${phase.title}</div>
          <div class="phase-progress" id="phase-prog-${pi}">0 / ${phase.items.length}</div>
          <div class="phase-chevron">▾</div>
        </div>
        <div class="phase-body">
          <div class="checklist-progress-bar"><div class="checklist-progress-fill" id="phase-bar-${pi}" style="width:0%"></div></div>
          ${phase.items.map((item, ii) => {
            const link = CHECKLIST_LINKS[item];
            const linkHtml = link ? `<a class="check-link" href="${link}" target="_blank" rel="noopener" title="Helpful resource">↗ Help</a>` : '';
            return `<div class="check-item">
              <input type="checkbox" id="chkl-${pi}-${ii}" onchange="updatePhaseProgressL(${pi})"/>
              <label for="chkl-${pi}-${ii}">${item}${linkHtml}</label>
            </div>`;
          }).join('')}
        </div>
      </div>
    `).join('')}
  </div>`;
}

function updatePhaseProgressL(pi) {
  const phase = CHECKLIST_PHASES[pi];
  const checked = phase.items.filter((_,ii) => {
    const el = document.getElementById(`chkl-${pi}-${ii}`);
    return el && el.checked;
  }).length;
  const pct = Math.round((checked/phase.items.length)*100);
  const progEl = document.getElementById(`phase-prog-${pi}`);
  const barEl = document.getElementById(`phase-bar-${pi}`);
  if (progEl) progEl.textContent = `${checked} / ${phase.items.length}`;
  if (barEl) barEl.style.width = pct + '%';
}

// ── Fix rebuildCostBars — update ALL summary cards ────────────────────────────
const _origRebuildCostBars = rebuildCostBars;
window.rebuildCostBars = function() {
  _origRebuildCostBars();
  const toSel = document.getElementById('to-city-select');
  const fromSel = document.getElementById('from-city-select');
  if (!toSel) return;
  const toIdx = parseInt(toSel.value);
  const fromIdx = fromSel ? parseInt(fromSel.value) : -1;
  const toCities = CITY_DATA[_currentTo ? _currentTo.code : ''] || [];
  const fromCities = CITY_DATA[_currentFrom ? _currentFrom.code : ''] || [];
  const activeTd = toIdx >= 0 ? toCities[toIdx] : null;
  const activeFd = fromIdx >= 0 ? fromCities[fromIdx] : null;
  const toData = COUNTRY_DATA[_currentTo ? _currentTo.code : ''] || {cost:{rent:1000,food:250,transport:80,utilities:100,dining:150},currency:'USD'};
  const fromData = COUNTRY_DATA[_currentFrom ? _currentFrom.code : ''] || {cost:{rent:1200,food:300,transport:100,utilities:120,dining:180},currency:'USD'};
  const tdCost = activeTd ? activeTd.cost : toData.cost;
  const fdCost = activeFd ? activeFd.cost : fromData.cost;
  const tdTotal = (tdCost.rent||0)+(tdCost.food||0)+(tdCost.transport||0)+(tdCost.utilities||0);
  const fdTotal = (fdCost.rent||0)+(fdCost.food||0)+(fdCost.transport||0)+(fdCost.utilities||0);
  const diff = Math.round(((tdTotal-fdTotal)/fdTotal)*100);
  const saving = diff < 0;
  const diffCard = document.getElementById('cost-diff-card');
  const rentCard = document.getElementById('cost-rent-card');
  if (diffCard) {
    diffCard.querySelector('.card-icon').textContent = saving ? '💚' : '📊';
    diffCard.querySelector('.card-value').style.color = saving ? 'var(--green)' : 'var(--red)';
    diffCard.querySelector('.card-value').textContent = (saving?'':'+') + diff + '%';
    diffCard.querySelector('.card-sub').textContent = saving
      ? `You could save ~${Math.abs(tdTotal-fdTotal).toLocaleString()} ${toData.currency}/mo`
      : `Expect to spend more than in ${_currentFrom ? _currentFrom.name : 'origin'}`;
  }
  if (rentCard) {
    rentCard.querySelector('.card-value').textContent = `${toData.currency} ${(tdCost.rent||0).toLocaleString()}/mo`;
  }
};

// Wire city selectors to window.rebuildCostBars
const _origAnimateBars = animateBars;
window.animateBars = function() {
  _origAnimateBars();
  const toSel = document.getElementById('to-city-select');
  const fromSel = document.getElementById('from-city-select');
  if (toSel) toSel.onchange = window.rebuildCostBars;
  if (fromSel) fromSel.onchange = window.rebuildCostBars;
};

// Patch renderCosts summary cards to have IDs
const _origRenderCosts = renderCosts;
window.renderCosts = function(from, to, fromData, toData) {
  let html = _origRenderCosts(from, to, fromData, toData);
  html = html.replace('<div class="info-card">\n      <div class="card-icon">', '<div class="info-card" id="cost-diff-card">\n      <div class="card-icon">');
  // Add ID to rent card
  html = html.replace('Avg Rent in', '~~~RENT~~~Avg Rent in');
  const parts = html.split('~~~RENT~~~');
  if (parts.length === 2) {
    const insertAt = parts[0].lastIndexOf('<div class="info-card">');
    parts[0] = parts[0].substring(0, insertAt) + '<div class="info-card" id="cost-rent-card">' + parts[0].substring(insertAt + '<div class="info-card">'.length);
    html = parts.join('Avg Rent in');
  }
  return html;
};

// ── Quiz ──────────────────────────────────────────────────────────────────────
let quizAnswers = {}, quizStep = 0;

document.getElementById('quiz-start-btn').addEventListener('click', () => openQuiz());
document.getElementById('quiz-close').addEventListener('click', () => closeQuiz());
document.getElementById('quiz-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeQuiz(); });

function openQuiz() {
  quizAnswers = {}; quizStep = 0;
  document.getElementById('quiz-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderQuizStep();
}
function closeQuiz() {
  document.getElementById('quiz-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function renderQuizStep() {
  const q = QUIZ_QUESTIONS[quizStep];
  const content = document.getElementById('quiz-content');
  const pct = Math.round((quizStep / 10) * 100);
  const selected = quizAnswers[q.id];
  content.innerHTML = `
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-step-label">Question ${quizStep+1} of 10</div>
    <div class="quiz-q-icon">${q.icon}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map(opt => `
        <button class="quiz-option ${selected===opt.value?'selected':''}" onclick="selectQuizOption('${q.id}', ${JSON.stringify(opt.value)})">
          ${opt.label}
        </button>`).join('')}
    </div>
    <div class="quiz-nav">
      <button class="quiz-back-btn" onclick="quizBack()" ${quizStep===0?'style="visibility:hidden"':''}>← Back</button>
      <button class="quiz-next-btn" id="quiz-next" onclick="quizNext()" ${!selected?'disabled':''}>
        ${quizStep === 9 ? 'See My Matches 🎉' : 'Next →'}
      </button>
    </div>`;
}

function selectQuizOption(id, value) {
  quizAnswers[id] = value;
  renderQuizStep();
}
function quizBack() { if (quizStep > 0) { quizStep--; renderQuizStep(); } }
function quizNext() {
  if (quizStep < 9) { quizStep++; renderQuizStep(); }
  else showQuizResults();
}

function scoreCountry(code, answers) {
  const p = COUNTRY_PROFILES[code];
  if (!p) return 0;
  let score = 0, max = 0;
  // Budget (25pts)
  max += 25;
  const budget = answers.budget || 2000;
  score += budget >= p.costScore ? 25 : Math.max(0, 25 * (budget / p.costScore));
  // Climate (20pts)
  max += 20;
  if (!answers.climate || answers.climate === 'any' || p.climates.includes(answers.climate)) score += 20;
  // Language (15pts)
  max += 15;
  if (!answers.language || answers.language === 'any') score += 15;
  else if (answers.language === 'english_preferred') score += p.english ? 15 : 8;
  else score += p.english ? 15 : 0;
  // Situation (15pts)
  max += 15;
  if (!answers.situation || answers.situation === 'employed' || answers.situation === 'undecided') score += 12;
  else if (answers.situation === 'remote' && p.remoteOk) score += 15;
  else if (answers.situation === 'retired' && p.retiredOk) score += 15;
  else if (answers.situation === 'student' && p.studentOk) score += 15;
  else score += 5;
  // Priority (20pts)
  max += 20;
  const pMap = {cost: Math.max(0,20*(1-(p.costScore-500)/5000)), safety:20*(p.safetyScore/10), career:20*(p.careerScore/10), lifestyle:20*(p.lifestyleScore/10), healthcare:20*(p.healthcareScore/10)};
  score += pMap[answers.priority] || 15;
  // Family (5pts)
  max += 5;
  if (!answers.family || answers.family !== 'family' || p.familyOk) score += 5;
  
  // Visa (10pts)
  max += 10;
  if (!answers.visa || answers.visa === 'citizen') score += 10;
  else if (answers.visa === 'easy') score += p.visaEase === 3 ? 10 : (p.visaEase === 2 ? 5 : 0);
  else score += 10;
  
  // Vibe (10pts)
  max += 10;
  if (!answers.vibe || answers.vibe === 'mixed') score += 10;
  else if (answers.vibe === 'fast') score += p.careerScore >= 8 ? 10 : 3;
  else if (answers.vibe === 'relaxed') score += p.lifestyleScore >= 8 ? 10 : 3;

  // Healthcare Pref (10pts)
  max += 10;
  const privateHC = ['US','AE','SG','TH','CH','NL'];
  if (!answers.healthcare_pref || answers.healthcare_pref === 'any') score += 10;
  else if (answers.healthcare_pref === 'private' && privateHC.includes(code)) score += 10;
  else if (answers.healthcare_pref === 'public' && !privateHC.includes(code)) score += 10;
  else score += 4;

  // Transit (10pts)
  max += 10;
  const driveHeavy = ['US','CA','AU','NZ','AE','MX'];
  if (!answers.transit) score += 10;
  else if (answers.transit === 'drive' && driveHeavy.includes(code)) score += 10;
  else if ((answers.transit === 'transit' || answers.transit === 'walk') && !driveHeavy.includes(code)) score += 10;
  else score += 4;

  return Math.round((score/max)*100);
}

function getMatchReasons(code, answers) {
  const p = COUNTRY_PROFILES[code];
  if (!p) return '';
  const reasons = [];
  const driveHeavy = ['US','CA','AU','NZ','AE','MX'];
  if (answers.priority === 'cost' && p.costScore < 1500) reasons.push('Low cost of living');
  if (answers.priority === 'safety' && p.safetyScore >= 9) reasons.push('Extremely safe');
  if (answers.priority === 'career' && p.careerScore >= 9) reasons.push('Strong job market');
  if (answers.priority === 'lifestyle' && p.lifestyleScore >= 9) reasons.push('Excellent lifestyle');
  if (answers.priority === 'healthcare' && p.healthcareScore >= 9) reasons.push('World-class healthcare');
  if (p.english && (answers.language === 'english_only' || answers.language === 'english_preferred')) reasons.push('English widely spoken');
  if (answers.situation === 'remote' && p.remoteOk) reasons.push('Remote-worker friendly');
  if (answers.situation === 'retired' && p.retiredOk) reasons.push('Great retirement destination');
  if (answers.visa === 'easy' && p.visaEase === 3) reasons.push('Accessible visa options');
  if (answers.vibe === 'relaxed' && p.lifestyleScore >= 8) reasons.push('Laid-back lifestyle');
  if (answers.vibe === 'fast' && p.careerScore >= 8) reasons.push('Fast-paced & ambitious');
  if (answers.transit === 'transit' && !driveHeavy.includes(code)) reasons.push('Great public transit');
  if (answers.transit === 'walk' && !driveHeavy.includes(code)) reasons.push('Highly walkable');
  if (answers.transit === 'drive' && driveHeavy.includes(code)) reasons.push('Car-friendly infrastructure');
  
  return reasons.slice(0, 3).join(' · ') || 'Strong overall match';
}

function showQuizResults() {
  const scores = Object.keys(COUNTRY_PROFILES).map(code => ({
    code, score: scoreCountry(code, quizAnswers)
  })).sort((a,b) => b.score - a.score).slice(0, 5);

  const medals = ['gold','silver','bronze','',''];
  const content = document.getElementById('quiz-content');
  content.innerHTML = `
    <div class="quiz-results-title">🎉 Your Top Matches</div>
    <div class="quiz-results-sub">Based on your answers — click any country to explore your full relocation guide.</div>
    ${scores.map((s,i) => {
      const c = COUNTRIES.find(x => x.code === s.code);
      if (!c) return '';
      const reasons = getMatchReasons(s.code, quizAnswers);
      return `<div class="quiz-result-card" onclick="pickQuizResult('${s.code}')">
        <div class="quiz-result-rank ${medals[i]}">${i+1}</div>
        <div class="quiz-result-flag">${c.flag}</div>
        <div class="quiz-result-info">
          <div class="quiz-result-name">${c.name}</div>
          <div class="quiz-result-reasons">${reasons}</div>
        </div>
        <div class="quiz-result-score">
          <div class="quiz-result-pct">${s.score}%</div>
          <div class="quiz-result-match">match</div>
        </div>
      </div>`;
    }).join('')}
    <button class="quiz-restart-btn" onclick="quizStep=0;quizAnswers={};renderQuizStep()">↺ Retake Quiz</button>`;
}

function pickQuizResult(code) {
  const country = COUNTRIES.find(c => c.code === code);
  if (!country) return;
  closeQuiz();
  toCountry = country;
  document.getElementById('to-input').value = country.name;
  document.getElementById('to-input').dataset.code = country.code;
  if (fromCountry) {
    window.showResults(fromCountry, toCountry);
  } else {
    window.scrollTo({top:0,behavior:'smooth'});
    document.getElementById('to-input').focus();
  }
}

// ── Enhanced Quiz: City-level + Live Exchange Rates ───────────────────────────

const MAJOR_CURRENCIES = [
  {code:"USD",flag:"🇺🇸",label:"US Dollar"},
  {code:"GBP",flag:"🇬🇧",label:"British Pound"},
  {code:"EUR",flag:"🇪🇺",label:"Euro"},
  {code:"AUD",flag:"🇦🇺",label:"Australian Dollar"},
  {code:"CAD",flag:"🇨🇦",label:"Canadian Dollar"},
  {code:"JPY",flag:"🇯🇵",label:"Japanese Yen"},
  {code:"INR",flag:"🇮🇳",label:"Indian Rupee"},
  {code:"SGD",flag:"🇸🇬",label:"Singapore Dollar"},
  {code:"ZAR",flag:"🇿🇦",label:"South African Rand"},
  {code:"BRL",flag:"🇧🇷",label:"Brazilian Real"},
  {code:"CHF",flag:"🇨🇭",label:"Swiss Franc"},
  {code:"AED",flag:"🇦🇪",label:"UAE Dirham"},
  {code:"NZD",flag:"🇳🇿",label:"NZ Dollar"},
  {code:"MXN",flag:"🇲🇽",label:"Mexican Peso"},
  {code:"HKD",flag:"🇭🇰",label:"Hong Kong Dollar"},
];

// Static fallback rates (to USD)
const FALLBACK_RATES = {USD:1,GBP:0.79,EUR:0.92,AUD:1.53,CAD:1.36,JPY:149,INR:83,SGD:1.34,ZAR:18.6,BRL:4.97,CHF:0.89,AED:3.67,NZD:1.63,MXN:17.1,HKD:7.82,THB:35,MXN:17,SEK:10.5,NOK:10.6,DKK:6.9};

// Country currency map
const COUNTRY_CURRENCY = {US:"USD",GB:"GBP",DE:"EUR",FR:"EUR",ES:"EUR",PT:"EUR",NL:"EUR",IT:"EUR",AU:"AUD",CA:"CAD",JP:"JPY",IN:"INR",SG:"SGD",ZA:"ZAR",BR:"BRL",CH:"CHF",AE:"AED",NZ:"NZD",MX:"MXN",HK:"HKD",TH:"THB",NO:"NOK",SE:"SEK",DK:"DKK"};

let liveRates = null;
let ratesFetched = false;
let rateSource = 'static';

async function fetchExchangeRates() {
  if (ratesFetched) return;
  try {
    const res = await fetch('https://open.exchangerate-api.com/v6/latest/USD');
    const data = await res.json();
    if (data && data.rates) { liveRates = data.rates; rateSource = 'live'; }
    else liveRates = FALLBACK_RATES;
  } catch(e) { liveRates = FALLBACK_RATES; rateSource = 'static'; }
  ratesFetched = true;
}

function toUSD(amount, currency) {
  const rates = liveRates || FALLBACK_RATES;
  return amount / (rates[currency] || 1);
}
function fromUSD(amount, currency) {
  const rates = liveRates || FALLBACK_RATES;
  return amount * (rates[currency] || 1);
}
function fmtCurrency(amount, currency) {
  const symbols = {USD:'$',GBP:'£',EUR:'€',AUD:'A$',CAD:'C$',JPY:'¥',INR:'₹',SGD:'S$',ZAR:'R',BRL:'R$',CHF:'CHF ',AED:'AED ',NZD:'NZ$',MXN:'MX$',HKD:'HK$',THB:'฿',NOK:'kr',SEK:'kr',DKK:'kr'};
  const s = symbols[currency] || currency+' ';
  return s + Math.round(amount).toLocaleString();
}

// Budget base amounts in USD
const BUDGET_TIERS_USD = [700, 1400, 2500, 4000];

// Build flat list of all quiz-able cities
function getAllCities() {
  const list = [];
  Object.entries(CITY_DATA).forEach(([countryCode, cities]) => {
    const profile = COUNTRY_PROFILES[countryCode];
    if (!profile) return;
    cities.forEach(city => {
      list.push({ name: city.name, countryCode, cost: city.cost });
    });
  });
  return list;
}

function scoreCityForQuiz(city, answers) {
  const p = COUNTRY_PROFILES[city.countryCode];
  if (!p) return 0;
  let score = 0, max = 0;

  // Climate (20pts)
  max += 20;
  if (!answers.climate || answers.climate === 'any' || p.climates.includes(answers.climate)) score += 20;

  // Language (15pts)
  max += 15;
  if (!answers.language || answers.language === 'any') score += 15;
  else if (answers.language === 'english_preferred') score += p.english ? 15 : 8;
  else score += p.english ? 15 : 0;

  // Situation (15pts)
  max += 15;
  const sit = answers.situation;
  if (!sit || sit === 'employed' || sit === 'undecided') score += 12;
  else if (sit === 'remote' && p.remoteOk) score += 15;
  else if (sit === 'retired' && p.retiredOk) score += 15;
  else if (sit === 'student' && p.studentOk) score += 15;
  else score += 5;

  // Priority (20pts)
  max += 20;
  const pMap = {safety:p.safetyScore/10,career:p.careerScore/10,lifestyle:p.lifestyleScore/10,healthcare:p.healthcareScore/10};
  if (answers.priority && answers.priority !== 'cost') score += 20*(pMap[answers.priority]||0.7);
  else score += 14;

  // Family (5pts)
  max += 5;
  if (!answers.family || answers.family !== 'family' || p.familyOk) score += 5;

  // Budget vs city cost (25pts) — converted via live rates
  max += 25;
  const userCurrency = answers.currency || 'USD';
  const budgetUSD = toUSD(answers.budget || 1400, userCurrency);
  const localCurrency = COUNTRY_CURRENCY[city.countryCode] || 'USD';
  const cityTotalUSD = toUSD(
    (city.cost.rent||0)+(city.cost.food||0)+(city.cost.transport||0)+(city.cost.utilities||0),
    localCurrency
  );
  if (budgetUSD >= cityTotalUSD) score += 25;
  else score += Math.max(0, 25 * (budgetUSD / cityTotalUSD));

  return Math.round((score / max) * 100);
}

function getCityReasons(city, answers) {
  const p = COUNTRY_PROFILES[city.countryCode];
  const reasons = [];
  const userCurrency = answers.currency || 'USD';
  const localCurrency = COUNTRY_CURRENCY[city.countryCode] || 'USD';
  const cityTotalLocal = (city.cost.rent||0)+(city.cost.food||0)+(city.cost.transport||0)+(city.cost.utilities||0);
  const budgetUSD = toUSD(answers.budget || 1400, userCurrency);
  const budgetInLocal = fromUSD(budgetUSD, localCurrency);
  const pct = Math.round((budgetInLocal / cityTotalLocal) * 100);
  if (pct >= 120) reasons.push(`${fmtCurrency(budgetInLocal - cityTotalLocal, localCurrency)}/mo to spare`);
  else if (pct >= 90) reasons.push('Fits your budget well');
  else reasons.push('Slightly above budget');
  if (p && p.safetyScore >= 9) reasons.push('Very safe');
  if (p && p.english) reasons.push('English spoken');
  if (answers.situation === 'remote' && p && p.remoteOk) reasons.push('Remote-friendly');
  return reasons.slice(0,3).join(' · ');
}

// ── Enhanced quiz render ──────────────────────────────────────────────────────
const ENHANCED_QUESTIONS = [
  {
    id:"currency", question:"What currency do you earn in?", icon:"💱",
    type:"currency"
  },
  {
    id:"budget", question:"What's your monthly budget for living costs?", icon:"💰",
    type:"budget"
  },
  ...QUIZ_QUESTIONS.filter(q => q.id !== 'budget')
];

let enhQuizAnswers = {}, enhQuizStep = 0;

// Override the quiz open button
document.getElementById('quiz-start-btn').removeEventListener('click', openQuiz);
document.getElementById('quiz-start-btn').onclick = async () => {
  enhQuizAnswers = {}; enhQuizStep = 0;
  document.getElementById('quiz-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  const ratesBadge = document.getElementById('quiz-rates-badge');
  renderEnhQuizStep();
  await fetchExchangeRates();
  renderEnhQuizStep(); // re-render with live rates if budget step visible
};

document.getElementById('quiz-close').onclick = () => {
  document.getElementById('quiz-modal').classList.remove('open');
  document.body.style.overflow = '';
};
document.getElementById('quiz-modal').onclick = e => {
  if (e.target === e.currentTarget) {
    document.getElementById('quiz-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
};

function renderEnhQuizStep() {
  const q = ENHANCED_QUESTIONS[enhQuizStep];
  const content = document.getElementById('quiz-content');
  const pct = Math.round((enhQuizStep / ENHANCED_QUESTIONS.length) * 100);

  if (q.type === 'currency') {
    content.innerHTML = `
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
      <div class="quiz-q-icon">${q.icon}</div>
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options" style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
        ${MAJOR_CURRENCIES.map(c=>`
          <button class="quiz-option ${enhQuizAnswers.currency===c.code?'selected':''}" onclick="enhSelectOpt('currency','${c.code}')">
            ${c.flag} ${c.label} <span style="color:var(--muted);font-size:0.8rem">${c.code}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-nav">
        <button class="quiz-back-btn" style="visibility:hidden">← Back</button>
        <button class="quiz-next-btn" ${!enhQuizAnswers.currency?'disabled':''} onclick="enhNext()">Next →</button>
      </div>`;
    return;
  }

  if (q.type === 'budget') {
    const cur = enhQuizAnswers.currency || 'USD';
    const sym = {USD:'$',GBP:'£',EUR:'€',AUD:'A$',CAD:'C$',JPY:'¥',INR:'₹',SGD:'S$',ZAR:'R',BRL:'R$',CHF:'CHF ',AED:'AED ',NZD:'NZ$',MXN:'MX$',HKD:'HK$'}[cur] || cur+' ';
    const tiers = BUDGET_TIERS_USD.map(usd => fromUSD(usd, cur));
    const labels = [
      `Under ${sym}${Math.round(tiers[0]).toLocaleString()}/mo`,
      `${sym}${Math.round(tiers[0]).toLocaleString()} – ${sym}${Math.round(tiers[1]).toLocaleString()}/mo`,
      `${sym}${Math.round(tiers[1]).toLocaleString()} – ${sym}${Math.round(tiers[2]).toLocaleString()}/mo`,
      `Over ${sym}${Math.round(tiers[2]).toLocaleString()}/mo`,
    ];
    const vals = tiers.map(t => Math.round(t));
    const isLive = rateSource === 'live';
    content.innerHTML = `
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
      <div class="quiz-q-icon">${q.icon}</div>
      <div class="quiz-question">${q.question}</div>
      <div style="font-size:0.78rem;color:${isLive?'var(--green)':'var(--muted)'};margin-bottom:1rem">
        ${isLive?'✅ Using live exchange rates':'⏳ Loading live rates… using estimates'}
      </div>
      <div class="quiz-options">
        ${labels.map((label,i)=>`
          <button class="quiz-option ${enhQuizAnswers.budget===vals[i]?'selected':''}" onclick="enhSelectOpt('budget',${vals[i]})">
            ${label}
          </button>`).join('')}
      </div>
      <div class="quiz-nav">
        <button class="quiz-back-btn" onclick="enhBack()">← Back</button>
        <button class="quiz-next-btn" ${!enhQuizAnswers.budget?'disabled':''} onclick="enhNext()">Next →</button>
      </div>`;
    return;
  }

  // Standard question
  const selected = enhQuizAnswers[q.id];
  content.innerHTML = `
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
    <div class="quiz-q-icon">${q.icon}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map(opt=>`
        <button class="quiz-option ${selected===opt.value?'selected':''}" onclick="enhSelectOpt('${q.id}',${JSON.stringify(opt.value)})">
          ${opt.label}
        </button>`).join('')}
    </div>
    <div class="quiz-nav">
      <button class="quiz-back-btn" onclick="enhBack()">← Back</button>
      <button class="quiz-next-btn" ${!selected?'disabled':''} onclick="enhNext()">
        ${enhQuizStep === ENHANCED_QUESTIONS.length-1 ? 'See My Cities 🎉' : 'Next →'}
      </button>
    </div>`;
}

function enhSelectOpt(id, value) { enhQuizAnswers[id] = value; renderEnhQuizStep(); }
function enhBack() { if (enhQuizStep > 0) { enhQuizStep--; renderEnhQuizStep(); } }
function enhNext() {
  if (enhQuizStep < ENHANCED_QUESTIONS.length - 1) { enhQuizStep++; renderEnhQuizStep(); }
  else showCityQuizResults();
}

function showCityQuizResults() {
  const allCities = getAllCities();
  const scored = allCities.map(city => ({
    city, score: scoreCityForQuiz(city, enhQuizAnswers)
  })).sort((a,b) => b.score - a.score).slice(0, 7);

  const userCurrency = enhQuizAnswers.currency || 'USD';
  const medals = ['gold','silver','bronze','','','',''];
  const content = document.getElementById('quiz-content');
  const isLive = rateSource === 'live';

  content.innerHTML = `
    <div class="quiz-results-title">🏙️ Your Top City Matches</div>
    <div class="quiz-results-sub">Scored against your budget in ${userCurrency} using ${isLive?'<span style="color:var(--green)">live exchange rates ✅</span>':'estimated rates'}. Click a city to explore its full guide.</div>
    ${scored.map(({city, score}, i) => {
      const c = COUNTRIES.find(x => x.code === city.countryCode);
      if (!c) return '';
      const localCur = COUNTRY_CURRENCY[city.countryCode] || 'USD';
      const cityTotalLocal = (city.cost.rent||0)+(city.cost.food||0)+(city.cost.transport||0)+(city.cost.utilities||0);
      const budgetUSD = toUSD(enhQuizAnswers.budget || 1400, userCurrency);
      const budgetInLocal = fromUSD(budgetUSD, localCur);
      const reasons = getCityReasons(city, enhQuizAnswers);
      const budgetStr = `Your ${fmtCurrency(enhQuizAnswers.budget||1400, userCurrency)} ≈ ${fmtCurrency(budgetInLocal, localCur)}/mo here`;
      return `<div class="quiz-result-card" onclick="pickCityResult('${city.countryCode}','${city.name.replace(/'/g,"\\'")}')">
        <div class="quiz-result-rank ${medals[i]}">${i+1}</div>
        <div class="quiz-result-flag">${c.flag}</div>
        <div class="quiz-result-info">
          <div class="quiz-result-name">${city.name}</div>
          <div class="quiz-result-reasons">${reasons}</div>
          <div style="font-size:0.75rem;color:var(--teal);margin-top:3px">${budgetStr}</div>
        </div>
        <div class="quiz-result-score">
          <div class="quiz-result-pct">${score}%</div>
          <div class="quiz-result-match">match</div>
        </div>
      </div>`;
    }).join('')}
    <button class="quiz-restart-btn" onclick="enhQuizStep=0;enhQuizAnswers={};renderEnhQuizStep()">↺ Retake Quiz</button>`;
}

function pickCityResult(countryCode, cityName) {
  const country = COUNTRIES.find(c => c.code === countryCode);
  if (!country) return;
  document.getElementById('quiz-modal').classList.remove('open');
  document.body.style.overflow = '';
  toCountry = country;
  document.getElementById('to-input').value = country.name;
  document.getElementById('to-input').dataset.code = country.code;
  // Pre-select the city in cost tab when user navigates there
  window._quizCity = cityName;
  if (fromCountry) {
    window.showResults(fromCountry, toCountry);
    // Switch to costs tab and pre-select city after render
    setTimeout(() => {
      const costsTab = document.querySelector('.tab[data-tab="costs"]');
      if (costsTab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        costsTab.classList.add('active');
        window.setTab('costs', fromCountry, toCountry);
        setTimeout(() => {
          const sel = document.getElementById('to-city-select');
          if (sel) {
            const idx = Array.from(sel.options).findIndex(o => o.text === cityName);
            if (idx >= 0) { sel.selectedIndex = idx; window.rebuildCostBars(); }
          }
        }, 200);
      }
    }, 400);
  } else {
    window.scrollTo({top:0,behavior:'smooth'});
    document.getElementById('to-input').focus();
  }
}

// ── Fix: remove all old quiz-start-btn listeners by cloning the node ──────────
(function fixQuizButton() {
  const oldBtn = document.getElementById('quiz-start-btn');
  const newBtn = oldBtn.cloneNode(true);
  oldBtn.parentNode.replaceChild(newBtn, oldBtn);
  newBtn.addEventListener('click', async () => {
    enhQuizAnswers = {}; enhQuizStep = 0;
    document.getElementById('quiz-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderEnhQuizStep();
    await fetchExchangeRates();
    // Re-render budget step with live rates if user is still on it
    if (ENHANCED_QUESTIONS[enhQuizStep] && ENHANCED_QUESTIONS[enhQuizStep].type === 'budget') {
      renderEnhQuizStep();
    }
  });
  // Also fix close button
  const closeBtn = document.getElementById('quiz-close');
  if (closeBtn) {
    const newClose = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newClose, closeBtn);
    newClose.addEventListener('click', () => {
      document.getElementById('quiz-modal').classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Also fix modal backdrop
  const modal = document.getElementById('quiz-modal');
  modal.onclick = e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };
})();

// Also override openQuiz to be a no-op so old listener doesn't interfere
function openQuiz() {
  // Replaced by enhanced quiz — no-op
}

// ── Fix: replace renderEnhQuizStep with safe index-based onclick ──────────────
window._quizOpts = []; // stores current step's option values safely

function renderEnhQuizStep() {
  const q = ENHANCED_QUESTIONS[enhQuizStep];
  const content = document.getElementById('quiz-content');
  const pct = Math.round((enhQuizStep / ENHANCED_QUESTIONS.length) * 100);
  const navBack = `<button class="quiz-back-btn" ${enhQuizStep===0?'style="visibility:hidden"':''} onclick="enhBack()">← Back</button>`;

  if (q.type === 'currency') {
    window._quizOpts = MAJOR_CURRENCIES.map(c => c.code);
    content.innerHTML = `
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
      <div class="quiz-q-icon">${q.icon}</div>
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options" style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
        ${MAJOR_CURRENCIES.map((c,i) => `
          <button class="quiz-option ${enhQuizAnswers.currency===c.code?'selected':''}" onclick="enhSelectByIdx('currency',${i})">
            ${c.flag} ${c.label} <span style="color:var(--muted);font-size:0.8rem">${c.code}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-nav">
        ${navBack}
        <button class="quiz-next-btn" ${!enhQuizAnswers.currency?'disabled':''} onclick="enhNext()">Next →</button>
      </div>`;
    return;
  }

  if (q.type === 'budget') {
    const cur = enhQuizAnswers.currency || 'USD';
    const sym = {USD:'$',GBP:'£',EUR:'€',AUD:'A$',CAD:'C$',JPY:'¥',INR:'₹',SGD:'S$',ZAR:'R',BRL:'R$',CHF:'CHF ',AED:'AED ',NZD:'NZ$',MXN:'MX$',HKD:'HK$'}[cur] || (cur+' ');
    const tiers = BUDGET_TIERS_USD.map(usd => Math.round(fromUSD(usd, cur)));
    window._quizOpts = tiers;
    const labels = [
      `Under ${sym}${tiers[0].toLocaleString()}/mo`,
      `${sym}${tiers[0].toLocaleString()} – ${sym}${tiers[1].toLocaleString()}/mo`,
      `${sym}${tiers[1].toLocaleString()} – ${sym}${tiers[2].toLocaleString()}/mo`,
      `Over ${sym}${tiers[2].toLocaleString()}/mo`,
    ];
    const isLive = rateSource === 'live';
    content.innerHTML = `
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
      <div class="quiz-q-icon">${q.icon}</div>
      <div class="quiz-question">${q.question}</div>
      <div style="font-size:0.78rem;color:${isLive?'var(--green)':'var(--muted)'};margin-bottom:1rem">
        ${isLive ? '✅ Using live exchange rates' : '⏳ Loading live rates… using estimates'}
      </div>
      <div class="quiz-options">
        ${labels.map((label,i) => `
          <button class="quiz-option ${enhQuizAnswers.budget===tiers[i]?'selected':''}" onclick="enhSelectByIdx('budget',${i})">
            ${label}
          </button>`).join('')}
      </div>
      <div class="quiz-nav">
        ${navBack}
        <button class="quiz-next-btn" ${!enhQuizAnswers.budget?'disabled':''} onclick="enhNext()">Next →</button>
      </div>`;
    return;
  }

  // Standard question — store option values in safe global array
  window._quizOpts = q.options.map(o => o.value);
  const selected = enhQuizAnswers[q.id];
  const isLast = enhQuizStep === ENHANCED_QUESTIONS.length - 1;
  content.innerHTML = `
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
    <div class="quiz-q-icon">${q.icon}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt,i) => `
        <button class="quiz-option ${selected===opt.value?'selected':''}" onclick="enhSelectByIdx('${q.id}',${i})">
          ${opt.label}
        </button>`).join('')}
    </div>
    <div class="quiz-nav">
      ${navBack}
      <button class="quiz-next-btn" ${!selected?'disabled':''} onclick="enhNext()">
        ${isLast ? 'See My Cities 🎉' : 'Next →'}
      </button>
    </div>`;
}

function enhSelectByIdx(qid, idx) {
  enhSelectOpt(qid, window._quizOpts[idx]);
}

// ── Fix: currency step shows top currencies + Other dropdown ─────────────────
const TOP_CURRENCIES = [
  {code:"USD",flag:"🇺🇸",label:"US Dollar (USD)"},
  {code:"GBP",flag:"🇬🇧",label:"British Pound (GBP)"},
  {code:"EUR",flag:"🇪🇺",label:"Euro (EUR)"},
  {code:"AUD",flag:"🇦🇺",label:"Australian Dollar (AUD)"},
  {code:"CAD",flag:"🇨🇦",label:"Canadian Dollar (CAD)"},
  {code:"INR",flag:"🇮🇳",label:"Indian Rupee (INR)"},
];

function renderCurrencyStep() {
  const q = ENHANCED_QUESTIONS[enhQuizStep];
  const content = document.getElementById('quiz-content');
  const pct = Math.round((enhQuizStep / ENHANCED_QUESTIONS.length) * 100);
  const isOther = enhQuizAnswers.currency && !TOP_CURRENCIES.find(c => c.code === enhQuizAnswers.currency);

  content.innerHTML = `
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-step-label">Question ${enhQuizStep+1} of ${ENHANCED_QUESTIONS.length}</div>
    <div class="quiz-q-icon">${q.icon}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options" style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:0.65rem">
      ${TOP_CURRENCIES.map((c,i) => `
        <button class="quiz-option ${enhQuizAnswers.currency===c.code?'selected':''}"
          onclick="enhQuizAnswers.currency='${c.code}';renderEnhQuizStep()">
          ${c.flag} ${c.label}
        </button>`).join('')}
      <button class="quiz-option ${isOther?'selected':''}" onclick="toggleCurrencyOther()"
        style="grid-column:1/-1">
        🌐 Other currency ${isOther ? '— '+enhQuizAnswers.currency : ''}
      </button>
    </div>
    <div id="currency-other-panel" style="display:${isOther?'block':'none'};margin-bottom:1rem">
      <select class="city-select" id="currency-other-select" onchange="pickOtherCurrency(this.value)" style="width:100%">
        <option value="">Select currency…</option>
        ${MAJOR_CURRENCIES.filter(c => !TOP_CURRENCIES.find(t=>t.code===c.code)).map(c =>
          `<option value="${c.code}" ${enhQuizAnswers.currency===c.code?'selected':''}>${c.flag} ${c.label} (${c.code})</option>`
        ).join('')}
      </select>
    </div>
    <div class="quiz-nav">
      <button class="quiz-back-btn" style="visibility:hidden">← Back</button>
      <button class="quiz-next-btn" ${!enhQuizAnswers.currency?'disabled':''} onclick="enhNext()">Next →</button>
    </div>`;
}

function toggleCurrencyOther() {
  const panel = document.getElementById('currency-other-panel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function pickOtherCurrency(code) {
  if (code) { enhQuizAnswers.currency = code; renderEnhQuizStep(); }
}

// Override renderEnhQuizStep to use new currency step
const _prevRenderEnhQuizStep = renderEnhQuizStep;
renderEnhQuizStep = function() {
  const q = ENHANCED_QUESTIONS[enhQuizStep];
  if (q && q.type === 'currency') { renderCurrencyStep(); return; }
  _prevRenderEnhQuizStep();
};

// ── Fix: renderCosts currency fallback should use COUNTRY_CURRENCY map ────────
const _origRenderCosts2 = window.renderCosts || renderCosts;
window.renderCosts = function(from, to, fromData, toData) {
  // Look up correct currency for countries missing from COUNTRY_DATA
  const fromCurrency = (fromData && fromData.currency) || COUNTRY_CURRENCY[from.code] || 'USD';
  const toCurrency   = (toData   && toData.currency)   || COUNTRY_CURRENCY[to.code]   || 'USD';
  // Patch currency into fallback data if missing
  if (!fromData) fromData = { cost:{rent:1200,food:300,transport:100,utilities:120,dining:180}, currency: fromCurrency };
  else if (!fromData.currency) fromData = { ...fromData, currency: fromCurrency };
  if (!toData)   toData   = { cost:{rent:1000,food:250,transport:80, utilities:100,dining:150},  currency: toCurrency };
  else if (!toData.currency)   toData   = { ...toData,   currency: toCurrency };
  return _origRenderCosts2(from, to, fromData, toData);
};

// Extend COUNTRY_CURRENCY with more European and common countries
Object.assign(COUNTRY_CURRENCY, {
  AT:'EUR', IT:'EUR', GR:'EUR', IE:'EUR', BE:'EUR', FI:'EUR', SK:'EUR', SI:'EUR', LU:'EUR', CY:'EUR', MT:'EUR', EE:'EUR', LV:'EUR', LT:'EUR',
  PL:'PLN', CZ:'CZK', HU:'HUF', RO:'RON', BG:'BGN', HR:'HRK',
  SE:'SEK', NO:'NOK', DK:'DKK', IS:'ISK', CH:'CHF',
  GB:'GBP', AU:'AUD', CA:'CAD', NZ:'NZD',
  JP:'JPY', KR:'KRW', CN:'CNY', TH:'THB', IN:'INR', ID:'IDR', PH:'PHP', VN:'VND', MY:'MYR',
  ZA:'ZAR', NG:'NGN', KE:'KES', EG:'EGP',
  TR:'TRY', IL:'ILS', SA:'SAR', QA:'QAR', KW:'KWD', BH:'BHD', OM:'OMR',
  UA:'UAH', RU:'RUB', BY:'BYN', KZ:'KZT',
  AR:'ARS', CL:'CLP', CO:'COP', PE:'PEN', UY:'UYU',
});

// ── Origin-country travel advisory links ──────────────────────────────────────
const TRAVEL_ADVISORIES = {
  GB:{ name:"UK FCDO Travel Advice",        url:(dest)=>`https://www.gov.uk/foreign-travel-advice/${dest.toLowerCase().replace(/[\s,]+/g,'-')}`, fallback:"https://www.gov.uk/foreign-travel-advice" },
  AU:{ name:"Smartraveller (Australia)",     url:()=>"https://www.smartraveller.gov.au/destinations",                       fallback:"https://www.smartraveller.gov.au" },
  CA:{ name:"Travel.gc.ca (Canada)",         url:()=>"https://travel.gc.ca/travelling/advisories",                          fallback:"https://travel.gc.ca/travelling/advisories" },
  NZ:{ name:"SafeTravel New Zealand",        url:()=>"https://www.safetravel.govt.nz",                                      fallback:"https://www.safetravel.govt.nz" },
  US:{ name:"US State Dept Advisory",        url:()=>"https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html", fallback:"https://travel.state.gov" },
  DE:{ name:"Auswärtiges Amt (Germany)",     url:()=>"https://www.auswaertiges-amt.de/en/ReiseUndSicherheit/reise-und-sicherheitshinweise", fallback:"https://www.auswaertiges-amt.de" },
  FR:{ name:"France Diplomatie",             url:()=>"https://www.diplomatie.gouv.fr/en/coming-to-france/safety-of-french-nationals-abroad/travel-advice-by-country-and-territory", fallback:"https://www.diplomatie.gouv.fr" },
  IE:{ name:"DFA Travel Advice (Ireland)",   url:()=>"https://www.dfa.ie/travel/travel-advice",                             fallback:"https://www.dfa.ie/travel" },
  NL:{ name:"Netherlands Travel Advice",     url:()=>"https://www.nederlandwereldwijd.nl/reizen-naar-het-buitenland/reisadvies", fallback:"https://www.nederlandwereldwijd.nl" },
  SE:{ name:"UD Travel Advice (Sweden)",     url:()=>"https://www.ud.se/reseinfo",                                          fallback:"https://www.ud.se" },
  NO:{ name:"UD Travel Advice (Norway)",     url:()=>"https://www.regjeringen.no/en/topics/foreign-affairs/travel-information", fallback:"https://www.regjeringen.no" },
  DK:{ name:"UM Travel Advice (Denmark)",    url:()=>"https://um.dk/en/travel-and-residence/travel-to-denmark/travel-advice", fallback:"https://um.dk" },
  SG:{ name:"MFA Singapore Travel Advisory",url:()=>"https://www.mfa.gov.sg/Services/Singaporeans/Travel-Advisory",         fallback:"https://www.mfa.gov.sg" },
  JP:{ name:"MOFA Japan Overseas Safety",    url:()=>"https://www.anzen.mofa.go.jp",                                        fallback:"https://www.anzen.mofa.go.jp" },
  IN:{ name:"MEA India Travel Advisory",     url:()=>"https://www.mea.gov.in/travel-advisory.htm",                          fallback:"https://www.mea.gov.in" },
  ZA:{ name:"DIRCO South Africa Travel",     url:()=>"https://www.dirco.gov.za/travel-advice",                              fallback:"https://www.dirco.gov.za" },
};
const DEFAULT_ADVISORY = { name:"US State Dept Travel Advisory", url:()=>"https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html", fallback:"https://travel.state.gov" };

// Override renderSafetyBanner to accept fromCode and use correct advisory
window.renderSafetyBanner = function(toCode, fromCode) {
  const w = SAFETY_WARNINGS[toCode];
  if (!w) return '';
  const advisory = TRAVEL_ADVISORIES[fromCode] || DEFAULT_ADVISORY;
  const toCountryObj = COUNTRIES.find(c => c.code === toCode);
  const destName = toCountryObj ? toCountryObj.name : toCode;
  const advisoryUrl = advisory.url(destName) || advisory.fallback;
  const lvl = w.level >= 4 ? 'level-4' : 'level-3';
  const icon = w.level >= 4 ? '🚨' : '⚠️';
  const title = w.level >= 4 ? 'Level 4: Do Not Travel' : 'Level 3: Reconsider Travel';
  return `<div class="safety-banner ${lvl}">
    <div class="sb-icon">${icon}</div>
    <div class="sb-text">
      <h4>${title} — ${destName}</h4>
      <p>${w.msg}</p>
      <p class="sb-source">Check the official advice from your government: <a href="${advisoryUrl}" target="_blank" rel="noopener">${advisory.name} ↗</a></p>
    </div>
  </div>`;
};

// Override window.renderOverview to pass fromCode to safety banner
const _prevRenderOverview2 = window.renderOverview;
window.renderOverview = function(from, to, d) {
  const safety = window.renderSafetyBanner(to.code, from.code);
  // Call base renderOverview but skip its safety banner (it calls the old renderSafetyBanner)
  const base = typeof _origRenderOverview === 'function' ? _origRenderOverview(from, to, d) : '';
  return safety + base;
};

// ── Cost breakdown totals ─────────────────────────────────────────────────────
const _prevRenderCosts2 = window.renderCosts;
window.renderCosts = function(from, to, fromData, toData) {
  let html = _prevRenderCosts2(from, to, fromData, toData);
  // Inject totals row after the cost-legend closing div
  const fd = fromData || { cost:{rent:1200,food:300,transport:100,utilities:120,dining:180}, currency: COUNTRY_CURRENCY[from.code]||'USD' };
  const td = toData   || { cost:{rent:1000,food:250,transport:80, utilities:100,dining:150},  currency: COUNTRY_CURRENCY[to.code]||'USD' };
  const keys = ['rent','food','transport','utilities'];
  const fTotal = keys.reduce((s,k)=>s+(fd.cost[k]||0),0);
  const tTotal = keys.reduce((s,k)=>s+(td.cost[k]||0),0);
  const diff = Math.round(((tTotal-fTotal)/fTotal)*100);
  const diffColor = diff<=0?'var(--green)':'var(--red)';
  const totalRow = `
    <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">
      <div class="cost-row" style="align-items:center">
        <div class="cost-label" style="font-weight:700;color:var(--text)">📊 Monthly Total</div>
        <div class="cost-bars">
          <div class="cost-bar-wrap">
            <div style="font-size:0.82rem;color:var(--muted);padding:2px 0" id="from-total-label">${fd.currency} ${fTotal.toLocaleString()}/mo</div>
          </div>
          <div class="cost-bar-wrap">
            <div style="font-size:0.9rem;font-weight:700;color:var(--text);padding:2px 0" id="to-total-label">${td.currency} ${tTotal.toLocaleString()}/mo</div>
          </div>
        </div>
        <div style="font-size:0.85rem;font-weight:700;color:${diffColor};width:48px;text-align:right;flex-shrink:0" id="total-diff-label">${diff>0?'+':''}${diff}%</div>
      </div>
      <div style="font-size:0.75rem;color:var(--muted);margin-top:4px">Excludes dining out (discretionary spend)</div>
    </div>`;
  html = html.replace('</div>\n      <div class="cost-legend">', totalRow + '</div>\n      <div class="cost-legend">');
  return html;
};

// Update rebuildCostBars to also refresh totals
const _prevRebuildCostBars2 = window.rebuildCostBars;
window.rebuildCostBars = function() {
  _prevRebuildCostBars2();
  // Update total labels
  const toSel = document.getElementById('to-city-select');
  const fromSel = document.getElementById('from-city-select');
  const toIdx = toSel ? parseInt(toSel.value) : -1;
  const fromIdx = fromSel ? parseInt(fromSel.value) : -1;
  const toCities = CITY_DATA[_currentTo ? _currentTo.code : ''] || [];
  const fromCities = CITY_DATA[_currentFrom ? _currentFrom.code : ''] || [];
  const activeTd = toIdx >= 0 ? toCities[toIdx] : null;
  const activeFd = fromIdx >= 0 ? fromCities[fromIdx] : null;
  const toData = COUNTRY_DATA[_currentTo ? _currentTo.code : ''];
  const fromData = COUNTRY_DATA[_currentFrom ? _currentFrom.code : ''];
  const tdCost = (activeTd ? activeTd.cost : toData ? toData.cost : null) || {};
  const fdCost = (activeFd ? activeFd.cost : fromData ? fromData.cost : null) || {};
  const toCur = (toData && toData.currency) || COUNTRY_CURRENCY[_currentTo ? _currentTo.code : ''] || 'USD';
  const fromCur = (fromData && fromData.currency) || COUNTRY_CURRENCY[_currentFrom ? _currentFrom.code : ''] || 'USD';
  const keys = ['rent','food','transport','utilities'];
  const fTotal = keys.reduce((s,k)=>s+(fdCost[k]||0),0);
  const tTotal = keys.reduce((s,k)=>s+(tdCost[k]||0),0);
  const diff = fTotal > 0 ? Math.round(((tTotal-fTotal)/fTotal)*100) : 0;
  const fromTotalEl = document.getElementById('from-total-label');
  const toTotalEl = document.getElementById('to-total-label');
  const diffEl = document.getElementById('total-diff-label');
  if (fromTotalEl && fTotal) fromTotalEl.textContent = `${fromCur} ${fTotal.toLocaleString()}/mo`;
  if (toTotalEl && tTotal) toTotalEl.textContent = `${toCur} ${tTotal.toLocaleString()}/mo`;
  if (diffEl && fTotal) {
    diffEl.textContent = (diff>0?'+':'') + diff + '%';
    diffEl.style.color = diff<=0 ? 'var(--green)' : 'var(--red)';
  }
};

// ── Always start at top on load/refresh ──────────────────────────────────────
window.scrollTo(0, 0);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// ── Destinations with origin filter ──────────────────────────────────────────
(function buildDestinationsWithFilter() {
  const section = document.getElementById('explore');
  const sectionInner = section.querySelector('.section-inner');

  // Inject filter bar before the grid
  const filterBar = document.createElement('div');
  filterBar.className = 'origin-filter-bar';
  filterBar.innerHTML = `
    <span class="origin-filter-label">Moving from:</span>
    ${ORIGIN_FILTERS.map(f => `
      <button class="origin-pill ${f.code==='ALL'?'active':''}" data-code="${f.code}" onclick="setOriginFilter('${f.code}')">
        <span class="pill-flag">${f.flag}</span> ${f.label}
      </button>`).join('')}`;
  const grid = document.getElementById('destinations-grid');
  sectionInner.insertBefore(filterBar, grid);

  // Initial render
  renderDestinationGrid('ALL');
})();

let _activeOrigin = 'ALL';

function setOriginFilter(code) {
  _activeOrigin = code;
  // Update pill active state
  document.querySelectorAll('.origin-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.code === code);
  });
  renderDestinationGrid(code);
}

function renderDestinationGrid(originCode) {
  const grid = document.getElementById('destinations-grid');
  grid.innerHTML = '';
  const data = TRENDING_BY_ORIGIN[originCode] || TRENDING_BY_ORIGIN['ALL'];
  const originCountry = originCode !== 'ALL' ? COUNTRIES.find(c => c.code === originCode) : null;

  data.forEach(dest => {
    const c = COUNTRIES.find(x => x.code === dest.code);
    if (!c) return;
    const card = document.createElement('div');
    card.className = 'dest-card';
    card.innerHTML = `
      <div class="dest-flag">${c.flag}</div>
      <div class="dest-name">${c.name}</div>
      <div class="dest-tagline">${dest.tagline}</div>
      ${originCountry ? `<div class="dest-origin-note">Popular with ${originCountry.flag} ${originCountry.name} movers</div>` : ''}
      <div class="dest-trend">📈 ${dest.trend}</div>
    `;
    card.addEventListener('click', () => {
      toCountry = c;
      document.getElementById('to-input').value = c.name;
      document.getElementById('to-input').dataset.code = c.code;
      // Also pre-fill from if origin filter is active
      if (originCountry && !fromCountry) {
        fromCountry = originCountry;
        document.getElementById('from-input').value = originCountry.name;
        document.getElementById('from-input').dataset.code = originCountry.code;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.getElementById('to-input').focus();
    });
    grid.appendChild(card);
  });
}

// ── Compare section: Countries + Cities toggle ────────────────────────────────
(function buildCompareSection() {
  const section = document.getElementById('compare');
  const inner = section.querySelector('.section-inner');
  const grid = document.getElementById('compare-grid');

  // Inject controls above grid
  const controls = document.createElement('div');
  controls.className = 'compare-controls';
  controls.id = 'compare-controls';

  // Country filter options from CITY_DATA keys
  const cityCountries = Object.keys(CITY_DATA).map(code => {
    const c = COUNTRIES.find(x => x.code === code);
    return c ? `<option value="${code}">${c.flag} ${c.name}</option>` : '';
  }).join('');

  controls.innerHTML = `
    <div class="compare-toggle">
      <button class="compare-toggle-btn active" id="cmp-countries-btn" onclick="setCompareMode('countries')">🌍 Countries</button>
      <button class="compare-toggle-btn" id="cmp-cities-btn" onclick="setCompareMode('cities')">🏙️ Cities</button>
    </div>
    <select class="compare-filter-select" id="cmp-country-filter" style="display:none" onchange="renderCityCompare()">
      <option value="ALL">All countries</option>
      ${cityCountries}
    </select>
    <span class="compare-count" id="cmp-count"></span>
  `;
  inner.insertBefore(controls, grid);

  // Render initial country view
  renderCountryCompare();
})();

let _compareMode = 'countries';

function setCompareMode(mode) {
  _compareMode = mode;
  document.getElementById('cmp-countries-btn').classList.toggle('active', mode === 'countries');
  document.getElementById('cmp-cities-btn').classList.toggle('active', mode === 'cities');
  document.getElementById('cmp-country-filter').style.display = mode === 'cities' ? 'block' : 'none';
  if (mode === 'countries') renderCountryCompare();
  else renderCityCompare();
}

function renderCountryCompare() {
  const grid = document.getElementById('compare-grid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
  const codes = ["US","GB","DE","PT","TH","SG","AU","MX","CA","JP","AE","NL","ES","FR","AT","IE"];
  codes.forEach(code => {
    const c = COUNTRIES.find(x => x.code === code);
    const d = COUNTRY_DATA[code];
    if (!c || !d) return;
    const total = d.cost.rent + d.cost.food + d.cost.transport + d.cost.utilities;
    const card = document.createElement('div');
    card.className = 'compare-card';
    card.innerHTML = `
      <div class="compare-flag">${c.flag}</div>
      <div class="compare-country">${c.name}</div>
      <div class="compare-metric"><span class="metric-label">Rent</span><span class="metric-val">${d.currency} ${d.cost.rent.toLocaleString()}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Food</span><span class="metric-val">${d.currency} ${d.cost.food}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Transport</span><span class="metric-val">${d.currency} ${d.cost.transport}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Utilities</span><span class="metric-val">${d.currency} ${d.cost.utilities}/mo</span></div>
      <div class="compare-metric" style="border-top:1px solid var(--border);margin-top:4px;padding-top:4px">
        <span class="metric-label" style="font-weight:700;color:var(--text)">Total Cost</span>
        <span class="metric-val" style="color:var(--accent);font-weight:700">${d.currency} ${total.toLocaleString()}/mo</span>
      </div>
      <div class="compare-metric"><span class="metric-label">Visa</span>
        <span class="metric-val"><span class="badge ${d.visaDifficulty==='Easy'?'badge-green':d.visaDifficulty==='Medium'?'badge-yellow':'badge-red'}" style="font-size:0.7rem">${d.visaDifficulty}</span></span>
      </div>
      ${typeof COUNTRY_META !== 'undefined' && COUNTRY_META[code] ? `
      <div class="compare-metric" style="border-top:1px solid var(--border);margin-top:4px;padding-top:4px"><span class="metric-label">Language</span><span class="metric-val" style="font-size:0.75rem;text-align:right;max-width:65%">${d.language || 'N/A'}</span></div>
      <div class="compare-metric"><span class="metric-label">Religion</span><span class="metric-val" style="font-size:0.75rem;text-align:right;max-width:65%">${COUNTRY_META[code].religion}</span></div>
      <div class="compare-metric"><span class="metric-label">Industries</span><span class="metric-val" style="font-size:0.75rem;text-align:right;max-width:65%">${COUNTRY_META[code].industries}</span></div>
      <div class="compare-metric"><span class="metric-label">Retire Age</span><span class="metric-val" style="font-size:0.75rem">${COUNTRY_META[code].retirementAge}</span></div>
      ` : ''}
      `;
    grid.appendChild(card);
  });
  document.getElementById('cmp-count').textContent = `${codes.filter(code=>COUNTRY_DATA[code]).length} countries`;
}

function renderCityCompare() {
  const grid = document.getElementById('compare-grid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
  const filterCode = document.getElementById('cmp-country-filter').value;

  // Flatten cities
  const allCities = [];
  Object.entries(CITY_DATA).forEach(([countryCode, cities]) => {
    if (filterCode !== 'ALL' && countryCode !== filterCode) return;
    const countryObj = COUNTRIES.find(c => c.code === countryCode);
    const countryData = COUNTRY_DATA[countryCode];
    const currency = (countryData && countryData.currency) || COUNTRY_CURRENCY[countryCode] || 'USD';
    cities.forEach(city => {
      allCities.push({ city, countryCode, countryObj, currency });
    });
  });

  document.getElementById('cmp-count').textContent = `${allCities.length} cities`;

  allCities.forEach(({ city, countryCode, countryObj, currency }) => {
    const total = (city.cost.rent||0) + (city.cost.food||0) + (city.cost.transport||0) + (city.cost.utilities||0);
    const card = document.createElement('div');
    card.className = 'city-compare-card';
    card.innerHTML = `
      <div class="city-compare-header">
        <div class="city-compare-flag">${countryObj ? countryObj.flag : '🌍'}</div>
        <div>
          <div class="city-compare-name">${city.name.split(',')[0]}</div>
          <div class="city-compare-country">${city.name.includes(',') ? city.name.split(',').slice(1).join(',').trim() + ' · ' : ''}${countryObj ? countryObj.name : ''}</div>
        </div>
      </div>
      <div class="compare-metric"><span class="metric-label">Rent</span><span class="metric-val">${currency} ${(city.cost.rent||0).toLocaleString()}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Food</span><span class="metric-val">${currency} ${(city.cost.food||0).toLocaleString()}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Transport</span><span class="metric-val">${currency} ${(city.cost.transport||0).toLocaleString()}/mo</span></div>
      <div class="compare-metric"><span class="metric-label">Utilities</span><span class="metric-val">${currency} ${(city.cost.utilities||0).toLocaleString()}/mo</span></div>
      <div class="compare-metric" style="border-top:1px solid var(--border);margin-top:4px;padding-top:4px">
        <span class="metric-label" style="font-weight:700;color:var(--text)">Total Cost</span>
        <span class="metric-val" style="color:var(--accent);font-weight:700">${currency} ${total.toLocaleString()}/mo</span>
      </div>
      ${typeof COUNTRY_META !== 'undefined' && COUNTRY_META[countryCode] ? `
      <div class="compare-metric" style="border-top:1px solid var(--border);margin-top:4px;padding-top:4px"><span class="metric-label">Language</span><span class="metric-val" style="font-size:0.75rem;text-align:right;max-width:65%">${(COUNTRY_DATA[countryCode] && COUNTRY_DATA[countryCode].language) || 'N/A'}</span></div>
      <div class="compare-metric"><span class="metric-label">Religion</span><span class="metric-val" style="font-size:0.75rem;text-align:right;max-width:65%">${COUNTRY_META[countryCode].religion}</span></div>
      <div class="compare-metric"><span class="metric-label">Industries</span><span class="metric-val" style="font-size:0.75rem;text-align:right;max-width:65%">${COUNTRY_META[countryCode].industries}</span></div>
      <div class="compare-metric"><span class="metric-label">Retire Age</span><span class="metric-val" style="font-size:0.75rem">${COUNTRY_META[countryCode].retirementAge}</span></div>
      ` : ''}
      `;
    grid.appendChild(card);
  });
}

// ── Checklist: all collapsed by default ───────────────────────────────────────
function renderChecklistWithLinks() {
  return `<div class="checklist-phases" id="checklist-phases">
    ${CHECKLIST_PHASES.map((phase, pi) => `
      <div class="phase-card" id="phase-${pi}">
        <div class="phase-header" onclick="togglePhase(${pi})">
          <div class="phase-icon">${phase.icon}</div>
          <div class="phase-title">${phase.title}</div>
          <div class="phase-progress" id="phase-prog-${pi}">0 / ${phase.items.length}</div>
          <div class="phase-chevron">▾</div>
        </div>
        <div class="phase-body">
          <div class="checklist-progress-bar"><div class="checklist-progress-fill" id="phase-bar-${pi}" style="width:0%"></div></div>
          ${phase.items.map((item, ii) => {
            const link = CHECKLIST_LINKS[item];
            const linkHtml = link ? `<a class="check-link" href="${link}" target="_blank" rel="noopener" title="Helpful resource">↗ Help</a>` : '';
            return `<div class="check-item">
              <input type="checkbox" id="chkl-${pi}-${ii}" onchange="updatePhaseProgressL(${pi})"/>
              <label for="chkl-${pi}-${ii}">${item}${linkHtml}</label>
            </div>`;
          }).join('')}
        </div>
      </div>`).join('')}
  </div>`;
}

// Also fix static checklist on page (the homepage version)
(function fixStaticChecklist() {
  const container = document.getElementById('checklist-container');
  if (container) {
    container.innerHTML = renderChecklistWithLinks();
    initChecklist();
  }
})();

// ── Move Budget Calculator ────────────────────────────────────────────────────
const BUDGET_ITEMS = [
  { id:'flights',   icon:'✈️',  label:'Flights & Travel',               hint:'Return flight for research trip + one-way moving flight(s). Add extra for family.',      min:100,   max:8000,  default:900,  step:50  },
  { id:'shipping',  icon:'📦',  label:'Shipping & Removals',            hint:'Door-to-door shipping of belongings. Set to 0 if travelling light or selling everything.', min:0,     max:20000, default:2500, step:100 },
  { id:'visa',      icon:'🛂',  label:'Visa & Immigration Fees',        hint:'Government application fees, biometrics, and any agent/lawyer costs.',                    min:0,     max:8000,  default:600,  step:50  },
  { id:'docs',      icon:'📄',  label:'Document Prep',                  hint:'Certified translations, apostilles, notarisation, and official certifications.',           min:0,     max:3000,  default:400,  step:25  },
  { id:'deposit',   icon:'🏠',  label:'First Rent + Deposit',           hint:'Typically 1-3 months rent upfront. Research your destination city.',                      min:0,     max:20000, default:4000, step:200 },
  { id:'insurance', icon:'🏥',  label:'Health Insurance Setup',         hint:'International health cover before local plan kicks in. Usually 1-6 months.',              min:0,     max:5000,  default:800,  step:50  },
  { id:'setup',     icon:'📱',  label:'Setup & Essentials',             hint:'New SIM, local bank fees, household items, and day-one expenses.',                        min:0,     max:5000,  default:600,  step:50  },
  { id:'storage',   icon:'🏪',  label:'Storage (if needed)',            hint:'Short-term storage for belongings you can\'t take immediately.',                           min:0,     max:4000,  default:0,    step:50  },
  { id:'language',  icon:'📚',  label:'Language Courses',               hint:'Classes or apps to learn the local language before or after arrival.',                    min:0,     max:3000,  default:200,  step:50  },
  { id:'buffer',    icon:'🚨',  label:'Emergency Buffer (10-20%)',      hint:'Always have a cash buffer for unexpected costs — delays, fees, medical, or downtime.',     min:500,   max:15000, default:2000, step:100 },
];

const BUDGET_CURRENCIES = [
  {code:'USD',sym:'$'},{code:'GBP',sym:'£'},{code:'EUR',sym:'€'},
  {code:'AUD',sym:'A$'},{code:'CAD',sym:'C$'},{code:'INR',sym:'₹'},
];

let budgetValues = {};
let budgetCurrency = 'USD';

BUDGET_ITEMS.forEach(item => { budgetValues[item.id] = item.default; });

function initBudgetCalc() {
  renderBudgetItems();
  renderBudgetSummary();
}

function renderBudgetItems() {
  const container = document.getElementById('budget-items');
  container.innerHTML = BUDGET_ITEMS.map(item => {
    const val = budgetValues[item.id];
    const pct = Math.round(((val - item.min) / (item.max - item.min)) * 100);
    return `
      <div class="budget-item">
        <div class="budget-item-header">
          <span class="budget-item-icon">${item.icon}</span>
          <span class="budget-item-label">${item.label}</span>
          <span class="budget-item-value" id="bval-${item.id}">${fmtBudget(val)}</span>
        </div>
        <div class="budget-item-hint">${item.hint}</div>
        <input type="range" class="budget-slider" id="bslider-${item.id}"
          min="${item.min}" max="${item.max}" step="${item.step}" value="${val}"
          style="--val:${pct}%"
          oninput="updateBudgetItem('${item.id}', this.value, this)">
      </div>`;
  }).join('');
}

function fmtBudget(usd) {
  const rates = liveRates || FALLBACK_RATES;
  const rate = rates[budgetCurrency] || 1;
  const converted = Math.round(usd * rate);
  const sym = {USD:'$',GBP:'£',EUR:'€',AUD:'A$',CAD:'C$',INR:'₹'}[budgetCurrency] || (budgetCurrency+' ');
  return sym + converted.toLocaleString();
}

function updateBudgetItem(id, rawVal, slider) {
  budgetValues[id] = parseInt(rawVal);
  const item = BUDGET_ITEMS.find(i => i.id === id);
  const pct = Math.round(((rawVal - item.min) / (item.max - item.min)) * 100);
  slider.style.setProperty('--val', pct + '%');
  const valEl = document.getElementById('bval-' + id);
  if (valEl) valEl.textContent = fmtBudget(budgetValues[id]);
  renderBudgetSummary();
}

function renderBudgetSummary() {
  const total = Object.values(budgetValues).reduce((a,b) => a+b, 0);
  const rows = BUDGET_ITEMS.filter(i => budgetValues[i.id] > 0).map(i =>
    `<div class="budget-summary-row">
      <span class="s-label">${i.icon} ${i.label}</span>
      <span class="s-val">${fmtBudget(budgetValues[i.id])}</span>
    </div>`).join('');

  const curBtns = BUDGET_CURRENCIES.map(c =>
    `<button class="budget-cur-btn ${budgetCurrency===c.code?'active':''}"
      onclick="setBudgetCurrency('${c.code}')">${c.sym} ${c.code}</button>`).join('');

  document.getElementById('budget-summary').innerHTML = `
    <div class="budget-summary-title">💰 Your Move Budget</div>
    <div class="budget-currency-row">${curBtns}</div>
    ${rows}
    <div class="budget-total-row">
      <span class="budget-total-label">Estimated Total</span>
      <span class="budget-total-val" id="budget-grand-total">${fmtBudget(total)}</span>
    </div>
    <div class="budget-tip">💡 This is a one-time moving cost estimate. For monthly living costs, use the Cost of Living comparison after searching your route above.</div>
    <button class="budget-reset-btn" onclick="resetBudget()">↺ Reset to Defaults</button>`;
}

function setBudgetCurrency(code) {
  budgetCurrency = code;
  // Refresh all displayed values
  BUDGET_ITEMS.forEach(item => {
    const el = document.getElementById('bval-' + item.id);
    if (el) el.textContent = fmtBudget(budgetValues[item.id]);
  });
  renderBudgetSummary();
}

function resetBudget() {
  BUDGET_ITEMS.forEach(item => {
    budgetValues[item.id] = item.default;
    const slider = document.getElementById('bslider-' + item.id);
    if (slider) {
      slider.value = item.default;
      const pct = Math.round(((item.default - item.min) / (item.max - item.min)) * 100);
      slider.style.setProperty('--val', pct + '%');
    }
    const valEl = document.getElementById('bval-' + item.id);
    if (valEl) valEl.textContent = fmtBudget(item.default);
  });
  renderBudgetSummary();
}

// Init on load
initBudgetCalc();
// Re-init after exchange rates load to show converted values
const _origFetch2 = fetchExchangeRates;
fetchExchangeRates = async function() {
  await _origFetch2();
  if (budgetCurrency !== 'USD') setBudgetCurrency(budgetCurrency);
};

// ── "Other" country dropdown for origin filter ────────────────────────────────
(function addOriginOtherDropdown() {
  const bar = document.querySelector('.origin-filter-bar');
  if (!bar) return;

  // Countries already shown as pills
  const shownCodes = new Set(ORIGIN_FILTERS.map(f => f.code));

  // Build select with all remaining countries
  const otherOptions = COUNTRIES
    .filter(c => !shownCodes.has(c.code))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(c => `<option value="${c.code}">${c.flag} ${c.name}</option>`)
    .join('');

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:relative;display:inline-block';
  wrapper.innerHTML = `
    <button class="origin-pill" id="origin-other-pill" onclick="toggleOriginOther(event)">
      🌐 Other ▾
    </button>
    <div id="origin-other-dropdown" style="
      display:none; position:absolute; top:calc(100% + 6px); left:0; z-index:200;
      background:var(--card2); border:1px solid var(--border); border-radius:var(--radius-sm);
      box-shadow:0 8px 32px rgba(0,0,0,0.35); padding:6px; min-width:220px;">
      <input type="text" id="origin-other-search" placeholder="Search country…" autocomplete="off"
        oninput="filterOriginOther(this.value)"
        style="width:100%;padding:7px 10px;border-radius:6px;border:1px solid var(--border);
               background:var(--card);color:var(--text);font-size:0.88rem;margin-bottom:6px;outline:none;box-sizing:border-box"/>
      <div id="origin-other-list" style="max-height:240px;overflow-y:auto;">
        ${COUNTRIES.filter(c => !shownCodes.has(c.code))
          .sort((a,b) => a.name.localeCompare(b.name))
          .map(c => `<div class="origin-other-item" data-code="${c.code}"
            onclick="pickOriginOther('${c.code}')"
            style="padding:7px 10px;border-radius:6px;cursor:pointer;font-size:0.88rem;
                   transition:background 0.15s;display:flex;align-items:center;gap:8px">
            <span>${c.flag}</span><span>${c.name}</span>
          </div>`).join('')}
      </div>
    </div>`;

  bar.appendChild(wrapper);

  // Hover style for items
  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target)) {
      document.getElementById('origin-other-dropdown').style.display = 'none';
    }
  });
})();

function toggleOriginOther(e) {
  e.stopPropagation();
  const dd = document.getElementById('origin-other-dropdown');
  const isOpen = dd.style.display !== 'none';
  dd.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) setTimeout(() => document.getElementById('origin-other-search').focus(), 50);
}

function filterOriginOther(q) {
  const items = document.querySelectorAll('.origin-other-item');
  const lower = q.toLowerCase();
  items.forEach(item => {
    const name = item.querySelector('span:last-child').textContent.toLowerCase();
    item.style.display = name.includes(lower) ? 'flex' : 'none';
  });
}

function pickOriginOther(code) {
  document.getElementById('origin-other-dropdown').style.display = 'none';
  document.getElementById('origin-other-search').value = '';
  filterOriginOther('');

  // Update pill styles — deactivate all standard pills, mark "Other" as active
  document.querySelectorAll('.origin-pill').forEach(p => p.classList.remove('active'));
  const otherPill = document.getElementById('origin-other-pill');
  const country = COUNTRIES.find(c => c.code === code);
  if (otherPill && country) {
    otherPill.classList.add('active');
    otherPill.textContent = `${country.flag} ${country.name} ▾`;
  }

  _activeOrigin = code;
  renderDestinationGrid(code);
}

// Override renderDestinationGrid to handle countries not in TRENDING_BY_ORIGIN
const _origRenderDestGrid = renderDestinationGrid;
renderDestinationGrid = function(originCode) {
  if (TRENDING_BY_ORIGIN[originCode]) {
    _origRenderDestGrid(originCode);
    return;
  }
  // Fallback: show global trending with a note
  const grid = document.getElementById('destinations-grid');
  grid.innerHTML = '';
  const originCountry = COUNTRIES.find(c => c.code === originCode);
  const data = TRENDING_BY_ORIGIN['ALL'];

  // Insert note
  const note = document.createElement('div');
  note.style.cssText = 'grid-column:1/-1;padding:1rem 1.25rem;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:var(--radius-sm);color:var(--muted);font-size:0.85rem;margin-bottom:0.5rem';
  note.innerHTML = `${originCountry ? originCountry.flag : '🌍'} Specific trending data for <strong style="color:var(--text)">${originCountry ? originCountry.name : originCode}</strong> is coming soon. Showing global trends in the meantime.`;
  grid.appendChild(note);

  data.forEach(dest => {
    const c = COUNTRIES.find(x => x.code === dest.code);
    if (!c) return;
    const card = document.createElement('div');
    card.className = 'dest-card';
    card.innerHTML = `
      <div class="dest-flag">${c.flag}</div>
      <div class="dest-name">${c.name}</div>
      <div class="dest-tagline">${dest.tagline}</div>
      <div class="dest-trend">📈 ${dest.trend}</div>`;
    card.addEventListener('click', () => {
      toCountry = c;
      document.getElementById('to-input').value = c.name;
      document.getElementById('to-input').dataset.code = c.code;
      if (originCountry && !fromCountry) {
        fromCountry = originCountry;
        document.getElementById('from-input').value = originCountry.name;
        document.getElementById('from-input').dataset.code = originCountry.code;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
};

// Also reset Other pill label when a standard pill is clicked
const _origSetOriginFilter = setOriginFilter;
setOriginFilter = function(code) {
  const otherPill = document.getElementById('origin-other-pill');
  if (otherPill) { otherPill.classList.remove('active'); otherPill.textContent = '🌐 Other ▾'; }
  _origSetOriginFilter(code);
};

// Hover effect for other items
document.addEventListener('mouseover', e => {
  const item = e.target.closest('.origin-other-item');
  if (item) item.style.background = 'rgba(99,102,241,0.12)';
});
document.addEventListener('mouseout', e => {
  const item = e.target.closest('.origin-other-item');
  if (item) item.style.background = '';
});

// ── Community / Diaspora Section ──────────────────────────────────────────────
function fmtPopulation(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1).replace(/\.0$/,'') + 'm';
  if (n >= 1000) return Math.round(n/1000) + 'k';
  return n.toLocaleString();
}

function commBadge(size) {
  if (size >= 100000) return {cls:'comm-large',   label:'Large Community'};
  if (size >= 10000)  return {cls:'comm-medium',  label:'Medium Community'};
  if (size >= 1000)   return {cls:'comm-small',   label:'Small Community'};
  return                     {cls:'comm-emerging', label:'Emerging Community'};
}

function renderCommunitySection(from, to) {
  const destData = DIASPORA_DATA[to.code];
  if (!destData) return '';

  const fromCode = from.code;
  // Find best city match for the active city selector (if any)
  const toSel = document.getElementById('to-city-select');
  const cityIdx = toSel ? parseInt(toSel.value) : -1;
  const cities = CITY_DATA[to.code] || [];
  const activeCityName = cityIdx >= 0 ? cities[cityIdx].name : null;

  // Look up community data — try city first, fall back to national
  let commData = null, levelLabel = '';
  if (activeCityName && destData.cities) {
    // Find matching city key (partial match)
    const cityKey = Object.keys(destData.cities).find(k =>
      k.toLowerCase().includes(activeCityName.split(',')[0].toLowerCase()) ||
      activeCityName.toLowerCase().includes(k.split(',')[0].toLowerCase())
    );
    if (cityKey) { commData = destData.cities[cityKey][fromCode]; levelLabel = cityKey; }
  }
  if (!commData && destData.national) {
    commData = destData.national[fromCode];
    levelLabel = to.name + ' (national)';
  }

  // Top communities in the destination (city or national)
  let topData = {};
  if (activeCityName && destData.cities) {
    const cityKey = Object.keys(destData.cities).find(k =>
      k.toLowerCase().includes(activeCityName.split(',')[0].toLowerCase()) ||
      activeCityName.toLowerCase().includes(k.split(',')[0].toLowerCase())
    );
    if (cityKey) topData = destData.cities[cityKey];
  }
  if (!Object.keys(topData).length && destData.national) topData = destData.national;

  const topSorted = Object.entries(topData)
    .filter(([code]) => code !== fromCode)
    .sort(([,a],[,b]) => (b.size||0)-(a.size||0))
    .slice(0, 6);

  // Your community box
  let yourCommunityHtml = '';
  if (commData) {
    const badge = commBadge(commData.size || 0);
    const fromCountry = COUNTRIES.find(c => c.code === fromCode);
    const communityLinks = [
      { label:'🌐 Internations', url:`https://www.internations.org/go/to/${to.name.toLowerCase().replace(/\s+/g,'-')}` },
      { label:'💬 Expat.com', url:`https://www.expat.com/forum/${to.name.toLowerCase().replace(/\s+/g,'-')}/` },
      { label:'📱 Facebook Groups', url:`https://www.facebook.com/search/groups?q=${encodeURIComponent((fromCountry?fromCountry.name:from.name)+' expats '+to.name)}` },
    ];
    yourCommunityHtml = `
      <div class="community-your-box">
        <div class="community-your-top">
          <div class="community-your-flag">${fromCountry ? fromCountry.flag : '🌍'}</div>
          <div class="community-your-info" style="flex:1">
            <h4>${fromCountry ? fromCountry.name : from.name} community in ${levelLabel}</h4>
            <p>${commData.desc || 'Expat community present in the destination.'}</p>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="community-your-size">~${fmtPopulation(commData.size || 0)}</div>
            <div class="community-your-label">residents</div>
            <div style="margin-top:6px"><span class="community-badge ${badge.cls}">${badge.label}</span></div>
          </div>
        </div>
        <div class="community-links">
          ${communityLinks.map(l=>`<a class="community-link" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}
        </div>
      </div>`;
  } else {
    yourCommunityHtml = `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.25rem;margin-bottom:1.25rem;color:var(--muted);font-size:0.88rem">
        🌍 We don't have specific community size data for ${from.name} nationals in ${activeCityName || to.name} yet, but expat communities exist across all major cities.
        <a class="community-link" style="display:inline-flex;margin-top:0.75rem" href="https://www.internations.org" target="_blank" rel="noopener">Find your community on Internations ↗</a>
      </div>`;
  }

  // Top communities
  const topCommHtml = topSorted.length ? `
    <div style="margin-top:0.5rem">
      <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.65rem;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">
        Largest communities in ${activeCityName || to.name}
      </div>
      <div class="top-communities-grid">
        ${topSorted.map(([code, data], i) => {
          const c = COUNTRIES.find(x => x.code === code);
          if (!c) return '';
          return `<div class="top-comm-card">
            <div class="top-comm-rank">${i+1}</div>
            <div class="top-comm-flag">${c.flag}</div>
            <div class="top-comm-info">
              <div class="tc-name">${c.name}</div>
              <div class="tc-size">~${fmtPopulation(data.size || 0)}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>` : '';

  return `<div class="community-section">
    <div class="community-header">
      <h3>👥 Community & Expat Life</h3>
    </div>
    ${yourCommunityHtml}
    ${topCommHtml}
  </div>`;
}

// Patch window.renderOverview to append community section
const _prevRenderOverview3 = window.renderOverview;
window.renderOverview = function(from, to, d) {
  const base = _prevRenderOverview3(from, to, d);
  const community = renderCommunitySection(from, to);
  return base + community;
};

// ── Community section: city filter + fixed links ──────────────────────────────
let _commFromCode = null, _commToCode = null, _commCityKey = null;

function renderCommunitySection(from, to) {
  _commFromCode = from.code;
  _commToCode = to.code;
  const destData = DIASPORA_DATA[to.code];
  const fromCode = from.code;

  // Build city options from DIASPORA_DATA cities + CITY_DATA
  const diasporaCities = destData && destData.cities ? Object.keys(destData.cities) : [];
  const fallbackCities = (CITY_DATA[to.code] || []).map(c => c.name);
  // Merge, prioritising diaspora cities
  const allCityOptions = [...new Set([...diasporaCities, ...fallbackCities])].sort();

  const citySelectHtml = allCityOptions.length ? `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:1.25rem;flex-wrap:wrap">
      <label style="font-size:0.8rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.05em">City:</label>
      <select class="compare-filter-select" id="comm-city-select" onchange="updateCommunityCity(this.value)" style="padding:6px 12px;font-size:0.85rem">
        <option value="">All of ${to.name}</option>
        ${allCityOptions.map(city => `<option value="${city}" ${city === _commCityKey ? 'selected' : ''}>${city}</option>`).join('')}
      </select>
    </div>` : '';

  // Look up community data — city or national
  let commData = null, levelLabel = to.name;
  if (_commCityKey && destData && destData.cities && destData.cities[_commCityKey]) {
    commData = destData.cities[_commCityKey][fromCode];
    levelLabel = _commCityKey;
  } else if (!_commCityKey && destData && destData.national) {
    commData = destData.national[fromCode];
    levelLabel = to.name + ' (national)';
  }

  // Top communities in selected city or national
  let topData = {};
  if (_commCityKey && destData && destData.cities && destData.cities[_commCityKey]) {
    topData = destData.cities[_commCityKey];
  } else if (destData && destData.national) {
    topData = destData.national;
  }

  const topSorted = Object.entries(topData)
    .filter(([code]) => code !== fromCode)
    .sort(([,a],[,b]) => (b.size||0)-(a.size||0))
    .slice(0, 6);

  const fromCountry = COUNTRIES.find(c => c.code === fromCode);

  // Fixed, reliable community links
  const countrySlug = to.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g,'');
  const fromName = fromCountry ? fromCountry.name : from.name;
  const fbQuery = encodeURIComponent(fromName + ' expats ' + (_commCityKey || to.name));
  const redditQuery = encodeURIComponent('expats ' + (_commCityKey || to.name));
  const communityLinks = [
    { label:'🌐 Internations', url:`https://www.internations.org/expat-insider/` },
    { label:'💬 Expat.com Forum', url:`https://www.expat.com/forum/list.php` },
    { label:'🔴 Reddit Expats', url:`https://www.reddit.com/search/?q=${redditQuery}&type=sr` },
    { label:'📱 Facebook Groups', url:`https://www.facebook.com/search/groups/?q=${fbQuery}` },
  ];

  let yourCommunityHtml = '';
  if (commData && commData.size) {
    const badge = commBadge(commData.size);
    yourCommunityHtml = `
      <div class="community-your-box">
        <div class="community-your-top">
          <div class="community-your-flag">${fromCountry ? fromCountry.flag : '🌍'}</div>
          <div class="community-your-info" style="flex:1">
            <h4>${fromName} community in ${levelLabel}</h4>
            <p>${commData.desc || 'Expat community present in the destination.'}</p>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="community-your-size">~${fmtPopulation(commData.size)}</div>
            <div class="community-your-label">residents</div>
            <div style="margin-top:6px"><span class="community-badge ${badge.cls}">${badge.label}</span></div>
          </div>
        </div>
        <div class="community-links">
          ${communityLinks.map(l=>`<a class="community-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`).join('')}
        </div>
      </div>`;
  } else {
    yourCommunityHtml = `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.25rem;margin-bottom:1.25rem;font-size:0.88rem;color:var(--muted)">
        🌍 We don't have specific size data for ${fromName} nationals in ${levelLabel} yet — but expat communities exist in most cities. Use the links below to find yours.
        <div class="community-links" style="margin-top:0.75rem">
          ${communityLinks.map(l=>`<a class="community-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`).join('')}
        </div>
      </div>`;
  }

  const topCommHtml = topSorted.length ? `
    <div style="margin-top:0.5rem">
      <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.65rem;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">
        Largest communities in ${_commCityKey || to.name}
      </div>
      <div class="top-communities-grid">
        ${topSorted.map(([code, data], i) => {
          const c = COUNTRIES.find(x => x.code === code);
          if (!c) return '';
          return `<div class="top-comm-card">
            <div class="top-comm-rank">${i+1}</div>
            <div class="top-comm-flag">${c.flag}</div>
            <div class="top-comm-info">
              <div class="tc-name">${c.name}</div>
              <div class="tc-size">~${fmtPopulation(data.size||0)}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>` : '';

  return `<div class="community-section" id="community-section">
    <div class="community-header"><h3>👥 Community & Expat Life</h3></div>
    ${citySelectHtml}
    <div id="community-inner">
      ${yourCommunityHtml}
      ${topCommHtml}
    </div>
  </div>`;
}

function updateCommunityCity(cityKey) {
  _commCityKey = cityKey || null;
  // Re-render just the inner community content
  const inner = document.getElementById('community-inner');
  const sel = document.getElementById('comm-city-select');
  if (!inner || !_commFromCode || !_commToCode) return;
  const fromObj = COUNTRIES.find(c => c.code === _commFromCode) || { code: _commFromCode, name: _commFromCode };
  const toObj = COUNTRIES.find(c => c.code === _commToCode) || { code: _commToCode, name: _commToCode };
  // Re-run community render and replace just the inner div
  const destData = DIASPORA_DATA[_commToCode];
  const fromCode = _commFromCode;
  let commData = null, levelLabel = toObj.name;
  if (_commCityKey && destData && destData.cities && destData.cities[_commCityKey]) {
    commData = destData.cities[_commCityKey][fromCode];
    levelLabel = _commCityKey;
  } else if (!_commCityKey && destData && destData.national) {
    commData = destData.national[fromCode];
    levelLabel = toObj.name + ' (national)';
  }
  let topData = {};
  if (_commCityKey && destData && destData.cities && destData.cities[_commCityKey]) topData = destData.cities[_commCityKey];
  else if (destData && destData.national) topData = destData.national;
  const topSorted = Object.entries(topData).filter(([c])=>c!==fromCode).sort(([,a],[,b])=>(b.size||0)-(a.size||0)).slice(0,6);
  const fromCountry = COUNTRIES.find(c => c.code === fromCode);
  const fromName = fromCountry ? fromCountry.name : fromCode;
  const redditQuery = encodeURIComponent('expats ' + (_commCityKey || toObj.name));
  const fbQuery = encodeURIComponent(fromName + ' expats ' + (_commCityKey || toObj.name));
  const links = [
    { label:'🌐 Internations', url:'https://www.internations.org/expat-insider/' },
    { label:'💬 Expat.com', url:'https://www.expat.com/forum/list.php' },
    { label:'🔴 Reddit', url:`https://www.reddit.com/search/?q=${redditQuery}&type=sr` },
    { label:'📱 Facebook', url:`https://www.facebook.com/search/groups/?q=${fbQuery}` },
  ];
  const linksHtml = `<div class="community-links">${links.map(l=>`<a class="community-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`).join('')}</div>`;
  let yourHtml = '';
  if (commData && commData.size) {
    const badge = commBadge(commData.size);
    yourHtml = `<div class="community-your-box">
      <div class="community-your-top">
        <div class="community-your-flag">${fromCountry ? fromCountry.flag : '🌍'}</div>
        <div class="community-your-info" style="flex:1"><h4>${fromName} in ${levelLabel}</h4><p>${commData.desc||''}</p></div>
        <div style="text-align:right;flex-shrink:0">
          <div class="community-your-size">~${fmtPopulation(commData.size)}</div>
          <div class="community-your-label">residents</div>
          <div style="margin-top:6px"><span class="community-badge ${badge.cls}">${badge.label}</span></div>
        </div>
      </div>${linksHtml}</div>`;
  } else {
    yourHtml = `<div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.25rem;margin-bottom:1.25rem;font-size:0.88rem;color:var(--muted)">
      🌍 No specific data for ${fromName} in ${levelLabel} yet.${linksHtml}</div>`;
  }
  const topHtml = topSorted.length ? `<div style="margin-top:0.5rem">
    <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.65rem;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Largest communities in ${_commCityKey||toObj.name}</div>
    <div class="top-communities-grid">${topSorted.map(([code,data],i)=>{const c=COUNTRIES.find(x=>x.code===code);if(!c)return'';return`<div class="top-comm-card"><div class="top-comm-rank">${i+1}</div><div class="top-comm-flag">${c.flag}</div><div class="top-comm-info"><div class="tc-name">${c.name}</div><div class="tc-size">~${fmtPopulation(data.size||0)}</div></div></div>`;}).join('')}</div></div>` : '';
  inner.innerHTML = yourHtml + topHtml;
}

// Reset city when new route is searched
const _prevRenderOverview4 = window.renderOverview;
window.renderOverview = function(from, to, d) {
  _commCityKey = null; // reset city on new search
  const base = _prevRenderOverview4(from, to, d);
  return base;
};

/* ---------------------------------------------------------------------------
 * Page Switching Logic
 * ---------------------------------------------------------------------------
 * The application now has two top-level pages: "Plan My Move" (search + results
 * + budget calculator + checklist) and "Explore" (trending destinations, cost
 * comparison, quiz, etc.).
 */
function switchPage(pageKey) {
  // Hide all pages, then show the requested one
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageKey);
  if (target) target.classList.add('active');

  // Update the navigation button states
  document.querySelectorAll('.page-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === 'pnav-' + pageKey);
  });

  // Reset scroll position for a fresh start
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Expose globally for inline onclick handlers in the HTML
window.switchPage = switchPage;
