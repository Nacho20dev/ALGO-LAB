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
        
        // Normalización de la fuente de datos
        currentData = module.practicoData || module.practico3Data || module.practico4Data || [];

        renderMenu();
        if (currentData.length > 0) loadExercise(currentData[0]);

    } catch (err) {
        console.error("❌ Error al cargar datos:", err);
    }
}


 
function loadExercise(ex) {
    if (!ex) return;

    // Renderizado de textos (Común a todos los prácticos)
    const mappings = {
        'ex-title': ex.titulo,
        'ex-letra': ex.letra,
        'ex-code': ex.solucionJava || ex.codigo, // Soporta ambas variantes
        'ex-pre': ex.pre,
        'ex-pos': ex.pos,
        'ex-tip': ex.tip,
        'ex-theory': ex.teoria,
        'complexity-badge': ex.complexity || ex.complejidad
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
        // MODO RECURSIVIDAD
        arrayVis.classList.add('hidden');
        stackVis.classList.remove('hidden');
        inputGroup.classList.add('hidden');
        label.innerText = "STACK_REFERENCE_VIEW";
        
        stackVis.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-zinc-600 dark:text-zinc-500 italic">
                <svg class="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-xs uppercase tracking-widest font-black">Análisis de Recursión</p>
                <p class="text-[10px]">Consulta el código en el panel lateral.</p>
            </div>
        `;
        
        btnRun.classList.add('opacity-20', 'cursor-not-allowed');
        btnRun.disabled = true;
        btnRun.innerText = "NO_INTERACTIVE_MODE";

    } else if (currentPId === '4') {
        // MODO LISTAS (Inyectado)
        arrayVis.classList.remove('hidden');
        stackVis.classList.add('hidden');
        inputGroup.classList.add('hidden');
        label.innerText = "LINKED_STRUCTURE_VIEW";
        
        renderListStatic(arrayVis); 

        btnRun.classList.add('opacity-20', 'cursor-not-allowed');
        btnRun.disabled = true;
        btnRun.innerText = "LOGICAL_VIEW_ONLY";

    } else {
        // MODO VECTORES
        arrayVis.classList.remove('hidden');
        stackVis.classList.add('hidden');
        inputGroup.classList.remove('hidden');
        label.innerText = "HEAP_MEMORY_VIEW";
        btnRun.classList.remove('opacity-20', 'cursor-not-allowed');
        btnRun.disabled = false;
        btnRun.innerText = "Compile & Execute";

        if (ex.v_ejemplo) {
            visualizer.render(ex.v_ejemplo);
            btnRun.onclick = () => runSortAnimation(ex);
        } else {
            arrayVis.innerHTML = '<p class="text-zinc-500 italic text-xs">Ejercicio de lógica procedimental.</p>';
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

function renderListStatic(container) {
    container.innerHTML = `
        <div class="flex items-center gap-2 p-4 animate-fade-in overflow-x-auto">
            <div class="flex flex-col items-center mr-2">
                <span class="text-[8px] font-black text-javaRed uppercase mb-1">Head</span>
                <div class="w-8 h-8 rounded-full border-2 border-javaRed flex items-center justify-center">
                    <div class="w-2 h-2 bg-javaRed rounded-full"></div>
                </div>
            </div>
            ${[10, 20, 30].map((val, idx) => `
                <div class="flex items-center">
                    <div class="w-16 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 flex flex-col shadow-lg">
                        <div class="flex-1 flex items-center justify-center font-bold text-xs">${val}</div>
                        <div class="h-3 bg-zinc-100 dark:bg-white/5 text-[6px] flex items-center justify-center opacity-40 font-mono italic">next</div>
                    </div>
                    <div class="px-2 text-javaBlue font-black">→</div>
                </div>
            `).join('')}
            <div class="text-[9px] font-black opacity-30 italic">NULL</div>
        </div>
    `;
}




}

document.addEventListener('DOMContentLoaded', init);
