import glob
import os

for file in glob.glob('*.html'):
    with open(file, 'rb') as f:
        content = f.read()
    
    # decode as utf-8, replace literal broken strings, re-encode
    text = content.decode('utf-8', errors='ignore')
    text = text.replace('Ã©', 'é')
    text = text.replace('Ã¨', 'è')
    text = text.replace('Ã¢', 'â')
    text = text.replace('Ãª', 'ê')
    text = text.replace('Ã®', 'î')
    text = text.replace('Ã´', 'ô')
    text = text.replace('Ã»', 'û')
    text = text.replace('Ã§', 'ç')
    text = text.replace('Â·', '·')
    text = text.replace('Ã¯', 'ï')
    text = text.replace('Ã«', 'ë')
    text = text.replace('Ã ', 'à')
    text = text.replace('ï»¿', '')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Done fixing encoding")
