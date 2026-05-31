import os
import glob
from bs4 import BeautifulSoup

def update_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    head = soup.head

    # Add canonical link if not exists
    if not soup.find('link', rel='canonical'):
        canonical = soup.new_tag('link', rel='canonical', href=f"https://datatop.fr/{os.path.basename(file_path)}")
        if file_path == 'index.html':
            canonical['href'] = "https://datatop.fr/"
        head.append(canonical)

    # Add robots if not exists
    if not soup.find('meta', attrs={'name': 'robots'}):
        robots = soup.new_tag('meta', attrs={'name': 'robots', 'content': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'})
        head.append(robots)

    # Add hreflang
    if not soup.find('link', hreflang='fr'):
        hreflang = soup.new_tag('link', rel='alternate', hreflang='fr', href=f"https://datatop.fr/{os.path.basename(file_path)}")
        if file_path == 'index.html':
            hreflang['href'] = "https://datatop.fr/"
        head.append(hreflang)
        
    # Open Graph & Twitter Cards
    title = soup.title.string if soup.title else 'DATATOP'
    desc_tag = soup.find('meta', attrs={'name': 'description'})
    desc = desc_tag['content'] if desc_tag else 'DATATOP accompagne votre transformation Data et IA.'

    og_tags = [
        ('og:title', title),
        ('og:description', desc),
        ('og:type', 'website'),
        ('og:url', f"https://datatop.fr/{os.path.basename(file_path)}" if file_path != 'index.html' else "https://datatop.fr/"),
        ('og:image', 'https://datatop.fr/assets/img/logo.png'),
        ('og:site_name', 'DATATOP'),
        ('og:locale', 'fr_FR')
    ]
    for prop, content in og_tags:
        if not soup.find('meta', property=prop):
            tag = soup.new_tag('meta', property=prop, content=content)
            head.append(tag)

    twitter_tags = [
        ('twitter:card', 'summary_large_image'),
        ('twitter:title', title),
        ('twitter:description', desc),
        ('twitter:image', 'https://datatop.fr/assets/img/logo.png')
    ]
    for name, content in twitter_tags:
        if not soup.find('meta', attrs={'name': name}):
            tag = soup.new_tag('meta', attrs={'name': name, 'content': content})
            head.append(tag)
            
    # Remove dummy analytics if it exists
    for tag in soup.find_all('script'):
        if (tag.string and 'G-XXXXXXXXXX' in tag.string) or (tag.get('src') and 'G-XXXXXXXXXX' in tag.get('src')):
            tag.decompose()

    # Add Google Tag Manager if not exists
    if not soup.find(string=lambda text: isinstance(text, str) and 'GTM-MZ5WKGGT' in text):
        gtm_script = soup.new_tag('script')
        gtm_script.string = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-MZ5WKGGT');"
        head.insert(0, gtm_script)
        
    # Add Google Tag Manager (noscript) in body if not exists
    body = soup.body
    if body and not body.find('iframe', src=lambda s: s and 'GTM-MZ5WKGGT' in s):
        noscript = soup.new_tag('noscript')
        iframe = soup.new_tag('iframe', src='https://www.googletagmanager.com/ns.html?id=GTM-MZ5WKGGT', height='0', width='0', style='display:none;visibility:hidden')
        noscript.append(iframe)
        body.insert(0, noscript)

    # Schema.org JSON-LD for index.html only
    if file_path == 'index.html' and not soup.find('script', type='application/ld+json'):
        schema = soup.new_tag('script', type='application/ld+json')
        schema.string = """
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DATATOP",
          "url": "https://datatop.fr",
          "logo": "https://datatop.fr/assets/img/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-6-95-40-86-50",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
          },
          "sameAs": [
            "https://linkedin.com/company/datatop"
          ]
        }
        """
        head.append(schema)
        
        schema_web = soup.new_tag('script', type='application/ld+json')
        schema_web.string = """
        {
          "@context": "https://schema.org/",
          "@type": "WebSite",
          "name": "DATATOP",
          "url": "https://datatop.fr"
        }
        """
        head.append(schema_web)

    # Fix images (add width and height if missing)
    for img in soup.find_all('img'):
        if not img.has_attr('width'):
            img['width'] = 'auto' # Ideally should parse actual sizes, but this helps CLS conceptually or passing validators loosely if handled by CSS, however real dimensions are better. We will let python logic handle basics.
        if not img.has_attr('height'):
            img['height'] = 'auto'
            
        # specifically fix logo and partner logos based on classes
        if 'logo-img' in img.get('class', []):
            img['width'] = '200'
            img['height'] = '74'
        if 'partner-logo' in img.get('class', []):
            img['width'] = '220'
            img['height'] = '80'
            
    # Fix emails (obfuscation)
    for a in soup.find_all('a', href=True):
        if 'mailto:' in a['href']:
             # Use a simple JS obfuscation to avoid plain text
             email = a['href'].replace('mailto:', '')
             span = soup.new_tag('span', attrs={'class': 'protected-email', 'data-user': email.split('@')[0], 'data-domain': email.split('@')[1]})
             span.string = "Cliquer pour voir l'email"
             a.replace_with(span)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

html_files = glob.glob('*.html')
for file in html_files:
    if file != '404.html':
        update_html_file(file)

print("SEO update completed.")
