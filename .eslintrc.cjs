/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: .eslintrc.js
 * Descripción: Configuración de ESLint para el proyecto React.
 ***********************************************/

module.exports = {
  root: true,
  env: {
    browser: true, // El entorno es el navegador
    es2020: true,  // Soporte para ES2020
  },
  extends: [
    'eslint:recommended', // Extiende las reglas recomendadas de ESLint
    'plugin:react/recommended', // Extiende las reglas recomendadas del plugin de React
    'plugin:react/jsx-runtime', // Soporte para el nuevo JSX transform de React 17+
    'plugin:react-hooks/recommended', // Reglas recomendadas para hooks de React
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Ignorar las carpetas 'dist' y el archivo '.eslintrc.cjs'
  parserOptions: {
    ecmaVersion: 'latest', // Soporte para la última versión de ECMAScript
    sourceType: 'module', // Usar módulos ES6
  },
  settings: {
    react: {
      version: '18.2', // Versión de React
    },
  },
  plugins: ['react-refresh'], // Usar el plugin react-refresh
  rules: {
    'react/jsx-no-target-blank': 'off', // Desactivar la regla para los enlaces con target _blank
    'react-refresh/only-export-components': [
      'warn', // Mostrar advertencia si no se cumple la regla
      { allowConstantExport: true }, // Permitir exportación constante
    ],
  },
}
