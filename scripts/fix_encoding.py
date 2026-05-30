import glob

replacements = {
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã ': 'à',
    'Ã¢': 'â',
    'Ãª': 'ê',
    'Ã®': 'î',
    'Ã´': 'ô',
    'Ã»': 'û',
    'Ã§': 'ç',
    'Ã¯': 'ï',
    'Ã«': 'ë',
    'Â·': '·',
    'Ã': 'à', # fallback but dangerous
}

for file in glob.glob('*.html'):
    if file == '404.html': continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace('Ã©', 'é')
    content = content.replace('Ã¨', 'è')
    content = content.replace('Ã¢', 'â')
    content = content.replace('Ãª', 'ê')
    content = content.replace('Ã®', 'î')
    content = content.replace('Ã´', 'ô')
    content = content.replace('Ã»', 'û')
    content = content.replace('Ã§', 'ç')
    content = content.replace('Â·', '·')
    content = content.replace('Ã¯', 'ï')
    content = content.replace('Ã«', 'ë')
    content = content.replace('Ã\x80', 'À')
    content = content.replace('Ã¡', 'á')
    # Let's fix the common ones we see: Ã© and Â·
    content = content.replace('ï»¿', '') # Remove duplicate BOM
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
