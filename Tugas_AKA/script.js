let array = [];
let savedArray = null; // Array yang disimpan
const totalRoutes = 1000000;
const routes = Array.from({ length: totalRoutes }, (_, i) => i + 1);
let addedIndex = 0;

function resetArray() {
  array = [];
  addedIndex = 0;
  updateOutput("Array has been reset.");
}

function addLeft() {
  if (addedIndex >= totalRoutes) {
    updateOutput("All elements have been added to the array.");
    return;
  }
  
  // Ambil 100 elemen acak dari routes
  const elementsToAdd = getRandomElements(routes, 100);
  
  // Tambahkan elemen-elemen tersebut ke kiri array
  array.unshift(...elementsToAdd);
  addedIndex += elementsToAdd.length;
  updateOutput(`Added 100 random elements to the left. Current array length: ${array.length}\n${getArrayPreview(arr = array)} elements.`);
}

function addRight() {
  if (addedIndex >= totalRoutes) {
    updateOutput("All elements have been added to the array.");
    return;
  }
  
  // Ambil 100 elemen acak dari routes
  const elementsToAdd = getRandomElements(routes, 100);
  
  // Tambahkan elemen-elemen tersebut ke kanan array
  array.push(...elementsToAdd);
  addedIndex += elementsToAdd.length;
  updateOutput(`Added 100 random elements to the left. Current array length: ${array.length}\n${getArrayPreview(arr = array)} elements.`);
}

function getRandomElements(arr, count) {
  const shuffled = [...arr]; // Salin array agar tidak mengubah array asli
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function saveArray() {
  if (array.length === 0) {
    updateOutput("Cannot save. Array is empty.");
    return;
  }
  savedArray = [...array];
  updateOutput("Array has been saved.");
}

function resetToSavedArray() {
  if (!savedArray) {
    updateOutput("No saved array found to reset.");
    return;
  }
  array = [...savedArray];
  updateOutput(` Current array length: ${array.length}\n${getArrayPreview(arr = array)} elements.`);
}

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return result.concat(left, right);
}

function handleBubbleSort() {
  const startTime = performance.now();
  const sortedArray = bubbleSort([...array]);
  const endTime = performance.now();
  updateOutput(` Total elements: ${sortedArray.length}\n Bubble Sort Result: ${getArrayPreview(sortedArray)}.`);
  console.log(`Bubble Sort Execution Time: ${(endTime - startTime).toFixed(2)} ms`);
}

function handleMergeSort() {
  const startTime = performance.now();
  const sortedArray = mergeSort([...array]);
  const endTime = performance.now();
  updateOutput(` Total elements: ${sortedArray.length}\n Merge Sort Result: ${getArrayPreview(sortedArray)}.`);
  console.log(`Merge Sort Execution Time: ${(endTime - startTime).toFixed(2)} ms`);
}

// Fungsi untuk menampilkan preview array (10 elemen pertama atau terakhir)
function getArrayPreview(arr = array) {
  const preview = arr; // Tampilkan 10 elemen pertama
  return preview.join(', ') ;
}

function updateOutput(message) {
  document.getElementById("output").textContent = message;
}
