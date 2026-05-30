# GitHub Actions Workflows

## Workflows Automatiques

Ce projet utilise 3 workflows GitHub Actions qui se déclenchent automatiquement sur les Pull Requests.

### 1. Copilot AI Review
Fichier: `.github/workflows/copilot-review.yml`

- Quand: Automatiquement quand une PR est ouverte ou mise à jour
- Fait: Demande une review AI avec GitHub Copilot
- Résultat: Commentaires de review intelligent dans la PR

### 2. Quality Checks
Fichier: `.github/workflows/quality-checks.yml`

- Quand: Automatiquement sur toute PR
- Fait:
  - Valide les fichiers HTML
  - Vérifie le CSS
  - Valide le JavaScript
  - Ajoute un résumé dans la PR
- Résultat: Rapport de qualité avec statut de validation

### 3. PR Automation
Fichier: `.github/workflows/pr-automation.yml`

- Quand: À chaque PR
- Fait:
  - Valide la branche cible
  - Ajoute des labels automatiques
  - Demande les reviews
  - Applique les règles de branching

## Flux complet d'une PR

1. Créer feature branch
   git checkout -b feat/ma-feature

2. Faire les changements et committer
   git push origin feat/ma-feature

3. Créer PR sur GitHub
   feat/ma-feature vers develop (ou main)

4. Workflows se déclenchent automatiquement:
   - Quality Checks (validation du code)
   - Copilot Review (review AI)
   - PR Automation (labels et checks)

5. Résultats affichés dans la PR:
   - Quality checks passed
   - AI review comments
   - Labels appliquées automatiquement

6. Examiner les commentaires et suggestions

7. Merger quand prêt

## Exemple de PR

Quand vous créez une PR, vous verrez:

Quality Checks Passed
- HTML files validated
- CSS files validated
- JavaScript files validated

Copilot AI Review
- Suggestion 1: Consider using CSS variables for colors
- Suggestion 2: Optimize animation timing
- etc...

Labels: feature, staging, enhancement

## Configuration

Branches automatisées
- develop: Déclenche tous les workflows
- main: Déclenche tous les workflows avec checks production

Labels automatiques
- feat/ dans le branch: label feature
- fix/ dans le branch: label bug-fix
- perf/ dans le branch: label performance
- docs/ dans le branch: label documentation
- PR vers develop: label staging
- PR vers main: label release

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

Tout est prêt!

