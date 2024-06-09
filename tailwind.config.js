/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: tailwind.config.js
 * Descripción: Archivo de configuración de Tailwind CSS para definir las rutas de purga, modo oscuro, temas, variantes y plugins.
 */

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Rutas de purga para eliminar CSS no utilizado en producción
  darkMode: false, // Modo oscuro desactivado
  theme: {
    extend: {}, // Extensiones del tema (vacío por defecto)
  },
  variants: {
    extend: {}, // Extensiones de variantes (vacío por defecto)
  },
  plugins: [], // Plugins adicionales de Tailwind CSS (vacío por defecto)
}
