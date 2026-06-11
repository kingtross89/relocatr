import re

def analyze_file(filepath):
    print(f"Analyzing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Find unguarded DOM calls: e.g. document.getElementById('foo').something
    # where there is no check if it is null.
    # Pattern: document.getElementById('...') followed by .anything without an 'if' or similar
    dom_chained_pattern = re.compile(r'(document\.getElementById\([^\)]+\)|document\.querySelector\([^\)]+\))\s*\.\s*[a-zA-Z_]')
    
    for i, line in enumerate(lines):
        line_num = i + 1
        stripped = line.strip()
        
        # Skip comments
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
            continue
            
        # Check for chained properties on getElementById or querySelector
        match = dom_chained_pattern.search(line)
        if match:
            # Check if this line or the previous line has an 'if' or null check, or if it is inside a guard
            # Often, if we do: const el = document.getElementById('x'); if (el) el.style... that is safe.
            # But if we do: document.getElementById('x').style... that is unsafe if the element doesn't exist on all pages.
            print(f"Line {line_num} Unsafe chained DOM call: {stripped}")

if __name__ == '__main__':
    analyze_file('/Users/albertclarke/Desktop/AI Projects/Antigravity/Relocatr/app.js')
