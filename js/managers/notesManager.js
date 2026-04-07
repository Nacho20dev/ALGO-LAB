// js/managers/notesManager.js
import { diarioClases } from '../data/apuntes.js';

export const NotesManager = {
    // 1. Obtener todos los apuntes (JS + LocalStorage)
    getAllNotes() {
        const localNotes = JSON.parse(localStorage.getItem('algo_lab_notes')) || [];
        // Filtramos para no duplicar si ya están en el JS
        const combined = [...diarioClases, ...localNotes];
        return combined.sort((a, b) => b.id - a.id); // Más nuevos primero
    },

    // 2. Guardar o Actualizar un apunte
    saveNote(noteData) {
        let localNotes = JSON.parse(localStorage.getItem('algo_lab_notes')) || [];
        const index = localNotes.findIndex(n => n.id === noteData.id);

        if (index > -1) {
            localNotes[index] = noteData; // Editar
        } else {
            localNotes.push(noteData); // Nuevo
        }

        localStorage.setItem('algo_lab_notes', JSON.stringify(localNotes));
        window.dispatchEvent(new Event('notesUpdated')); // Avisar al Index
    },

    // 3. Eliminar
    deleteNote(id) {
        let localNotes = JSON.parse(localStorage.getItem('algo_lab_notes')) || [];
        localNotes = localNotes.filter(n => n.id !== id);
        localStorage.setItem('algo_lab_notes', JSON.stringify(localNotes));
        window.location.href = '../index.html'; // Volver al home tras borrar
    }
};