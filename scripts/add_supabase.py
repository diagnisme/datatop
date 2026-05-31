import os
import glob
import re

html_files = glob.glob('public/*.html')

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Suppression complète de l'ancien script injecté dans le HTML (Désormais géré dans script.js)
        new_content = re.sub(r'<!-- Supabase Analytics -->.*?</script>\s*</head>', '</head>', content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Nettoyé : {filepath} (Le code HTML est redevenu propre)")
    except Exception as e:
        print(f"Erreur lors du traitement de {filepath}: {e}")