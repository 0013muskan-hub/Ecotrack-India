import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for EcoTrack India (pure React JSX)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
});
