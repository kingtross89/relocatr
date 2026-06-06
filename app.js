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
const DETAILED_COUNTRIES = COUNTRIES.filter(c => COUNTRY_DATA[c.code]);

const COUNTRY_POPULATIONS = {
  AU: "26.2M", CA: "39.8M", DE: "83.8M", GB: "67.3M", US: "335.8M", JP: "125.1M",
  PT: "10.4M", SG: "5.9M",  AE: "9.4M",  TH: "71.8M",  NL: "17.8M",  ES: "48.1M",
  FR: "68.0M", MX: "128.5M", BR: "215.3M", ID: "277.5M", VN: "98.8M",  ZA: "60.4M",
  TR: "85.3M", PH: "117.3M", KR: "51.7M",  CL: "19.6M",  CO: "52.0M",  AR: "46.2M",
  CR: "5.2M",  CN: "1.41B",  IN: "1.43B",  EG: "112.7M", KE: "55.1M",  NG: "223.8M",
  MA: "37.8M"
};

const CITY_POPULATIONS = {
  // US
  "New York, NY": "8.3M", "San Francisco, CA": "808k", "Los Angeles, CA": "3.8M",
  "Chicago, IL": "2.6M", "Austin, TX": "964k", "Miami, FL": "449k",
  "Seattle, WA": "749k", "Denver, CO": "713k", "Nashville, TN": "692k",
  "Phoenix, AZ": "1.6M", "Boston, MA": "650k",
  // GB
  "London": "8.9M", "Manchester": "550k", "Edinburgh": "506k", "Bristol": "472k",
  "Birmingham": "1.1M", "Leeds": "812k",
  // DE
  "Berlin": "3.7M", "Munich": "1.5M", "Hamburg": "1.9M", "Frankfurt": "753k",
  "Cologne": "1.1M", "Stuttgart": "630k",
  // CA
  "Toronto": "2.9M", "Vancouver": "662k", "Montreal": "1.8M", "Calgary": "1.3M",
  "Ottawa": "1.0M",
  // AU
  "Sydney": "5.3M", "Melbourne": "5.0M", "Brisbane": "2.6M", "Perth": "2.1M",
  "Adelaide": "1.3M",
  // JP
  "Tokyo": "14.0M", "Osaka": "2.7M", "Kyoto": "1.4M", "Yokohama": "3.8M",
  "Fukuoka": "1.6M",
  // PT
  "Lisbon": "545k", "Porto": "231k", "Faro": "64k",
  // SG
  "Singapore": "5.9M",
  // AE
  "Dubai": "3.6M", "Abu Dhabi": "1.5M",
  // TH
  "Bangkok": "8.3M", "Chiang Mai": "127k", "Phuket": "79k",
  // NL
  "Amsterdam": "821k", "Rotterdam": "651k", "Utrecht": "361k",
  // ES
  "Madrid": "3.3M", "Barcelona": "1.6M", "Valencia": "800k", "Seville": "685k",
  // FR
  "Paris": "2.1M", "Lyon": "522k", "Marseille": "870k", "Nice": "342k",
  // MX
  "Mexico City": "9.2M", "Guadalajara": "1.4M", "Monterrey": "1.1M", "Cancun": "888k",
  // BR
  "Sao Paulo": "12.3M", "Rio de Janeiro": "6.7M", "Brasilia": "3.0M", "Belo Horizonte": "2.5M",
  // ID
  "Jakarta": "10.6M", "Bali": "4.3M",
  // VN
  "Ho Chi Minh City": "9.0M", "Hanoi": "8.4M",
  // ZA
  "Cape Town": "4.8M", "Johannesburg": "4.4M", "Durban": "3.1M",
  // TR
  "Istanbul": "15.9M", "Ankara": "5.8M", "Izmir": "4.4M",
  // PH
  "Manila": "1.8M", "Cebu": "964k",
  // KR
  "Seoul": "9.7M", "Busan": "3.4M",
  // CL
  "Santiago": "6.2M", "Valparaiso": "296k",
  // CO
  "Bogota": "8.0M", "Medellin": "2.6M",
  // AR
  "Buenos Aires": "3.0M", "Cordoba": "1.3M",
  // CR
  "San Jose": "340k",
  // CN
  "Shanghai": "26.3M", "Beijing": "21.9M", "Shenzhen": "17.6M", "Guangzhou": "18.7M",
  // IN
  "Mumbai": "12.5M", "Delhi": "16.8M", "New Delhi": "16.8M", "Bangalore": "8.4M", "Bengaluru": "8.4M",
  "Kolkata": "14.9M", "Chennai": "11.5M", "Hyderabad": "10.8M", "Pune": "6.9M", "Ahmedabad": "8.3M",
  // EG
  "Cairo": "9.5M", "Alexandria": "5.2M",
  // KE
  "Nairobi": "4.4M", "Mombasa": "1.2M",
  // NG
  "Lagos": "15.3M", "Abuja": "1.2M",
  // MA
  "Casablanca": "3.4M", "Marrakech": "928k", "Rabat": "577k"
};

window.getCityPopulation = function(cityName) {
  if (typeof CITY_POPULATIONS === 'undefined') return 'N/A';
  if (CITY_POPULATIONS[cityName]) return CITY_POPULATIONS[cityName];
  const base = cityName.split(',')[0].trim();
  return CITY_POPULATIONS[base] || 'N/A';
};

window.COUNTRY_POPULATIONS = COUNTRY_POPULATIONS;
window.CITY_POPULATIONS = CITY_POPULATIONS;

function buildDropdown(inputId, dropdownId, onSelect) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    if (inputId === 'from-input') fromCountry = null;
    if (inputId === 'to-input') toCountry = null;
    if (!q) {
      dropdown.classList.remove('open');
      return;
    }

    // 1. Search countries
    const countryMatches = DETAILED_COUNTRIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, 5);

    // 2. Search cities
    const cityMatches = [];
    Object.entries(CITY_DATA).forEach(([countryCode, cities]) => {
      const country = DETAILED_COUNTRIES.find(c => c.code === countryCode);
      if (!country) return;
      const countryMatch = country.name.toLowerCase().includes(q);
      cities.forEach((city, idx) => {
        if (city.name.toLowerCase().includes(q) || countryMatch) {
          cityMatches.push({
            type: 'city',
            name: city.name,
            countryCode: countryCode,
            countryName: country.name,
            flag: country.flag,
            cityIndex: idx,
            region: country.region
          });
        }
      });
    });
    const slicedCityMatches = cityMatches.slice(0, 5);

    if (!countryMatches.length && !slicedCityMatches.length) { dropdown.classList.remove('open'); return; }

    // Render countries
    countryMatches.forEach(c => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.innerHTML = `<span class="flag">${c.flag}</span><span>${c.name} <span style="opacity:0.6;font-size:0.8rem">[Country]</span></span>`;
      item.addEventListener('mousedown', e => {
        e.preventDefault();
        input.value = c.name;
        input.dataset.code = c.code;
        dropdown.classList.remove('open');
        onSelect({ type: 'country', code: c.code, name: c.name, flag: c.flag, region: c.region });
      });
      dropdown.appendChild(item);
    });

    // Render cities
    slicedCityMatches.forEach(c => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.innerHTML = `<span class="flag">${c.flag}</span><span>${c.name} (${c.countryName}) <span style="opacity:0.6;font-size:0.8rem">[City]</span></span>`;
      item.addEventListener('mousedown', e => {
        e.preventDefault();
        input.value = c.name;
        input.dataset.code = c.countryCode;
        dropdown.classList.remove('open');
        onSelect({ type: 'city', code: c.countryCode, name: c.countryName, flag: c.flag, cityName: c.name, cityIndex: c.cityIndex, region: c.region });
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
  const fi = document.getElementById('from-input');
  const ti = document.getElementById('to-input');
  
  const resolveTerm = (val) => {
    if (!val) return null;
    const term = val.trim().toLowerCase();
    if (!term) return null;
    
    // 1. Try to find exact country match, then partial country match
    let cMatch = DETAILED_COUNTRIES.find(c => c.name.toLowerCase() === term || c.code.toLowerCase() === term);
    if (!cMatch) {
      cMatch = DETAILED_COUNTRIES.find(c => c.name.toLowerCase().includes(term));
    }
    if (cMatch) {
      return { type: 'country', code: cMatch.code, name: cMatch.name, flag: cMatch.flag, region: cMatch.region };
    }
    
    // 2. Try to find city match (exact first, then partial)
    let cityMatch = null;
    for (const [countryCode, cities] of Object.entries(CITY_DATA)) {
      const country = DETAILED_COUNTRIES.find(c => c.code === countryCode);
      if (!country) continue;
      
      let idx = cities.findIndex(city => city.name.toLowerCase() === term);
      if (idx < 0) {
        idx = cities.findIndex(city => city.name.toLowerCase().includes(term));
      }
      
      if (idx >= 0) {
        const city = cities[idx];
        cityMatch = { type: 'city', code: countryCode, name: country.name, flag: country.flag, cityName: city.name, cityIndex: idx, region: country.region };
        break;
      }
    }
    return cityMatch;
  };

  if (!fromCountry && fi) {
    fromCountry = resolveTerm(fi.value);
    if (fromCountry) {
      fi.value = fromCountry.type === 'city' ? fromCountry.cityName : fromCountry.name;
    }
  }
  if (!toCountry && ti) {
    toCountry = resolveTerm(ti.value);
    if (toCountry) {
      ti.value = toCountry.type === 'city' ? toCountry.cityName : toCountry.name;
    }
  }

  if (!fromCountry || !toCountry) {
    const missing = !fromCountry ? 'from-input' : 'to-input';
    const el = document.getElementById(missing);
    if (el) {
      el.style.borderColor = '#ef4444';
      el.focus();
      setTimeout(() => el.style.borderColor = '', 2000);
    }
    return;
  }
  try {
    showResults(fromCountry, toCountry);
  } catch (err) {
    console.error("Error in showResults:", err);
  }
}

// ── Show Results ────────────────────────────────────────────────────────────
function showResults(from, to) {
  if (window.showResults) {
    window.showResults(from, to);
  } else {
    console.error("window.showResults is not defined!");
  }
}

function goHome() {
  switchPage('plan');
  document.body.classList.remove('results-active');
  const planPage = document.getElementById('page-plan');
  if (planPage) planPage.classList.remove('results-active');
  const resultsPanel = document.getElementById('results-panel');
  if (resultsPanel) resultsPanel.classList.add('hidden');
  
  const fromInput = document.getElementById('from-input');
  const toInput = document.getElementById('to-input');
  if (fromInput) { fromInput.value = ''; delete fromInput.dataset.code; }
  if (toInput) { toInput.value = ''; delete toInput.dataset.code; }
  fromCountry = null;
  toCountry = null;
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.goHome = goHome;

const backBtn = document.getElementById('back-btn');
if (backBtn) backBtn.addEventListener('click', goHome);

function setTab(tab, from, to) {
  if (window.setTab) {
    window.setTab(tab, from, to);
  } else {
    console.error("window.setTab is not defined!");
  }
}

// ── Overview ────────────────────────────────────────────────────────────────
function renderOverview(from, to, d) {
  if (!d) return renderFallbackOverview(from, to);
  const citiesList = CITY_DATA[to.code] || [];
  const selectedCity = (to.type === 'city' && citiesList[to.cityIndex]) ? citiesList[to.cityIndex] : null;
  const cost = selectedCity ? selectedCity.cost : d.cost;
  const diff = d.visaDifficulty;
  const badgeClass = diff === 'Easy' ? 'badge-green' : diff === 'Medium' ? 'badge-yellow' : 'badge-red';
  
  const fromCityName = (from.type === 'city' && from.cityName) ? from.cityName.split(',')[0].trim() : null;
  const toCityName = (to.type === 'city' && to.cityName) ? to.cityName.split(',')[0].trim() : null;

  const originName = fromCityName ? `${fromCityName}, ${from.name}` : from.name;
  const destName = toCityName ? `${toCityName}, ${to.name}` : to.name;
  
  const heroTitle = toCityName ? `Moving to ${toCityName}` : `Moving to ${to.name}`;
  const heroSubtitle = `Key facts and what to expect when relocating from ${originName} to ${destName}`;

  const popVal = selectedCity ? (window.getCityPopulation(selectedCity.name)) : (COUNTRY_POPULATIONS[to.code] || 'N/A');
  const popLabel = selectedCity ? `Population (${toCityName})` : `Population (${to.name})`;
  const popSub = selectedCity ? 'City population' : 'Country population';

  const climate = (selectedCity && selectedCity.climate) ? selectedCity.climate : d.climate;
  const climateLabel = selectedCity ? `Climate (${toCityName})` : `Climate (${to.name})`;
  const climateSub = selectedCity ? 'Local weather profile' : 'Country climate zones';

  const qol = (selectedCity && selectedCity.qualityOfLife) ? selectedCity.qualityOfLife : d.qualityOfLife;
  const qolLabel = selectedCity ? `Quality of Life (${toCityName})` : `Quality of Life (${to.name})`;
  const qolSub = selectedCity ? 'City score' : 'Country average score';

  const costLabel = selectedCity ? `Est. Monthly Cost (${toCityName})` : `Est. Monthly Cost (${to.name})`;
  const costSub = selectedCity ? 'Rent + food + transport + utilities' : 'National average estimate';

  // National average / country-wide labels
  const visaLabel = `Visa Difficulty (${to.name})`;
  const visaSub = d.visaType || 'Country-wide policy';

  const timeLabel = `Processing Time (${to.name})`;
  const timeSub = 'Average timeline';

  const healthLabel = `Healthcare (${to.name})`;
  const healthSub = 'National system';

  const langLabel = `Language (${to.name})`;
  const langSub = 'Official & spoken';

  const currLabel = `Currency (${to.name})`;
  const currSub = 'Local currency';

  return `
    <div class="overview-hero">
      <div class="overview-flags">${from.flag}<span class="overview-arrow">→</span>${to.flag}</div>
      <div class="overview-text">
        <h2>${heroTitle}</h2>
        <p>${heroSubtitle}</p>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card">
        <div class="card-icon">👥</div>
        <div class="card-label">${popLabel}</div>
        <div class="card-value" style="font-size:1.5rem; font-weight: 700;">${popVal}</div>
        <div class="card-sub">${popSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🛂</div>
        <div class="card-label">${visaLabel}</div>
        <div class="card-value"><span class="badge ${badgeClass}">${d.visaDifficulty}</span></div>
        <div class="card-sub">${visaSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">⏱</div>
        <div class="card-label">${timeLabel}</div>
        <div class="card-value" style="font-size:1.5rem; font-weight: 700;">${d.visaTime}</div>
        <div class="card-sub">${timeSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">💰</div>
        <div class="card-label">${costLabel}</div>
        <div class="card-value" style="font-size:1.5rem; font-weight: 700;">${d.currency} ${(cost.rent+cost.food+cost.transport+cost.utilities).toLocaleString()}</div>
        <div class="card-sub">${costSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🏥</div>
        <div class="card-label">${healthLabel}</div>
        <div class="card-value" style="font-size:1rem">${d.healthcare}</div>
        <div class="card-sub">${healthSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🗣</div>
        <div class="card-label">${langLabel}</div>
        <div class="card-value" style="font-size:1rem">${d.language}</div>
        <div class="card-sub">${langSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🌤</div>
        <div class="card-label">${climateLabel}</div>
        <div class="card-value" style="font-size:1rem">${climate}</div>
        <div class="card-sub">${climateSub}</div>
      </div>
      <div class="info-card">
        <div class="card-icon">⭐</div>
        <div class="card-label">${qolLabel}</div>
        <div class="card-value" style="font-size:1.5rem; font-weight: 700;">${qol}/10</div>
        <div class="card-sub">${renderStars(qol)} (${qolSub})</div>
      </div>
      <div class="info-card">
        <div class="card-icon">💵</div>
        <div class="card-label">${currLabel}</div>
        <div class="card-value" style="font-size:1.5rem; font-weight: 700;">${d.currency}</div>
        <div class="card-sub">${currSub}</div>
      </div>
    </div>
  `;
}

function renderFallbackOverview(from, to) {
  const toCountryObj = COUNTRIES.find(c => c.code === to.code);
  const region = (toCountryObj && toCountryObj.region) || to.region || 'Global';
  
  const fromCityName = (from.type === 'city' && from.cityName) ? from.cityName.split(',')[0].trim() : null;
  const toCityName = (to.type === 'city' && to.cityName) ? to.cityName.split(',')[0].trim() : null;

  const originName = fromCityName ? `${fromCityName}, ${from.name}` : from.name;
  const destName = toCityName ? `${toCityName}, ${to.name}` : to.name;
  
  const heroTitle = toCityName ? `Moving to ${toCityName}` : `Moving to ${to.name}`;
  const heroSubtitle = `General relocation guide from ${originName} to ${destName}`;
  
  return `
    <div class="overview-hero">
      <div class="overview-flags">${from.flag}<span class="overview-arrow">→</span>${to.flag}</div>
      <div class="overview-text">
        <h2>${heroTitle}</h2>
        <p>${heroSubtitle}</p>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card">
        <div class="card-icon">🛂</div>
        <div class="card-label">First Step (${to.name})</div>
        <div class="card-value" style="font-size:0.95rem">Check ${to.name}'s official immigration website</div>
        <div class="card-sub">Country-wide policy</div>
      </div>
      <div class="info-card">
        <div class="card-icon">🌐</div>
        <div class="card-label">Region</div>
        <div class="card-value" style="font-size:1.5rem; font-weight:700">${region}</div>
        <div class="card-sub">Geographical area</div>
      </div>
      <div class="info-card">
        <div class="card-icon">📋</div>
        <div class="card-label">Key Action</div>
        <div class="card-value" style="font-size:0.95rem">Use the Checklist tab to plan your move</div>
        <div class="card-sub">Interactive checklist</div>
      </div>
      <div class="info-card">
        <div class="card-icon">💡</div>
        <div class="card-label">Tip</div>
        <div class="card-value" style="font-size:0.9rem">Join expat forums specific to ${toCityName || to.name} for on-the-ground advice</div>
        <div class="card-sub">Community tip</div>
      </div>
    </div>
    <div class="tip-card" style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
      <div class="tip-category">General Advice</div>
      <p style="color:var(--muted);font-size:0.9rem;line-height:1.7">While we don't have specific data for ${toCityName || to.name} yet, our universal checklist, visa guide, and cost comparison tools can still help you plan. Visit the other tabs above!</p>
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
  
  const initialToIdx = (to && to.type === 'city') ? to.cityIndex : -1;
  const initialFromIdx = (from && from.type === 'city') ? from.cityIndex : -1;

  const citySelector = cities.length ? `
    <div class="city-selector-bar">
      <label>📍 Show costs for</label>
      <select class="city-select" id="from-city-select">
        <option value="-1" ${initialFromIdx===-1?'selected':''}>${from.name} (national average)</option>
        ${fromCities.map((c,i)=>`<option value="${i}" ${initialFromIdx===i?'selected':''}>${c.name}</option>`).join('')}
      </select>
      <label style="margin-left:1rem">➔</label>
      <select class="city-select" id="to-city-select">
        <option value="-1" ${initialToIdx===-1?'selected':''}>${to.name} (national average)</option>
        ${cities.map((c,i)=>`<option value="${i}" ${initialToIdx===i?'selected':''}>${c.name}</option>`).join('')}
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
  let activeFd = (initialFromIdx >= 0 && fromCities[initialFromIdx]) ? fromCities[initialFromIdx] : fd;
  let activeTd = (initialToIdx >= 0 && cities[initialToIdx]) ? cities[initialToIdx] : td;

  const maxUSDVal = Math.max(...categories.map(c => {
    const fvUSD = toUSD(activeFd.cost[c.key] || 0, fd.currency);
    const tvUSD = toUSD(activeTd.cost[c.key] || 0, td.currency);
    return Math.max(fvUSD, tvUSD);
  }));

  let rows = categories.map(c => {
    const fv = activeFd.cost[c.key];
    const tv = activeTd.cost[c.key];
    const fvUSD = toUSD(fv, fd.currency);
    const tvUSD = toUSD(tv, td.currency);
    const diff = tvUSD - fvUSD;
    const pct = fvUSD > 0 ? Math.round((diff/fvUSD)*100) : 0;
    const diffStr = diff >= 0 ? `+${pct}%` : `${pct}%`;
    const diffColor = diff <= 0 ? 'var(--green)' : 'var(--red)';
    const fBar = maxUSDVal > 0 ? Math.round((fvUSD/maxUSDVal)*100) : 0;
    const tBar = maxUSDVal > 0 ? Math.round((tvUSD/maxUSDVal)*100) : 0;
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
        <div class="cost-row-diff" style="font-size:0.8rem;font-weight:700;color:${diffColor};width:48px;text-align:right;flex-shrink:0">${diffStr}</div>
      </div>
    `;
  }).join('');

  const keys = ['rent', 'food', 'transport', 'utilities'];
  const totalFrom = keys.reduce((s, k) => s + toUSD(activeFd.cost[k] || 0, fd.currency), 0);
  const totalTo = keys.reduce((s, k) => s + toUSD(activeTd.cost[k] || 0, td.currency), 0);
  const totalDiff = totalFrom > 0 ? Math.round(((totalTo-totalFrom)/totalFrom)*100) : 0;
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
      <div class="info-card" id="cost-diff-card">
        <div class="card-icon">${saving ? '💚' : '📊'}</div>
        <div class="card-label">Cost Difference</div>
        <div class="card-value" style="color:${saving?'var(--green)':'var(--red)'}">${saving?'':'+'} ${totalDiff}%</div>
        <div class="card-sub">${saving ? `You could save ~${Math.round(Math.abs(fromUSD(totalTo, td.currency) - fromUSD(totalFrom, td.currency))).toLocaleString()} ${td.currency}/mo` : `Expect to spend more than in ${from.name}`}</div>
      </div>
      <div class="info-card" id="cost-rent-card">
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
  const maxUSDVal = Math.max(...cats.map(k => {
    const fvUSD = toUSD(fdCost[k] || 0, fromData.currency);
    const tvUSD = toUSD(tdCost[k] || 0, toData.currency);
    return Math.max(fvUSD, tvUSD);
  }));
  const rows = document.querySelectorAll('#cost-breakdown .cost-row');
  const bars = document.querySelectorAll('#cost-breakdown .cost-bar-wrap');
  cats.forEach((k, i) => {
    const fBar = bars[i*2], tBar = bars[i*2+1];
    if (!fBar || !tBar) return;
    const ff = fBar.querySelector('.cost-bar-fill');
    const tf = tBar.querySelector('.cost-bar-fill');
    const fv = fdCost[k] || 0, tv = tdCost[k] || 0;
    const fvUSD = toUSD(fv, fromData.currency);
    const tvUSD = toUSD(tv, toData.currency);
    if (ff) { ff.dataset.width = maxUSDVal > 0 ? Math.round((fvUSD/maxUSDVal)*100) : 0; ff.style.width = ff.dataset.width+'%'; }
    if (tf) { tf.dataset.width = maxUSDVal > 0 ? Math.round((tvUSD/maxUSDVal)*100) : 0; tf.style.width = tf.dataset.width+'%'; }
    const fVal = fBar.querySelector('.cost-bar-val');
    const tVal = tBar.querySelector('.cost-bar-val');
    if (fVal) fVal.textContent = `${fromData.currency} ${fv.toLocaleString()}`;
    if (tVal) tVal.textContent = `${toData.currency} ${tv.toLocaleString()}`;

    const row = rows[i];
    if (row) {
      const fvUSD = toUSD(fv, fromData.currency);
      const tvUSD = toUSD(tv, toData.currency);
      const diff = tvUSD - fvUSD;
      const pct = fvUSD > 0 ? Math.round((diff/fvUSD)*100) : 0;
      const diffStr = diff >= 0 ? `+${pct}%` : `${pct}%`;
      const diffColor = diff <= 0 ? 'var(--green)' : 'var(--red)';
      const diffLabel = row.querySelector('.cost-row-diff');
      if (diffLabel) {
        diffLabel.textContent = diffStr;
        diffLabel.style.color = diffColor;
      }
    }
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
  if (!container) return;
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

// Patch renderOverview to include safety warning and affiliate widget
const _origRenderOverview = renderOverview;
window.renderOverview = function(from, to, d) {
  const safety = renderSafetyBanner(to.code);
  const base = _origRenderOverview(from, to, d);
  const affiliates = window.renderAffiliateWidget ? window.renderAffiliateWidget() : '';
  return safety + base + affiliates;
};

// Patch renderVisa to include special visas
const _origRenderVisa = renderVisa;
window.renderVisa = function(from, to, d) {
  const special = renderVisaSpecial(from.code, to.code);
  return special + _origRenderVisa(from, to, d);
};

const CULTURE_DATA = {
  ES: {
    communication: "Warm, highly social, and expressive. Interrupting is often seen as active engagement rather than rudeness. Physical space is smaller, and double-cheek kisses (right to left) are standard greetings among friends.",
    workplace: "Hierarchical but relationship-driven. Trust is built over meals. Punctuality is appreciated but slightly flexible in social-work settings. Expect late lunch breaks (2 PM - 4 PM) and a strong emphasis on work-life balance.",
    social: "Dining happens very late — lunch at 2:30 PM, dinner at 9:30 PM or 10 PM. Tipping is not expected, though rounding up or leaving a few coins is common for good service. Tapas culture involves moving from bar to bar.",
    taboos: [
      "Don't expect shops or government offices to be open during the traditional siesta hours (2 PM to 5 PM) in smaller cities.",
      "Don't tip excessively (like 15-20%) — it marks you as a tourist and is not part of the local economy.",
      "Don't discuss regional politics (e.g., Catalan independence) casually unless you know the person well."
    ]
  },
  JP: {
    communication: "Highly indirect, polite, and reliant on non-verbal cues (reading the air, or 'Kuuki o yomu'). Modesty and humility are highly valued. Greetings are done with a bow; physical contact is rare.",
    workplace: "Strict hierarchy (Senpai/Kohai dynamics). Group consensus ('Ringisho') is preferred over individual decisions. Punctuality is absolute — being 'on time' means arriving 10 minutes early. After-work socializing ('Nomikai') is common for team cohesion.",
    social: "Shoes must always be removed when entering homes, temples, and traditional restaurants. Talking on cell phones or making loud noise on trains is strictly frowned upon. Tipping is non-existent and can be seen as insulting.",
    taboos: [
      "Don't tip service staff. If you leave extra cash, they will run after you to return it.",
      "Don't eat or drink while walking in public. Consume snacks next to the vending machine or store.",
      "Don't stick your chopsticks vertically into a bowl of rice (this mimics a funeral ritual)."
    ]
  },
  AU: {
    communication: "Relaxed, direct, and heavily laced with dry humor, irony, and slang. 'Tall poppy syndrome' means boasting or self-promotion is actively disliked. Eye contact is important; greetings are casual (e.g., 'G'day').",
    workplace: "Egalitarian structure. Bosses are addressed by their first names. Strong emphasis on working hard but logging off on time. Networking is casual, often centered around 'Friday drinks' or a coffee chat.",
    social: "Outdoor lifestyle is central — BBQs ('barbies'), beach visits, and sports are massive. Tipping is not mandatory, though 10% is increasingly common in high-end restaurants. Coffee culture is serious; expect world-class espresso.",
    taboos: [
      "Don't sit in the back of a taxi if you are traveling alone — it is seen as snobbish; sit in the front seat next to the driver.",
      "Don't skip your turn to buy a round of drinks ('shouting') at a pub.",
      "Don't brag about your wealth, status, or academic degrees."
    ]
  },
  GB: {
    communication: "Polite, reserved, and heavily reliant on understatement, self-deprecation, and sarcasm. Saying 'sorry' is a default reflex for minor inconveniences. Direct criticism is often masked as polite suggestions.",
    workplace: "Polite but professional. Team structures are relatively flat but retain subtle hierarchies. Meetings start promptly. After-work pub culture is the primary way to build rapport with colleagues.",
    social: "Queuing (waiting in line) is an absolute, sacred social contract — never cut a line. Tipping 10% is standard in restaurants but not expected in pubs or taxis. Pubs close relatively early compared to continental Europe.",
    taboos: [
      "Don't cut in front of anyone in a queue. It is considered the height of bad manners.",
      "Don't complain excessively or make a scene in restaurants. Locals prefer 'quiet dissatisfaction'.",
      "Don't use the 'two-finger salute' (peace sign with palm facing inward) — it is an offensive gesture equivalent to the middle finger."
    ]
  },
  US: {
    communication: "Direct, highly enthusiastic, and informal. Small talk with strangers is standard and expected. Personal space is valued. Greetings are casual (a smile, handshake, or 'How's it going?').",
    workplace: "Fast-paced, individualistic, and highly career-focused. Flat organizational structures are common, and workers are encouraged to speak up. Long hours are often wore as a badge of honor.",
    social: "Tipping is practically mandatory for service industries: 18-20% at restaurants, $1-$2 per drink at bars, and 15% for taxis. Portions are large, and taking leftovers home ('doggy bag') is standard.",
    taboos: [
      "Don't skip tipping. Service workers rely on tips as their primary source of income due to low sub-minimum wages.",
      "Don't discuss sensitive topics like religion, personal finances, or partisan politics with new acquaintances.",
      "Don't cut in line or stand too close to others in public spaces (respect personal bubbles)."
    ]
  }
};

window.renderCultureTab = function(from, to, toData) {
  const code = to.code;
  const fromName = from.name;
  const toName = to.name;
  const data = CULTURE_DATA[code] || {
    communication: `Expect a mix of local customs and regional communication styles. In general, taking the time to learn a few basic greeting phrases in the local language goes a long way.`,
    workplace: `Workplace dynamics vary, but being respectful of local hierarchical structures and understanding local work-life balance customs (such as quiet hours or lunch rituals) will help you integrate smoothly.`,
    social: `Observe local tipping habits, dining times, and social greetings. Every culture has its own rhythm for meals and gatherings — watching what the locals do is the best way to learn.`,
    taboos: [
      "Don't make assumptions about local political, religious, or historical topics.",
      "Don't ignore local dress codes or public behavior expectations, especially in sacred or traditional spaces.",
      "Don't forget to research local tipping and payment habits (cash vs. card)."
    ]
  };

  const region = to.region || 'local';
  let regionalChecklist = [];
  if (region.includes('Europe')) {
    regionalChecklist = [
      "Diligent waste recycling separation is a civic duty.",
      "Respect 'quiet hours' (Ruhezeit) on Sundays and late evenings.",
      "Bring your own reusable grocery bags to supermarkets.",
      "Greet shopkeepers when entering and leaving small boutiques."
    ];
  } else if (region.includes('Asia')) {
    regionalChecklist = [
      "Always remove your shoes when entering homes and sacred sites.",
      "Avoid direct public confrontations — prioritize 'saving face'.",
      "Use both hands when presenting business cards or gifts.",
      "Research chopsticks etiquette (never stick them upright)."
    ];
  } else if (region.includes('Americas')) {
    regionalChecklist = [
      "Understand tipping norms for hospitality and transport services.",
      "Embrace friendly small talk in queues and retail spaces.",
      "Respect personal space bubbles in public.",
      "Double check local tax practices (often added at checkout)."
    ];
  } else {
    regionalChecklist = [
      "Dress modestly when visiting public or sacred spaces.",
      "Research local tipping expectations to avoid over/underpaying.",
      "Use your right hand for greetings, payments, and eating.",
      "Ask permission before photographing local residents."
    ];
  }

  const tabooItems = data.taboos.map(t => `<li style="margin-bottom: 8px;">❌ ${t}</li>`).join('');
  const prepItems = regionalChecklist.map((item, i) => `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.75rem;font-size:0.92rem;color:var(--text)">
      <input type="checkbox" id="cult-check-${i}" style="accent-color:var(--accent);width:16px;height:16px;cursor:pointer">
      <label for="cult-check-${i}" style="cursor:pointer;user-select:none">${item}</label>
    </div>
  `).join('');

  return `
    <div class="culture-tab-container" style="animation: pageFadeIn 0.35s ease;">
      <div style="margin-bottom: 1.5rem;">
        <h3 style="margin: 0 0 0.25rem 0; font-family: 'Outfit', sans-serif; font-size: 1.5rem;">🤝 Cultural Norms &amp; Etiquette</h3>
        <p style="color: var(--muted); margin: 0; font-size: 0.92rem;">Adapt smoothly to your new home. Understand the subtle social rules, workplace customs, and taboos of ${toName}.</p>
      </div>

      <div class="culture-grid" style="display:grid;grid-template-columns: 1.2fr 1fr;gap:2rem;">
        <div class="culture-cards-wrap" style="display:flex;flex-direction:column;gap:1.25rem;">
          <div class="culture-card" style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.15)">
            <h4 style="margin:0 0 0.75rem 0;font-family:'Outfit',sans-serif;font-size:1.15rem;color:var(--accent);display:flex;align-items:center;gap:8px">🗣️ Communication Style</h4>
            <p style="margin:0;line-height:1.6;font-size:0.92rem;color:var(--text)">${data.communication}</p>
          </div>

          <div class="culture-card" style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.15)">
            <h4 style="margin:0 0 0.75rem 0;font-family:'Outfit',sans-serif;font-size:1.15rem;color:var(--accent);display:flex;align-items:center;gap:8px">💼 Workplace Dynamics</h4>
            <p style="margin:0;line-height:1.6;font-size:0.92rem;color:var(--text)">${data.workplace}</p>
          </div>

          <div class="culture-card" style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.15)">
            <h4 style="margin:0 0 0.75rem 0;font-family:'Outfit',sans-serif;font-size:1.15rem;color:var(--accent);display:flex;align-items:center;gap:8px">🍕 Social &amp; Dining Norms</h4>
            <p style="margin:0;line-height:1.6;font-size:0.92rem;color:var(--text)">${data.social}</p>
          </div>
        </div>

        <div class="culture-side-wrap" style="display:flex;flex-direction:column;gap:1.25rem;">
          <div class="culture-card taboo-card" style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius);padding:1.5rem;">
            <h4 style="margin:0 0 0.75rem 0;font-family:'Outfit',sans-serif;font-size:1.15rem;color:#ef4444;display:flex;align-items:center;gap:8px">🚫 Critical Taboos &amp; Don'ts</h4>
            <ul style="margin:0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:4px;font-size:0.92rem;line-height:1.5;color:var(--text)">
              ${tabooItems}
            </ul>
          </div>

          <div class="culture-card" style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.15)">
            <h4 style="margin:0 0 0.75rem 0;font-family:'Outfit',sans-serif;font-size:1.15rem;color:var(--text);display:flex;align-items:center;gap:8px">📝 Cultural Adaptability Prep</h4>
            <p style="margin:0 0 1rem 0;font-size:0.85rem;color:var(--muted)">Key shifts you'll experience relocating to this region:</p>
            ${prepItems}
          </div>
        </div>
      </div>
    </div>
  `;
};

window.renderBudgetTab = function() {
  return `
    <div class="budget-tab-container" style="animation: pageFadeIn 0.35s ease;">
      <div style="margin-bottom: 1.5rem;">
        <h3 style="margin: 0 0 0.25rem 0; font-family: 'Outfit', sans-serif; font-size: 1.5rem;">💰 Move Budget Calculator</h3>
        <p style="color: var(--muted); margin: 0; font-size: 0.92rem;">Estimate your total one-time moving costs. Adjust each item to match your situation — the total updates live.</p>
      </div>
      <div class="budget-calc-wrap">
        <div class="budget-items" id="budget-items"></div>
        <div class="budget-summary" id="budget-summary"></div>
      </div>
    </div>
  `;
};

window.renderCommunityTab = function(from, to) {
  const communityHtml = renderCommunitySection(from, to);
  return `
    <div class="community-tab-container" style="animation: pageFadeIn 0.35s ease;">
      <div style="margin-bottom: 1.5rem;">
        <h3 style="margin: 0 0 0.25rem 0; font-family: 'Outfit', sans-serif; font-size: 1.5rem;">👥 Expat Community &amp; Networks</h3>
        <p style="color: var(--muted); margin: 0; font-size: 0.92rem;">Connect with fellow expats from your home country, discover local support groups, and see other major expat populations.</p>
      </div>
      ${communityHtml}
    </div>
  `;
};

// Patch setTab to use window versions
const _origSetTab = setTab;
window.setTab = function(tab, from, to) {
  const content = document.getElementById('tab-content');
  const toData = COUNTRY_DATA[to.code];
  const fromData = COUNTRY_DATA[from.code];
  
  // Track tab clicks in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'tab_click', {
      'event_category': 'engagement',
      'event_label': tab,
      'tab_name': tab
    });
  }

  if (tab === 'overview') content.innerHTML = window.renderOverview(from, to, toData);
  else if (tab === 'visa') content.innerHTML = window.renderVisa(from, to, toData);
  else if (tab === 'costs') content.innerHTML = window.renderCosts(from, to, fromData, toData);
  else if (tab === 'checklist') content.innerHTML = renderChecklistWithLinks();
  else if (tab === 'culture') content.innerHTML = window.renderCultureTab(from, to, toData);
  else if (tab === 'community') content.innerHTML = window.renderCommunityTab(from, to);
  else if (tab === 'budget') {
    content.innerHTML = window.renderBudgetTab();
    initBudgetCalc();
  }
  else if (tab === 'tips') content.innerHTML = renderTips(to, toData);
  if (tab === 'costs') animateBars();
  if (tab === 'checklist') initChecklist();
};

// Rebuild showResults to use window.setTab
const _origShowResults = showResults;
window.showResults = function(from, to) {
  _currentFrom = from; _currentTo = to;
  document.body.classList.add('results-active');
  document.getElementById('page-plan').classList.add('results-active');
  document.getElementById('results-panel').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const fromTitleName = (from.type === 'city' && from.cityName) ? `${from.cityName}, ${from.name}` : from.name;
  const toTitleName = (to.type === 'city' && to.cityName) ? `${to.cityName}, ${to.name}` : to.name;
  
  // Track search queries in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'search_route', {
      'event_category': 'relocation_search',
      'event_label': `${fromTitleName} to ${toTitleName}`,
      'search_from': fromTitleName,
      'search_to': toTitleName
    });
  }
  const routeEl = document.getElementById('results-route');
  routeEl.innerHTML = `${from.flag} ${fromTitleName} <span style="color:var(--accent);margin:0 0.5rem">→</span> ${to.flag} ${toTitleName}`;
  
  // Set default tab to overview and reset active tab highlight styles
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  const overviewTab = document.getElementById('tab-overview');
  if (overviewTab) overviewTab.classList.add('active');
  window.setTab('overview', from, to);
  
  if (!window._tabsInitialized) {
    window._tabsInitialized = true;
    document.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        window.setTab(t.dataset.tab, _currentFrom, _currentTo);
      });
    });
  }
};

// ── Affiliate & Sponsorship Widget ───────────────────────────────────────────
window.renderAffiliateWidget = function() {
  if (typeof AFFILIATE_LINKS === 'undefined') return '';
  return `
    <div class="affiliate-section" style="margin-bottom: 2rem;">
      <div class="affiliate-title-row">
        <h3>✨ Expat Services &amp; Member Deals</h3>
        <span style="font-size:0.75rem; color:var(--muted); font-weight:500;">Partner Services</span>
      </div>
      <div class="affiliate-grid">
        <!-- Wise -->
        <div class="affiliate-card">
          <div class="affiliate-header">
            <div class="affiliate-info">
              <div class="affiliate-icon">🏦</div>
              <div class="affiliate-name">Wise Transfer</div>
            </div>
            <span class="affiliate-badge">Cheapest Fees</span>
          </div>
          <div class="affiliate-desc">
            Send money abroad up to 8x cheaper than leading banks. Hold 40+ currencies and spend globally with zero hassle.
          </div>
          <div class="affiliate-action">
            <span class="affiliate-deal">🎁 Free Transfer up to £500</span>
            <a class="affiliate-btn" href="${AFFILIATE_LINKS.wise}" target="_blank" rel="noopener">Claim Offer ↗</a>
          </div>
        </div>

        <!-- SafetyWing -->
        <div class="affiliate-card">
          <div class="affiliate-header">
            <div class="affiliate-info">
              <div class="affiliate-icon">🩺</div>
              <div class="affiliate-name">SafetyWing Insurance</div>
            </div>
            <span class="affiliate-badge">Expat Choice</span>
          </div>
          <div class="affiliate-desc">
            Flexible global travel medical insurance built specifically for digital nomads and expats. Cancel anytime.
          </div>
          <div class="affiliate-action">
            <span class="affiliate-deal">🛡️ Global Coverage</span>
            <a class="affiliate-btn" href="${AFFILIATE_LINKS.safetywing}" target="_blank" rel="noopener">Sign Up ↗</a>
          </div>
        </div>

        <!-- Airalo -->
        <div class="affiliate-card">
          <div class="affiliate-header">
            <div class="affiliate-info">
              <div class="affiliate-icon">📱</div>
              <div class="affiliate-name">Airalo eSIM Card</div>
            </div>
            <span class="affiliate-badge">Highly Rated</span>
          </div>
          <div class="affiliate-desc">
            Get instant local mobile data in 200+ countries. Save on expensive data roaming fees upon arrival.
          </div>
          <div class="affiliate-action">
            <span class="affiliate-deal">⚡ 10% Off local eSIMs</span>
            <a class="affiliate-btn" href="${AFFILIATE_LINKS.airalo}" target="_blank" rel="noopener">Get eSIM ↗</a>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ── Checklist with Links ──────────────────────────────────────────────────────
function renderChecklistWithLinks() {
  const affiliates = window.renderAffiliateWidget ? window.renderAffiliateWidget() : '';
  return affiliates + `<div class="checklist-phases" id="checklist-phases">
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
  const toCur = toData.currency || COUNTRY_CURRENCY[_currentTo ? _currentTo.code : ''] || 'USD';
  const fromCur = fromData.currency || COUNTRY_CURRENCY[_currentFrom ? _currentFrom.code : ''] || 'USD';
  const tdTotalUSD = ['rent','food','transport','utilities'].reduce((s,k) => s + toUSD(tdCost[k]||0, toCur), 0);
  const fdTotalUSD = ['rent','food','transport','utilities'].reduce((s,k) => s + toUSD(fdCost[k]||0, fromCur), 0);
  const diff = fdTotalUSD > 0 ? Math.round(((tdTotalUSD - fdTotalUSD)/fdTotalUSD)*100) : 0;
  const saving = diff < 0;
  const diffCard = document.getElementById('cost-diff-card');
  const rentCard = document.getElementById('cost-rent-card');
  if (diffCard) {
    diffCard.querySelector('.card-icon').textContent = saving ? '💚' : '📊';
    diffCard.querySelector('.card-value').style.color = saving ? 'var(--green)' : 'var(--red)';
    diffCard.querySelector('.card-value').textContent = (saving?'':'+') + diff + '%';
    const savingAmountInToCur = Math.abs(fromUSD(tdTotalUSD, toCur) - fromUSD(fdTotalUSD, toCur));
    diffCard.querySelector('.card-sub').textContent = saving
      ? `You could save ~${Math.round(savingAmountInToCur).toLocaleString()} ${toCur}/mo`
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
  ...QUIZ_QUESTIONS.filter(q => q.id !== 'budget' && q.id !== 'vibe')
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

// ── Fix: renderCosts currency fallback and monthly total injection ────────
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

  // Safe fallback for cost objects
  const fdCost = fromData.cost || {rent:1200,food:300,transport:100,utilities:120,dining:180};
  const tdCost = toData.cost || {rent:1000,food:250,transport:80, utilities:100,dining:150};

  // Call the original renderCosts function with the patched data
  let html = _origRenderCosts2(from, to, fromData, toData);

  // Check if specific cities are pre-selected in search context
  const initialToIdx = (to && to.type === 'city') ? to.cityIndex : -1;
  const initialFromIdx = (from && from.type === 'city') ? from.cityIndex : -1;
  const citiesList = CITY_DATA[to.code] || [];
  const fromCitiesList = CITY_DATA[from.code] || [];
  const activeFd = (initialFromIdx >= 0 && fromCitiesList[initialFromIdx]) ? fromCitiesList[initialFromIdx] : { cost: fdCost };
  const activeTd = (initialToIdx >= 0 && citiesList[initialToIdx]) ? citiesList[initialToIdx] : { cost: tdCost };

  // Calculate totals using the correct, patched city/country costs!
  const keys = ['rent','food','transport','utilities'];
  const fTotal = keys.reduce((s,k)=>s+(activeFd.cost[k]||0),0);
  const tTotal = keys.reduce((s,k)=>s+(activeTd.cost[k]||0),0);
  const fTotalUSD = keys.reduce((s,k)=>s+toUSD(activeFd.cost[k]||0, fromData.currency),0);
  const tTotalUSD = keys.reduce((s,k)=>s+toUSD(activeTd.cost[k]||0, toData.currency),0);
  const diff = fTotalUSD > 0 ? Math.round(((tTotalUSD-fTotalUSD)/fTotalUSD)*100) : 0;
  const diffColor = diff<=0?'var(--green)':'var(--red)';
  const totalRow = `
    <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">
      <div class="cost-row" style="align-items:center">
        <div class="cost-label" style="font-weight:700;color:var(--text)">📊 Monthly Total</div>
        <div class="cost-bars">
          <div class="cost-bar-wrap">
            <div style="font-size:0.82rem;color:var(--muted);padding:2px 0" id="from-total-label">${fromData.currency} ${fTotal.toLocaleString()}/mo</div>
          </div>
          <div class="cost-bar-wrap">
            <div style="font-size:0.9rem;font-weight:700;color:var(--text);padding:2px 0" id="to-total-label">${toData.currency} ${tTotal.toLocaleString()}/mo</div>
          </div>
        </div>
        <div style="font-size:0.85rem;font-weight:700;color:${diffColor};width:48px;text-align:right;flex-shrink:0" id="total-diff-label">${diff>0?'+':''}${diff}%</div>
      </div>
      <div style="font-size:0.75rem;color:var(--muted);margin-top:4px">Excludes dining out (discretionary spend)</div>
    </div>`;
  html = html.replace('<div class="cost-legend">', totalRow + '<div class="cost-legend">');
  return html;
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
  AR:'ARS', CL:'CLP', CO:'COP', PE:'PEN', UY:'UYU', CR:'CRC', MA:'MAD',
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

// Cost breakdown totals are now handled inside the main renderCosts override above

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
  const fTotalUSD = keys.reduce((s,k)=>s+toUSD(fdCost[k]||0, fromCur),0);
  const tTotalUSD = keys.reduce((s,k)=>s+toUSD(tdCost[k]||0, toCur),0);
  const diff = fTotalUSD > 0 ? Math.round(((tTotalUSD-fTotalUSD)/fTotalUSD)*100) : 0;
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
    const pop = typeof COUNTRY_POPULATIONS !== 'undefined' ? COUNTRY_POPULATIONS[c.code] || 'N/A' : 'N/A';
    card.innerHTML = `
      <div class="dest-flag">${c.flag}</div>
      <div class="dest-name">${c.name}</div>
      <div class="dest-tagline">${dest.tagline}</div>
      <div style="font-size:0.75rem; color:var(--muted); margin-bottom: 0.25rem;">👥 Pop: ${pop}</div>
      ${originCountry ? `<div class="dest-origin-note">Popular with ${originCountry.flag} ${originCountry.name} movers</div>` : ''}
      <div class="dest-trend">📈 ${dest.trend}</div>
    `;
    card.addEventListener('click', () => {
      toCountry = { type: 'country', code: c.code, name: c.name, flag: c.flag };
      document.getElementById('to-input').value = c.name;
      document.getElementById('to-input').dataset.code = c.code;
      // Also pre-fill from if origin filter is active
      if (originCountry && !fromCountry) {
        fromCountry = { type: 'country', code: originCountry.code, name: originCountry.name, flag: originCountry.flag };
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
let selectedCompareCountries = ["US","GB","DE","PT","TH","SG","AU","MX","CA","JP","AE","NL","ES","FR","AT","IE"];

function toggleCompareDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('cmp-countries-dropdown');
  if (!dropdown) return;
  const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
  dropdown.style.display = isHidden ? 'block' : 'none';
}

document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('cmp-countries-dropdown');
  const btn = document.getElementById('cmp-countries-btn-select');
  if (dropdown && btn && !dropdown.contains(event.target) && !btn.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

function handleCompareCountryCheckbox(checkbox) {
  const code = checkbox.value;
  if (checkbox.checked) {
    if (!selectedCompareCountries.includes(code)) {
      selectedCompareCountries.push(code);
    }
  } else {
    selectedCompareCountries = selectedCompareCountries.filter(x => x !== code);
  }
  updateCompareDropdownButtonText();
  renderCountryCompare();
}

function updateCompareDropdownButtonText() {
  const btnText = document.getElementById('multiselect-btn-text');
  if (btnText) {
    btnText.textContent = `Select Countries (${selectedCompareCountries.length})`;
  }
}

function toggleAllCompareCountries(selectAll, event) {
  if (event) event.stopPropagation();
  const allCodes = Object.keys(COUNTRY_DATA).filter(code => code !== 'ALL');
  
  if (selectAll) {
    selectedCompareCountries = [...allCodes];
  } else {
    selectedCompareCountries = [];
  }
  
  // Re-sync checkboxes
  const container = document.getElementById('multiselect-items-list');
  if (container) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = selectAll;
    });
  }
  
  updateCompareDropdownButtonText();
  renderCountryCompare();
}

function buildCountryChecklist() {
  const container = document.getElementById('multiselect-items-list');
  if (!container) return;
  container.innerHTML = '';
  
  const allCodes = Object.keys(COUNTRY_DATA).filter(code => code !== 'ALL');
  
  allCodes.forEach(code => {
    const c = COUNTRIES.find(x => x.code === code);
    if (!c) return;
    const isChecked = selectedCompareCountries.includes(code);
    
    const item = document.createElement('label');
    item.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text);cursor:pointer;padding:6px 8px;border-radius:4px;user-select:none;transition:background 0.2s';
    item.innerHTML = `
      <input type="checkbox" value="${code}" ${isChecked ? 'checked' : ''} onchange="handleCompareCountryCheckbox(this)" style="cursor:pointer;accent-color:var(--accent)" />
      <span>${c.flag} ${c.name}</span>
    `;
    item.addEventListener('mouseenter', () => item.style.background = 'rgba(255,255,255,0.06)');
    item.addEventListener('mouseleave', () => item.style.background = 'transparent');
    
    container.appendChild(item);
  });
  
  updateCompareDropdownButtonText();
}

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
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;width:100%">
      <div class="compare-toggle">
        <button class="compare-toggle-btn active" id="cmp-countries-btn" onclick="setCompareMode('countries')">🌍 Countries</button>
        <button class="compare-toggle-btn" id="cmp-cities-btn" onclick="setCompareMode('cities')">🏙️ Cities</button>
      </div>
      
      <!-- Custom Country Multi-Select Dropdown Checklist -->
      <div class="custom-multiselect" id="cmp-countries-multiselect" style="position:relative; z-index:100">
        <button class="multiselect-btn" id="cmp-countries-btn-select" onclick="toggleCompareDropdown(event)" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 16px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);cursor:pointer;font-size:0.85rem;min-width:240px;text-align:left;transition:border-color 0.2s">
          <span id="multiselect-btn-text">Select Countries (${selectedCompareCountries.length})</span>
          <span style="font-size:0.75rem;color:var(--muted);transition:transform 0.2s">▼</span>
        </button>
        <div class="multiselect-dropdown" id="cmp-countries-dropdown" style="display:none;position:absolute;top:100%;left:0;margin-top:6px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:0 12px 30px rgba(0,0,0,0.5);padding:12px;min-width:260px;max-height:320px;overflow-y:auto;z-index:1000">
          <div style="display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border)">
            <button onclick="toggleAllCompareCountries(true, event)" style="background:none;border:none;color:var(--accent);font-size:0.78rem;cursor:pointer;font-weight:600">Select All</button>
            <button onclick="toggleAllCompareCountries(false, event)" style="background:none;border:none;color:var(--muted);font-size:0.78rem;cursor:pointer;font-weight:600">Clear All</button>
          </div>
          <div id="multiselect-items-list" style="display:flex;flex-direction:column;gap:4px">
            <!-- Dynamic Country Checkboxes -->
          </div>
        </div>
      </div>

      <select class="compare-filter-select" id="cmp-country-filter" style="display:none" onchange="renderCityCompare()">
        <option value="ALL">All countries</option>
        ${cityCountries}
      </select>
      
      <span class="compare-count" id="cmp-count" style="margin-left:auto"></span>
    </div>
  `;
  inner.insertBefore(controls, grid);

  // Build the checkboxes
  buildCountryChecklist();

  // Render initial country view
  renderCountryCompare();
})();

let _compareMode = 'countries';

function setCompareMode(mode) {
  _compareMode = mode;
  document.getElementById('cmp-countries-btn').classList.toggle('active', mode === 'countries');
  document.getElementById('cmp-cities-btn').classList.toggle('active', mode === 'cities');
  
  const multiselect = document.getElementById('cmp-countries-multiselect');
  const cityFilter = document.getElementById('cmp-country-filter');
  if (multiselect) multiselect.style.display = mode === 'countries' ? 'block' : 'none';
  if (cityFilter) cityFilter.style.display = mode === 'cities' ? 'block' : 'none';

  if (mode === 'countries') renderCountryCompare();
  else renderCityCompare();
}

function renderCountryCompare() {
  const grid = document.getElementById('compare-grid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
  
  const codes = selectedCompareCountries;
  
  if (codes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:var(--muted);border:1px dashed var(--border);border-radius:var(--radius);background:var(--card2);max-width:450px;margin:2rem auto">
        <span style="font-size:3rem;display:block;margin-bottom:1rem">🌍</span>
        <h4 style="color:var(--text);margin-bottom:0.5rem">No countries selected</h4>
        <p style="font-size:0.85rem">Use the checklist above to select which countries you want to compare side-by-side.</p>
      </div>
    `;
    document.getElementById('cmp-count').textContent = '0 countries';
    return;
  }

  codes.forEach(code => {
    const c = COUNTRIES.find(x => x.code === code);
    const d = COUNTRY_DATA[code];
    if (!c || !d) return;
    const total = d.cost.rent + d.cost.food + d.cost.transport + d.cost.utilities;
    const card = document.createElement('div');
    card.className = 'compare-card';
    const pop = typeof COUNTRY_POPULATIONS !== 'undefined' ? COUNTRY_POPULATIONS[code] || 'N/A' : 'N/A';
    card.innerHTML = `
      <div class="compare-flag">${c.flag}</div>
      <div class="compare-country">${c.name}</div>
      <div class="compare-metric" style="margin-bottom: 4px;"><span class="metric-label" style="font-weight:600">👥 Population</span><span class="metric-val" style="font-weight:600; color:var(--text)">${pop}</span></div>
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
    const pop = window.getCityPopulation(city.name);
    card.innerHTML = `
      <div class="city-compare-header">
        <div class="city-compare-flag">${countryObj ? countryObj.flag : '🌍'}</div>
        <div>
          <div class="city-compare-name">${city.name.split(',')[0]}</div>
          <div class="city-compare-country">${city.name.includes(',') ? city.name.split(',').slice(1).join(',').trim() + ' · ' : ''}${countryObj ? countryObj.name : ''}</div>
        </div>
      </div>
      <div class="compare-metric" style="margin-bottom: 4px;"><span class="metric-label" style="font-weight:600">👥 Population</span><span class="metric-val" style="font-weight:600; color:var(--text)">${pop}</span></div>
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
  const affiliates = window.renderAffiliateWidget ? window.renderAffiliateWidget() : '';
  return affiliates + `
    <div class="print-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; background: var(--card2); border: 1px solid var(--border); padding: 12px 16px; border-radius: var(--radius-sm);">
      <span style="font-size: 0.88rem; color: var(--muted);">Track and print your moving checklist tasks.</span>
      <button onclick="window.printChecklist()" class="action-btn" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; font-size: 0.85rem; background: rgba(99,102,241,0.15); border: 1px solid var(--accent); border-radius: var(--radius-sm); color: var(--text); cursor: pointer; transition: all 0.2s; font-family:'Inter',sans-serif; font-weight:600; outline: none;">
        🖨️ Print Checklist
      </button>
    </div>
    <div class="checklist-phases" id="checklist-phases">
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

window.printChecklist = function() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow popups to print your checklist.");
    return;
  }
  
  const fromName = _currentFrom ? _currentFrom.name : 'Origin';
  const toName = _currentTo ? _currentTo.name : 'Destination';
  
  let html = `
    <html>
      <head>
        <title>Relocation Checklist: ${fromName} to ${toName}</title>
        <style>
          body { font-family: 'Inter', system-ui, -apple-system, sans-serif; padding: 3rem; color: #1e293b; background: #fff; line-height: 1.6; }
          .header { border-bottom: 3px solid #6366f1; padding-bottom: 1.5rem; margin-bottom: 2rem; }
          h1 { font-family: 'Outfit', system-ui, sans-serif; font-size: 2.2rem; margin: 0 0 0.5rem 0; color: #0f172a; }
          .subtitle { color: #64748b; font-size: 1rem; font-weight: 500; }
          .phase { margin-bottom: 2rem; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; page-break-inside: avoid; background: #f8fafc; }
          .phase-title { font-family: 'Outfit', sans-serif; font-size: 1.3rem; font-weight: 700; margin: 0 0 1.2rem 0; color: #0f172a; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
          .item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 0.85rem; font-size: 0.98rem; }
          .checkbox { width: 20px; height: 20px; border: 2px solid #94a3b8; border-radius: 4px; flex-shrink: 0; margin-top: 2px; display: inline-flex; align-items: center; justify-content: center; }
          .checked { text-decoration: line-through; color: #94a3b8; }
          .checked-box { background: #6366f1; border-color: #6366f1; }
          .checked-mark { color: white; font-size: 13px; font-weight: bold; }
          @media print {
            body { padding: 0; background: none; }
            .phase { border: 1px solid #cbd5e1; background: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Relocatr Move Planner</h1>
          <div class="subtitle">Personalized Checklist: ${fromName} ➔ ${toName} &nbsp;|&nbsp; Generated on ${new Date().toLocaleDateString()}</div>
        </div>
  `;

  CHECKLIST_PHASES.forEach((phase, pi) => {
    html += `
      <div class="phase">
        <div class="phase-title">${phase.icon} ${phase.title}</div>
    `;
    phase.items.forEach((item, ii) => {
      const el = document.getElementById(`chkl-${pi}-${ii}`);
      const isChecked = el ? el.checked : false;
      html += `
        <div class="item">
          <div class="checkbox ${isChecked ? 'checked-box' : ''}">
            ${isChecked ? '<span class="checked-mark">✓</span>' : ''}
          </div>
          <span class="${isChecked ? 'checked' : ''}">${item}</span>
        </div>
      `;
    });
    html += `</div>`;
  });

  html += `
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 350);
};

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
  { id:'flights',   icon:'✈️',  label:'Flights & Travel',               hint:'Return flight for research trip + one-way moving flight(s). Add extra for family.',      min:0,     max:8000,  default:0,    step:50  },
  { id:'shipping',  icon:'📦',  label:'Shipping & Removals',            hint:'Door-to-door shipping of belongings. Set to 0 if travelling light or selling everything.', min:0,     max:20000, default:0,    step:100 },
  { id:'visa',      icon:'🛂',  label:'Visa & Immigration Fees',        hint:'Government application fees, biometrics, and any agent/lawyer costs.',                    min:0,     max:8000,  default:0,    step:50  },
  { id:'docs',      icon:'📄',  label:'Document Prep',                  hint:'Certified translations, apostilles, notarisation, and official certifications.',           min:0,     max:3000,  default:0,    step:25  },
  { id:'deposit',   icon:'🏠',  label:'First Rent + Deposit',           hint:'Typically 1-3 months rent upfront. Research your destination city.',                      min:0,     max:20000, default:0,    step:200 },
  { id:'insurance', icon:'🏥',  label:'Health Insurance Setup',         hint:'International health cover before local plan kicks in. Usually 1-6 months.',              min:0,     max:5000,  default:0,    step:50  },
  { id:'setup',     icon:'📱',  label:'Setup & Essentials',             hint:'New SIM, local bank fees, household items, and day-one expenses.',                        min:0,     max:5000,  default:0,    step:50  },
  { id:'storage',   icon:'🏪',  label:'Storage (if needed)',            hint:'Short-term storage for belongings you can\'t take immediately.',                           min:0,     max:4000,  default:0,    step:50  },
  { id:'language',  icon:'📚',  label:'Language Courses',               hint:'Classes or apps to learn the local language before or after arrival.',                    min:0,     max:3000,  default:0,    step:50  },
  { id:'buffer',    icon:'🚨',  label:'Emergency Buffer (10-20%)',      hint:'Always have a cash buffer for unexpected costs — delays, fees, medical, or downtime.',     min:0,     max:15000, default:0,    step:100 },
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
  if (!container) return;
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
  const container = document.getElementById('budget-summary');
  if (!container) return;
  const total = Object.values(budgetValues).reduce((a,b) => a+b, 0);
  const rows = BUDGET_ITEMS.filter(i => budgetValues[i.id] > 0).map(i =>
    `<div class="budget-summary-row">
      <span class="s-label">${i.icon} ${i.label}</span>
      <span class="s-val">${fmtBudget(budgetValues[i.id])}</span>
    </div>`).join('');

  const curBtns = BUDGET_CURRENCIES.map(c =>
    `<button class="budget-cur-btn ${budgetCurrency===c.code?'active':''}"
      onclick="setBudgetCurrency('${c.code}')">${c.sym} ${c.code}</button>`).join('');

  container.innerHTML = `
    <div class="budget-summary-title">💰 Your Move Budget</div>
    <div class="budget-currency-row">${curBtns}</div>
    ${rows}
    <div class="budget-total-row">
      <span class="budget-total-label">Estimated Total</span>
      <span class="budget-total-val" id="budget-grand-total">${fmtBudget(total)}</span>
    </div>
    <div class="budget-tip">💡 This is a one-time moving cost estimate. For monthly living costs, use the Cost of Living comparison after searching your route above.</div>
    <button class="budget-reset-btn" onclick="resetBudget()">↺ Reset to 0</button>`;
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
    const pop = typeof COUNTRY_POPULATIONS !== 'undefined' ? COUNTRY_POPULATIONS[c.code] || 'N/A' : 'N/A';
    card.innerHTML = `
      <div class="dest-flag">${c.flag}</div>
      <div class="dest-name">${c.name}</div>
      <div class="dest-tagline">${dest.tagline}</div>
      <div style="font-size:0.75rem; color:var(--muted); margin-bottom: 0.25rem;">👥 Pop: ${pop}</div>
      <div class="dest-trend">📈 ${dest.trend}</div>`;
    card.addEventListener('click', () => {
      toCountry = { type: 'country', code: c.code, name: c.name, flag: c.flag };
      document.getElementById('to-input').value = c.name;
      document.getElementById('to-input').dataset.code = c.code;
      if (originCountry && !fromCountry) {
        fromCountry = { type: 'country', code: originCountry.code, name: originCountry.name, flag: originCountry.flag };
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

// Helper to generate dynamic community links with Instagram and info tooltips
function getCommunityLinks(from, to, cityKey) {
  const fromName = from.name;
  const destName = cityKey || to.name;
  const shortDest = destName.split(',')[0].trim();
  const fbQuery = encodeURIComponent(fromName + ' expats ' + shortDest);
  const redditQuery = encodeURIComponent('expats ' + destName);
  const igTag = `expatsin${destName.toLowerCase().replace(/[^a-z0-9]/g,'')}`;

  return [
    { 
      label: '🌐 InterNations', 
      url: `https://www.internations.org/${shortDest.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-')}-expats`,
      desc: 'Global networking platform that hosts regular physical meetups, events, and online groups for expats.' 
    },
    { 
      label: '💬 Expat.com Forum', 
      url: `https://www.expat.com/en/forum/`,
      desc: 'Local discussion forums, housing listings, and user Q&As about moving and living in the country.' 
    },
    { 
      label: '🔴 Reddit Expats', 
      url: `https://www.reddit.com/search/?q=${redditQuery}&type=sr`,
      desc: 'Searches Reddit subreddits and discussions for local expat communities and advice.' 
    },
    { 
      label: '📱 Facebook Groups', 
      url: `https://www.facebook.com/search/groups/?q=${fbQuery}`,
      desc: 'Finds expat and housing groups (requires a Facebook account and login to view results).' 
    },
    { 
      label: '📸 Instagram Tags', 
      url: `https://www.instagram.com/explore/tags/${igTag}/`,
      desc: `Explore photos, stories, and visual guides uploaded by other expats using the #${igTag} hashtag (requires Instagram login).` 
    }
  ];
}

function renderCommunityLinksHtml(from, to, cityKey) {
  const links = getCommunityLinks(from, to, cityKey);
  return `
    <div class="community-links-grid">
      ${links.map(l => `
        <div class="comm-link-card">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <a class="community-link-btn" href="${l.url}" target="_blank" rel="noopener noreferrer">
              ${l.label} <span style="font-size:0.75rem;margin-left:2px">↗</span>
            </a>
            <div class="info-tooltip-wrap">
              <span class="info-icon" title="More info">ℹ️</span>
              <div class="info-tooltip">${l.desc}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Community section: city filter + fixed links ──────────────────────────────
let _commFromCode = null, _commToCode = null, _commCityKey = null;

function renderCommunitySection(from, to) {
  _commFromCode = from.code;
  _commToCode = to.code;
  
  // Pre-initialize city selection if the user searched for a specific city
  if (to.type === 'city') {
    _commCityKey = to.name;
  } else {
    _commCityKey = null;
  }

  const destData = DIASPORA_DATA[to.code];
  const fromCode = from.code;

  // Build city options from DIASPORA_DATA cities + CITY_DATA
  const diasporaCities = destData && destData.cities ? Object.keys(destData.cities) : [];
  const fallbackCities = (CITY_DATA[to.code] || []).map(c => c.name);
  // Merge, prioritising diaspora cities
  const allCityOptions = [...new Set([...diasporaCities, ...fallbackCities])].sort();

  const countryObj = COUNTRIES.find(c => c.code === to.code);
  const countryName = countryObj ? countryObj.name : to.name;

  const citySelectHtml = allCityOptions.length ? `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:1.25rem;flex-wrap:wrap">
      <label style="font-size:0.8rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.05em">City:</label>
      <select class="compare-filter-select" id="comm-city-select" onchange="updateCommunityCity(this.value)" style="padding:6px 12px;font-size:0.85rem">
        <option value="">All of ${countryName}</option>
        ${allCityOptions.map(city => `<option value="${city}" ${city === _commCityKey ? 'selected' : ''}>${city}</option>`).join('')}
      </select>
    </div>` : '';

  // Look up community data — city or national
  let commData = null, levelLabel = to.name;
  let hasSpecificCityData = false;
  if (_commCityKey && destData && destData.cities && destData.cities[_commCityKey]) {
    commData = destData.cities[_commCityKey][fromCode];
    levelLabel = _commCityKey;
    hasSpecificCityData = true;
  } else if (!_commCityKey && destData && destData.national) {
    commData = destData.national[fromCode];
    levelLabel = to.name + ' (national)';
  }

  // Top communities in selected city or national
  let topData = {};
  let showCityUnavailableNotice = false;
  if (_commCityKey) {
    if (hasSpecificCityData) {
      topData = destData.cities[_commCityKey];
    } else {
      if (destData && destData.national) {
        topData = destData.national;
        showCityUnavailableNotice = true;
      }
    }
  } else if (destData && destData.national) {
    topData = destData.national;
  }

  const topSorted = Object.entries(topData)
    .filter(([code]) => code !== fromCode)
    .sort(([,a],[,b]) => (b.size||0)-(a.size||0))
    .slice(0, 6);

  const fromCountry = COUNTRIES.find(c => c.code === fromCode);
  const fromName = fromCountry ? fromCountry.name : from.name;
  const linksHtml = renderCommunityLinksHtml(from, to, _commCityKey);

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
        ${linksHtml}
      </div>`;
  } else {
    const displayUnavailableName = _commCityKey ? _commCityKey : levelLabel;
    yourCommunityHtml = `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.25rem;margin-bottom:1.25rem;font-size:0.88rem;color:var(--muted)">
        🌍 We don't have specific size data for ${fromName} nationals in ${displayUnavailableName} yet — but expat communities exist in most cities. Use the links below to find yours.
        ${linksHtml}
      </div>`;
  }

  const noticeHtml = showCityUnavailableNotice ? `
    <div style="padding:10px 14px; background:rgba(234,179,8,0.08); border:1px solid rgba(234,179,8,0.2); border-radius:var(--radius-sm); color:var(--yellow); font-size:0.82rem; margin-bottom:1rem; display:flex; align-items:center; gap:8px;">
      ⚠️ City-level community data for ${_commCityKey} is currently unavailable. Showing national rankings for ${to.name} instead.
    </div>` : '';

  const displayLocation = (_commCityKey && !showCityUnavailableNotice) ? _commCityKey : `${to.name} (National)`;

  const topCommHtml = topSorted.length ? `
    <div style="margin-top:0.5rem">
      <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.65rem;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">
        Largest communities in ${displayLocation}
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
      ${noticeHtml}
      ${topCommHtml}
    </div>
  </div>`;
}

function updateCommunityCity(cityKey) {
  _commCityKey = cityKey || null;
  const inner = document.getElementById('community-inner');
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
  
  const linksHtml = renderCommunityLinksHtml(fromObj, toObj, _commCityKey);
  
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
  const affiliates = window.renderAffiliateWidget ? window.renderAffiliateWidget() : '';
  return base + affiliates;
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

  // Toggle body classes for scroll control
  document.body.classList.toggle('page-plan-active', pageKey === 'plan');
  document.body.classList.toggle('page-explore-active', pageKey === 'explore');

  // Reset scroll position for a fresh start
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Invalidate Leaflet map size if switching to explore page with map tab active
  if (pageKey === 'explore') {
    const activeBtn = document.querySelector('#explore-tabs .tab.active');
    if (activeBtn && activeBtn.dataset.exploreTab === 'map' && window.map) {
      setTimeout(() => {
        window.map.invalidateSize();
      }, 100);
    }
  }
}

// Expose globally for inline onclick handlers in the HTML
window.switchPage = switchPage;

// ── Explore Page Tab Switcher ────────────────────────────────────────────────
function switchExploreTab(tabName) {
  document.querySelectorAll('#explore-tabs .tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.exploreTab === tabName);
  });
  
  const mapSec = document.getElementById('explore-map-section');
  const trendSec = document.getElementById('explore');
  const compSec = document.getElementById('compare');
  const quizSec = document.getElementById('quiz-section');
  
  if (mapSec) mapSec.classList.toggle('hidden', tabName !== 'map');
  if (trendSec) trendSec.classList.toggle('hidden', tabName !== 'trending');
  if (compSec) compSec.classList.toggle('hidden', tabName !== 'compare');
  if (quizSec) quizSec.classList.toggle('hidden', tabName !== 'quiz');
  
  if (tabName === 'map' && window.map) {
    setTimeout(() => {
      window.map.invalidateSize();
    }, 100);
  }
}

// Wire up the explore tabs
(function initExploreTabs() {
  const tabsContainer = document.getElementById('explore-tabs');
  if (!tabsContainer) return;
  tabsContainer.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchExploreTab(btn.dataset.exploreTab);
    });
  });
  
  // Set default explore tab to 'map' and hide other sections initially
  switchExploreTab('map');
})();
