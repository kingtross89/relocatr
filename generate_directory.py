import re
import urllib.parse
from pathlib import Path

# Paths
base_dir = Path(__file__).parent
data_js_path = base_dir / "data.js"
directory_html_path = base_dir / "directory.html"

# Read data.js
content = data_js_path.read_text(encoding="utf-8")

# 1. Parse Countries and code map
# e.g., { code:"AF", name:"Afghanistan", flag:"🇦🇫", region:"Asia" }
country_matches = re.findall(r'\{\s*code\s*:\s*"([A-Z]{2})"\s*,\s*name\s*:\s*"([^"]+)"\s*,\s*flag\s*:\s*"([^"]+)"', content)
countries_map = {code: {"name": name, "flag": flag} for code, name, flag in country_matches}

# 2. Parse Supported Countries (keys of COUNTRY_DATA)
# Match keys in COUNTRY_DATA. E.g., "  AU: {"
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

# Extract cities for each country code
city_entries = re.findall(r'([A-Z]{2})\s*:\s*\[(.*?)(?=\],|\s*\]\s*\})', city_data_block, re.DOTALL)
cities_list = []
for code, block in city_entries:
    names = re.findall(r'name\s*:\s*"([^"]+)"', block)
    for name in names:
        cities_list.append({"name": name, "countryCode": code})

# Select Top Origins and Destinations for the directory to keep it clean and highly focused
popular_country_origins = ["US", "GB", "CA", "AU", "IN"]
popular_city_origins = ["New York, NY", "London", "San Francisco, CA", "Los Angeles, CA", "Toronto", "Sydney"]

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
                    "to_flag": dest["flag"]
                })

# Compile City Pairs
city_pairs = []
for origin_city in popular_city_origins:
    # Find origin city info
    origin_info = next((c for c in cities_list if c["name"] == origin_city), None)
    if not origin_info:
        continue
    origin_country = countries_map.get(origin_info["countryCode"])
    if not origin_country:
        continue
    
    # We pair with major city destinations
    for dest_city in cities_list:
        if origin_city != dest_city["name"]:
            dest_country = countries_map.get(dest_city["countryCode"])
            if dest_country:
                city_pairs.append({
                    "from_city": origin_city,
                    "from_flag": origin_country["flag"],
                    "to_city": dest_city["name"],
                    "to_flag": dest_country["flag"]
                })

# Helper to generate URL-friendly slug
def make_slug(name):
    s = name.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)  # remove non-alphanumeric except space/hyphen
    s = re.sub(r'[\s]+', '-', s)        # replace spaces/commas with hyphens
    s = re.sub(r'-+', '-', s)          # merge duplicate hyphens
    return s.strip('-')

# Render Country Cards
country_cards_html = []
for pair in country_pairs:
    slug = f"{pair['from_code'].lower()}-to-{pair['to_code'].lower()}"
    url = f"routes/{slug}/"
    search_str = f"{pair['from_name']} {pair['to_name']} {pair['from_code']} {pair['to_code']}".replace('"', '&quot;')
    country_cards_html.append(f"""
      <a href="{url}" class="route-card" data-type="country" data-search="{search_str}">
        <div class="route-title">
          <span>{pair['from_flag']} {pair['from_name']}</span>
          <span style="color:var(--accent);margin:0 0.25rem">→</span>
          <span>{pair['to_flag']} {pair['to_name']}</span>
        </div>
        <div class="route-meta">Compare cost of living, calculate move budgets, and see visa requirements for moving from {pair['from_name']} to {pair['to_name']}.</div>
      </a>""")

# Render City Cards
city_cards_html = []
for pair in city_pairs:
    from_slug = make_slug(pair['from_city'])
    to_slug = make_slug(pair['to_city'])
    slug = f"{from_slug}-to-{to_slug}"
    url = f"routes/{slug}/"
    search_str = f"{pair['from_city']} {pair['to_city']}".replace('"', '&quot;')
    city_cards_html.append(f"""
      <a href="{url}" class="route-card" data-type="city" data-search="{search_str}">
        <div class="route-title">
          <span>{pair['from_flag']} {pair['from_city']}</span>
          <span style="color:var(--accent);margin:0 0.25rem">→</span>
          <span>{pair['to_flag']} {pair['to_city']}</span>
        </div>
        <div class="route-meta">Compare city costs, rent, transit, and local expat community data for moving from {pair['from_city']} to {pair['to_city']}.</div>
      </a>""")

# Write HTML Template
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Relocation Routes Directory | Relocatr</title>
  <meta name="description" content="Browse our relocation directories and guides. Compare cost of living, visas, and checklists for moving from one country or city to another." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css?v=6" />
  <style>
    .directory-container {{
      max-width: 1200px;
      margin: 100px auto 40px auto;
      padding: 0 1.5rem;
    }}
    .directory-header {{
      text-align: center;
      margin-bottom: 3.5rem;
    }}
    .directory-title {{
      font-size: 2.75rem;
      font-weight: 800;
      font-family: 'Outfit', sans-serif;
      margin-bottom: 1rem;
    }}
    .directory-subtitle {{
      color: var(--muted);
      max-width: 650px;
      margin: 0 auto;
      font-size: 1.05rem;
      line-height: 1.6;
    }}
    .directory-section {{
      margin-bottom: 4.5rem;
    }}
    .directory-section-title {{
      font-size: 1.85rem;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      margin-bottom: 1.75rem;
      border-left: 4px solid var(--accent);
      padding-left: 0.75rem;
      color: var(--text);
    }}
    .route-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }}
    .route-card {{
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
      text-decoration: none;
      color: inherit;
    }}
    .route-card:hover {{
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }}
    .route-title {{
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
      color: var(--text);
    }}
    .route-meta {{
      font-size: 0.88rem;
      color: var(--muted);
      line-height: 1.5;
    }}
    #directory-search:focus {{
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }}
    .filter-btn:hover {{
      border-color: var(--accent);
      color: var(--text);
    }}
    .filter-btn.active {{
      background: var(--accent) !important;
      border-color: var(--accent) !important;
      color: #fff !important;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }}
    .no-results {{
      text-align: center;
      padding: 4rem 2rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      display: none;
      margin-top: 2rem;
    }}
  </style>
</head>
<body>
  <!-- NAV -->
  <nav id="navbar" style="background: rgba(8,11,20,0.95)">
    <div class="nav-inner">
      <a href="index.html" class="logo" style="cursor:pointer; text-decoration: none; color: inherit;">
        <span class="logo-icon">🌍</span>
        <span class="logo-text">Relocatr</span>
      </a>
      <div class="page-nav">
        <a href="index.html" class="page-nav-btn active" style="text-decoration:none; display:inline-flex; align-items:center; justify-content:center;">🗺️ Back to Planner</a>
      </div>
    </div>
  </nav>

  <div class="directory-container">
    <div class="directory-header">
      <h1 class="directory-title">Relocation <span class="gradient-text">Routes Directory</span></h1>
      <p class="directory-subtitle">Browse and compare cost of living, visa requirements, relocation checklists, and expat community guides for the world's most popular moving routes.</p>
    </div>

    <!-- SEARCH & FILTERS -->
    <div class="filter-controls" style="max-width: 600px; margin: 0 auto 3rem auto; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <!-- Search Input Wrapper -->
      <div style="position: relative; width: 100%;">
        <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: var(--muted); pointer-events: none;">🔍</span>
        <input type="text" id="directory-search" placeholder="Search origin or destination (e.g. Spain, Toronto, Vancouver...)" 
               style="width: 100%; padding: 14px 16px 14px 44px; background: var(--card); border: 1px solid var(--border); border-radius: 999px; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s;" />
      </div>
      <!-- Category Filter Buttons -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
        <button class="filter-btn active" data-filter="all" style="padding: 8px 18px; border-radius: 999px; border: 1px solid var(--border); background: var(--card); color: var(--muted); font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;">All Routes</button>
        <button class="filter-btn" data-filter="country" style="padding: 8px 18px; border-radius: 999px; border: 1px solid var(--border); background: var(--card); color: var(--muted); font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;">Country Comparisons</button>
        <button class="filter-btn" data-filter="city" style="padding: 8px 18px; border-radius: 999px; border: 1px solid var(--border); background: var(--card); color: var(--muted); font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;">City Comparisons</button>
      </div>
    </div>

    <!-- COUNTRY TO COUNTRY -->
    <div class="directory-section">
      <h2 class="directory-section-title">Popular Country Comparisons</h2>
      <div class="route-grid">
        {"".join(country_cards_html)}
      </div>
    </div>

    <!-- CITY TO CITY -->
    <div class="directory-section">
      <h2 class="directory-section-title">Popular City Comparisons</h2>
      <div class="route-grid" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));">
        {"".join(city_cards_html)}
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer id="footer">
    <div class="footer-inner">
      <div class="footer-logo">
        <span class="logo-icon">🌍</span>
        <span class="logo-text">Relocatr</span>
      </div>
      <p class="footer-sub">Helping people find the perfect city to call home.</p>
      <p class="footer-note">Information is for guidance only. Always verify visa requirements with official government sources.</p>
    </div>
  </footer>

  <script>
    const searchInput = document.getElementById('directory-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const routeCards = document.querySelectorAll('.route-card');
    const sections = document.querySelectorAll('.directory-section');
    const noResultsDiv = document.createElement('div');
    
    noResultsDiv.className = 'no-results';
    noResultsDiv.innerHTML = `
      <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
      <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text);">No routes found</h3>
      <p style="color: var(--muted); font-size: 0.9rem; margin: 0;">Try searching for a different city or country.</p>
    `;
    document.querySelector('.directory-container').appendChild(noResultsDiv);

    let activeFilter = 'all';

    function updateFilters() {{
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      sections.forEach(section => {{
        const sectionCards = section.querySelectorAll('.route-card');
        let sectionVisibleCards = 0;

        sectionCards.forEach(card => {{
          const searchData = card.getAttribute('data-search').toLowerCase();
          const type = card.getAttribute('data-type');
          
          const matchesSearch = searchData.includes(query);
          const matchesFilter = activeFilter === 'all' || type === activeFilter;

          if (matchesSearch && matchesFilter) {{
            card.style.display = 'flex';
            sectionVisibleCards++;
            visibleCount++;
          }} else {{
            card.style.display = 'none';
          }}
        }});

        if (sectionVisibleCards > 0) {{
          section.style.display = 'block';
        }} else {{
          section.style.display = 'none';
        }}
      }});

      if (visibleCount === 0) {{
        noResultsDiv.style.display = 'block';
      }} else {{
        noResultsDiv.style.display = 'none';
      }}
    }}

    searchInput.addEventListener('input', updateFilters);

    filterButtons.forEach(btn => {{
      btn.addEventListener('click', () => {{
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        updateFilters();
      }});
    }});
  </script>
</body>
</html>"""

directory_html_path.write_text(html_content, encoding="utf-8")
print(f"Success: Generated directory.html at {directory_html_path}")
print(f"Total Country Comparisons: {len(country_pairs)}")
print(f"Total City Comparisons: {len(city_pairs)}")
