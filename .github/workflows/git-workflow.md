# Git Workflow - DATATOP

## Structure des branches

main (production)
  - develop (staging/integration)
    - feature/* (travail en cours)

## Processus standard

### 1. Créer une feature branch

git checkout develop
git pull origin develop
git checkout -b feat/nom-de-la-feature

Convention de nommage:
- feat/ = nouvelle fonctionnalité
- fix/ = bug fix
- perf/ = optimisation
- docs/ = documentation
- style/ = CSS/design

### 2. Travailler sur la branche

git add .
git commit -m "Descriptive message"
git push origin feat/nom-de-la-feature

### 3. Créer une Pull Request

- Aller sur GitHub
- PR depuis feat/nom vers develop
- Ajouter description des changements
- Demander review si besoin

### 4. Merger dans develop

Une fois PR approuvée:

git checkout develop
git pull origin develop
git merge feat/nom-de-la-feature
git push origin develop

### 5. Merger develop vers main (PROD)

Une fois develop testé et validé:

git checkout main
git pull origin main
git merge develop
git push origin main

## Règles importantes

A faire:
- Créer une branche pour chaque changement
- Faire des commits atomiques (une tâche = un commit)
- Écrire des messages clairs et descriptifs
- Tester avant de pusher

A NE PAS faire:
- Pusher directement sur main
- Merger sans vérifier les changements
- Faire des commits "fix", "wip", "test"
- Travailler sur develop directement (sauf hotfix)

## Hotfix urgent (si bug en prod)

git checkout -b hotfix/urgent-fix main

Faire les changements:

git commit -m "Fix: description"
git push origin hotfix/urgent-fix

Créer PR hotfix vers main
Une fois mergé: fusionner aussi dans develop

## Exemple de workflow

Jour 1: Créer feature
  git checkout -b feat/animations

Jours 2-4: Développer
  git commit -m "Add spring easing to cards"
  git commit -m "Optimize parallax effect"
  git push origin feat/animations

Jour 5: PR et Review
  GitHub > Create PR (feat/animations vers develop)

Jour 6: Merger dans develop
  git checkout develop
  git merge feat/animations
  git push origin develop

Semaine 2: Release vers prod
  git checkout main
  git merge develop
  git push origin main

## Commandes utiles

Voir toutes les branches:
  git branch -a

Supprimer une branche locale:
  git branch -d feat/mon-feature

Supprimer une branche distante:
  git push origin --delete feat/mon-feature

Voir l'historique:
  git log --oneline --graph --all

Rebase pour garder historique propre:
  git rebase develop (depuis la feature branch)

---

Créé: 2026-05-30
Version: 1.0

