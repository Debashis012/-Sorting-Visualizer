let array = [];
let speed = 50;
let selectedColor = '#61dafb'; // Default color

const notesContent = {
    bubble: "Bubble Sort: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Time Complexity: O(n^2)",
    selection: "Selection Sort: Divides the list into a sorted and an unsorted region, repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the sorted region. Time Complexity: O(n^2)",
    insertion: "Insertion Sort: Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. Time Complexity: O(n^2)",
    merge: "Merge Sort: It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. Time Complexity: O(n log n)",
    quick: "Quick Sort: A divide and conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays. Time Complexity: O(n log n)"
};

function generateArray() {
    array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 400) + 10);
    }
    displayArray();
    hideNotes();
}

function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach(height => {
        const arrayBar = document.createElement('div');
        arrayBar.style.height = `${height}px`;
        arrayBar.style.width = `${100 / array.length}%`;
        arrayBar.classList.add('array-bar');
        arrayBar.style.backgroundColor = selectedColor; // Apply selected color
        arrayContainer.appendChild(arrayBar);
    });
}

function adjustSpeed(newSpeed) {
    speed = newSpeed;
}

function displayNotes(type) {
    const notes = document.getElementById('notes');
    notes.innerHTML = `<p>${notesContent[type]}</p>`;
    notes.style.display = 'block';
}

function hideNotes() {
    const notes = document.getElementById('notes');
    notes.style.display = 'none';
}

function addGlowEffect(button) {
    button.classList.add('glow');
    setTimeout(() => {
        button.classList.remove('glow');
    }, 500);
}

function handleButtonClick(button, type) {
    addGlowEffect(button);
    if (type === 'generate') {
        generateArray();
    } else {
        sortArray(type);
    }
}

async function sortArray(type) {
    displayNotes(type);
    switch (type) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'merge':
            await mergeSort(0, array.length - 1);
            break;
        case 'quick':
            await quickSort(0, array.length - 1);
            break;
    }
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(i, minIndex);
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            displayArray();
            await delay();
        }
        array[j + 1] = key;
        displayArray();
        await delay();
    }
}

async function mergeSort(start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        displayArray();
        await delay();
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        i++;
        k++;
        displayArray();
        await delay();
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        j++;
        k++;
        displayArray();
        await delay();
    }
}

async function quickSort(start, end) {
    if (start < end) {
        const pivotIndex = await partition(start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
    }
}

async function partition(start, end) {
    const pivot = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (array[i] < pivot) {
            await swap(i, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(pivotIndex, end);
    return pivotIndex;
}

async function swap(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    displayArray();
    await delay();
}

function delay() {
    return new Promise(resolve => setTimeout(resolve, 100 - speed));
}

function changeArrayColor(color) {
    selectedColor = color;
    displayArray(); // Update array bars with new color
}

document.addEventListener('DOMContentLoaded', generateArray);
