# Architecture et structure du projet

## Comment c'est organisé

Le site est très simple : c'est du HTML/CSS/JS vanilla.

```
datatop/
├── README.md
├── netlify.toml         (config Netlify)
├── public/              (le site web)
├── scripts/             (utilitaires Python)
├── templates/           (templates email)
└── docs/                (documentation)
```

## Le dossier public/

C'est le seul dossier qui compte. C'est ce qui est publié en ligne.

```
public/
├── index.html           (accueil)
├── conseil.html
├── formation.html
├── projets.html
├── carrieres.html
├── a-propos.html
├── contact.html
├── confidentialite.html
├── mentions-legales.html
├── 404.html
├── robots.txt           (pour Google)
├── sitemap.xml
└── assets/
    ├── css/styles.css
    ├── js/script.js
    └── img/
        ├── favicon.png
        ├── logo.png
        └── logos/
```

## Les pages

Chaque page HTML a la même structure :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Titre du site · DATATOP</title>
  <meta name="description" content="..."/>
  <link rel="stylesheet" href="assets/css/styles.css"/>
  <link rel="icon" href="assets/img/favicon.png"/>
</head>
<body>
  <nav>...</nav>
  <main>
    <section>...</section>
  </main>
  <footer>...</footer>
  <script src="assets/js/script.js"></script>
</body>
</html>
```

## Design system

Les couleurs sont au début de `styles.css` :

```css
:root {
  --cyan: #00D9FF;         /* couleur principale */
  --violet: #6D28D9;
  --blue: #2563EB;
  --white: #FFFFFF;
  --dark: #02020C;         /* fond */
}
```

Si tu veux changer la couleur partout, change `--cyan` et c'est automatique.

## Styles et JavaScript

- **CSS** : Tout est dans `public/assets/css/styles.css`
- **JS** : Tout est dans `public/assets/js/script.js`

Il faut éditer directement ces fichiers.

## Images

Optimisées avant de les ajouter :
- Logo : 53 KB
- Favicon : 78 KB
- Autres : réduites au maximum

Ajoute `loading="lazy"` pour les images hors-écran.

## Formulaires

Netlify gère les formulaires nativement.

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" required />
  <textarea name="message" required></textarea>
  <button type="submit">Envoyer</button>
</form>
```

Netlify reçoit les données, stocke, et envoie une email.

## Sécurité

Dans `netlify.toml`, il y a des headers pour éviter les attaques :

```toml
X-Frame-Options = "SAMEORIGIN"
X-Content-Type-Options = "nosniff"
```

Et le cache CSS/JS est mis à 1 an pour améliorer la perf.

---

**Dernière mise à jour** : 2026-05-30
