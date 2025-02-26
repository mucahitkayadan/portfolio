import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: UserConfig = {
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
};

export default defineConfig(config); 