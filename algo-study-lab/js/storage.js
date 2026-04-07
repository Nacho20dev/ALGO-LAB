// js/storage.js

/**
 * Inicializa el tema basado en el almacenamiento local o preferencia del sistema.
 * Se encarga de poner el icono correcto al cargar la página.
 */
export function initTheme() {
    const themeIcon = document.getElementById('themeIcon');
    
    // Aplicar clase dark si corresponde (doble check por si falló el script del head)
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Sincronizar el emoji/icono del botón
    if (themeIcon) {
        themeIcon.innerText = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    }
}

/**
 * Cambia el tema, guarda en localStorage y actualiza el icono.
 */
export function toggleTheme() {
    const themeIcon = document.getElementById('themeIcon');
    
    document.documentElement.classList.toggle('dark');
    
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    
    if (themeIcon) {
        themeIcon.innerText = isDark ? '☀️' : '🌙';
    }
}