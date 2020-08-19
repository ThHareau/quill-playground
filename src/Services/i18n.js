if (!window.translations) {
    console.debug("Setting translations")
    window.translations = {
        'last-name': 'Nom',
        'first-name': 'Prénom',
    }
}

export const t = (key, def) => window.translations[key] || (def == null ? key : def)
