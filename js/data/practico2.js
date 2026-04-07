// js/data/practico2.js
export const practicoData = [
    {
        id: 1,
        titulo: "Visualizar Vector",
        letra: "Implementar un algoritmo que reciba un array y muestre su contenido separado por guiones.",
        pre: "v != null",
        pos: "String: 'val1 - val2 - val3'",
        solucionJava: `public String mostrarv(int[] v) {\n    String res = "";\n    for (int i = 0; i < v.length; i++) {\n        res += v[i] + (i < v.length - 1 ? " - " : "");\n    }\n    return res;\n}`,
        tip: "StringBuilder es más eficiente que '+' para concatenar en bucles.",
        teoria: "Recorrido Lineal O(n).",
        complexity: "O(n)"
    },
    {
        id: 2,
        titulo: "Máximo Valor",
        letra: "Retornar el valor máximo. Caso 1: Desordenado. Caso 2: Ordenado Ascendente.",
        pre: "v != null && v.length > 0",
        pos: "Retorna el valor máximo entero.",
        solucionJava: `// V1: Desordenado\npublic int maxvecV1(int[] v) {\n    int max = v[0];\n    for (int i = 1; i < v.length; i++) {\n        if (v[i] > max) max = v[i];\n    }\n    return max;\n}\n\n// V2: Ordenado\npublic int maxvecV2(int[] v) {\n    return v[v.length - 1];\n}`,
        tip: "Si el vector está ordenado, el acceso es instantáneo O(1).",
        teoria: "Complejidad según pre-condición.",
        complexity: "O(n) / O(1)"
    },
    {
        id: 3,
        titulo: "Promedio",
        letra: "Calcular el promedio aritmético de los elementos del vector.",
        pre: "v.length > 0",
        pos: "double con el promedio.",
        solucionJava: `public double promedio(int[] v) {\n    int suma = 0;\n    for (int n : v) suma += n;\n    return (double) suma / v.length;\n}`,
        tip: "Castear a (double) para evitar la truncación de la división entera.",
        teoria: "Uso de acumuladores.",
        complexity: "O(n)"
    },
    {
        id: 4,
        titulo: "Búsqueda Lineal",
        letra: "Determinar si un elemento 'x' existe en el vector.",
        pre: "v != null",
        pos: "boolean true si existe, false sino.",
        solucionJava: `public boolean existe(int[] v, int x) {\n    for (int n : v) if (n == x) return true;\n    return false;\n}`,
        tip: "Usa el return temprano para no recorrer de más si ya lo encontraste.",
        teoria: "Búsqueda secuencial.",
        complexity: "O(n)"
    },
    {
        id: 5,
        titulo: "Contar Ocurrencias",
        letra: "Contar cuántas veces aparece un elemento 'x' en el vector.",
        pre: "v != null",
        pos: "int con la cantidad de apariciones.",
        solucionJava: `public int contar(int[] v, int x) {\n    int c = 0;\n    for (int n : v) if (n == x) c++;\n    return c;\n}`,
        tip: "Este recorrido es siempre exhaustivo (no tiene corte temprano).",
        teoria: "Frecuencia de elementos.",
        complexity: "O(n)"
    },
    {
        id: 6,
        titulo: "Validar Orden",
        letra: "Verificar si el vector está ordenado de forma ascendente.",
        pre: "v != null",
        pos: "boolean indicando el estado del orden.",
        solucionJava: `public boolean estaOrdenado(int[] v) {\n    for (int i = 0; i < v.length - 1; i++) {\n        if (v[i] > v[i+1]) return false;\n    }\n    return true;\n}`,
        tip: "Basta con encontrar un solo par desordenado para retornar false.",
        teoria: "Validación de propiedades en arrays.",
        complexity: "O(n)"
    },
    {
        id: 7,
        titulo: "Invertir (In-place)",
        letra: "Invertir el orden de los elementos modificando el vector original.",
        pre: "v != null",
        pos: "v con elementos en orden inverso.",
        solucionJava: `public void invertir(int[] v) {\n    int i = 0, j = v.length - 1;\n    while (i < j) {\n        int t = v[i]; v[i] = v[j]; v[j] = t;\n        i++; j--;\n    }\n}`,
        tip: "La técnica de dos punteros reduce los intercambios a la mitad (n/2).",
        teoria: "Algoritmos in-place.",
        complexity: "O(n)"
    },
    {
        id: 8,
        titulo: "Suma de Vectores",
        letra: "Dados A y B de igual tamaño, retornar un vector C donde C[i] = A[i] + B[i].",
        pre: "A.length == B.length",
        pos: "Nuevo vector C con la suma.",
        solucionJava: `public int[] sumar(int[] a, int[] b) {\n    int[] c = new int[a.length];\n    for (int i = 0; i < a.length; i++) c[i] = a[i] + b[i];\n    return c;\n}`,
        tip: "Asegúrate de inicializar el vector C con el tamaño correcto.",
        teoria: "Vectores paralelos.",
        complexity: "O(n)"
    },
    {
        id: 9,
        titulo: "Intersección",
        letra: "Retornar los elementos comunes entre dos vectores A y B.",
        pre: "A y B != null",
        pos: "Lista de elementos que pertenecen a ambos.",
        solucionJava: `public List<Integer> interseccion(int[] a, int[] b) {\n    List<Integer> r = new ArrayList<>();\n    for (int x : a) {\n        if (existe(b, x)) r.add(x);\n    }\n    return r;\n}`,
        tip: "Si los vectores están ordenados, se puede optimizar a O(n+m).",
        teoria: "Operaciones de conjuntos.",
        complexity: "O(n * m)"
    },
    {
        id: 10,
        titulo: "Bubble Sort",
        letra: "Ordenamiento por burbuja estándar.",
        pre: "v != null",
        v_ejemplo: [45, 22, 89, 12, 33, 67],
        solucionJava: `public void bubbleSort(int[] v) {\n    int n = v.length;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (v[j] > v[j+1]) {\n                int t = v[j]; v[j] = v[j+1]; v[j+1] = t;\n            }\n}`,
        tip: "El elemento más grande 'burbujea' hacia su posición final en cada iteración.",
        teoria: "Ordenamiento por comparación.",
        complexity: "O(n²)"
    },
    {
        id: 11,
        titulo: "Bubble Sort Optimizado",
        letra: "Burbuja con bandera de intercambio (swap).",
        pre: "v != null",
        v_ejemplo: [10, 25, 40, 30, 50, 60],
        solucionJava: `public void bubbleSortOpt(int[] v) {\n    boolean huboCambio = true;\n    for (int i = 0; i < v.length-1 && huboCambio; i++) {\n        huboCambio = false;\n        for (int j = 0; j < v.length-i-1; j++) {\n            if (v[j] > v[j+1]) {\n                int t = v[j]; v[j] = v[j+1]; v[j+1] = t;\n                huboCambio = true;\n            }\n        }\n    }\n}`,
        tip: "Si en una pasada completa no hay intercambios, el vector ya está ordenado.",
        teoria: "Optimización de algoritmos.",
        complexity: "O(n) - O(n²)"
    },
    {
        id: 12,
        titulo: "Mezcla Ordenada",
        letra: "Mezclar dos vectores ya ordenados en un tercer vector que mantenga el orden.",
        pre: "A y B ordenados ascendentemente",
        solucionJava: `public int[] mezclar(int[] a, int[] b) {\n    int[] c = new int[a.length + b.length];\n    int i=0, j=0, k=0;\n    while(i < a.length && j < b.length)\n        c[k++] = (a[i] < b[j]) ? a[i++] : b[j++];\n    while(i < a.length) c[k++] = a[i++];\n    while(j < b.length) c[k++] = b[j++];\n    return c;\n}`,
        tip: "No uses Sort al final; la clave es intercalar los elementos comparando punteros.",
        teoria: "Base del algoritmo Merge Sort.",
        complexity: "O(n + m)"
    }
];