# Performance

## Scores actuels

**Lighthouse** : 92/100

**PageSpeed Insights** :
- Performance : 92/100
- Accessibility : 96/100
- Best Practices : 95/100
- SEO : 100/100

**Core Web Vitals** :
- LCP : 1.2 secondes (bon)
- FID : < 50ms (excellent)
- CLS : < 0.05 (excellent)

## Ce qui est optimisé

- Zéro framework (HTML/CSS/JS vanilla)
- Images compressées (logo 53KB, favicon 78KB)
- Polices préchargées
- CSS/JS en cache 1 an
- Lazy loading images
- Pas de ressources externes bloquantes

## Mesurer la performance

Va sur https://pagespeed.web.dev/ et entre `https://datatop.fr`.

Tu verras les scores, les problèmes, et les suggestions d'amélioration.

## Si la performance baisse

1. Vérifier les images ajoutées (pas > 200KB)
2. Vérifier si du JS lourd a été ajouté
3. Vérifier les logs Netlify

Si une image ralentit le site, compresse-la avec TinyPNG.

## Optimisations possibles

- Convertir logo en WebP
- Minifier HTML (gain 10KB)
- Ajouter compression Brotli
- Implémenter Progressive Web App

Mais le site est déjà très rapide.

---

**Dernière mise à jour** : 2026-05-30
