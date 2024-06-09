import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

/*
Este archivo de configuración `vite.config.js` está configurado para utilizar Vite con React. 

### Descripción de las secciones:

1. **Importaciones**:
    - `defineConfig` se importa desde Vite para definir la configuración de manera tipada.
    - `react` se importa desde `@vitejs/plugin-react` para habilitar soporte para React en Vite.

2. **Configuración**:
    - `plugins`: Aquí se añade el plugin de React a la configuración de Vite para que Vite pueda procesar los archivos de React correctamente.

Este archivo es esencial para configurar un entorno de desarrollo rápido y eficiente con Vite y React.
*/
