# Déploiement sur Netlify

## La setup

Le site est sur Netlify et il redéploie automatiquement quand tu push sur GitHub.

## Configuration Git SSH

SSH c'est plus sûr que HTTPS. Génère une clé :

```bash
ssh-keygen -t ed25519 -C "ton-email@datatop.fr"
```

Puis ajoute la clé publique sur GitHub (Settings → SSH keys).

```bash
cat ~/.ssh/id_ed25519.pub
```

Copie-colle ça sur GitHub.

## Connecter GitHub à Netlify

1. Va sur https://app.netlify.com
2. Clique "New site from Git"
3. Sélectionne GitHub
4. Autorise Netlify
5. Sélectionne le repo `datatop`

## Configuration Netlify

**Build** :
- Build command : (vide)
- Publish directory : `public`

C'est tout. Netlify crée `netlify.toml` automatiquement.

## Déploiement automatique

Quand tu push sur GitHub :

```bash
git push origin main
```

Netlify reçoit le changement, build le site (aucun build ici), et le publie. En 1 minute c'est en ligne.

Tu peux vérifier sur le dashboard de Netlify.

## Domaine personnalisé

1. Netlify Dashboard → Site settings → Domain management
2. Ajoute `datatop.fr`
3. Change les nameservers chez ton registrar DNS
4. Attends la propagation (5 min à 48h)

SSL/HTTPS c'est automatique avec Let's Encrypt.

## Formulaires Netlify

Ajoute `data-netlify="true"` sur la balise `<form>` :

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" required />
  <button type="submit">Envoyer</button>
</form>
```

Les soumissions arrivent dans Netlify Dashboard → Forms.

## Pretty URLs

Netlify active automatiquement les pretty URLs :
- `conseil.html` → `/conseil`
- `index.html` → `/`

Rien à configurer.

## Si ça ne redéploie pas

1. Vérifier les logs Netlify (Dashboard → Deploys)
2. Vider le cache (Dashboard → Deploys → Clear cache)
3. Redéployer manuellement (Retry)

---

**Dernière mise à jour** : 2026-05-30
