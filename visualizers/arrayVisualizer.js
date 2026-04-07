// js/visualizers/arrayVisualizer.js

export class ArrayVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        // Tiempos educativos (más lentos para poder leer)
        this.compareSpeed = 800; 
        this.swapSpeed = 1200;
    }

    /**
     * RENDERIZADO EDUCATIVO: Crea celdas de memoria con índices y etiquetas.
     */
    render(array, pointers = {}) {
        if (!this.container) return;
        
        // Estilo del contenedor principal
        this.container.className = "flex flex-col gap-6 items-center w-full p-4";
        this.container.innerHTML = ''; 

        // 1. Zona de Punteros (i, j, j+1)
        const pointerZone = document.createElement('div');
        pointerZone.className = "flex gap-3 h-8 items-center justify-center font-mono text-xs w-full max-w-3xl";
        
        // 2. Zona de Celdas de Memoria
        const memoryZone = document.createElement('div');
        memoryZone.className = "flex gap-2 items-center justify-center w-full max-w-3xl";

        // Encontrar el valor máximo para el degradado de color (opcional)
        const maxValue = Math.max(...array, 1);

        array.forEach((value, index) => {
            // --- CREAR CELDA ---
            const cell = document.createElement('div');
            cell.id = `cell-${index}`;
            // Clases VIP: Bordes suaves, fuente mono, sombra sutil
            cell.className = "w-16 h-16 rounded-xl border-2 border-white/5 bg-white/[0.02] flex flex-col items-center justify-center shadow-lg transition-all duration-300 relative group";
            
            // Valor numérico (Grande y VIP)
            const valueSpan = document.createElement('span');
            valueSpan.className = "text-2xl font-black tracking-tighter text-white";
            valueSpan.innerText = value;
            
            // Índice de memoria (Abajo a la derecha)
            const indexSpan = document.createElement('span');
            indexSpan.className = "absolute bottom-1 right-2 text-[9px] font-mono text-zinc-600 font-bold";
            indexSpan.innerText = `idx:${index}`;

            cell.appendChild(valueSpan);
            cell.appendChild(indexSpan);
            memoryZone.appendChild(cell);

            // --- CREAR PUNTEROS (Si existen) ---
            const currentPointers = [];
            if (pointers.i === index) currentPointers.push('i');
            if (pointers.j === index) currentPointers.push('j');
            if (pointers.jPlus1 === index) currentPointers.push('j+1');

            const pointerCell = document.createElement('div');
            pointerCell.className = "w-16 flex justify-center items-center";
            
            if (currentPointers.length > 0) {
                const pLabel = document.createElement('span');
                // Colores VIP para punteros: i=Gris, j=Azul, j+1=Azul
                pLabel.className = `px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${currentPointers.includes('i') ? 'bg-zinc-700 text-white' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`;
                pLabel.innerText = currentPointers.join(' & ');
                pointerCell.appendChild(pLabel);
            }
            pointerZone.appendChild(pointerCell);
        });

        // 3. Zona de Mensajes Educativos
        const messageZone = document.createElement('div');
        messageZone.id = "vis-message";
        messageZone.className = "w-full max-w-3xl p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01] text-center text-zinc-500 text-sm italic min-h-[50px] flex items-center justify-center";
        messageZone.innerText = pointers.message || "Esperando inicio de la lógica...";

        this.container.appendChild(pointerZone);
        this.container.appendChild(memoryZone);
        this.container.appendChild(messageZone);
    }

    /**
     * RESALTADO VIP: Cambia el color de la celda entera y añade efectos.
     */
    highlight(idxA, idxB, type, message = "") {
        const cellA = document.getElementById(`cell-${idxA}`);
        const cellB = document.getElementById(`cell-${idxB}`);
        const msgZone = document.getElementById('vis-message');

        if (!cellA || !cellB) return;
        if (msgZone) msgZone.innerText = message;

        // Resetear estados previos (VIP reset)
        [cellA, cellB].forEach(cell => {
            cell.classList.remove('border-blue-500', 'bg-blue-500/10', 'border-red-500', 'bg-red-500/10', 'scale-110', 'shadow-[0_0_30px_rgba(59,130,246,0.2)]', 'shadow-[0_0_30px_rgba(239,68,68,0.3)]');
        });

        if (type === 'compare') {
            // Azul VIP para comparación
            [cellA, cellB].forEach(cell => {
                cell.classList.add('border-blue-500', 'bg-blue-500/10', 'shadow-[0_0_30px_rgba(59,130,246,0.2)]');
            });
        } else if (type === 'swap') {
            // Rojo VIP para intercambio
            [cellA, cellB].forEach(cell => {
                cell.classList.add('border-red-500', 'bg-red-500/10', 'scale-110', 'shadow-[0_0_30px_rgba(239,68,68,0.3)]');
            });
        }
    }
}