const resultDisplay = document.getElementById("result");
const operationDisplay = document.getElementById("operation");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const numberButtons = document.getElementsByClassName("numbers");
const operationButtons = document.getElementsByClassName("operations");
const equalsButton = document.getElementById("=");
const pointButton = document.getElementById(".");

let currentOperator = null;
let firstNumber = "";
let secondNumber = "";
let shouldResetDisplay = false;

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function roundResult(result) {
    return Math.round(result * 10000) / 10000;
}

function operate(firstNumber, currentOperator, secondNumber) {
    if (currentOperator === "+") return add(Number(firstNumber), Number(secondNumber));
    else if (currentOperator === "-") return substract(Number(firstNumber), Number(secondNumber));
    else if (currentOperator === "×") return multiply(Number(firstNumber), Number(secondNumber));
    else if (currentOperator === "÷") return divide(Number(firstNumber), Number(secondNumber));
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === "÷" && Number(resultDisplay.textContent) === 0) return; // calculator doesn't allow to divide by 0
    secondNumber = resultDisplay.textContent;
    resultDisplay.textContent = roundResult(operate(firstNumber, currentOperator, secondNumber));
    operationDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber}`;
    currentOperator = null;
}

function resetDisplay() {
    resultDisplay.textContent = "";
    shouldResetDisplay = false;
}

function clearDisplay() {
    resultDisplay.textContent = "0";
    operationDisplay.textContent = "";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
}

function deleteDigit() {
    if (resultDisplay.textContent !== "0") {
        if (resultDisplay.textContent.length === 1) resultDisplay.textContent = "0";
        else resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
    }
}

function numberButtonClick(e) {
    if (resultDisplay.textContent === "0" || shouldResetDisplay) resetDisplay();
    let clickedNumber = e.target.getAttribute("id");
    resultDisplay.textContent += `${clickedNumber}`;
}

function operationButtonClick(e) {
    if (currentOperator !== null) evaluate();
    firstNumber = resultDisplay.textContent;
    currentOperator = e.target.getAttribute("id");
    operationDisplay.textContent = `${firstNumber} ${currentOperator}`;
    shouldResetDisplay = true;
}

function addPoint() {
    if (shouldResetDisplay) resetDisplay();
    if (resultDisplay.textContent === "") resultDisplay.textContent = "";
    if (resultDisplay.textContent.includes(".")) return;
    resultDisplay.textContent += ".";
}

Array.from(numberButtons).forEach((numberButton) => {
    numberButton.addEventListener("click", numberButtonClick);
});

Array.from(operationButtons).forEach((operationButton) => {
    operationButton.addEventListener("click", operationButtonClick);
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearDisplay);
deleteButton.addEventListener("click", deleteDigit);
pointButton.addEventListener("click", addPoint);
