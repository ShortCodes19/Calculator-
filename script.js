// Get references to the input field and buttons
const input = document.getElementById("input");
const buttons = document.querySelectorAll(".btn-container button");

let expression = "";

// Function to update the display
function updateDisplay(value) {
  input.value = value;
}

// Function to clear the input
function clearInput() {
  expression = ""; // Clear the expression
  updateDisplay(""); // Clear the display
}

// Function to handle deleting the last digit
function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay(expression || "0");
}

// Function to handle calculations
function calculate() {
  try {
    const result = eval(expression); // Calculate the expression
    updateDisplay(result); // Display the result
    expression = result.toString(); // Store the result as the new expression
  } catch (error) {
    updateDisplay("Error"); // Display error if the expression is invalid
  }
}

// Function to handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    if (value) {
      // Append number or decimal point to the expression
      if (value === "." && expression.includes(".")) return; // Prevent multiple decimals
      expression += value;
      updateDisplay(expression); // Update the display to show the current expression
    } else if (action) {
      switch (action) {
        case "clear":
          clearInput();
          break;
        case "delete":
          deleteLast();
          break;
        case "add":
          expression += " + ";
          updateDisplay(expression);
          break;
        case "subtract":
          expression += " - ";
          updateDisplay(expression);
          break;
        case "multiply":
          expression += " * ";
          updateDisplay(expression);
          break;
        case "divide":
          expression += " / ";
          updateDisplay(expression);
          break;
        case "percent":
          expression += " / 100";
          calculate(); // Calculate percentage
          break;
        case "equals":
          calculate(); // Calculate the final result
          break;
        default:
          break;
      }
    }
  });
});
