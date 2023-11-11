const GRID_WIDTH = 512;
const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const colorPicker = document.querySelector(".colorPicker");

const clearButton = document.querySelector("#clear");
let brushButtons = document.querySelectorAll(".controlsTop > button")
brushButtons = Array.from(brushButtons);

let currentSolidColor = colorPicker.value;
let currentHighlightedButton = "0";

function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

function getCurrentColor(currentHighlightedButton) {
    switch (currentHighlightedButton) {
        // Solid colour
        case "0":
            return currentSolidColor;
        //Rainbow
        case "1":
            return generateRandomColor();
        // Eraser
        case "2":
            return `rgb(209, 213, 219)`;
    }
}

function paintElement(element) {
    element.style.backgroundColor = getCurrentColor(currentHighlightedButton);
}

function clearGrid() {
    const gridElements = document.querySelectorAll(".gridElement");
    gridElements.forEach((gridElement) => {
        gridElement.remove()
    });
}

function populateGrid(pixelCount) {
    clearGrid();
    let count = 0;
    grid.style.setProperty('grid-template-columns', `repeat(${pixelCount}, 1fr)`);
    grid.style.setProperty('grid-template-rows', `repeat(${pixelCount}, 1fr)`);
    for (let i = 0; i < pixelCount; ++i) {
        for (let j = 0; j < pixelCount; ++j) {
            const divElement = document.createElement("div");
            divElement.classList.add("gridElement");
            divElement.id = count++;
            grid.appendChild(divElement);
        }
    }
}

function onButtonPressed(button) {
    brushButtons[Number.parseInt(currentHighlightedButton)].style.fontWeight = "";
    currentHighlightedButton = button.id;
    brushButtons[Number.parseInt(currentHighlightedButton)].style.fontWeight = "bolder";
}

function Initialise() {
    slider.addEventListener("input", (event) => populateGrid(slider.value));
    colorPicker.addEventListener("input", (event) => currentSolidColor = colorPicker.value);
    clearButton.addEventListener("click", (event) => populateGrid(slider.value));
    brushButtons[Number.parseInt(currentHighlightedButton)].style.fontWeight = "bolder";
    brushButtons.forEach((button) => {
        button.addEventListener("click", (event) => onButtonPressed(button));
    });
    grid.addEventListener("mouseover",
        (event) => {
            paintElement(event.target);
        });

    populateGrid(slider.value);
}


Initialise();