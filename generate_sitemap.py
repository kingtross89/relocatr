import re
import urllib.parse
from pathlib import Path

# Paths
base_dir = Path(__file__).parent
data_js_path = base_dir / "data.js"
sitemap_xml_path = base_dir / "sitemap.xml"

# Read data.js
content = data_js_path.read_text(encoding="utf-8")

# 1. Parse Supported Countries (keys of COUNTRY_DATA)
# Match keys in COUNTRY_DATA. E.g., "  AU: {"
country_data_match = re.search(r'const COUNTRY_DATA = \{(.*?)\};', content, re.DOTALL)
if not country_data_match:
    raise ValueError("Could not find const COUNTRY_DATA in data.js")
country_data_block = country_data_match.group(1)
supported_countries = sorted(list(set(re.findall(r'^\s*([A-Z]{2})\s*:', country_data_block, re.MULTILINE))))

# 2. Parse Cities in CITY_DATA
# Match names of cities inside CITY_DATA, e.g., name:"New York, NY", cost:{...}
city_data_match = re.search(r'const CITY_DATA = \{(.*?)\};', content, re.DOTALL)
if not city_data_match:
    # If it fails, try to just search till the end or another const
    city_data_match = re.search(r'const CITY_DATA = \{(.*)', content, re.DOTALL)
city_data_block = city_data_match.group(1)
all_cities = sorted(list(set(re.findall(r'name\s*:\s*"([^"]+)"\s*,\s*cost\s*:\s*\{', city_data_block))))

# Start generating XML
urls = []

# Add Home Page
urls.append((
    "https://myrelocatr.com/",
    "daily",
    "1.0"
))

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

# Generate Country to Country
for c1 in supported_countries:
    for c2 in supported_countries:
        if c1 != c2:
            if c1 in popular_country_origins:
                slug = f"{c1.lower()}-to-{c2.lower()}"
                url = f"https://myrelocatr.com/routes/{slug}/"
            else:
                url = f"https://myrelocatr.com/?from={c1}&amp;to={c2}"
            urls.append((url, "weekly", "0.8"))

# Generate City to City
for city1 in all_cities:
    for city2 in all_cities:
        if city1 != city2:
            if city1 in popular_city_origins:
                from_slug = make_slug(city1)
                to_slug = make_slug(city2)
                slug = f"{from_slug}-to-{to_slug}"
                url = f"https://myrelocatr.com/routes/{slug}/"
            else:
                from_param = urllib.parse.quote(city1)
                to_param = urllib.parse.quote(city2)
                url = f"https://myrelocatr.com/?from={from_param}&amp;to={to_param}"
            urls.append((url, "weekly", "0.7"))

# Write sitemap.xml
xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]

for url, freq, priority in urls:
    xml_lines.append("  <url>")
    xml_lines.append(f"    <loc>{url}</loc>")
    xml_lines.append(f"    <changefreq>{freq}</changefreq>")
    xml_lines.append(f"    <priority>{priority}</priority>")
    xml_lines.append("  </url>")

xml_lines.append("</urlset>")

sitemap_xml_path.write_text("\n".join(xml_lines), encoding="utf-8")
print(f"Success: Generated sitemap with {len(urls)} URLs at: {sitemap_xml_path}")
print(f"Supported Countries Count: {len(supported_countries)}")
print(f"Cities Count: {len(all_cities)}")
