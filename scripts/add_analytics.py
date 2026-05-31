import os
import glob

html_files = glob.glob('public/*.html')

ga_snippet = """
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z4KLVJCFVK"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-Z4KLVJCFVK');
    </script>
"""

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'Google tag (gtag.js)' in content:
            print(f"Skipped {filepath} (Already contains Google Tag)")
            continue
            
        if '</head>' in content:
            content = content.replace('</head>', ga_snippet + '</head>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"Skipped {filepath} (No </head> found)")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

