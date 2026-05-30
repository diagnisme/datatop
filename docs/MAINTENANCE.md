# Maintenance

## Tâches régulières

**Hebdomadaire** :
- Vérifier les formulaires (Netlify Dashboard → Forms)
- Vérifier qu'il n'y a pas d'erreurs 404

**Mensuel** :
- PageSpeed Insights audit
- Vérifier le contenu à jour
- Vérifier les liens ne sont pas cassés

**Trimestriel** :
- Audit SEO complet
- Vérifier la sécurité (headers, SSL)
- Analyser le traffic

## Vérifier les formulaires

Va sur Netlify Dashboard → Forms. Tu vois toutes les soumissions.

Si trop de spam, Netlify a un filtre Akismet.

## Vérifier la performance

Va sur https://pagespeed.web.dev/

Compare avec le mois précédent. Si ça baisse, cherche quoi a changé.

## Mettre à jour le site

```bash
# 1. Clone le repo
git clone git@github.com:username/datatop.git
cd datatop

# 2. Modifie les fichiers

# 3. Teste localement
python3 -m http.server 8080 --directory public/

# 4. Commit et push
git add .
git commit -m "Description"
git push origin main
```

Netlify redéploie automatiquement.

## Ajouter une image

1. Réduis l'image avec TinyPNG
2. Place-la dans `public/assets/img/`
3. Ajoute-la en HTML : `<img src="assets/img/mon-image.png" loading="lazy" alt="..."/>`
4. Test localement
5. Commit et push

## Si quelque chose va mal

**Le site ne charge pas** :
- Vérifier le serveur Python tourne
- Vérifier les logs Netlify

**Les images ne s'affichent pas** :
- Vérifier que le chemin est correct
- Vérifier que le fichier existe

**Les formulaires n'envoient pas** :
- Vérifier `data-netlify="true"` est présent
- Vérifier `method="POST"`
- Redéployer

---

**Dernière mise à jour** : 2026-05-30
