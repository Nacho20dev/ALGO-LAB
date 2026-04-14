import { ArrayVisualizer } from '../../visualizers/arrayVisualizer.js';

const visualizer = new ArrayVisualizer('array-container');
let currentData = [];
let currentPId = '2'; // Variable para saber en qué práctico estamos

async function init() {
    const params = new URLSearchParams(window.location.search);
    currentPId = params.get('p') || '2';

    try {
        const modulePath = `../data/practico${currentPId}.js`;
        const module = await import(modulePath);
        currentData = module.practicoData || module[`practico${currentPId}Data`] || Object.values(module)[0];

        if (!currentData || !Array.isArray(currentData)) throw new Error("Data no válida.");

        renderMenu();
        if (currentData.length > 0) loadExercise(currentData[0]);

    } catch (err) {
        console.error("❌ Error:", err);
    }
}

function loadExercise(ex) {
    if (!ex) return;

    // Mapeo de campos
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

    // --- LÓGICA DE VISIBILIDAD SEGÚN EL PRÁCTICO ---
    const arrayVis = document.getElementById('array-container');
    const stackVis = document.getElementById('stack-container');
    const inputGroup = document.getElementById('input-group');
    const label = document.getElementById('visualizer-label');
    const btnRun = document.getElementById('btn-run');

    if (currentPId === '3') {
        // Modo Recursividad
        arrayVis.classList.add('hidden');
        stackVis.classList.remove('hidden');
        inputGroup.classList.remove('hidden');
        label.innerText = "STACK_TRACE_VIEW";
        stackVis.innerHTML = '<p class="text-zinc-500 italic text-xs">Esperando ejecución para apilar llamadas...</p>';
        
        btnRun.onclick = () => {
            // Por ahora solo una simulación simple de "Ejecutado" sin animaciones complejas
            stackVis.innerHTML = `<div class="p-4 rounded-xl bg-javaBlue/10 border border-javaBlue/20 text-javaBlue text-xs font-bold animate-bounce">Llamada inicial ejecutada: ${ex.titulo}</div>`;
        };
    } else {
        // Modo Vectores (Tu lógica original)
        arrayVis.classList.remove('hidden');
        stackVis.classList.add('hidden');
        inputGroup.classList.add('hidden');
        label.innerText = "HEAP_MEMORY_VIEW";

        if (ex.v_ejemplo) {
            visualizer.render(ex.v_ejemplo);
            btnRun.onclick = () => runSortAnimation(ex);
            btnRun.disabled = false;
        }
    }
}

// TU LÓGICA DE ANIMACIÓN (SIN TOCAR)
async function runSortAnimation(ex) {
    const btn = document.getElementById('btn-run');
    btn.disabled = true;
    btn.innerText = "SIMULANDO...";

    let arr = [...ex.v_ejemplo];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        visualizer.render(arr, { i, message: `Pasada ${i + 1}: El límite es el índice ${n - i - 1}` });
        await new Promise(r => setTimeout(r, 800));

        for (let j = 0; j < n - i - 1; j++) {
            visualizer.render(arr, { i, j, jPlus1: j + 1 });
            visualizer.highlight(j, j + 1, 'compare', `¿${arr[j]} > ${arr[j+1]}?`);
            await new Promise(r => setTimeout(r, 600));

            if (arr[j] > arr[j + 1]) {
                visualizer.highlight(j, j + 1, 'swap', `¡Sí! Intercambiando ${arr[j]} por ${arr[j+1]}`);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await new Promise(r => setTimeout(r, 400));
                visualizer.render(arr, { i, j, jPlus1: j + 1 });
                swapped = true;
            }
            visualizer.highlight(j, j + 1, 'reset');
        }
        if (ex.id === 11 && !swapped) break;
    }
    visualizer.render(arr, { message: "¡Ordenamiento completado!" });
    btn.disabled = false;
    btn.innerText = "EJECUTAR LÓGICA";
}

function renderMenu() {
    const nav = document.getElementById('exercise-nav');
    nav.innerHTML = '';
    currentData.forEach((ex, idx) => {
        const btn = document.createElement('button');
        // Usamos el color de Java según el práctico para el menú
        const activeColor = currentPId === '3' ? 'javaBlue' : 'javaRed';
        
        btn.className = "w-full text-left p-3 rounded-xl transition-all text-sm font-medium hover:bg-white/5 border border-transparent mb-1 group flex items-center gap-3";
        
        btn.innerHTML = `<span class="text-[9px] text-zinc-500 font-bold bg-white/5 px-2 py-1 rounded">EJ ${ex.id}</span>
                         <span class="group-hover:text-javaRed truncate">${ex.titulo}</span>`;
        
        btn.onclick = () => {
            document.querySelectorAll('#exercise-nav button').forEach(b => b.classList.remove('bg-zinc-800', 'border-white/10'));
            btn.classList.add('bg-zinc-800', 'border-white/10');
            loadExercise(ex);
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', init);
