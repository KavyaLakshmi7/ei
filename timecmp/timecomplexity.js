const { performance } = require('perf_hooks'); // For Node.js

// Input sizes for testing (increased range for better scaling visualization)
const inputSizes = [10, 50, 100, 200, 500, 1000, 5000, 10000];

// Store execution times for all 8 functions
const executionTimes = {
    constant: [],
    linear: [],
    quadratic: [],
    cubic: [],
    exponential: [],
    squareRoot: [],
    multiplicative: [],
    logarithmic: [],
};

// 1. Constant Time Complexity: O(1)
function firstElementOfArray(arr) {
    const start = performance.now();
    arr[0]; // Access the first element
    const end = performance.now();
    return (end - start).toFixed(4); // Execution time
}

// 2. Linear Time Complexity: O(n)
function sumOfArray(arr) {
    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    const end = performance.now();
    return (end - start).toFixed(4);
}

// 3. Quadratic Time Complexity: O(n^2)
function sumOfSquaresOfArray(arr) {
    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i === j) sum += arr[i] ** 2;
        }
    }
    const end = performance.now();
    return (end - start).toFixed(4);
}

// 4. Cubic Time Complexity: O(n^3)
function tripletSum(arr, target) {
    const start = performance.now();
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = 0; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === target)
                    found = true;
            }
        }
        if (found) break;
    }
    const end = performance.now();
    return (end - start).toFixed(4);
}

// 5. Exponential Time Complexity: O(2^n)
function fibo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibo(n - 1) + fibo(n - 2);
}
function exponentialFibo(n) {
    const start = performance.now();
    fibo(n);
    const end = performance.now();
    return (end - start).toFixed(4);
}

// 6. Square Root Time Complexity: O(√n)
function isPrime(b) {
    const start = performance.now();
    for (let i = 2; i <= Math.sqrt(b); i++) {
        if (b % i === 0) {
            const end = performance.now();
            return (end - start).toFixed(4);
        }
    }
    const end = performance.now();
    return (end - start).toFixed(4);
}

// 7. Multiplicative Time Complexity: O(n*m) (where n is the length of arr1, m is arr2)
function pairForSum(arr1, arr2, target) {
    const start = performance.now();
    let found = false;
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] + arr2[j] === target)
                found = true;
        }
        if (found) break;
    }
    const end = performance.now();
    return (end - start).toFixed(4);
}

// 8. Logarithmic Time Complexity: O(log n)
function binarySearch(arr, target) {
    const start = performance.now();
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) break;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    const end = performance.now();
    return (end - start).toFixed(4);
}

// Collect execution times for each function
for (let size of inputSizes) {
    const testArray = Array.from({ length: size }, (_, i) => i);

    executionTimes.constant.push(firstElementOfArray(testArray));
    executionTimes.linear.push(sumOfArray(testArray));
    executionTimes.quadratic.push(sumOfSquaresOfArray(testArray));
    executionTimes.cubic.push(tripletSum(testArray, size));
    executionTimes.exponential.push(exponentialFibo(10)); // Using smaller input for exponential
    executionTimes.squareRoot.push(isPrime(size + 1000)); // Prime check for size+1000
    executionTimes.multiplicative.push(pairForSum(testArray, testArray, size));
    executionTimes.logarithmic.push(binarySearch(testArray, Math.floor(size / 2)));
}

console.log("Execution Times:", executionTimes);

// Save the execution times to a file (for later use)
const fs = require('fs');
fs.writeFileSync('executionTimes.json', JSON.stringify({ inputSizes, executionTimes }, null, 2));
console.log("Execution times saved to 'executionTimes.json'");
