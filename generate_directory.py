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

# Write into index.html
index_html_path = base_dir / "index.html"
index_content = index_html_path.read_text(encoding="utf-8")

# Insert Country Cards
country_pattern = r"(<!-- DIRECTORY_COUNTRY_CARDS_START -->)(.*?)(<!-- DIRECTORY_COUNTRY_CARDS_END -->)"
country_replacement = f"\\1\n" + "\n".join(country_cards_html) + "\n\\3"
index_content = re.sub(country_pattern, country_replacement, index_content, flags=re.DOTALL)

# Insert City Cards
city_pattern = r"(<!-- DIRECTORY_CITY_CARDS_START -->)(.*?)(<!-- DIRECTORY_CITY_CARDS_END -->)"
city_replacement = f"\\1\n" + "\n".join(city_cards_html) + "\n\\3"
index_content = re.sub(city_pattern, city_replacement, index_content, flags=re.DOTALL)

index_html_path.write_text(index_content, encoding="utf-8")
print(f"Success: Updated index.html at {index_html_path}")

# Remove old directory.html if it exists
if directory_html_path.exists():
    directory_html_path.unlink()
    print("Success: Removed old directory.html")

print(f"Total Country Comparisons: {len(country_pairs)}")
print(f"Total City Comparisons: {len(city_pairs)}")
