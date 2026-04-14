import { ArrayVisualizer } from '../../visualizers/arrayVisualizer.js';

const visualizer = new ArrayVisualizer('array-container');
let currentData = [];
let currentPId = '2'; 

async function init() {
    const params = new URLSearchParams(window.location.search);
    currentPId = params.get('p') || '2';

    try {
        const modulePath = `../data/practico${currentPId}.js`;
        const module = await import(modulePath);
        currentData = module.practicoData || [];

        renderMenu();
        if (currentData.length > 0) loadExercise(currentData[0]);

    } catch (err) {
        console.error("❌ Error al cargar datos:", err);
    }
}

function loadExercise(ex) {
    if (!ex) return;

    // Renderizado de textos (Común a ambos prácticos)
    const mappings = {
        'ex-title': ex.titulo,
        'ex-letra': ex.letra,
        'ex-code': ex.solucionJava,
        'ex-pre': ex.pre,
        'ex-pos': ex.pos,
        'ex-tip': ex.tip,
        'ex-theory': ex.teoria,
        'complexity-badge': ex.complexity
    };

    Object.entries(mappings).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'ex-code') el.textContent = val || "// Sin solución";
            else el.innerText = val || "N/A";
        }
    });

    // Control de UI según el módulo
    const arrayVis = document.getElementById('array-container');
    const stackVis = document.getElementById('stack-container');
    const inputGroup = document.getElementById('input-group');
    const label = document.getElementById('visualizer-label');
    const btnRun = document.getElementById('btn-run');

    if (currentPId === '3') {
        // MODO RECURSIVIDAD: Estático y limpio
        arrayVis.classList.add('hidden');
        stackVis.classList.remove('hidden');
        inputGroup.classList.add('hidden'); // No interactivo por ahora
        label.innerText = "STACK_REFERENCE_VIEW";
        
        stackVis.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-zinc-600 dark:text-zinc-500 italic">
                <svg class="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-xs uppercase tracking-widest font-black">Análisis de Recursión</p>
                <p class="text-[10px]">Consulta el código en el panel lateral para ver la implementación.</p>
            </div>
        `;
        
        btnRun.classList.add('opacity-20', 'cursor-not-allowed');
        btnRun.disabled = true;
        btnRun.innerText = "NO_INTERACTIVE_MODE";
    } else {
        // MODO VECTORES: Tu lógica original con animaciones
        arrayVis.classList.remove('hidden');
        stackVis.classList.add('hidden');
        label.innerText = "HEAP_MEMORY_VIEW";
        btnRun.classList.remove('opacity-20', 'cursor-not-allowed');
        btnRun.disabled = false;
        btnRun.innerText = "Compile & Execute";

        if (ex.v_ejemplo) {
            visualizer.render(ex.v_ejemplo);
            btnRun.onclick = () => runSortAnimation(ex);
        } else {
            // Si no tiene vector de ejemplo (ejercicios 1 al 9 del P2)
            arrayVis.innerHTML = '<p class="text-zinc-500 italic">Ejercicio de lógica procedimental.</p>';
            btnRun.disabled = true;
        }
    }
}

// TU LÓGICA DE ANIMACIÓN (INTACTA)
async function runSortAnimation(ex) {
    const btn = document.getElementById('btn-run');
    btn.disabled = true;
    btn.innerText = "SIMULANDO...";

    let arr = [...ex.v_ejemplo];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        visualizer.render(arr, { i, message: `Pasada ${i + 1}` });
        await new Promise(r => setTimeout(r, 600));

        for (let j = 0; j < n - i - 1; j++) {
            visualizer.render(arr, { i, j, jPlus1: j + 1 });
            visualizer.highlight(j, j + 1, 'compare');
            await new Promise(r => setTimeout(r, 400));

            if (arr[j] > arr[j + 1]) {
                visualizer.highlight(j, j + 1, 'swap');
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await new Promise(r => setTimeout(r, 300));
                visualizer.render(arr, { i, j, jPlus1: j + 1 });
                swapped = true;
            }
            visualizer.highlight(j, j + 1, 'reset');
        }
        if (ex.id === 11 && !swapped) break;
    }
    visualizer.render(arr, { message: "¡Completado!" });
    btn.disabled = false;
    btn.innerText = "Compile & Execute";
}

function renderMenu() {
    const nav = document.getElementById('exercise-nav');
    nav.innerHTML = '';
    currentData.forEach((ex, idx) => {
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

document.addEventListener('DOMContentLoaded', init);
