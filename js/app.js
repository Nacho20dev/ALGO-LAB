// js/app.js
import { initTheme, toggleTheme } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("ALGO::LAB Core Inicializado");
    
    // Configuración inicial del tema e iconos
    initTheme();

    // Asignar el evento al botón de la Home
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }
});