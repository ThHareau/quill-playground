if (!window.translations) {
  window.translations = {
    'last-name': 'Nom',
    'first-name': 'Prénom',
  }
}

// eslint-disable-next-line import/prefer-default-export
export const t = (key, def) => window.translations[key] || (def == null ? key : def)
