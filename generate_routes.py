import re
import os
import urllib.parse
from pathlib import Path

# Paths
base_dir = Path(__file__).parent
data_js_path = base_dir / "data.js"
routes_dir = base_dir / "routes"

# Read data.js
content = data_js_path.read_text(encoding="utf-8")

# 1. Parse Countries and code map
country_matches = re.findall(r'\{\s*code\s*:\s*"([A-Z]{2})"\s*,\s*name\s*:\s*"([^"]+)"\s*,\s*flag\s*:\s*"([^"]+)"', content)
countries_map = {code: {"name": name, "flag": flag} for code, name, flag in country_matches}

# 2. Parse Supported Countries (keys of COUNTRY_DATA)
country_data_match = re.search(r'const COUNTRY_DATA = \{(.*?)\};', content, re.DOTALL)
if not country_data_match:
    raise ValueError("Could not find const COUNTRY_DATA in data.js")
country_data_block = country_data_match.group(1)
supported_countries = sorted(list(set(re.findall(r'^\s*([A-Z]{2})\s*:', country_data_block, re.MULTILINE))))

# 3. Parse Cities in CITY_DATA
city_data_match = re.search(r'const CITY_DATA = \{(.*?)\};', content, re.DOTALL)
if not city_data_match:
    city_data_match = re.search(r'const CITY_DATA = \{(.*)', content, re.DOTALL)
city_data_block = city_data_match.group(1)

city_entries = re.findall(r'([A-Z]{2})\s*:\s*\[(.*?)(?=\],|\s*\]\s*\})', city_data_block, re.DOTALL)
cities_list = []
for code, block in city_entries:
    names = re.findall(r'name\s*:\s*"([^"]+)"', block)
    for name in names:
        cities_list.append({"name": name, "countryCode": code})

# Select Top Origins and Destinations for the directory
popular_country_origins = ["US", "GB", "CA", "AU", "IN"]
popular_city_origins = ["New York, NY", "London", "San Francisco, CA", "Los Angeles, CA", "Toronto", "Sydney"]

# Helper to generate URL-friendly slug
def make_slug(name):
    s = name.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)  # remove non-alphanumeric except space/hyphen
    s = re.sub(r'[\s]+', '-', s)        # replace spaces/commas with hyphens
    s = re.sub(r'-+', '-', s)          # merge duplicate hyphens
    return s.strip('-')

# Compile Country Pairs
country_pairs = []
for origin_code in popular_country_origins:
    if origin_code not in supported_countries:
        continue
    origin = countries_map.get(origin_code)
    if not origin:
        continue
    for dest_code in supported_countries:
        if origin_code != dest_code:
            dest = countries_map.get(dest_code)
            if dest:
                country_pairs.append({
                    "from_code": origin_code,
                    "from_name": origin["name"],
                    "from_flag": origin["flag"],
                    "to_code": dest_code,
                    "to_name": dest["name"],
                    "to_flag": dest["flag"],
                    "slug": f"{origin_code.lower()}-to-{dest_code.lower()}",
                    "from_term": origin_code,
                    "to_term": dest_code
                })

# Compile City Pairs
city_pairs = []
for origin_city in popular_city_origins:
    origin_info = next((c for c in cities_list if c["name"] == origin_city), None)
    if not origin_info:
        continue
    origin_country = countries_map.get(origin_info["countryCode"])
    if not origin_country:
        continue
    
    for dest_city in cities_list:
        if origin_city != dest_city["name"]:
            dest_country = countries_map.get(dest_city["countryCode"])
            if dest_country:
                from_slug = make_slug(origin_city)
                to_slug = make_slug(dest_city["name"])
                city_pairs.append({
                    "from_city": origin_city,
                    "from_flag": origin_country["flag"],
                    "to_city": dest_city["name"],
                    "to_flag": dest_country["flag"],
                    "slug": f"{from_slug}-to-{to_slug}",
                    "from_term": origin_city,
                    "to_term": dest_city["name"]
                })

# Create routes base folder
routes_dir.mkdir(exist_ok=True)

# HTML template for clean URL pages
html_template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{description}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://myrelocatr.com/routes/{route_slug}/" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="https://myrelocatr.com/globe_hero.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://myrelocatr.com/routes/{route_slug}/" />
  <meta property="twitter:title" content="{title}" />
  <meta property="twitter:description" content="{description}" />
  <meta property="twitter:image" content="https://myrelocatr.com/globe_hero.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="../../style.css?v=35" />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NDCK5NJ9HB"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-NDCK5NJ9HB');
  </script>
</head>
<body class="page-plan-active results-active">

  <!-- NAV -->
  <nav id="navbar">
    <div class="nav-inner">
      <a href="../../index.html" class="logo" style="cursor:pointer; text-decoration: none; color: inherit;">
        <span class="logo-icon">🌍</span>
        <span class="logo-text">Relocatr</span>
      </a>
      <div class="page-nav">
        <a href="../../index.html" class="page-nav-btn active" style="text-decoration:none">🗺️ Back to Planner</a>
      </div>
    </div>
  </nav>

  <!-- PAGE: PLAN MY MOVE -->
  <div id="page-plan" class="page active">
    <!-- RESULTS PANEL -->
    <section id="results-panel">
      <div class="results-header">
        <div class="results-route" id="results-route">Loading route comparison...</div>
        <button class="back-btn" onclick="window.location.href='../../index.html'">← New Search</button>
      </div>
      <div class="tabs">
        <button class="tab active" data-tab="overview" id="tab-overview">📋 Overview</button>
        <button class="tab" data-tab="visa" id="tab-visa">🛂 Visa &amp; Immigration</button>
        <button class="tab" data-tab="costs" id="tab-costs">💰 Cost of Living</button>
        <button class="tab" data-tab="checklist" id="tab-checklist">✅ Checklist</button>
        <button class="tab" data-tab="culture" id="tab-culture">⛩️ Cultural Norms</button>
        <button class="tab" data-tab="community" id="tab-community">👥 Expat Community</button>
        <button class="tab" data-tab="budget" id="tab-budget">💵 Move Budget</button>
        <button class="tab" data-tab="tips" id="tab-tips">💡 Insider Tips</button>
      </div>
      <div class="tab-content" id="tab-content"></div>
    </section>
  </div>

  <!-- FOOTER -->
  <footer id="footer">
    <div class="footer-inner">
      <div class="footer-logo">
        <span class="logo-icon">🌍</span>
        <span class="logo-text">Relocatr</span>
      </div>
      <p class="footer-sub">Helping people find the perfect city to call home.</p>
      <div class="footer-links" style="margin: 1rem 0; display: flex; gap: 1.5rem; justify-content: center; font-size: 0.9rem;">
        <a href="../../directory.html" style="color: var(--muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--muted)'">Route Directory</a>
        <a href="../../index.html" style="color: var(--muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--muted)'">Relocation Planner</a>
      </div>
      <p class="footer-note">Information is for guidance only. Always verify visa requirements with official government sources.</p>
    </div>
  </footer>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="../../data.js?v=35"></script>
  <script>
    // Preload variables for app.js to immediately show results for this route
    window.PRELOAD_FROM = "{from_term}";
    window.PRELOAD_TO = "{to_term}";
  </script>
  <script src="../../app.js?v=35"></script>
  <script src="../../map.js?v=35"></script>
</body>
</html>"""

# Generate country routes
print("Generating Country Route Files...")
for pair in country_pairs:
    route_dir = routes_dir / pair["slug"]
    route_dir.mkdir(exist_ok=True)
    
    title = f"Moving from {pair['from_name']} to {pair['to_name']} | Cost, Visas & Checklist — Relocatr"
    description = f"Planning a move from {pair['from_name']} to {pair['to_name']}? Compare cost of living, check visa requirements, calculate moving budgets, and read expat guides."
    
    html = html_template.format(
        title=title,
        description=description,
        route_slug=pair["slug"],
        from_term=pair["from_term"],
        to_term=pair["to_term"]
    )
    
    (route_dir / "index.html").write_text(html, encoding="utf-8")

# Generate city routes
print("Generating City Route Files...")
for pair in city_pairs:
    route_dir = routes_dir / pair["slug"]
    route_dir.mkdir(exist_ok=True)
    
    title = f"Moving from {pair['from_city']} to {pair['to_city']} | Cost of Living & Expat Guide — Relocatr"
    description = f"Thinking about relocating from {pair['from_city']} to {pair['to_city']}? Compare city cost comparisons, housing rent, transport, and expat community data."
    
    html = html_template.format(
        title=title,
        description=description,
        route_slug=pair["slug"],
        from_term=pair["from_term"],
        to_term=pair["to_term"]
    )
    
    (route_dir / "index.html").write_text(html, encoding="utf-8")

print(f"Success! Generated {len(country_pairs)} country routes and {len(city_pairs)} city routes under '{routes_dir}' folder.")
