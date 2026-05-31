# DATATOP — Site Professionnel Multi-Pages

Site web professionnel pour DATATOP, société de conseil, formation et solutions en Data et IA.

**Déploiement en ligne :** https://datatop.fr  
**Repository :** GitHub SSH  
**Plateforme :** Netlify  
**Framework :** HTML/CSS/JavaScript vanilla (zéro dépendances)

---

## 📋 Vue d'ensemble

DATATOP est un site web moderne, performant et accessible conçu pour présenter les services de consulting Data & IA, programmes de formation certifiants et success stories de projets réussis.

### Services présentés
- **Conseil stratégique** : 6 services d'accompagnement Data et IA
- **Formation** : 6 programmes de formation certifiants
- **Projets** : Méthodologie 5 étapes + 4 success stories
- **Carrières** : Recrutement avec processus transparent
- **À propos** : Mission, timeline, valeurs et partenaires

---

## 🏗️ Architecture et Structure

```
datatop/
├── public/                          # Répertoire de publication Netlify
│   ├── index.html                  # Accueil (hero rotateur, services, CTA)
│   ├── conseil.html                # Services de conseil (6 offres + approche)
│   ├── formation.html              # Programmes (6 formations + avantages)
│   ├── projets.html                # Projets (méthodologie + 4 cases)
│   ├── carrieres.html              # Carrières (6 postes + formulaire)
│   ├── a-propos.html               # À propos (mission, timeline, valeurs)
│   ├── contact.html                # Contact (coordonnées + formulaire)
│   ├── confidentialite.html        # Politique de confidentialité
│   ├── mentions-legales.html       # Mentions légales
│   ├── 404.html                    # Page d'erreur personnalisée
│   ├── robots.txt                  # Configuration pour moteurs de recherche
│   ├── sitemap.xml                 # Plan du site XML
│   └── assets/
│       ├── css/
│       │   └── styles.css          # Styles globaux + design system
│       ├── js/
│       │   └── script.js           # Logique interactive (animations, formulaires)
│       └── img/
│           ├── favicon.png         # Icône du site (1024×1024px)
│           ├── logo.png            # Logo optimisé
│           └── logos/              # Logos des partenaires
├── scripts/                         # Utilitaires Python
│   ├── fix_encoding.py            # Correction de l'encodage UTF-8
│   ├── fix_utf8.py                # Nettoyage des caractères
│   └── update_seo.py              # Mise à jour des meta descriptions
├── templates/                       # Templates email
│   ├── email-contact.html         # Template contact
│   └── email-carrieres.html       # Template candidature
├── netlify.toml                     # Configuration Netlify (headers, cache)
└── README.md                        # Cette documentation
```

---

## 🚀 Guide de Démarrage Rapide

### 1. Installation locale

```bash
# Cloner le repository
git clone git@github.com:YOUR_USERNAME/datatop.git
cd datatop

# Vérifier la structure (optionnel)
ls -la public/
```

### 2. Développement local

```bash
# Lancer un serveur local sur port 8080
python3 -m http.server 8080 --directory public/

# Le site est accessible à http://localhost:8080
```

### 3. Déploiement

```bash
# Push sur GitHub (le déploiement Netlify est automatique)
git add .
git commit -m "Mise à jour du site"
git push origin main
```

---

## 📝 Pages et Contenu

| Page | URL | Fichier | Description |
|------|-----|---------|-------------|
| Accueil | `/` | `index.html` | Page principale avec hero, services, statistiques |
| Conseil | `/conseil` | `conseil.html` | 6 services + approche 4 étapes |
| Formation | `/formation` | `formation.html` | 6 programmes + 5 raisons de choisir |
| Projets | `/projets` | `projets.html` | Méthodologie 5 étapes + 4 success stories |
| Carrières | `/carrieres` | `carrieres.html` | 6 postes + formulaire de candidature |
| À propos | `/a-propos` | `a-propos.html` | Mission, timeline, valeurs, partenaires |
| Contact | `/contact` | `contact.html` | Coordonnées + formulaire de contact |
| Confidentialité | `/confidentialite` | `confidentialite.html` | Politique de confidentialité |
| Mentions légales | `/mentions-legales` | `mentions-legales.html` | Mentions légales |
| Erreur 404 | `/404` | `404.html` | Page d'erreur personnalisée |

---

## 🎨 Personnalisation

### Design System

Les couleurs et variables de design sont définies au début de `assets/css/styles.css` :

```css
:root {
  /* Brand colors */
  --violet:  #6D28D9;
  --indigo:  #4F46E5;
  --blue:    #2563EB;
  --cyan:    #00D9FF;    /* Accent principal */
  
  /* Surfaces */
  --bg:      #FFFFFF;
  --dark:    #02020C;
}
```

### Modifier les couleurs

1. Ouvrir `public/assets/css/styles.css`
2. Éditer les variables CSS au début du fichier
3. Mettre à jour les propriétés `color` ou `background-color` dans les classes

### Modifier le logo et favicon

- **Logo** : Remplacer `public/assets/img/logo.png` (SVG ou PNG)
- **Favicon** : Remplacer `public/assets/img/favicon.png` (minimum 512×512px, optimal 1024×1024px)

### Modifier les coordonnées de contact

Chercher et remplacer :
- Email : `contact@datatop.fr`
- Téléphone : `+33 6 95 40 86 50`
- LinkedIn : `https://linkedin.com/company/datatop`
- Twitter : `https://twitter.com/datatop`

---

## 🔐 Formulaires

### Activer les formulaires Netlify

1. Dans le HTML, ajouter `data-netlify="true"` sur la balise `<form>`
2. Ajouter un `name` unique : `name="contact"` ou `name="candidature"`

Exemple :
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Envoyer</button>
</form>
```

Netlify gérera automatiquement :
- ✅ Validation et stockage
- ✅ Notifications email
- ✅ Dashboard d'administration

---

## 🔍 SEO et Meta

### Configuration en place

- ✅ **Meta descriptions** : 160 caractères optimisés pour chaque page
- ✅ **Open Graph** : Images, titre et description pour partage social
- ✅ **Twitter Card** : Optimisation pour partage Twitter
- ✅ **Schema.org** : Données structurées (Organization, WebSite)
- ✅ **robots.txt** : Indexation configurée
- ✅ **sitemap.xml** : Plan du site pour moteurs de recherche
- ✅ **Canonical tags** : URLs canoniques évitant le contenu dupliqué

### Vérifier l'indexation

1. Google Search Console : https://search.google.com/search-console
2. Bing Webmaster Tools : https://www.bing.com/webmasters
3. Ajouter `datatop.fr` et soumettre `sitemap.xml`

### Améliorer le SEO

Voir **SEO.md** pour :
- Audit SEO complet
- Recommandations de contenu
- Stratégie de mots-clés
- Optimisation technique

---

## ⚡ Performance

### Optimisations mises en place

- ✅ **Zéro framework** : HTML/CSS/JS vanilla (chargement instantané)
- ✅ **Images optimisées** : Logo 53KB, favicon 78KB
- ✅ **Polices préchargées** : Google Fonts avec `preload`
- ✅ **Cache agressif** : CSS/JS en cache `immutable` (1 an)
- ✅ **Minification** : CSS et JS minifiés
- ✅ **Animations GPU** : Utilisation de `transform` et `opacity`
- ✅ **Lazy loading** : Images chargées à la demande

### Métriques actuelles

- **PageSpeed Insights** : Voir **PERFORMANCE.md**
- **Taille page** : ~250KB (avec images optimisées)
- **Temps de chargement** : < 2 secondes (4G)
- **Core Web Vitals** : Conformes

Voir **PERFORMANCE.md** pour l'audit détaillé et les recommandations.

---

## ♿ Accessibilité

- ✅ **WCAG 2.1 AA** : Contraste, focus visibles, sémantique HTML
- ✅ **ARIA labels** : Boutons et icônes accessibles
- ✅ **Animations réduites** : Respect de `prefers-reduced-motion`
- ✅ **Responsive** : Breakpoints mobiles 560px / 960px / 1024px
- ✅ **Clavier** : Navigation complète sans souris

---

## 📤 Déploiement

### Configuration Netlify (netlify.toml)

```toml
[build]
  publish = "public"              # Répertoire à publier

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Permissions-Policy = "geolocation=(), microphone=()"

[[headers]]
  for = "/assets/css/styles.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/assets/js/script.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Voir **DEPLOYMENT.md** pour les instructions complètes.

---

## 🔄 Maintenance

### Mises à jour régulières

- **Contenu** : Mettre à jour les pages HTML directement
- **Styles** : Modifier `assets/css/styles.css`
- **Logique** : Éditer `assets/js/script.js`
- **Images** : Placer dans `assets/img/` et optimiser avant

### Checklist avant déploiement

- [ ] Tester localement (`python3 -m http.server 8080`)
- [ ] Vérifier les liens internes
- [ ] Tester les formulaires
- [ ] Valider HTML/CSS (W3C Validator)
- [ ] Vérifier lighthouse (PageSpeed Insights)
- [ ] Commit et push vers GitHub

Voir **MAINTENANCE.md** pour les procédures détaillées.

---

## 🛠️ Stack Technique

| Technologie | Usage | Raison |
|-------------|-------|--------|
| **HTML5** | Structure | Sémantique, accessibilité |
| **CSS3** | Styling | Design system, animations GPU |
| **JavaScript (vanilla)** | Interactivité | Zéro dépendances, performances |
| **Netlify** | Hosting | CDN global, formulaires, SSL |
| **Google Fonts** | Typographie | Inter (300-800 weights) |
| **Google Analytics** | Analytics | Suivi des conversions |
| **Git + GitHub** | Version control | CI/CD via Netlify |

---

## 📞 Support et Ressources

### Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Structure détaillée du projet
- **[SETUP.md](SETUP.md)** — Installation et développement local
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Guide de déploiement complet
- **[SEO.md](SEO.md)** — SEO et stratégie de contenu
- **[PERFORMANCE.md](PERFORMANCE.md)** — Audit et optimisations de performance
- **[MAINTENANCE.md](MAINTENANCE.md)** — Procédures de maintenance

### Outils utiles

- **[PageSpeed Insights](https://pagespeed.web.dev/)** — Audit de performance
- **[W3C Validator](https://validator.w3.org/)** — Validation HTML/CSS
- **[Google Search Console](https://search.google.com/search-console)** — Indexation SEO
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** — Audit 4 piliers

### Contacts

- **Email** : contact@datatop.fr
- **Téléphone** : +33 6 95 40 86 50
- **LinkedIn** : https://linkedin.com/company/datatop

---

## 📄 Licence

© 2024 DATATOP. Tous droits réservés.

**Statut du site** : Production  
**Dernière mise à jour** : 2026-05-30  
**Version** : 3.0

