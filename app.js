'use strict';

const REPAS = [
    { key: 'petit_dejeuner', emoji: '🌅' },
    { key: 'dejeuner', emoji: '🍽️' },
    { key: 'diner', emoji: '🌙' },
    { key: 'gouter', emoji: '🍎' },
    { key: 'repas_plus', emoji: '➕' },
];

const OBJECTIFS_DEFAUT = { kcal: 2000, proteines: 90, glucides: 250, lipides: 70 };
const EMOJIS_PROFIL = ['🧑', '👩', '👨', '🧒', '👧', '👦', '🧓', '👵', '👴', '🐱', '🐶', '🦊', '🐼', '🦉'];
const FACTEURS_ACTIVITE = { sed: 1.2, light: 1.375, mod: 1.55, high: 1.725, vhigh: 1.9 };

// ---------- Traductions (i18n) ----------
const I18N = {
    fr: {
        appName: 'Mon Assiette', title: 'Mon Assiette V2 — Suivi nutrition', locale: 'fr-FR',
        tab_today: 'Jour', tab_add: 'Ajouter', tab_stats: 'Progrès', tab_profil: 'Profil',
        meals: { petit_dejeuner: 'Petit-déjeuner', dejeuner: 'Déjeuner', diner: 'Dîner', gouter: 'Goûter', repas_plus: 'Extra / Snack' },
        today: "Aujourd'hui", backToToday: "Toucher pour revenir à aujourd'hui",
        proteins: 'Protéines', carbs: 'Glucides', fats: 'Lipides',
        abbrevP: 'P', abbrevC: 'G', abbrevF: 'L',
        remaining: (n, f) => `Il te reste <b>${n} kcal</b> · Fibres : ${f} g`,
        over: (n, f) => `Objectif dépassé de <b>${n} kcal</b> · Fibres : ${f} g`,
        emptyMeal: "Rien pour l'instant", addFood: '+ Ajouter un aliment',
        add: 'Ajouter', update: 'Mettre à jour', delete: 'Supprimer', save: 'Enregistrer',
        whichMeal: 'Pour quel repas ?', searchPlaceholder: 'Rechercher un aliment…',
        quickAdd: '⚡ Ajout rapide', searchHint: "Tape le nom d'un aliment pour le chercher dans Open Food Facts.",
        manualEntry: '✏️ Saisir un aliment manuellement', perKcal100: 'kcal/100g',
        searching: 'Recherche…', noResults: 'Aucun résultat. Essaie un autre mot ou la saisie manuelle.',
        offError: '⚠️ Connexion à Open Food Facts impossible.<br>Utilise la saisie manuelle.',
        yourProgress: 'Ta progression', daysStreak: 'jours de suite', kcalToday: "kcal aujourd'hui", avgPerDay: 'moyenne / jour',
        last14: '14 derniers jours', underGoal: "Sous l'objectif", aboveGoal: 'Au-dessus', goalN: n => `Objectif ${n}`,
        chartAria: 'Calories des 14 derniers jours',
        profilesTitle: '👤 Profils (sur cet appareil)', activate: 'Activer', current: 'actuel', newPerson: '+ Nouvelle personne',
        goalsOf: n => `🎯 Objectifs de ${n}`,
        kcalPerDay: 'Calories par jour (kcal)', proteinsG: 'Protéines (g)', carbsG: 'Glucides (g)', fatsG: 'Lipides (g)',
        saveGoals: 'Enregistrer les objectifs',
        backupTitle: '💾 Sauvegarde',
        backupDesc: 'Tes données restent sur cet appareil. Exporte-les pour les sauvegarder ou les transférer sur un autre téléphone/ordinateur.',
        exportBtn: '⬇️ Exporter mes données (.json)', importBtn: '⬆️ Importer une sauvegarde',
        aboutLine: 'Mon Assiette V2 · app 100% locale', aboutData: 'Données alimentaires : Open Food Facts',
        installed: '✓ Installée comme application', installBtn: "📲 Installer l'application",
        installHint: 'Astuce : menu du navigateur → « Installer / Ajouter à l\'écran d\'accueil ».',
        language: 'Langue',
        sheetPer100: n => `pour 100 g : ${n} kcal`, quantityG: 'Quantité (g)', mealLabel: 'Repas :',
        prevKcal: 'kcal', prevProt: 'Prot.', prevCarb: 'Gluc.', prevFat: 'Lip.',
        manualTitle: '✏️ Aliment manuel', manualDesc: 'Valeurs pour 100 g (laisse 0 si inconnu).',
        name: 'Nom', caloriesKcal: 'Calories (kcal)', fiberLabel: 'Fibres',
        addToMeal: m => `Ajouter au ${m}`, placeholderManualName: 'Ex : Salade maison',
        newPersonTitle: 'Nouvelle personne', firstName: 'Prénom', avatar: 'Avatar :', createProfile: 'Créer le profil',
        placeholderFirstName: 'Ex : Sarah',
        backupReminderTitle: '💾 Pense à sauvegarder',
        backupReminderDesc: "Ça fait une semaine que tu n'as pas exporté. Sauvegarde tes données pour ne rien perdre si tu changes d'appareil ou vides ton navigateur. Le fichier reste sur ton appareil.",
        exportNow: '⬇️ Exporter maintenant', later: 'Plus tard',
        added: 'Ajouté ✓', updated: 'Mis à jour ✓', goalsSaved: 'Objectifs enregistrés ✓',
        imported: 'Sauvegarde importée ✓', invalidFile: 'Fichier invalide ✗',
        profileSwitched: 'Profil changé ✓', profileCreated: 'Profil créé ✓', exported: 'Sauvegarde exportée ✓',
        confirmImport: 'Importer cette sauvegarde ? Elle remplacera les données actuelles de cet appareil.',
        confirmDelete: n => `Supprimer le profil « ${n} » et toutes ses données ?`,
        foodFallbackName: 'Aliment', profileFallback: 'Profil',
        // --- V2 ---
        scanBarcode: '📷 Scanner un code-barres', scanTitle: 'Scanner', scanning: 'Vise le code-barres…',
        scanUnsupported: "Le scan n'est pas supporté par ce navigateur. Essaie Chrome sur Android, ou utilise la recherche.",
        scanNoCamera: 'Accès à la caméra refusé ou indisponible.', scanNotFound: 'Produit introuvable dans Open Food Facts.',
        copyDay: '⧉ Copier ce jour', copyDayTitle: 'Copier la journée',
        copyDayDesc: 'Copie tous les aliments de ce jour vers une autre date (remplace son contenu).',
        targetDate: 'Date de destination', copy: 'Copier', copied: 'Journée copiée ✓', nothingToCopy: 'Rien à copier ce jour.',
        saveFavorite: 'Enregistrer ce repas en favori', favorites: '⭐ Favoris',
        favoriteName: 'Nom du favori', favoriteNamePlaceholder: 'Ex : Mon petit-déj habituel',
        favoriteSaved: 'Favori enregistré ✓', favoriteAdded: 'Favori ajouté ✓', emptyMealFav: 'Ce repas est vide.',
        calcGoals: '🧮 Calculer mes objectifs', calcTitle: 'Calcul des objectifs',
        sex: 'Sexe', male: 'Homme', female: 'Femme', age: 'Âge (ans)', weightKg: 'Poids (kg)', heightCm: 'Taille (cm)',
        activity: 'Niveau d\'activité', act_sed: 'Sédentaire', act_light: 'Légère (1-3 j/sem)', act_mod: 'Modérée (3-5 j/sem)',
        act_high: 'Intense (6-7 j/sem)', act_vhigh: 'Très intense',
        goalAim: 'Objectif', aim_cut: 'Sèche (perdre)', aim_maintain: 'Maintien', aim_bulk: 'Prise de masse (Bulk)',
        estimate: 'Estimation', applyGoals: 'Appliquer ces objectifs', goalsApplied: 'Objectifs appliqués ✓',
        perWeek: '/ semaine', perMonth: '/ mois', weightStable: '⚖️ Poids stable (maintien)',
        weightTracking: '⚖️ Suivi du poids', logWeight: '+ Noter mon poids', weightTitle: 'Noter le poids',
        weightSaved: 'Poids enregistré ✓', noWeight: 'Aucun poids enregistré pour l\'instant.',
        currentWeight: 'Poids actuel', weightChange: 'Évolution', dateLabel: 'Date', kg: 'kg',
    },
    en: {
        appName: 'My Plate', title: 'My Plate V2 — Nutrition tracker', locale: 'en-US',
        tab_today: 'Day', tab_add: 'Add', tab_stats: 'Progress', tab_profil: 'Profile',
        meals: { petit_dejeuner: 'Breakfast', dejeuner: 'Lunch', diner: 'Dinner', gouter: 'Snack', repas_plus: 'Extra' },
        today: 'Today', backToToday: 'Tap to go back to today',
        proteins: 'Protein', carbs: 'Carbs', fats: 'Fat',
        abbrevP: 'P', abbrevC: 'C', abbrevF: 'F',
        remaining: (n, f) => `<b>${n} kcal</b> left · Fiber: ${f} g`,
        over: (n, f) => `<b>${n} kcal</b> over goal · Fiber: ${f} g`,
        emptyMeal: 'Nothing yet', addFood: '+ Add food',
        add: 'Add', update: 'Update', delete: 'Delete', save: 'Save',
        whichMeal: 'Which meal?', searchPlaceholder: 'Search for a food…',
        quickAdd: '⚡ Quick add', searchHint: 'Type a food name to search it in Open Food Facts.',
        manualEntry: '✏️ Enter a food manually', perKcal100: 'kcal/100g',
        searching: 'Searching…', noResults: 'No results. Try another word or manual entry.',
        offError: "⚠️ Can't reach Open Food Facts.<br>Use manual entry.",
        yourProgress: 'Your progress', daysStreak: 'day streak', kcalToday: 'kcal today', avgPerDay: 'avg / day',
        last14: 'Last 14 days', underGoal: 'Under goal', aboveGoal: 'Over', goalN: n => `Goal ${n}`,
        chartAria: 'Calories of the last 14 days',
        profilesTitle: '👤 Profiles (on this device)', activate: 'Switch', current: 'current', newPerson: '+ New person',
        goalsOf: n => `🎯 ${n}'s goals`,
        kcalPerDay: 'Calories per day (kcal)', proteinsG: 'Protein (g)', carbsG: 'Carbs (g)', fatsG: 'Fat (g)',
        saveGoals: 'Save goals',
        backupTitle: '💾 Backup',
        backupDesc: 'Your data stays on this device. Export it to back up or move it to another phone/computer.',
        exportBtn: '⬇️ Export my data (.json)', importBtn: '⬆️ Import a backup',
        aboutLine: 'My Plate V2 · 100% local app', aboutData: 'Food data: Open Food Facts',
        installed: '✓ Installed as an app', installBtn: '📲 Install the app',
        installHint: 'Tip: browser menu → "Install / Add to Home screen".',
        language: 'Language',
        sheetPer100: n => `per 100 g: ${n} kcal`, quantityG: 'Quantity (g)', mealLabel: 'Meal:',
        prevKcal: 'kcal', prevProt: 'Prot', prevCarb: 'Carb', prevFat: 'Fat',
        manualTitle: '✏️ Manual food', manualDesc: 'Values per 100 g (leave 0 if unknown).',
        name: 'Name', caloriesKcal: 'Calories (kcal)', fiberLabel: 'Fiber',
        addToMeal: m => `Add to ${m}`, placeholderManualName: 'e.g. Homemade salad',
        newPersonTitle: 'New person', firstName: 'First name', avatar: 'Avatar:', createProfile: 'Create profile',
        placeholderFirstName: 'e.g. Sarah',
        backupReminderTitle: '💾 Remember to back up',
        backupReminderDesc: "It's been a week since your last export. Back up your data so you don't lose anything if you switch devices or clear your browser. The file stays on your device.",
        exportNow: '⬇️ Export now', later: 'Later',
        added: 'Added ✓', updated: 'Updated ✓', goalsSaved: 'Goals saved ✓',
        imported: 'Backup imported ✓', invalidFile: 'Invalid file ✗',
        profileSwitched: 'Profile switched ✓', profileCreated: 'Profile created ✓', exported: 'Backup exported ✓',
        confirmImport: 'Import this backup? It will replace the current data on this device.',
        confirmDelete: n => `Delete profile "${n}" and all its data?`,
        foodFallbackName: 'Food', profileFallback: 'Profile',
        // --- V2 ---
        scanBarcode: '📷 Scan a barcode', scanTitle: 'Scan', scanning: 'Aim at the barcode…',
        scanUnsupported: "Scanning isn't supported by this browser. Try Chrome on Android, or use search.",
        scanNoCamera: 'Camera access denied or unavailable.', scanNotFound: 'Product not found in Open Food Facts.',
        copyDay: '⧉ Copy this day', copyDayTitle: 'Copy day',
        copyDayDesc: 'Copy all foods from this day to another date (replaces its content).',
        targetDate: 'Target date', copy: 'Copy', copied: 'Day copied ✓', nothingToCopy: 'Nothing to copy this day.',
        saveFavorite: 'Save this meal as a favorite', favorites: '⭐ Favorites',
        favoriteName: 'Favorite name', favoriteNamePlaceholder: 'e.g. My usual breakfast',
        favoriteSaved: 'Favorite saved ✓', favoriteAdded: 'Favorite added ✓', emptyMealFav: 'This meal is empty.',
        calcGoals: '🧮 Calculate my goals', calcTitle: 'Goal calculator',
        sex: 'Sex', male: 'Male', female: 'Female', age: 'Age (years)', weightKg: 'Weight (kg)', heightCm: 'Height (cm)',
        activity: 'Activity level', act_sed: 'Sedentary', act_light: 'Light (1-3 d/wk)', act_mod: 'Moderate (3-5 d/wk)',
        act_high: 'Intense (6-7 d/wk)', act_vhigh: 'Very intense',
        goalAim: 'Goal', aim_cut: 'Cut (lose)', aim_maintain: 'Maintain', aim_bulk: 'Bulk (gain)',
        estimate: 'Estimate', applyGoals: 'Apply these goals', goalsApplied: 'Goals applied ✓',
        perWeek: '/ week', perMonth: '/ month', weightStable: '⚖️ Stable weight (maintenance)',
        weightTracking: '⚖️ Weight tracking', logWeight: '+ Log my weight', weightTitle: 'Log weight',
        weightSaved: 'Weight saved ✓', noWeight: 'No weight logged yet.',
        currentWeight: 'Current weight', weightChange: 'Change', dateLabel: 'Date', kg: 'kg',
    },
};

let LANG = localStorage.getItem('sn2:lang');
if (LANG !== 'fr' && LANG !== 'en') {
    LANG = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}
const L = () => I18N[LANG];

// ---------- Petits utilitaires ----------
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
const r0 = n => Math.round(n || 0);
const r1 = n => Math.round((n || 0) * 10) / 10;
const num = v => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function dateStr(d) {
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
}
const todayStr = () => dateStr(new Date());

function formatDate(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(L().locale, { weekday: 'long', day: 'numeric', month: 'long' });
}
function decalerDate(s, delta) {
    const [y, m, d] = s.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + delta);
    return dateStr(dt);
}
function joursDepuis(dateString) {
    const [y, m, d] = dateString.split('-').map(Number);
    const debut = new Date(y, m - 1, d);
    const maintenant = new Date(); maintenant.setHours(0, 0, 0, 0);
    return Math.floor((maintenant - debut) / 86400000);
}

// ---------- Couche de stockage (préfixe sn2:) ----------
const Store = {
    K: { profiles: 'sn2:profiles', current: 'sn2:current' },
    jKey: pid => 'sn2:journal:' + pid,
    rKey: pid => 'sn2:recents:' + pid,
    fKey: pid => 'sn2:favoris:' + pid,
    wKey: pid => 'sn2:poids:' + pid,

    read(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
    write(k, v) { localStorage.setItem(k, JSON.stringify(v)); },

    getProfiles() { return this.read(this.K.profiles, []); },
    setProfiles(p) { this.write(this.K.profiles, p); },
    getCurrentId() { return this.read(this.K.current, null); },
    setCurrentId(id) { this.write(this.K.current, id); },

    currentProfile() {
        const ps = this.getProfiles();
        return ps.find(p => p.id === this.getCurrentId()) || ps[0] || null;
    },
    newId() { return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); },
    ensureDefault() {
        let ps = this.getProfiles();
        if (ps.length === 0) {
            const p = { id: this.newId(), nom: 'Moi', emoji: '🧑', objectifs: { ...OBJECTIFS_DEFAUT }, cree: todayStr() };
            this.setProfiles([p]);
            this.setCurrentId(p.id);
        } else if (!this.currentProfile()) {
            this.setCurrentId(ps[0].id);
        }
    },
    addProfile(nom, emoji) {
        const ps = this.getProfiles();
        const p = { id: this.newId(), nom, emoji, objectifs: { ...OBJECTIFS_DEFAUT }, cree: todayStr() };
        ps.push(p);
        this.setProfiles(ps);
        this.setCurrentId(p.id);
        return p;
    },
    updateProfile(id, patch) {
        const ps = this.getProfiles();
        const i = ps.findIndex(p => p.id === id);
        if (i >= 0) { ps[i] = { ...ps[i], ...patch }; this.setProfiles(ps); }
    },
    deleteProfile(id) {
        const ps = this.getProfiles().filter(p => p.id !== id);
        this.setProfiles(ps);
        [this.jKey(id), this.rKey(id), this.fKey(id), this.wKey(id)].forEach(k => localStorage.removeItem(k));
        if (this.getCurrentId() === id) this.setCurrentId(ps[0] ? ps[0].id : null);
        this.ensureDefault();
    },

    getJournal(pid) { return this.read(this.jKey(pid), {}); },
    getDay(pid, date) {
        const d = this.getJournal(pid)[date] || {};
        const out = {};
        REPAS.forEach(r => out[r.key] = Array.isArray(d[r.key]) ? d[r.key] : []);
        return out;
    },
    setDay(pid, date, day) {
        const j = this.getJournal(pid);
        const vide = REPAS.every(r => (day[r.key] || []).length === 0);
        if (vide) delete j[date]; else j[date] = day;
        this.write(this.jKey(pid), j);
    },
    addItem(pid, date, meal, item) { const day = this.getDay(pid, date); day[meal].push(item); this.setDay(pid, date, day); },
    removeItem(pid, date, meal, idx) { const day = this.getDay(pid, date); day[meal].splice(idx, 1); this.setDay(pid, date, day); },
    setItemQty(pid, date, meal, idx, q) { const day = this.getDay(pid, date); if (day[meal][idx]) { day[meal][idx].quantite = q; this.setDay(pid, date, day); } },
    copierJour(pid, source, cible) {
        const day = this.getDay(pid, source);
        const clone = {};
        REPAS.forEach(r => clone[r.key] = (day[r.key] || []).map(it => ({ ...it, per100: { ...it.per100 } })));
        this.setDay(pid, cible, clone);
    },

    getRecents(pid) { return this.read(this.rKey(pid), []); },
    pushRecent(pid, base) {
        let rec = this.getRecents(pid).filter(x => x.nom !== base.nom);
        rec.unshift(base);
        this.write(this.rKey(pid), rec.slice(0, 12));
    },
    removeRecent(pid, idx) { const rec = this.getRecents(pid); rec.splice(idx, 1); this.write(this.rKey(pid), rec); },

    getFavoris(pid) { return this.read(this.fKey(pid), []); },
    addFavori(pid, nom, items) {
        const f = this.getFavoris(pid);
        f.unshift({ id: this.newId(), nom, items: items.map(it => ({ nom: it.nom, marque: it.marque || '', per100: { ...it.per100 }, quantite: it.quantite })) });
        this.write(this.fKey(pid), f.slice(0, 30));
    },
    removeFavori(pid, id) { this.write(this.fKey(pid), this.getFavoris(pid).filter(x => x.id !== id)); },

    getPoids(pid) { return this.read(this.wKey(pid), {}); },
    setPoids(pid, date, kg) { const w = this.getPoids(pid); if (kg > 0) w[date] = kg; else delete w[date]; this.write(this.wKey(pid), w); },
    getPoidsList(pid) { const w = this.getPoids(pid); return Object.keys(w).sort().map(d => ({ date: d, kg: w[d] })); },

    getLastBackup() { return this.read('sn2:lastBackup', null); },
    setLastBackup(d) { this.write('sn2:lastBackup', d); },
};

// ---------- État de l'interface ----------
const state = { view: 'today', date: todayStr(), addMeal: 'dejeuner', results: [], loading: false, lastQuery: '' };

// ---------- Calculs nutritionnels ----------
function calc(per100, q) {
    const r = (q || 0) / 100;
    return {
        kcal: per100.kcal * r, proteines: per100.proteines * r,
        glucides: per100.glucides * r, lipides: per100.lipides * r, fibres: per100.fibres * r,
    };
}
function totauxJour(day) {
    const t = { kcal: 0, proteines: 0, glucides: 0, lipides: 0, fibres: 0 };
    REPAS.forEach(r => (day[r.key] || []).forEach(it => {
        const c = calc(it.per100, it.quantite);
        t.kcal += c.kcal; t.proteines += c.proteines; t.glucides += c.glucides; t.lipides += c.lipides; t.fibres += c.fibres;
    }));
    return t;
}
function totalMeal(items) { return items.reduce((s, it) => s + calc(it.per100, it.quantite).kcal, 0); }

// ---------- Calcul des objectifs (Mifflin-St Jeor + TDEE + Cut/Maintien/Bulk) ----------
function calculerTDEE(c) {
    const bmr = 10 * c.poids + 6.25 * c.taille - 5 * c.age + (c.sexe === 'H' ? 5 : -161);
    return bmr * (FACTEURS_ACTIVITE[c.activite] || 1.2);
}
function calculerObjectifs(c) {
    const tdee = calculerTDEE(c);
    let kcal = tdee;
    if (c.but === 'cut') kcal = tdee * 0.8;        // -20 %
    else if (c.but === 'bulk') kcal = tdee * 1.15; // +15 %
    kcal = Math.max(1000, Math.round(kcal / 10) * 10);

    const protParKg = c.but === 'cut' ? 2.0 : (c.but === 'bulk' ? 1.8 : 1.6);
    const proteines = Math.round(protParKg * c.poids);
    const lipides = Math.round((kcal * 0.27) / 9);                 // 27 % des kcal
    const glucides = Math.round(Math.max(0, kcal - proteines * 4 - lipides * 9) / 4);
    return { kcal, proteines, glucides, lipides };
}

// ---------- API Open Food Facts ----------
async function chercherAliments(q) {
    const url = 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=' + encodeURIComponent(q)
        + '&json=1&page_size=20&fields=product_name,brands,nutriments,image_front_small_url&lc=' + LANG;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Réseau indisponible');
    const data = await res.json();
    return (data.products || [])
        .filter(p => p.product_name && num((p.nutriments || {})['energy-kcal_100g']) > 0)
        .map(mapProduit);
}
function mapProduit(p) {
    const n = p.nutriments || {};
    return {
        nom: (p.product_name || '').trim() || L().foodFallbackName,
        marque: (p.brands || '').split(',')[0].trim(),
        image: p.image_front_small_url || '',
        per100: {
            kcal: num(n['energy-kcal_100g']), proteines: num(n['proteins_100g']),
            glucides: num(n['carbohydrates_100g']), lipides: num(n['fat_100g']), fibres: num(n['fiber_100g']),
        },
    };
}
async function chercherParCodeBarre(code) {
    try {
        const res = await fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(code)
            + '.json?fields=product_name,brands,nutriments,image_front_small_url');
        const d = await res.json();
        if (d.status !== 1 || !d.product) { toast(L().scanNotFound); return; }
        sheetQuantite(mapProduit(d.product), { meal: state.addMeal });
    } catch { toast(L().scanNotFound); }
}

// ============================================================
//  LANGUE
// ============================================================
function applyStaticI18n() {
    document.documentElement.lang = LANG;
    document.title = L().title;
    $$('[data-i18n]').forEach(el => { const v = L()[el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
}
function setLang(lang) {
    if (lang !== 'fr' && lang !== 'en') return;
    LANG = lang;
    localStorage.setItem('sn2:lang', lang);
    applyStaticI18n();
    render();
}

// ============================================================
//  RENDU
// ============================================================
function render() {
    const p = Store.currentProfile();
    $('#profilechip .profilechip__emoji').textContent = p.emoji;
    $('#profilechip .profilechip__name').textContent = p.nom;

    $$('.tab').forEach(t => t.classList.toggle('tab--on', t.dataset.tab === state.view));
    $$('.view').forEach(v => v.hidden = true);
    $('#view-' + state.view).hidden = false;

    if (state.view === 'today') renderToday();
    else if (state.view === 'add') renderAdd();
    else if (state.view === 'stats') renderStats();
    else if (state.view === 'profil') renderProfil();
}

// ---------- Vue JOUR ----------
function renderToday() {
    const p = Store.currentProfile();
    const day = Store.getDay(p.id, state.date);
    const t = totauxJour(day);
    const obj = p.objectifs;
    const pct = obj.kcal ? Math.min(100, (t.kcal / obj.kcal) * 100) : 0;
    const reste = obj.kcal - t.kcal;
    const estAujourdhui = state.date === todayStr();

    const macroBar = (nom, val, cible, cls, unit = 'g') => `
        <div>
            <div class="macro__top"><span class="macro__name">${nom}</span><span class="muted">${r0(val)} / ${r0(cible)} ${unit}</span></div>
            <div class="bar"><div class="bar__fill ${cls}" style="width:${cible ? Math.min(100, val / cible * 100) : 0}%"></div></div>
        </div>`;

    const meals = REPAS.map(r => {
        const items = day[r.key];
        const lignes = items.length
            ? items.map((it, i) => {
                const c = calc(it.per100, it.quantite);
                return `
                <div class="item">
                    <div class="item__body" data-action="edit-qty" data-meal="${r.key}" data-index="${i}">
                        <div class="item__name">${esc(it.nom)}</div>
                        <div class="item__sub">${r0(it.quantite)} g · ${L().abbrevP} ${r1(c.proteines)} · ${L().abbrevC} ${r1(c.glucides)} · ${L().abbrevF} ${r1(c.lipides)}</div>
                    </div>
                    <div class="item__kcal">${r0(c.kcal)} kcal</div>
                    <button class="item__del" data-action="del-item" data-meal="${r.key}" data-index="${i}" title="${L().delete}">✕</button>
                </div>`;
            }).join('')
            : `<div class="empty-meal">${L().emptyMeal}</div>`;

        return `
        <div class="card meal">
            <div class="meal__head">
                <span class="meal__emoji">${r.emoji}</span>
                <span class="meal__name">${L().meals[r.key]}</span>
                <span class="meal__kcal">${r0(totalMeal(items))} kcal</span>
                ${items.length ? `<button class="addbtn favbtn" data-action="save-favori" data-meal="${r.key}" title="${L().saveFavorite}">⭐</button>` : ''}
                <button class="addbtn" data-action="add-to" data-meal="${r.key}" title="${L().add}">+</button>
            </div>
            ${lignes}
        </div>`;
    }).join('');

    $('#view-today').innerHTML = `
        <div class="datenav">
            <button class="iconbtn" data-action="date-prev">‹</button>
            <div class="center">
                <div class="datenav__label">${estAujourdhui ? L().today : formatDate(state.date)}</div>
                <div class="datenav__sub muted">${estAujourdhui ? formatDate(state.date) : (state.date === todayStr() ? '' : L().backToToday)}</div>
            </div>
            <button class="iconbtn" data-action="date-next">›</button>
        </div>

        <div class="card">
            <div class="summary">
                <div class="ring" style="--p:${pct}">
                    <div class="ring__val">
                        <div class="ring__num">${r0(t.kcal)}</div>
                        <div class="ring__unit">/ ${obj.kcal} kcal</div>
                    </div>
                </div>
                <div class="summary__macros">
                    ${macroBar(L().proteins, t.proteines, obj.proteines, 'p')}
                    ${macroBar(L().carbs, t.glucides, obj.glucides, 'g')}
                    ${macroBar(L().fats, t.lipides, obj.lipides, 'l')}
                </div>
            </div>
            <div class="remain">
                ${reste >= 0 ? L().remaining(r0(reste), r1(t.fibres)) : L().over(r0(-reste), r1(t.fibres))}
            </div>
        </div>

        ${meals}

        <button class="btn" data-action="add-to" data-meal="dejeuner">${L().addFood}</button>
        <button class="btn btn--ghost" data-action="copy-day" style="margin-top:10px">${L().copyDay}</button>
    `;

    $('.datenav__label').addEventListener('click', () => { state.date = todayStr(); renderToday(); });
}

// ---------- Vue AJOUTER ----------
function renderAdd() {
    const p = Store.currentProfile();
    const recents = Store.getRecents(p.id);
    const favoris = Store.getFavoris(p.id);
    const estAujourdhui = state.date === todayStr();

    const mealChips = REPAS.map(r =>
        `<button class="chip ${state.addMeal === r.key ? 'chip--on' : ''}" data-action="set-add-meal" data-meal="${r.key}">${r.emoji} ${L().meals[r.key]}</button>`
    ).join('');

    const favChips = favoris.length
        ? `<h2 class="title">${L().favorites}</h2><div class="chips" style="margin-bottom:8px">
             ${favoris.map(f => `<button class="chip" data-action="apply-favori" data-id="${f.id}">⭐ ${esc(f.nom)}<span class="chip__x" data-action="del-favori" data-id="${f.id}">✕</span></button>`).join('')}
           </div>`
        : '';

    const recentChips = recents.length
        ? `<h2 class="title">${L().quickAdd}</h2><div class="chips" style="margin-bottom:8px">
             ${recents.map((rec, i) => `<button class="chip" data-action="pick-recent" data-i="${i}">${esc(rec.nom)} · ${r0(rec.per100.kcal)}<span class="chip__x" data-action="del-recent" data-i="${i}">✕</span></button>`).join('')}
           </div>`
        : '';

    $('#view-add').innerHTML = `
        <h2 class="title">${L().whichMeal}</h2>
        <div class="chips">${mealChips}</div>
        <p class="muted" style="font-size:.8rem;margin:8px 0 0">📅 ${estAujourdhui ? L().today : formatDate(state.date)}</p>

        <button class="btn" data-action="scan" style="margin:14px 0 0">${L().scanBarcode}</button>

        <div class="search">
            <span>🔍</span>
            <input type="text" id="q" placeholder="${L().searchPlaceholder}" autocomplete="off" value="${esc(state.lastQuery)}">
        </div>

        ${favChips}
        ${recentChips}

        <div class="card" id="results" style="padding:6px 16px">
            <p class="muted center" style="padding:14px 0">${L().searchHint}</p>
        </div>

        <button class="btn btn--ghost" data-action="manual-add">${L().manualEntry}</button>
    `;

    const input = $('#q');
    let timer;
    input.addEventListener('input', e => {
        const q = e.target.value.trim();
        state.lastQuery = e.target.value;
        clearTimeout(timer);
        if (q.length < 2) { renderResults([], false); return; }
        renderResults([], true);
        timer = setTimeout(async () => {
            try {
                const list = await chercherAliments(q);
                state.results = list;
                if ($('#q')) renderResults(list, false);
            } catch {
                if ($('#results')) $('#results').innerHTML = `<p class="muted center" style="padding:14px 0">${L().offError}</p>`;
            }
        }, 350);
    });
    if (state.lastQuery.trim().length >= 2 && state.results.length) renderResults(state.results, false);
}

function renderResults(list, loading) {
    const box = $('#results');
    if (!box) return;
    if (loading) { box.innerHTML = `<div class="spinner">${L().searching}</div>`; return; }
    if (!list.length) {
        box.innerHTML = `<p class="muted center" style="padding:14px 0">${L().noResults}</p>`;
        return;
    }
    box.innerHTML = list.map((p, i) => `
        <button class="result" data-action="pick" data-i="${i}">
            ${p.image ? `<img class="result__img" src="${esc(p.image)}" alt="" loading="lazy">` : `<span class="result__img" style="display:grid;place-items:center">🍴</span>`}
            <span style="flex:1;min-width:0">
                <div class="result__name">${esc(p.nom)}</div>
                <div class="result__sub">${p.marque ? esc(p.marque) + ' · ' : ''}${r0(p.per100.kcal)} ${L().perKcal100}</div>
            </span>
            <span style="color:var(--accent);font-size:1.4rem">+</span>
        </button>
    `).join('');
}

// ---------- Vue PROGRÈS ----------
function renderStats() {
    const p = Store.currentProfile();
    const jours = [];
    for (let i = 13; i >= 0; i--) jours.push(decalerDate(todayStr(), -i));
    const valeurs = jours.map(d => totauxJour(Store.getDay(p.id, d)).kcal);
    const obj = p.objectifs.kcal;

    const joursActifs = valeurs.filter(v => v > 0);
    const moyenne = joursActifs.length ? joursActifs.reduce((a, b) => a + b, 0) / joursActifs.length : 0;
    const streak = calcStreak(p.id);
    const totalAuj = r0(totauxJour(Store.getDay(p.id, todayStr())).kcal);

    const poids = Store.getPoidsList(p.id);
    let poidsHtml;
    if (!poids.length) {
        poidsHtml = `<p class="muted center" style="padding:8px 0">${L().noWeight}</p>`;
    } else {
        const dernier = poids[poids.length - 1];
        const delta = r1(dernier.kg - poids[0].kg);
        const signe = delta > 0 ? '+' : '';
        poidsHtml = `
            <div class="statgrid" style="grid-template-columns:1fr 1fr">
                <div class="stat"><div class="stat__num">${r1(dernier.kg)} ${L().kg}</div><div class="stat__lbl">${L().currentWeight}</div></div>
                <div class="stat"><div class="stat__num">${signe}${delta} ${L().kg}</div><div class="stat__lbl">${L().weightChange}</div></div>
            </div>
            ${chartPoids(poids)}`;
    }

    $('#view-stats').innerHTML = `
        <h2 class="title">${L().yourProgress}</h2>
        <div class="statgrid">
            <div class="stat"><div class="stat__num">${streak}🔥</div><div class="stat__lbl">${L().daysStreak}</div></div>
            <div class="stat"><div class="stat__num">${totalAuj}</div><div class="stat__lbl">${L().kcalToday}</div></div>
            <div class="stat"><div class="stat__num">${r0(moyenne)}</div><div class="stat__lbl">${L().avgPerDay}</div></div>
        </div>

        <div class="card">
            <h2 class="title">${L().last14}</h2>
            ${chartSVG(jours, valeurs, obj)}
            <div class="chart-legend">
                <span><span class="dot" style="background:var(--good)"></span>${L().underGoal}</span>
                <span><span class="dot" style="background:var(--over)"></span>${L().aboveGoal}</span>
                <span><span class="dot" style="background:var(--ink-soft)"></span>${L().goalN(obj)}</span>
            </div>
        </div>

        <div class="card">
            <h2 class="title">${L().weightTracking}</h2>
            ${poidsHtml}
            <button class="btn btn--ghost" data-action="log-poids" style="margin-top:12px">${L().logWeight}</button>
        </div>
    `;
}

function calcStreak(pid) {
    const has = day => REPAS.some(r => (day[r.key] || []).length > 0);
    let d = todayStr();
    if (!has(Store.getDay(pid, d))) d = decalerDate(d, -1);
    let streak = 0;
    for (let i = 0; i < 366; i++) {
        if (has(Store.getDay(pid, d))) { streak++; d = decalerDate(d, -1); }
        else break;
    }
    return streak;
}

function chartSVG(jours, valeurs, objectif) {
    const W = 340, H = 170, padB = 22, padT = 10;
    const max = Math.max(objectif * 1.15, ...valeurs, 1);
    const n = valeurs.length;
    const gap = 6;
    const bw = (W - gap * (n - 1)) / n;
    const yOf = v => padT + (H - padB - padT) * (1 - v / max);

    const bars = valeurs.map((v, i) => {
        const x = i * (bw + gap);
        const y = yOf(v);
        const h = Math.max(0, (H - padB) - y);
        const col = v === 0 ? 'var(--track)' : (v <= objectif ? 'var(--good)' : 'var(--over)');
        const jourNum = jours[i].slice(8);
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${col}"/>
                ${i % 2 === 0 ? `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 6}" font-size="9" fill="var(--ink-soft)" text-anchor="middle">${jourNum}</text>` : ''}`;
    }).join('');

    const yObj = yOf(objectif);
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${L().chartAria}">
        <line x1="0" x2="${W}" y1="${yObj.toFixed(1)}" y2="${yObj.toFixed(1)}" stroke="var(--ink-soft)" stroke-width="1" stroke-dasharray="4 4"/>
        ${bars}
    </svg>`;
}

function chartPoids(entries) {
    const pts = entries.slice(-30);
    if (pts.length < 2) return `<p class="muted center" style="padding:6px 0;font-size:.82rem">${r1(pts[0].kg)} ${L().kg}</p>`;
    const W = 340, H = 130, padX = 10, padY = 16;
    const kgs = pts.map(p => p.kg);
    const min = Math.min(...kgs), max = Math.max(...kgs);
    const span = (max - min) || 1;
    const xOf = i => padX + (W - 2 * padX) * (i / (pts.length - 1));
    const yOf = kg => padY + (H - 2 * padY) * (1 - (kg - min) / span);
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${xOf(i).toFixed(1)},${yOf(p.kg).toFixed(1)}`).join(' ');
    const dots = pts.map((p, i) => `<circle cx="${xOf(i).toFixed(1)}" cy="${yOf(p.kg).toFixed(1)}" r="2.5" fill="var(--accent)"/>`).join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${L().weightTracking}">
        <path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}
    </svg>`;
}

// ---------- Vue PROFIL ----------
function renderProfil() {
    const p = Store.currentProfile();
    const all = Store.getProfiles();
    const o = p.objectifs;

    const autres = all.map(pr => `
        <div class="profilerow">
            <span class="profilerow__emoji">${pr.emoji}</span>
            <span class="profilerow__name">${esc(pr.nom)}</span>
            ${pr.id === p.id
            ? `<span class="badge">${L().current}</span>`
            : `<button class="chip" data-action="switch-profile" data-id="${pr.id}">${L().activate}</button>`}
            ${all.length > 1 ? `<button class="item__del" data-action="del-profile" data-id="${pr.id}" title="${L().delete}">🗑️</button>` : ''}
        </div>`).join('');

    $('#view-profil').innerHTML = `
        <h2 class="title">🌐 ${L().language}</h2>
        <div class="card">
            <div class="chips">
                <button class="chip ${LANG === 'fr' ? 'chip--on' : ''}" data-action="set-lang" data-lang="fr">🇫🇷 Français</button>
                <button class="chip ${LANG === 'en' ? 'chip--on' : ''}" data-action="set-lang" data-lang="en">🇬🇧 English</button>
            </div>
        </div>

        <h2 class="title">${L().profilesTitle}</h2>
        <div class="card">
            ${autres}
            <button class="btn btn--ghost" data-action="add-profile" style="margin-top:12px">${L().newPerson}</button>
        </div>

        <h2 class="title">${L().goalsOf(esc(p.nom))}</h2>
        <div class="card">
            <button class="btn btn--ghost" data-action="calc-goals" style="margin-bottom:14px">${L().calcGoals}</button>
            <form id="goals">
                <label class="field"><span>${L().kcalPerDay}</span><input class="inp" type="number" name="kcal" value="${o.kcal}" min="0"></label>
                <div class="grid2">
                    <label class="field"><span>${L().proteinsG}</span><input class="inp" type="number" name="proteines" value="${o.proteines}" min="0"></label>
                    <label class="field"><span>${L().carbsG}</span><input class="inp" type="number" name="glucides" value="${o.glucides}" min="0"></label>
                </div>
                <label class="field"><span>${L().fatsG}</span><input class="inp" type="number" name="lipides" value="${o.lipides}" min="0"></label>
                <button class="btn" type="submit">${L().saveGoals}</button>
            </form>
        </div>

        <h2 class="title">${L().backupTitle}</h2>
        <div class="card">
            <p class="muted" style="font-size:.85rem;margin-top:0">${L().backupDesc}</p>
            <button class="btn btn--ghost" data-action="export-data">${L().exportBtn}</button>
            <label class="btn btn--ghost" style="display:block;text-align:center;cursor:pointer">${L().importBtn}
                <input type="file" id="importfile" accept="application/json,.json" hidden>
            </label>
        </div>

        <div class="card center">
            <p class="muted" style="font-size:.8rem;margin:0">${L().aboutLine}<br>${L().aboutData}</p>
            <p class="muted" style="font-size:.78rem;margin:8px 0 0" id="installhint"></p>
        </div>
    `;

    $('#goals').addEventListener('submit', e => {
        e.preventDefault();
        const f = new FormData(e.target);
        Store.updateProfile(p.id, {
            objectifs: {
                kcal: num(f.get('kcal')), proteines: num(f.get('proteines')),
                glucides: num(f.get('glucides')), lipides: num(f.get('lipides')),
            }
        });
        toast(L().goalsSaved);
    });

    $('#importfile').addEventListener('change', async e => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const obj = JSON.parse(await file.text());
            if (!confirm(L().confirmImport)) return;
            Object.entries(obj).forEach(([k, v]) => { if (k.startsWith('sn2:')) localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); });
            const lng = localStorage.getItem('sn2:lang');
            if (lng === 'fr' || lng === 'en') LANG = lng;
            Store.ensureDefault();
            state.date = todayStr();
            applyStaticI18n();
            render();
            toast(L().imported);
        } catch { toast(L().invalidFile); }
    });

    const hint = $('#installhint');
    if (window.matchMedia('(display-mode: standalone)').matches) hint.textContent = L().installed;
    else if (deferredPrompt) hint.innerHTML = `<button class="chip" data-action="install">${L().installBtn}</button>`;
    else hint.textContent = L().installHint;
}

// ============================================================
//  FEUILLES (modales)
// ============================================================
let scanStream = null, scanRAF = null;

function openSheet(html, onMount) {
    $('#sheet-panel').innerHTML = `<div class="sheet__grip"></div>` + html;
    $('#sheet').hidden = false;
    if (onMount) onMount($('#sheet-panel'));
}
function closeSheet() {
    if (scanStream) { scanStream.getTracks().forEach(t => t.stop()); scanStream = null; }
    if (scanRAF) { cancelAnimationFrame(scanRAF); scanRAF = null; }
    $('#sheet').hidden = true;
    $('#sheet-panel').innerHTML = '';
}

function sheetQuantite(produit, { quantite = 100, meal = state.addMeal, mode = 'add', meal0 = null, index = null } = {}) {
    const mealChips = REPAS.map(r => `<button type="button" class="chip ${meal === r.key ? 'chip--on' : ''}" data-sheetmeal="${r.key}">${r.emoji} ${L().meals[r.key]}</button>`).join('');
    openSheet(`
        <h3>${esc(produit.nom)}</h3>
        <p class="muted" style="margin:2px 0 14px;font-size:.85rem">${produit.marque ? esc(produit.marque) + ' · ' : ''}${L().sheetPer100(r0(produit.per100.kcal))}</p>
        <label class="field"><span>${L().quantityG}</span><input class="inp" type="number" id="qte" value="${quantite}" min="1" inputmode="numeric"></label>
        <div class="preview" id="prev"></div>
        <p class="muted" style="font-size:.8rem;margin:6px 0">${L().mealLabel}</p>
        <div class="chips" id="sheetmeals" style="margin-bottom:16px">${mealChips}</div>
        <button class="btn" id="confirm">${mode === 'add' ? L().add : L().update}</button>
    `, panel => {
        let curMeal = meal;
        const qte = $('#qte', panel);
        const prev = $('#prev', panel);
        const maj = () => {
            const c = calc(produit.per100, num(qte.value));
            prev.innerHTML = `
                <div><b>${r0(c.kcal)}</b><small>${L().prevKcal}</small></div>
                <div><b>${r1(c.proteines)}</b><small>${L().prevProt}</small></div>
                <div><b>${r1(c.glucides)}</b><small>${L().prevCarb}</small></div>
                <div><b>${r1(c.lipides)}</b><small>${L().prevFat}</small></div>`;
        };
        maj();
        qte.addEventListener('input', maj);
        $('#sheetmeals', panel).addEventListener('click', e => {
            const b = e.target.closest('[data-sheetmeal]'); if (!b) return;
            curMeal = b.dataset.sheetmeal;
            $$('#sheetmeals .chip', panel).forEach(c => c.classList.toggle('chip--on', c.dataset.sheetmeal === curMeal));
        });
        $('#confirm', panel).addEventListener('click', () => {
            const q = num(qte.value);
            if (q <= 0) return;
            const pid = Store.currentProfile().id;
            if (mode === 'add') {
                Store.addItem(pid, state.date, curMeal, { nom: produit.nom, marque: produit.marque || '', per100: produit.per100, quantite: q });
                Store.pushRecent(pid, { nom: produit.nom, marque: produit.marque || '', per100: produit.per100 });
                toast(L().added);
            } else {
                if (curMeal !== meal0) {
                    Store.removeItem(pid, state.date, meal0, index);
                    Store.addItem(pid, state.date, curMeal, { nom: produit.nom, marque: produit.marque || '', per100: produit.per100, quantite: q });
                } else {
                    Store.setItemQty(pid, state.date, meal0, index, q);
                }
                toast(L().updated);
            }
            closeSheet();
            state.view = 'today';
            render();
        });
        qte.focus(); qte.select();
    });
}

function sheetManuel() {
    openSheet(`
        <h3>${L().manualTitle}</h3>
        <p class="muted" style="margin:2px 0 14px;font-size:.85rem">${L().manualDesc}</p>
        <form id="manual">
            <label class="field"><span>${L().name}</span><input class="inp" name="nom" required placeholder="${L().placeholderManualName}"></label>
            <div class="grid2">
                <label class="field"><span>${L().caloriesKcal}</span><input class="inp" type="number" name="kcal" value="0" min="0"></label>
                <label class="field"><span>${L().quantityG}</span><input class="inp" type="number" name="quantite" value="100" min="1"></label>
            </div>
            <div class="grid2">
                <label class="field"><span>${L().proteins}</span><input class="inp" type="number" name="proteines" value="0" min="0"></label>
                <label class="field"><span>${L().carbs}</span><input class="inp" type="number" name="glucides" value="0" min="0"></label>
            </div>
            <div class="grid2">
                <label class="field"><span>${L().fats}</span><input class="inp" type="number" name="lipides" value="0" min="0"></label>
                <label class="field"><span>${L().fiberLabel}</span><input class="inp" type="number" name="fibres" value="0" min="0"></label>
            </div>
            <button class="btn" type="submit">${L().addToMeal(L().meals[state.addMeal].toLowerCase())}</button>
        </form>
    `, panel => {
        $('#manual', panel).addEventListener('submit', e => {
            e.preventDefault();
            const f = new FormData(e.target);
            const produit = {
                nom: (f.get('nom') || '').trim() || L().foodFallbackName, marque: '',
                per100: { kcal: num(f.get('kcal')), proteines: num(f.get('proteines')), glucides: num(f.get('glucides')), lipides: num(f.get('lipides')), fibres: num(f.get('fibres')) },
            };
            const pid = Store.currentProfile().id;
            Store.addItem(pid, state.date, state.addMeal, { ...produit, quantite: num(f.get('quantite')) });
            Store.pushRecent(pid, produit);
            closeSheet();
            toast(L().added);
            state.view = 'today'; render();
        });
    });
}

function sheetProfil() {
    const emojis = EMOJIS_PROFIL.map((e, i) => `<button type="button" class="chip ${i === 0 ? 'chip--on' : ''}" data-emoji="${e}" style="font-size:1.2rem">${e}</button>`).join('');
    openSheet(`
        <h3>${L().newPersonTitle}</h3>
        <form id="np">
            <label class="field"><span>${L().firstName}</span><input class="inp" name="nom" required placeholder="${L().placeholderFirstName}"></label>
            <p class="muted" style="font-size:.8rem;margin:0 0 6px">${L().avatar}</p>
            <div class="chips" id="emojis" style="margin-bottom:16px">${emojis}</div>
            <button class="btn" type="submit">${L().createProfile}</button>
        </form>
    `, panel => {
        let emoji = EMOJIS_PROFIL[0];
        $('#emojis', panel).addEventListener('click', e => {
            const b = e.target.closest('[data-emoji]'); if (!b) return;
            emoji = b.dataset.emoji;
            $$('#emojis .chip', panel).forEach(c => c.classList.toggle('chip--on', c.dataset.emoji === emoji));
        });
        $('#np', panel).addEventListener('submit', e => {
            e.preventDefault();
            const nom = (new FormData(e.target).get('nom') || '').trim() || L().profileFallback;
            Store.addProfile(nom, emoji);
            closeSheet();
            state.date = todayStr();
            toast(L().profileCreated);
            render();
        });
    });
}

// ---------- V2 : Scanner de code-barres ----------
function sheetScanner() {
    if (!('BarcodeDetector' in window)) {
        openSheet(`<h3>${L().scanTitle}</h3><p class="muted" style="margin:8px 0 16px">${L().scanUnsupported}</p><button class="btn btn--ghost" data-action="close-sheet">OK</button>`);
        return;
    }
    openSheet(`
        <h3>${L().scanTitle}</h3>
        <div class="scanner"><video id="cam" playsinline muted></video><div class="scan-frame"></div></div>
        <p class="muted center" style="margin:0 0 8px">${L().scanning}</p>
        <button class="btn btn--ghost" data-action="close-sheet">${L().later}</button>
    `, async panel => {
        try {
            scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            const video = $('#cam', panel);
            video.srcObject = scanStream;
            await video.play();
            let detector;
            try { detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'] }); }
            catch { detector = new BarcodeDetector(); }
            const tick = async () => {
                if (!scanStream) return;
                try {
                    const codes = await detector.detect(video);
                    if (codes && codes.length) {
                        const code = codes[0].rawValue;
                        closeSheet();
                        chercherParCodeBarre(code);
                        return;
                    }
                } catch { /* image pas encore prête */ }
                scanRAF = requestAnimationFrame(tick);
            };
            scanRAF = requestAnimationFrame(tick);
        } catch {
            closeSheet();
            toast(L().scanNoCamera);
        }
    });
}

// ---------- V2 : Copier un jour ----------
function sheetCopierJour() {
    const pid = Store.currentProfile().id;
    const day = Store.getDay(pid, state.date);
    if (REPAS.every(r => day[r.key].length === 0)) { toast(L().nothingToCopy); return; }
    openSheet(`
        <h3>${L().copyDayTitle}</h3>
        <p class="muted" style="margin:6px 0 14px;font-size:.88rem">${L().copyDayDesc}</p>
        <label class="field"><span>${L().targetDate}</span><input class="inp" type="date" id="cible" value="${decalerDate(state.date, 1)}"></label>
        <button class="btn" id="docopy">${L().copy}</button>
    `, panel => {
        $('#docopy', panel).addEventListener('click', () => {
            const cible = $('#cible', panel).value;
            if (!cible) return;
            Store.copierJour(pid, state.date, cible);
            closeSheet();
            state.date = cible;
            toast(L().copied);
            state.view = 'today'; render();
        });
    });
}

// ---------- V2 : Favoris ----------
function sheetSaveFavori(meal) {
    const pid = Store.currentProfile().id;
    const items = Store.getDay(pid, state.date)[meal];
    if (!items.length) { toast(L().emptyMealFav); return; }
    openSheet(`
        <h3>${L().saveFavorite}</h3>
        <form id="favf">
            <label class="field"><span>${L().favoriteName}</span><input class="inp" name="nom" required placeholder="${L().favoriteNamePlaceholder}" value="${esc(L().meals[meal])}"></label>
            <button class="btn" type="submit">${L().save}</button>
        </form>
    `, panel => {
        $('#favf', panel).addEventListener('submit', e => {
            e.preventDefault();
            const nom = (new FormData(e.target).get('nom') || '').trim() || L().meals[meal];
            Store.addFavori(pid, nom, items);
            closeSheet();
            toast(L().favoriteSaved);
        });
    });
}

// ============================================================
//  V2 : Calcul des objectifs
// ============================================================
function sheetCalculateurObjectifs() {
    const pid = Store.currentProfile().id;
    const c = Store.currentProfile().calc || { sexe: 'H', age: 30, poids: 70, taille: 175, activite: 'mod', but: 'maintain' };
    const opt = (val, cur, txt) => `<option value="${val}" ${val === cur ? 'selected' : ''}>${txt}</option>`;
    openSheet(`
        <h3>${L().calcTitle}</h3>
        <form id="calc">
            <div class="grid2">
                <label class="field"><span>${L().sex}</span><select class="inp" name="sexe">${opt('H', c.sexe, L().male)}${opt('F', c.sexe, L().female)}</select></label>
                <label class="field"><span>${L().age}</span><input class="inp" type="number" name="age" value="${c.age}" min="10" max="100"></label>
            </div>
            <div class="grid2">
                <label class="field"><span>${L().weightKg}</span><input class="inp" type="number" name="poids" value="${c.poids}" min="20" step="0.1"></label>
                <label class="field"><span>${L().heightCm}</span><input class="inp" type="number" name="taille" value="${c.taille}" min="100" max="230"></label>
            </div>
            <label class="field"><span>${L().activity}</span><select class="inp" name="activite">
                ${opt('sed', c.activite, L().act_sed)}${opt('light', c.activite, L().act_light)}${opt('mod', c.activite, L().act_mod)}${opt('high', c.activite, L().act_high)}${opt('vhigh', c.activite, L().act_vhigh)}
            </select></label>
            <label class="field"><span>${L().goalAim}</span><select class="inp" name="but">
                ${opt('cut', c.but, L().aim_cut)}${opt('maintain', c.but, L().aim_maintain)}${opt('bulk', c.but, L().aim_bulk)}
            </select></label>
        </form>
        <div class="card" id="estim" style="background:var(--bg)"></div>
        <button class="btn" id="apply">${L().applyGoals}</button>
    `, panel => {
        const form = $('#calc', panel);
        const lire = () => {
            const f = new FormData(form);
            return { sexe: f.get('sexe'), age: num(f.get('age')), poids: num(f.get('poids')), taille: num(f.get('taille')), activite: f.get('activite'), but: f.get('but') };
        };
        const maj = () => {
            const c2 = lire();
            const o = calculerObjectifs(c2);
            const dailyDelta = o.kcal - calculerTDEE(c2);
            const kgWeek = r1(dailyDelta * 7 / 7700);
            const kgMonth = r1(dailyDelta * 30 / 7700);
            let estimPoids;
            if (c2.but === 'maintain' || Math.abs(kgWeek) < 0.05) {
                estimPoids = `<p class="center" style="margin:12px 0 0;font-size:.9rem">${L().weightStable}</p>`;
            } else {
                const ic = kgWeek < 0 ? '📉' : '📈';
                const sgnW = kgWeek > 0 ? '+' : '';
                const sgnM = kgMonth > 0 ? '+' : '';
                estimPoids = `<p class="center" style="margin:12px 0 0;font-size:.95rem">${ic} <b>${sgnW}${kgWeek} kg</b> ${L().perWeek} <span class="muted">(${sgnM}${kgMonth} kg ${L().perMonth})</span></p>`;
            }
            $('#estim', panel).innerHTML = `
                <p class="muted" style="margin:0 0 8px;font-size:.8rem">${L().estimate}</p>
                <div class="preview">
                    <div><b>${o.kcal}</b><small>kcal</small></div>
                    <div><b>${o.proteines}</b><small>${L().prevProt}</small></div>
                    <div><b>${o.glucides}</b><small>${L().prevCarb}</small></div>
                    <div><b>${o.lipides}</b><small>${L().prevFat}</small></div>
                </div>
                ${estimPoids}`;
        };
        maj();
        form.addEventListener('input', maj);
        form.addEventListener('change', maj);
        $('#apply', panel).addEventListener('click', () => {
            const c2 = lire();
            Store.updateProfile(pid, { objectifs: calculerObjectifs(c2), calc: c2 });
            closeSheet();
            toast(L().goalsApplied);
            render();
        });
    });
}

// ---------- V2 : Noter le poids ----------
function sheetPoids() {
    const pid = Store.currentProfile().id;
    const liste = Store.getPoidsList(pid);
    const dernier = liste.length ? liste[liste.length - 1].kg : 70;
    openSheet(`
        <h3>${L().weightTitle}</h3>
        <form id="pf">
            <label class="field"><span>${L().weightKg}</span><input class="inp" type="number" name="kg" value="${dernier}" min="20" step="0.1" inputmode="decimal"></label>
            <label class="field"><span>${L().dateLabel}</span><input class="inp" type="date" name="date" value="${todayStr()}"></label>
            <button class="btn" type="submit">${L().save}</button>
        </form>
    `, panel => {
        $('#pf', panel).addEventListener('submit', e => {
            e.preventDefault();
            const f = new FormData(e.target);
            const kg = num(f.get('kg')); const date = f.get('date') || todayStr();
            if (kg <= 0) return;
            Store.setPoids(pid, date, kg);
            closeSheet();
            toast(L().weightSaved);
            render();
        });
    });
}

// ============================================================
//  NAVIGATION & ÉVÉNEMENTS
// ============================================================
function showView(name) { state.view = name; render(); window.scrollTo(0, 0); }

document.addEventListener('click', e => {
    const el = e.target.closest('[data-action],[data-tab]');
    if (!el) return;

    if (el.dataset.tab) { showView(el.dataset.tab); return; }

    const a = el.dataset.action;
    const pid = Store.currentProfile().id;

    switch (a) {
        case 'goto-profil': showView('profil'); break;
        case 'set-lang': setLang(el.dataset.lang); break;

        case 'date-prev': state.date = decalerDate(state.date, -1); renderToday(); break;
        case 'date-next': state.date = decalerDate(state.date, +1); renderToday(); break;

        case 'add-to':
            state.addMeal = el.dataset.meal || state.addMeal;
            state.lastQuery = ''; state.results = [];
            showView('add');
            break;

        case 'set-add-meal':
            state.addMeal = el.dataset.meal;
            $$('#view-add .chips [data-action="set-add-meal"]').forEach(c => c.classList.toggle('chip--on', c.dataset.meal === state.addMeal));
            break;

        case 'del-item': Store.removeItem(pid, state.date, el.dataset.meal, +el.dataset.index); renderToday(); break;

        case 'edit-qty': {
            const it = Store.getDay(pid, state.date)[el.dataset.meal][+el.dataset.index];
            if (it) sheetQuantite(it, { quantite: it.quantite, meal: el.dataset.meal, mode: 'edit', meal0: el.dataset.meal, index: +el.dataset.index });
            break;
        }

        case 'pick': { const pr = state.results[+el.dataset.i]; if (pr) sheetQuantite(pr, { meal: state.addMeal }); break; }
        case 'pick-recent': { const rec = Store.getRecents(pid)[+el.dataset.i]; if (rec) sheetQuantite(rec, { meal: state.addMeal }); break; }
        case 'del-recent': Store.removeRecent(pid, +el.dataset.i); renderAdd(); break;
        case 'manual-add': sheetManuel(); break;

        case 'scan': sheetScanner(); break;
        case 'copy-day': sheetCopierJour(); break;
        case 'save-favori': sheetSaveFavori(el.dataset.meal); break;
        case 'apply-favori': {
            const fav = Store.getFavoris(pid).find(x => x.id === el.dataset.id);
            if (fav) {
                fav.items.forEach(it => Store.addItem(pid, state.date, state.addMeal, { nom: it.nom, marque: it.marque || '', per100: it.per100, quantite: it.quantite }));
                toast(L().favoriteAdded);
                state.view = 'today'; render();
            }
            break;
        }
        case 'del-favori': Store.removeFavori(pid, el.dataset.id); renderAdd(); break;
        case 'calc-goals': sheetCalculateurObjectifs(); break;
        case 'log-poids': sheetPoids(); break;

        case 'close-sheet': closeSheet(); break;

        case 'switch-profile':
            Store.setCurrentId(el.dataset.id);
            state.date = todayStr();
            render();
            toast(L().profileSwitched);
            break;
        case 'del-profile': {
            const prof = Store.getProfiles().find(p => p.id === el.dataset.id);
            if (prof && confirm(L().confirmDelete(prof.nom))) { Store.deleteProfile(el.dataset.id); render(); }
            break;
        }
        case 'add-profile': sheetProfil(); break;

        case 'export-data': exportData(); break;
        case 'install': installApp(); break;
    }
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

// ---------- Export ----------
function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('sn2:')) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mon-assiette-v2-' + todayStr() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    Store.setLastBackup(todayStr());
    closeSheet();
    toast(L().exported);
}

// ---------- Rappel de sauvegarde ----------
function sheetRappelSauvegarde() {
    openSheet(`
        <h3>${L().backupReminderTitle}</h3>
        <p class="muted" style="margin:6px 0 18px;font-size:.92rem">${L().backupReminderDesc}</p>
        <button class="btn" data-action="export-data">${L().exportNow}</button>
        <button class="btn btn--ghost" data-action="close-sheet" style="margin-top:10px">${L().later}</button>
    `);
}
function verifierRappelSauvegarde() {
    const last = Store.getLastBackup();
    if (!last) { Store.setLastBackup(todayStr()); return; }
    const aDesDonnees = Store.getProfiles().some(p => Object.keys(Store.getJournal(p.id)).length > 0);
    if (aDesDonnees && joursDepuis(last) >= 7) {
        Store.setLastBackup(todayStr());
        sheetRappelSauvegarde();
    }
}

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.hidden = true, 1800);
}

// ---------- PWA ----------
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (state.view === 'profil') renderProfil(); });
async function installApp() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (state.view === 'profil') renderProfil();
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => { }));
}

// ---------- Stockage durable ----------
if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persisted().then(persistant => { if (!persistant) navigator.storage.persist(); }).catch(() => { });
}

// ---------- Démarrage ----------
Store.ensureDefault();
applyStaticI18n();
render();
verifierRappelSauvegarde();
