# 🥗 Mon Assiette V2

**Suivi nutritionnel quotidien — 100 % local, sans compte, installable.**
Notez ce que vous mangez, suivez vos calories et macros, le tout stocké **sur votre appareil**. Aucune inscription, aucun serveur, aucune donnée envoyée ailleurs.

> 🇬🇧 *A privacy-first food diary. 100 % client-side PWA — your data never leaves your device. No account, no server.*

`Vanilla JS` · `PWA / hors-ligne` · `Open Food Facts` · `Zéro dépendance` · `FR / EN`

---

## ✨ Fonctionnalités

- **Journal quotidien** — 5 repas, anneau de calories + barres de macros vs objectifs
- **Recherche d'aliments** via [Open Food Facts](https://world.openfoodfacts.org/)
- **Scan de code-barres** (caméra, Chrome/Android)
- **Ajout rapide** (aliments récents) & ⭐ **repas favoris** réutilisables
- **Copier une journée** vers une autre date
- **Saisie manuelle** pour les plats maison
- **Objectifs automatiques** (Sèche / Maintien / Bulk) avec estimation de perte/prise de poids
- **Suivi du poids** avec courbe d'évolution
- **Progrès** — graphique 14 jours, moyenne, *streak* 🔥
- **Profils multiples** sur un même appareil (sans compte)
- **Français / English** (bascule + détection auto)
- **Export / Import** de sauvegarde (`.json`)
- **Rappel de sauvegarde** tous les 7 jours
- **Mode sombre** automatique · 📦 **Fonctionne hors-ligne**

---

## 🚀 Utilisation

### En local (développement)
L'app doit être servie en HTTP (`localhost`) — pas en `file://`.

```bash
# avec Python
python -m http.server 8766
# puis ouvrir http://localhost:8766/

# ou via XAMPP : placer le dossier dans htdocs → http://localhost/suiveur_nutrition_v2/
```

---

## 🔐 Confidentialité

- **Tout reste sur votre appareil** (localStorage du navigateur), sous des clés préfixées `sn2:`.
- **Aucun compte, aucun tracking, aucun serveur.**
- Les **seules** requêtes réseau sont la **recherche** et le **scan** d'aliments (interrogation d'Open Food Facts).
- Sauvegarde sous votre contrôle : bouton **Exporter** (onglet Profil) → fichier `.json`.

---

## 🧱 Stack technique

| | |
|---|---|
| Front-end | HTML / CSS / **JavaScript vanilla** (aucun framework, aucune dépendance) |
| Stockage | `localStorage` (par profil) |
| App native | **PWA** (manifest + service worker, hors-ligne, installable) |
| Données aliments | API publique **Open Food Facts** |
| i18n | Dictionnaire FR/EN maison |

---

## 🗂️ Structure

```
index.html              Coquille (barre du haut, vues, onglets)
app.css                 Styles (thème chaleureux + mode sombre)
app.js                  Toute la logique (Store, i18n, API, rendu, PWA)
manifest.webmanifest    Métadonnées PWA
service-worker.js       Cache hors-ligne (+ n° de version)
icon.svg                Icône
```

---

## 📦 Crédits & licence

- Données alimentaires : **[Open Food Facts](https://world.openfoodfacts.org/)** (base ouverte et collaborative).

> Projet personnel — un suiveur nutrition simple, privé et hors-ligne. Les contributions et idées sont les bienvenues. 🙌
