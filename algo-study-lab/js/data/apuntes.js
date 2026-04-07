// js/data/apuntes.js
export const diarioClases = [
    {
        id: 1,
        fecha: "2026-04-02",
        titulo: "Introducción a Vectores y Memoria",
        tags: ["#JAVA", "#MEMORIA", "#ARRAYS"],
        resumen: "Análisis de cómo Java reserva espacio contiguo en el Heap para los arrays. La importancia del índice 0 y la eficiencia en el acceso.",
        joya: "El acceso por índice es O(1) porque el procesador calcula la dirección: Base + (índice * tamaño_tipo).",
        codigo: "int[] miArray = new int[10]; // Reserva 40 bytes (10 * 4 bytes de int)",
        linkEjercicio: 1
    },
    {
        id: 2,
        fecha: "2026-04-09",
        titulo: "Algoritmos de Ordenamiento I",
        tags: ["#BUBBLESORT", "#COMPLEJIDAD"],
        resumen: "Análisis profundo del Bubble Sort y por qué es ineficiente para grandes volúmenes de datos. Optimización de ciclos.",
        joya: "El ordenamiento burbuja es el más simple pero el que más ciclos de CPU desperdicia.",
        codigo: "if (v[j] > v[j+1]) {\n    int aux = v[j];\n    v[j] = v[j+1];\n    v[j+1] = aux;\n}",
        linkEjercicio: 10
    }
];