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
        
        // Soporte para múltiples nombres de exportación
        currentData = module.practicoData || module.practico3Data || module.practico4Data || [];

        renderMenu();
        if (currentData.length > 0) loadExercise(currentData[0]);

    } catch (err) {
        console.error("❌ Error al cargar datos:", err);
        const nav = document.getElementById('exercise-nav');
        if (nav) nav.innerHTML = '<p class="text-[10px] text-javaRed p-4">ERROR_LOADING_MODULE</p>';
    }
}

/**
 * Carga la información de un ejercicio específico y configura la UI.
 */
function loadExercise(ex) {
    if (!ex) return;

    // 1. Mapeo de textos a la interfaz
    const mappings = {
        'ex-title': ex.titulo,
        'ex-letra': ex.letra,
        'ex-code': ex.solucionJava || ex.codigo,
        'ex-pre': ex.pre,
        'ex-pos': ex.pos,
        'ex-tip': ex.tip,
        'ex-theory': ex.teoria,
        'complexity-badge': ex.complexity || ex.complejidad
    };

    Object.entries(mappings).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'ex-code') el.textContent = val || "// Solución no disponible";
            else el.innerText = val || "N/A";
        }
    });

    // 2. Control de visualización según el tipo de práctico
    const arrayVis = document.getElementById('array-container');
    const stackVis = document.getElementById('stack-container');
    const inputGroup = document.getElementById('input-group');
    const label = document.getElementById('visualizer-label');
    const btnRun = document.getElementById('btn-run');

    // Reset de estados comunes
    arrayVis.classList.add('hidden');
    stackVis.classList.add('hidden');
    inputGroup.classList.add('hidden');
    btnRun.disabled = true;
    btnRun.classList.add('opacity-20');

    if (currentPId === '3') {
        // MODO RECURSIVIDAD
        stackVis.classList.remove('hidden');
        label.innerText = "STACK_REFERENCE_VIEW";
        btnRun.innerText = "NO_INTERACTIVE_MODE";
        
        stackVis.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-zinc-500 italic">
                <p class="text-xs uppercase tracking-widest font-black">Recursion Analysis</p>
                <p class="text-[10px]">Visualización lógica en desarrollo.</p>
            </div>`;
    } 
    else if (currentPId === '4') {
        // MODO LISTAS SIMPLES
        arrayVis.classList.remove('hidden');
        label.innerText = "LINKED_STRUCTURE_VIEW";
        btnRun.innerText = "LOGICAL_VIEW_ONLY";
        renderListStatic(arrayVis); 
    } 
    else {
        // MODO VECTORES (DEFAULT)
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
            arrayVis.innerHTML = '<p class="text-zinc-500 italic text-xs">Ejercicio procedimental.</p>';
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
