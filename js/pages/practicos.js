import { ArrayVisualizer } from '../../visualizers/arrayVisualizer.js';

const visualizer = new ArrayVisualizer('array-container');
let currentData = [];
let currentPId = '2'; 

/**
 * Inicializa el módulo cargando los datos dinámicamente según el ID del práctico.
 */

    async function init() {
    const params = new URLSearchParams(window.location.search);
    currentPId = params.get('p') || '2';

    try {
        const modulePath = `../data/practico${currentPId}.js`;
        const module = await import(modulePath);
        
        let rawData = module.practicoData || module.practico3Data || module.practico4Data || [];

        // --- SOLUCIÓN PARA PRÁCTICO 4 ---
        // Si la data es un Objeto (como mandaste), la convertimos a Array para el menú
        if (!Array.isArray(rawData)) {
            currentData = Object.entries(rawData).flatMap(([key, ej]) => {
                // Mapeamos los sub-items (1a, 1b...) como si fueran ejercicios individuales
                return ej.items.map(item => ({
                    id: item.id,
                    titulo: `${ej.titulo}: ${item.tag}`,
                    letra: `Implementación de ${item.tag} (Java)`,
                    solucionJava: `// ITERATIVO\n${item.iter}\n\n// RECURSIVO\n${item.rec}`,
                    teoria: ej.titulo,
                    complexity: "O(n)"
                }));
            });
        } else {
            currentData = rawData;
        }

        renderMenu();
        if (currentData.length > 0) loadExercise(currentData[0]);

    } catch (err) {
        console.error("❌ Error al cargar datos:", err);
        const nav = document.getElementById('exercise-nav');
        if (nav) nav.innerHTML = '<p class="text-[10px] text-javaRed p-4">ERROR_DATA_STRUCTURE</p>';
    }
}
    

/**
 * Carga la información de un ejercicio específico y configura la UI.
 */

function loadExercise(ex) {
    if (!ex) return;

    // 1. MAPEADO DE TEXTOS
    // Usamos cortocircuitos (||) para soportar tanto el formato de Vectores como el de Listas
    const mappings = {
        'ex-title': ex.titulo,
        'ex-letra': ex.letra,
        'ex-code': ex.solucionJava || ex.codigo || "// Sin código disponible",
        'ex-pre': ex.pre || "Lista inicializada (posiblemente vacía).",
        'ex-pos': ex.pos || "Estructura actualizada según el método.",
        'ex-tip': ex.tip || "Verificar punteros y el caso borde de nodo inicial null.",
        'ex-theory': ex.teoria || "Estructuras de Datos Dinámicas",
        'complexity-badge': ex.complexity || "O(n)"
    };

    Object.entries(mappings).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'ex-code') el.textContent = val;
            else el.innerText = val;
        }
    });

    // 2. CONFIGURACIÓN DE ELEMENTOS UI
    const arrayVis = document.getElementById('array-container');
    const stackVis = document.getElementById('stack-container');
    const inputGroup = document.getElementById('input-group');
    const label = document.getElementById('visualizer-label');
    const btnRun = document.getElementById('btn-run');

    // Reset general de visibilidad
    arrayVis.classList.add('hidden');
    stackVis.classList.add('hidden');
    inputGroup.classList.add('hidden');

    // --- LÓGICA POR MÓDULO ---

    if (currentPId === '3') {
        // MODO RECURSIVIDAD
        stackVis.classList.remove('hidden');
        label.innerText = "STACK_REFERENCE_VIEW";
        btnRun.disabled = true;
        btnRun.classList.add('opacity-20');
        btnRun.innerText = "NO_INTERACTIVE_MODE";
    } 
    else if (currentPId === '4') {
        // MODO LISTAS (Tu nuevo práctico)
        arrayVis.classList.remove('hidden');
        label.innerText = "LINKED_STRUCTURE_VIEW";
        btnRun.disabled = true;
        btnRun.classList.add('opacity-20');
        btnRun.innerText = "LOGICAL_VIEW_ONLY";
        
        // Llamamos a la función que dibuja los nodos (aseguráte de tenerla al final del archivo)
        renderListStatic(arrayVis); 
    } 
    else {
        // MODO VECTORES (DEFAULT / P2)
        arrayVis.classList.remove('hidden');
        inputGroup.classList.remove('hidden');
        label.innerText = "HEAP_MEMORY_VIEW";
        btnRun.disabled = false;
        btnRun.classList.remove('opacity-20');
        btnRun.innerText = "Compile & Execute";

        if (ex.v_ejemplo) {
            visualizer.render(ex.v_ejemplo);
            btnRun.onclick = () => runSortAnimation(ex);
        } else {
            arrayVis.innerHTML = '<p class="text-zinc-500 italic text-xs">Vista lógica no disponible para este ejercicio.</p>';
            btnRun.disabled = true;
            btnRun.classList.add('opacity-20');
        }
    }
}
       

/**
 * Renderiza el menú lateral con la lista de ejercicios.
 */
function renderMenu() {
    const nav = document.getElementById('exercise-nav');
    if (!nav) return;
    nav.innerHTML = '';

    currentData.forEach((ex) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3 rounded-xl transition-all text-sm font-medium hover:bg-white/5 border border-transparent mb-1 group flex items-center gap-3";
        
        btn.innerHTML = `
            <span class="text-[9px] text-zinc-500 font-bold bg-white/5 px-2 py-1 rounded">EJ ${ex.id}</span>
            <span class="group-hover:text-javaRed truncate transition-colors">${ex.titulo}</span>
        `;
        
        btn.onclick = () => {
            document.querySelectorAll('#exercise-nav button').forEach(b => b.classList.remove('bg-white/5', 'border-white/10'));
            btn.classList.add('bg-white/5', 'border-white/10');
            loadExercise(ex);
        };
        nav.appendChild(btn);
    });
}

/**
 * Simulación visual de una lista encadenada.
 */
function renderListStatic(container) {
    container.innerHTML = `
        <div class="flex items-center gap-2 p-6 overflow-x-auto w-full justify-center animate-fade-in">
            <div class="flex flex-col items-center mr-4">
                <span class="text-[8px] font-black text-javaRed uppercase mb-1 tracking-widest">Head</span>
                <div class="w-8 h-8 rounded-full border-2 border-javaRed flex items-center justify-center shadow-[0_0_10px_rgba(231,20,13,0.3)]">
                    <div class="w-2 h-2 bg-javaRed rounded-full"></div>
                </div>
            </div>
            ${[10, 25, 40].map((val) => `
                <div class="flex items-center">
                    <div class="w-16 h-12 rounded-xl border border-white/10 bg-white/5 flex flex-col shadow-xl">
                        <div class="flex-1 flex items-center justify-center font-bold text-xs text-zinc-200">${val}</div>
                        <div class="h-3 bg-white/10 text-[6px] flex items-center justify-center opacity-40 font-mono italic">next</div>
                    </div>
                    <div class="px-3 text-javaBlue font-black animate-pulse">→</div>
                </div>
            `).join('')}
            <div class="text-[9px] font-black opacity-30 italic text-zinc-500 uppercase">NULL</div>
        </div>
    `;
}

/**
 * Lógica de animación para algoritmos de ordenamiento (PId 2).
 */
async function runSortAnimation(ex) {
    const btn = document.getElementById('btn-run');
    btn.disabled = true;
    btn.innerText = "SIMULANDO...";

    let arr = [...ex.v_ejemplo];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            visualizer.render(arr, { i, j, jPlus1: j + 1 });
            visualizer.highlight(j, j + 1, 'compare');
            await new Promise(r => setTimeout(r, 400));

            if (arr[j] > arr[j + 1]) {
                visualizer.highlight(j, j + 1, 'swap');
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await new Promise(r => setTimeout(r, 300));
                visualizer.render(arr, { i, j, jPlus1: j + 1 });
            }
            visualizer.highlight(j, j + 1, 'reset');
        }
    }
    visualizer.render(arr, { message: "¡Completado!" });
    btn.disabled = false;
    btn.innerText = "Compile & Execute";
}

document.addEventListener('DOMContentLoaded', init);
