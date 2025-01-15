const { performance } = require('perf_hooks');

// Function to measure memory usage before and after the function call
function measureMemoryUsage(fn, ...args) {
    const startMemory = process.memoryUsage().heapUsed; // Memory usage before function call
    const start = performance.now();
    fn(...args); // Call the function with arguments
    const end = performance.now();
    const endMemory = process.memoryUsage().heapUsed; // Memory usage after function call
    const memoryConsumed = (endMemory - startMemory) / 1024 / 1024; // Convert bytes to MB
    const executionTime = (end - start).toFixed(4); // Execution time in milliseconds
    return { executionTime, memoryConsumed };
}

// 1. Constant space complexity
function swap(a, b) {
    let temp = a;
    a = b;
    b = temp;
    console.log("after swap: ", a, b);
}
let a = 5;
let b = 9;
console.log("before swap: ", a, b);

// 2. Linear space complexity
function revarr(arr) {
    let n = arr.length, j = 0;
    let arr1 = [];
    for (let i = n - 1; i >= 0; i--) {
        arr1[j++] = arr[i];
    }
    console.log("original array:");
    for (let i = 0; i < n; i++) {
        console.log(arr[i]);
    }
    console.log("reversed array:");
    for (let i = 0; i < n; i++) {
        console.log(arr1[i]);
    }
}
let arr = [1, 2, 3, 4];

// 3. Quadratic space complexity
function subMatrix(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = j;
        }
    }
    return matrix;
}
console.log("Sub matrix");
console.log(subMatrix(3));

// 4. Logarithmic space complexity
function binarysearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            console.log("Found at index", mid);
            return;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log("Not found");
}

console.log("Logarithmic space complexity");
let arr3 = [2, 4, 6, 8, 10, 12, 16];
binarysearch(arr3, 12);

// Measure memory usage for each function
console.log("Measuring memory usage for swap function:");
let swapResults = measureMemoryUsage(swap, a, b);
console.log(`Execution Time: ${swapResults.executionTime} ms, Memory Used: ${swapResults.memoryConsumed} MB`);

console.log("Measuring memory usage for revarr function:");
let revarrResults = measureMemoryUsage(revarr, arr);
console.log(`Execution Time: ${revarrResults.executionTime} ms, Memory Used: ${revarrResults.memoryConsumed} MB`);

console.log("Measuring memory usage for subMatrix function:");
let subMatrixResults = measureMemoryUsage(subMatrix, 3);  // Example: size 3 for sub-matrix
console.log(`Execution Time: ${subMatrixResults.executionTime} ms, Memory Used: ${subMatrixResults.memoryConsumed} MB`);

console.log("Measuring memory usage for binarysearch function:");
let binarySearchResults = measureMemoryUsage(binarysearch, arr3, 12);
console.log(`Execution Time: ${binarySearchResults.executionTime} ms, Memory Used: ${binarySearchResults.memoryConsumed} MB`);
