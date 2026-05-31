# Dictionnaire des Données (Supabase)

Ce document est le **Data Dictionary** (Dictionnaire de données) de l'architecture Supabase du site DATATOP. Il rassemble dans un tableau unique l'intégralité des colonnes, leur table de provenance et leur signification métier.

## 1. Dictionnaire Global des Colonnes

| Table(s) de provenance | Colonne | Type | Signification & Cas d'usage métier |
| :--- | :--- | :--- | :--- |
| **[Toutes les tables]** | `id` | `uuid` | Identifiant technique unique généré automatiquement pour chaque ligne (Clé primaire). |
| **[Toutes les tables]** | `session_id` | `text` | Identifiant unique du visiteur stocké dans son navigateur. Permet de lier le comportement (analytics) aux conversions (formulaires). |
| **[Toutes les tables]** | `created_at` | `timestamp` | Date et heure exactes de la création de la ligne (fuseau UTC). |
| `analytics_events` | `event_type` | `text` | Catégorie de l'action accomplie (`page_view`, `click`, `scroll_depth`, `page_leave`, `form_submit`). |
| `analytics_events` | `url` | `text` | Lien complet de la page consultée lors de l'événement. |
| `analytics_events` | `path` | `text` | Chemin relatif de la page (ex: `/formation.html`). Utile pour grouper les statistiques globales. |
| `analytics_events` | `user_agent` | `text` | Données techniques brutes du navigateur (ex: Chrome, Safari, mobile ou desktop) et de l'OS. |
| `analytics_events` | `language` | `text` | Langue configurée sur le navigateur du visiteur (ex: `fr-FR`). |
| `analytics_events` | `timezone` | `text` | Fuseau horaire du visiteur. Sert à estimer sa zone géographique sans utiliser d'API externe (ex: `Europe/Paris`). |
| `analytics_events` | `screen_width` / `height` | `int` | Définition matérielle totale de l'écran du visiteur (en pixels). |
| `analytics_events` | `viewport_width` / `height` | `int` | Taille réelle de la fenêtre d'affichage web (très utile pour analyser l'UX et le responsive design). |
| `analytics_events` | `referrer` | `text` | URL du site web précédent qui a amené le visiteur sur DATATOP (ex: google.com, linkedin.com). |
| `analytics_events` | `utm_source` | `text` | **[Marketing]** Source de la campagne (ex: `linkedin`, `newsletter`). |
| `analytics_events` | `utm_medium` | `text` | **[Marketing]** Support de la campagne (ex: `cpc`, `email`). |
| `analytics_events` | `utm_campaign` | `text` | **[Marketing]** Nom spécifique de la campagne publicitaire. |
| `analytics_events` | `utm_term` | `text` | **[Marketing]** Mots-clés ciblés par la campagne (surtout pour Google Ads). |
| `analytics_events` | `utm_content` | `text` | **[Marketing]** Variante de l'annonce cliquée (pour faire de l'A/B testing). |
| `analytics_events` | `target_text` | `text` | Texte contenu dans le bouton ou le lien cliqué, ou le nom du formulaire soumis. |
| `analytics_events` | `target_href` | `text` | URL de destination finale suite à un clic sur un lien. |
| `analytics_events` | `scroll_depth` | `int` | **[Engagement]** Pourcentage de lecture atteint en défilant la page (25, 50, 75, 90). |
| `analytics_events` | `duration` | `int` | **[Engagement]** Temps total passé sur la page en secondes avant de la quitter. |
| `contacts` | `form_type` | `text` | Identifiant du formulaire commercial soumis (généralement `contact`). |
| `contacts`, `candidatures` | `name` | `text` | Nom et prénom saisis par l'utilisateur. |
| `contacts`, `candidatures` | `email` | `text` | Adresse email de contact de l'utilisateur. |
| `contacts`, `candidatures` | `message` | `text` | Contenu textuel de la demande commerciale ou de la motivation RH. |
| `contacts` | `status` | `text` | Suivi du pipe commercial (CRM) : `nouveau`, `contacté`, `signé`. |
| `candidatures` | `status` | `text` | Suivi du recrutement (RH) : `nouveau`, `entretien`, `refusé`. |
| `candidatures` | `role` | `text` | Intitulé du poste ciblé par le candidat (ex: `Data Engineer`). |

## 2. Architecture Globale

* **`analytics_events`** : Comportements bruts (clics, vues, temps passé, scroll).
* **`contacts`** : Mini-CRM commercial (leads qualifiés).
* **`candidatures`** : Base de recrutement RH (candidats isolés des ventes).

## 3. Vues Analytiques (Views)
Les vues sont des requêtes virtuelles enregistrées dans Supabase qui croisent les données en temps réel pour faciliter l'analyse, sans dupliquer la donnée.

* **`vue_parcours_prospects`** : Croise les `contacts` avec `analytics_events` pour afficher l'historique complet des pages visitées par un prospect commercial avant sa prise de contact.
* **`vue_parcours_candidats`** : Croise les `candidatures` avec `analytics_events` pour analyser le comportement des candidats (ont-ils lu la page conseil/projets avant de postuler ?).
* **`vue_statistiques_pages`** : Agrège le trafic pour afficher le nombre de vues, les visiteurs uniques, le temps moyen passé par page et la profondeur de lecture (scroll).
* **`vue_performance_marketing`** : Mesure le retour sur investissement en associant les paramètres `utm_source` / `utm_campaign` au nombre de leads commerciaux et de candidats générés (conversion).