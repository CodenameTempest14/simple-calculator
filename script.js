const display = document.getElementById("text-box");

let currentInput = "";
let operator = "";
let firstOperand = "";

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Append numbers and handle decimal + leading zero
function appendNumber(value) {
  if (value === "." && currentInput.includes(".")) return; // Prevent multiple decimal points

  // Prevent adding leading zeros when the current input is "0"
  if (value === "0" && currentInput === "0") return;

  // If the current input is "0", replace it with the new value instead of appending
  if (currentInput === "0") {
    currentInput = value;
  } else if (value === "." && currentInput === "") {
    currentInput = "0.";  // Handle the case when a decimal is clicked first
  } else {
    currentInput += value;  // Append the new value to the current input
  }

  updateDisplay(currentInput);
}

// Convert display operator to real operator
function convertToJSOperator(op) {
  switch (op) {
    case "x": return "*";
    case "÷": return "/";
    default: return op;
  }
}

// Operator button logic
function chooseOperator(opSymbol) {
  const op = convertToJSOperator(opSymbol);

  if (currentInput === "" && firstOperand === "") return;

  if (firstOperand !== "" && currentInput !== "") {
    // Perform calculation before chaining another operator
    calculate();
  }

  firstOperand = currentInput || firstOperand;
  operator = op;
  currentInput = "";
  updateDisplay(opSymbol);
}

// Final calculation
function calculate() {
  if (!firstOperand || !operator || !currentInput) return;

  const a = parseFloat(firstOperand);
  const b = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b !== 0 ? a / b : "Math Error"; break;
    default: result = "Error";
  }

  updateDisplay(result);
  currentInput = result.toString();
  firstOperand = "";
  operator = "";
}

// Clear everything
function clearDisplay() {
  display.textContent = "0";
  currentInput = "";
  firstOperand = "";
  operator = "";
}

// Event listeners
document.querySelectorAll(".num-btn").forEach(button => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

document.querySelectorAll(".operation-btn").forEach(button => {
  button.addEventListener("click", () => chooseOperator(button.textContent));
});

document.querySelector(".equal-btn").addEventListener("click", calculate);
document.querySelector(".clear-entry").addEventListener("click", clearDisplay);
document.querySelector(".decimal-btn")?.addEventListener("click", () => appendNumber("."));
