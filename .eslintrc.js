module.exports = {
  extends: [
    "airbnb", "prettier", "prettier/react"
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "consistent-return": "off",
  }
}
