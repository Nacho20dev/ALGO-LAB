// js/data/practico3.js
export const practicoData = [
    {
        id: 1,
        titulo: "Factorial de N",
        letra: "Calcular el factorial de un número entero no negativo n de forma recursiva.",
        pre: "n >= 0",
        pos: "Retorna n!",
        solucionJava: `public int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}`,
        tip: "Caso base: 0! = 1. Caso recursivo: n * (n-1)!",
        teoria: "Recursión lineal.",
        complexity: "O(n)"
    },
    {
        id: 2,
        titulo: "Suma de Naturales",
        letra: "Calcular la suma de los primeros n números naturales.",
        pre: "n >= 0",
        pos: "Retorna 1 + 2 + ... + n",
        solucionJava: `public int sumaNaturales(int n) {\n    if (n <= 0) return 0;\n    return n + sumaNaturales(n - 1);\n}`,
        tip: "El acumulador se genera en el retorno de la función.",
        teoria: "Reducción de dominio.",
        complexity: "O(n)"
    },
    {
        id: 3,
        titulo: "Potencia (a^n)",
        letra: "Calcular a elevado a la n recursivamente.",
        pre: "n >= 0",
        pos: "Retorna a^n",
        solucionJava: `public int potencia(int a, int n) {\n    if (n == 0) return 1;\n    return a * potencia(a, n - 1);\n}`,
        tip: "Todo número elevado a 0 es 1.",
        teoria: "Exponenciación recursiva.",
        complexity: "O(n)"
    },
    {
        id: 4,
        titulo: "Invertir String",
        letra: "Dada una cadena, retornarla invertida.",
        pre: "s != null",
        pos: "String invertido",
        solucionJava: `public String invertir(String s) {\n    if (s.isEmpty()) return s;\n    return invertir(s.substring(1)) + s.charAt(0);\n}`,
        tip: "substring(1) va achicando la cadena por la izquierda.",
        teoria: "Descomposición de cadenas.",
        complexity: "O(n)"
    },
    {
        id: 5,
        titulo: "Multiplicación Rusa",
        letra: "Implementar el método ruso de multiplicación.",
        pre: "a, b > 0",
        pos: "a * b",
        solucionJava: `public int multRusa(int a, int b) {\n    if (a == 1) return b;\n    if (a % 2 != 0) return b + multRusa(a/2, b*2);\n    return multRusa(a/2, b*2);\n}`,
        tip: "Divide a por 2 y duplica b.",
        teoria: "Algoritmo logarítmico.",
        complexity: "O(log n)"
    },
    {
        id: 6,
        titulo: "Máximo del Vector",
        letra: "Encontrar el máximo de un vector recursivamente.",
        pre: "v.length > 0",
        pos: "Valor máximo",
        solucionJava: `public int maximo(int[] v, int n) {\n    if (n == 1) return v[0];\n    return Math.max(v[n-1], maximo(v, n-1));\n}`,
        tip: "n es el tamaño lógico del vector.",
        teoria: "Recursión sobre arreglos.",
        complexity: "O(n)"
    },
    {
        id: 7,
        titulo: "Mínimo del Vector",
        letra: "Encontrar el mínimo de un vector recursivamente.",
        pre: "v.length > 0",
        pos: "Valor mínimo",
        solucionJava: `public int minimo(int[] v, int n) {\n    if (n == 1) return v[0];\n    return Math.min(v[n-1], minimo(v, n-1));\n}`,
        tip: "Espejo del algoritmo de máximo.",
        teoria: "Recursión sobre arreglos.",
        complexity: "O(n)"
    },
    {
        id: 8,
        titulo: "Fibonacci",
        letra: "Retornar el término n de Fibonacci.",
        pre: "n >= 0",
        pos: "Valor en la posición n",
        solucionJava: `public int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}`,
        tip: "Cuidado: genera muchas llamadas duplicadas.",
        teoria: "Recursión múltiple.",
        complexity: "O(2^n)"
    },
    {
        id: 9,
        titulo: "Contar Caracter",
        letra: "Contar apariciones de 'c' en 's'.",
        pre: "s != null",
        pos: "Cantidad de ocurrencias",
        solucionJava: `public int contarChar(String s, char c) {\n    if (s.isEmpty()) return 0;\n    int res = (s.charAt(0) == c) ? 1 : 0;\n    return res + contarChar(s.substring(1), c);\n}`,
        tip: "Compara el primero y delega el resto.",
        teoria: "Conteo recursivo.",
        complexity: "O(n)"
    },
    {
        id: 10,
        titulo: "Suma de Dígitos",
        letra: "Sumar dígitos de un número entero.",
        pre: "n >= 0",
        pos: "Suma total",
        solucionJava: `public int sumaDigitos(int n) {\n    if (n < 10) return n;\n    return (n % 10) + sumaDigitos(n / 10);\n}`,
        tip: "n % 10 obtiene el último dígito.",
        teoria: "Aritmética modular.",
        complexity: "O(log n)"
    },
    {
        id: 11,
        titulo: "Suma de Vector",
        letra: "Sumar todos los elementos de un vector.",
        pre: "v != null",
        pos: "Suma de los elementos",
        solucionJava: `public int sumaVector(int[] v, int n) {\n    if (n == 0) return 0;\n    return v[n-1] + sumaVector(v, n-1);\n}`,
        tip: "n comienza en v.length.",
        teoria: "Reducción de índices.",
        complexity: "O(n)"
    },
    {
        id: 12,
        titulo: "Palíndromo",
        letra: "Verificar si una palabra es palíndromo.",
        pre: "s != null",
        pos: "boolean",
        solucionJava: `public boolean esPalindromo(String s) {\n    if (s.length() <= 1) return true;\n    if (s.charAt(0) != s.charAt(s.length()-1)) return false;\n    return esPalindromo(s.substring(1, s.length()-1));\n}`,
        tip: "Compara extremos y recorta la cadena.",
        teoria: "Verificación de simetría.",
        complexity: "O(n)"
    },
    {
        id: 13,
        titulo: "Decimal a Binario",
        letra: "Convertir un número decimal a su representación binaria.",
        pre: "n >= 0",
        pos: "String con binario",
        solucionJava: `public String decABin(int n) {\n    if (n < 2) return Integer.toString(n);\n    return decABin(n / 2) + (n % 2);\n}`,
        tip: "Las llamadas se apilan y el resto se concatena al volver.",
        teoria: "Cambio de base.",
        complexity: "O(log n)"
    },
    {
        id: 14,
        titulo: "Producto de dos números",
        letra: "Multiplicar a * b usando solo sumas.",
        pre: "a, b >= 0",
        pos: "Resultado del producto",
        solucionJava: `public int producto(int a, int b) {\n    if (b == 0) return 0;\n    return a + producto(a, b - 1);\n}`,
        tip: "Sumamos 'a', 'b' veces.",
        teoria: "Definición recursiva de la multiplicación.",
        complexity: "O(b)"
    },
    {
        id: 15,
        titulo: "Máximo Común Divisor",
        letra: "Calcular el MCD mediante el algoritmo de Euclides.",
        pre: "a > b",
        pos: "MCD",
        solucionJava: `public int mcd(int a, int b) {\n    if (b == 0) return a;\n    return mcd(b, a % b);\n}`,
        tip: "El caso base es cuando el resto es 0.",
        teoria: "Algoritmo de Euclides.",
        complexity: "O(log(min(a,b)))"
    }
];
