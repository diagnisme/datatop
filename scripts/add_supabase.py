import os
import glob

html_files = glob.glob('public/*.html')

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if '<!-- Supabase Analytics -->' in content:
            parts = content.split('<!-- Supabase Analytics -->')
            after_head = parts[1].split('</head>', 1)
            
            if len(after_head) > 1:
                new_content = parts[0] + '</head>' + after_head[1]
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Nettoyé avec succès : {filepath}")
    except Exception as e:
        print(f"Erreur lors du traitement de {filepath}: {e}")