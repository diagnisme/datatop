# GitHub Actions Workflows

## Workflows Automatiques

Ce projet utilise 2 workflows GitHub Actions qui se déclenchent automatiquement sur les Pull Requests.

### 1. PR Automation
Fichier: `.github/workflows/pr-automation.yml`

- Quand: Automatiquement quand une PR est ouverte ou mise à jour
- Fait: Assigne l'auteur, ajoute un label "needs review" et publie un commentaire pour notifier l'équipe.
- Résultat: La PR est prête pour une revue de code par un membre de l'équipe.

### 2. Quality Checks
Fichier: `.github/workflows/quality-checks.yml`

- Quand: Automatiquement à chaque push, sur toute PR, ou déclenchement manuel
- Fait:
  - Valide les fichiers HTML
  - Vérifie le CSS
  - Valide le JavaScript
  - Ajoute un résumé dans la PR
- Résultat: Rapport de qualité avec statut de validation

## Flux complet d'une PR

1. Créer feature branch
   git checkout -b feat/ma-feature

2. Faire les changements et committer
   git push origin feat/ma-feature

3. Créer PR sur GitHub
   feat/ma-feature vers develop (ou main)

4. Workflows se déclenchent automatiquement:
   - PR Automation (gestion des revues)
   - Quality Checks (validation du code)

5. Résultats affichés dans la PR:
   - Le créateur de la PR est assigné
   - Le label "needs review" est ajouté
   - Le rapport Quality checks passed est affiché

6. Attendre la revue de code par un membre de l'équipe

7. Merger après approbation

## Exemple de PR

Quand vous créez une PR, vous verrez:

Quality Checks Passed
- HTML files validated
- CSS files validated
- JavaScript files validated
- No critical issues found

## Configuration

Branches automatisées
- develop: Déclenche tous les workflows
- main: Déclenche tous les workflows avec checks production

## Bonus: Require Checks Avant Merge

Pour protéger main, dans GitHub:
1. Settings > Branches
2. Add rule > Branch main
3. Require status checks to pass
4. Require pull request reviews
5. Require branches to be up to date

## Plus d'infos

Voir aussi: `.github/workflows/git-workflow.md`

Les workflows ont besoin:
- Repository configuré correctement
- GitHub Actions activé (par défaut)
- Branche develop créée

Tout est prêt.
