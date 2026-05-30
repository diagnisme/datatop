# Installation et développement local

## Avant de commencer

Tu as besoin de :
- Git (pour cloner le repo)
- Python 3.x (pour le serveur local)
- Un terminal (zsh ou bash)
- Un éditeur (VS Code c'est bien)

Vérifier que tu as tout :
```bash
git --version
python3 --version
```

## Installation (5 min)

Clone le repo :

```bash
git clone git@github.com:YOUR_USERNAME/datatop.git
cd datatop
```

C'est tout. Pas de `npm install`, pas de build. Le site fonctionne directement.

## Lancer localement

```bash
python3 -m http.server 8080 --directory public/
```

Puis ouvre `http://localhost:8080` dans ton navigateur.

## Le port 8080 est déjà utilisé ?

```bash
# Voir ce qui utilise le port
lsof -i :8080

# Tuer le processus
kill 12345  # remplace 12345 par le PID

# Ou utilise un autre port
python3 -m http.server 8081 --directory public/
```

## Modifier le site

Les fichiers à modifier sont dans `public/` :

- **HTML** : `public/*.html` (les pages)
- **CSS** : `public/assets/css/styles.css`
- **JS** : `public/assets/js/script.js`
- **Images** : `public/assets/img/`

Édite le fichier, sauvegarde, rafraîchis le navigateur. C'est immédiat.

## Exemples

### Changer le titre de l'accueil

Ouvre `public/index.html`, trouve `<h1>DATATOP · Conseil...` et change-le.

### Changer une couleur

Ouvre `public/assets/css/styles.css`, cherche `--cyan: #00D9FF;` et remplace-la.

### Ajouter du texte

Ouvre `public/conseil.html`, ajoute un paragraphe ou une section. Sauvegarde et c'est en ligne.

## Avant de pusher

- Le site charge sans erreur ? (check)
- Tous les liens fonctionnent ? (check)
- Pas d'erreurs en console ? (F12 → console)
- C'est responsive sur mobile ? (F12 → device toggle)
- Les images se chargent bien ?

Si tout est bon, commit et push :

```bash
git add .
git commit -m "Description de ce que tu as changé"
git push origin main
```

Netlify redéploie automatiquement.

## Problèmes courants

### Le site ne charge pas (ERR_EMPTY_RESPONSE)

Le serveur Python n'est probablement pas lancé. Recommence :

```bash
python3 -m http.server 8080 --directory public/
```

### Les images ne se chargent pas

Vérifier que les fichiers existent :

```bash
ls -la public/assets/img/
```

### Les styles ne se mettent pas à jour

C'est le cache du navigateur. Appuie sur Cmd+Shift+Delete pour vider le cache, puis F5.

### Un formulaire n'envoie pas

Les formulaires ne marchent que sur Netlify en production, pas en local. Ils ont besoin de `data-netlify="true"` :

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" required />
  <button type="submit">Envoyer</button>
</form>
```

## Workflow

1. Crée une branche : `git checkout -b feature/mon-truc`
2. Lance le serveur : `python3 -m http.server 8080 --directory public/`
3. Ouvre le site : `http://localhost:8080`
4. Modifie les fichiers
5. Test
6. Commit et push
7. Crée une PR sur GitHub

---

**Dernière mise à jour** : 2026-05-30
