# DATATOP — Site multi-pages

Site statique premium pour DATATOP (Conseil, Formation, Projets, Carrières).
Aucun build — HTML / CSS / JS purs.

## Pages

| Page | Fichier | URL Netlify |
|------|---------|-------------|
| Accueil | `index.html` | `/` |
| Conseil | `conseil.html` | `/conseil` |
| Formation | `formation.html` | `/formation` |
| Projets | `projets.html` | `/projets` |
| Carrières | `carrieres.html` | `/carrieres` |
| À propos | `a-propos.html` | `/a-propos` |
| Contact | `contact.html` | `/contact` |

## Structure

```
.
├── index.html         # Accueil — hero rotateur, services, stats, CTA
├── conseil.html       # 6 services conseil + approche 4 étapes
├── formation.html     # 6 programmes + raisons de choisir DATATOP
├── projets.html       # Méthodologie 5 étapes + 4 success stories
├── carrieres.html     # 6 postes + processus + form candidature
├── a-propos.html      # Mission, timeline 2023-2026, valeurs, partenaires
├── contact.html       # Coordonnées + formulaire
├── styles.css         # Design system complet
├── script.js          # Reveal, compteurs, rotator, parallax, form
├── netlify.toml       # Headers sécurité + cache immutable
├── robots.txt
└── README.md
```

## Déploiement Netlify

### Méthode 1 — Drag & drop (le plus simple)
1. Aller sur https://app.netlify.com/drop
2. Glisser le dossier `SITE/` entier dans la zone
3. Le site est en ligne instantanément
4. Ajouter un domaine custom dans **Domain settings**

### Méthode 2 — Netlify CLI
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=.
```

### Méthode 3 — Git (GitHub / GitLab)
1. Pousser ce dossier sur un repo Git
2. Sur Netlify : **Add new site → Import from Git**
3. Build command : *(vide)*
4. Publish directory : `.`

## Personnalisation

- **Couleurs** : variables CSS au début de `styles.css` (`--accent-cyan`, `--accent-violet`, `--accent-pink`)
- **Logo** : SVG inline dans chaque page (header + footer)
- **Contact** : `contact@datatop.fr`, `+33 6 95 40 86 50`, LinkedIn et Twitter dans le footer de chaque page
- **Formulaires** : pour activer Netlify Forms, ajouter `data-netlify="true"` et `name="contact"` (ou `name="candidature"`) sur la balise `<form>`. Netlify gère ensuite le stockage et l'envoi par email automatiquement.

## Performances & accessibilité

- Aucun framework, aucun build — chargement instantané
- Polices Google préchargées
- CSS / JS mis en cache `immutable` via `netlify.toml`
- Animations désactivées si `prefers-reduced-motion`
- Responsive mobile-first (breakpoints 1024 / 960 / 560)
- Sémantique HTML correcte, ARIA, focus visibles
