import glob
import re

html_files = glob.glob('public/*.html')

favicon_tags = """
  <!-- Favicon Max Visibility -->
  <link rel="icon" type="image/png" sizes="1024x1024" href="assets/img/favicon.png">
  <link rel="apple-touch-icon" sizes="1024x1024" href="assets/img/favicon.png">
"""

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '<!-- Favicon Max Visibility -->' in content:
            print(f"Ignoré {filepath} (Déjà optimisé)")
            continue
            
        # Remplace n'importe quelle ancienne balise icon par les nouvelles en haute définition
        content = re.sub(r'<link[^>]*rel=["\'](?:shortcut )?icon["\'][^>]*>', favicon_tags.strip(), content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Favicon maximisé dans {filepath}")
    except Exception as e:
        print(f"Erreur sur {filepath} : {e}")