import { ArrayVisualizer } from '../../visualizers/arrayVisualizer.js';

const visualizer = new ArrayVisualizer('array-container');
let currentData = [];

async function init() {
    const params = new URLSearchParams(window.location.search);
    const pId = params.get('p') || '2';

    try {
        const modulePath = `../data/practico${pId}.js`;
        const module = await import(modulePath);
        currentData = module.practicoData || module[`practico${pId}Data`] || Object.values(module)[0];

        if (!currentData || !Array.isArray(currentData)) throw new Error("Data no válida.");

        renderMenu();
        if (currentData.length > 0) loadExercise(currentData[0]);

    } catch (err) {
        console.error("❌ Error:", err);
    }
}

function loadExercise(ex) {
    if (!ex) return;

    // Mapeo de TODOS los campos del objeto
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

    const visSection = document.getElementById('visualizer-section');
    const btnRun = document.getElementById('btn-run');

    if (ex.v_ejemplo) {
        visSection.style.display = 'flex';
        visualizer.render(ex.v_ejemplo);
        btnRun.onclick = () => runSortAnimation(ex);
        btnRun.disabled = false;
    } else {
        visSection.style.display = 'none';
    }
}

async function runSortAnimation(ex) {
    const btn = document.getElementById('btn-run');
    btn.disabled = true;
    btn.innerText = "SIMULANDO...";

    let arr = [...ex.v_ejemplo];
    let n = arr.length;

    // Lógica Visual de Bubble Sort
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        visualizer.render(arr, { i, message: `Pasada ${i + 1}: El límite es el índice ${n - i - 1}` });
        await new Promise(r => setTimeout(r, 800));

        for (let j = 0; j < n - i - 1; j++) {
            // 1. Comparar (Highlight Azul)
            visualizer.render(arr, { i, j, jPlus1: j + 1 });
            visualizer.highlight(j, j + 1, 'compare', `¿${arr[j]} > ${arr[j+1]}?`);
            await new Promise(r => setTimeout(r, 600));

            if (arr[j] > arr[j + 1]) {
                // 2. Intercambio (Highlight Rojo)
                visualizer.highlight(j, j + 1, 'swap', `¡Sí! Intercambiando ${arr[j]} por ${arr[j+1]}`);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                
                await new Promise(r => setTimeout(r, 400));
                visualizer.render(arr, { i, j, jPlus1: j + 1 });
                swapped = true;
            }
            visualizer.highlight(j, j + 1, 'reset');
        }

        if (ex.id === 11 && !swapped) {
            visualizer.render(arr, { message: "Optimización: ¡Ya está ordenado!" });
            break;
        }
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
        btn.className = "w-full text-left p-3 rounded-xl transition-all text-sm font-medium hover:bg-white/5 border border-transparent mb-1 group flex items-center gap-3";
        if (idx === 0) btn.classList.add('bg-[#ED8B00]/10', 'border-[#ED8B00]/20');
        btn.innerHTML = `<span class="text-[9px] text-zinc-500 font-bold bg-white/5 px-2 py-1 rounded">EJ ${ex.id}</span>
                         <span class="group-hover:text-[#ED8B00] truncate">${ex.titulo}</span>`;
        btn.onclick = () => {
            document.querySelectorAll('#exercise-nav button').forEach(b => b.classList.remove('bg-[#ED8B00]/10', 'border-[#ED8B00]/20'));
            btn.classList.add('bg-[#ED8B00]/10', 'border-[#ED8B00]/20');
            loadExercise(ex);
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', init);