const calculator = new Calculator();

const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const historyList = document.querySelector(".history-list");
const clearHistoryButton = document.querySelector(".btn-clear-history");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.dataset.number);
    updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.dataset.operator);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  updateDisplay();
  updateHistory();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  updateDisplay();
});

clearHistoryButton.addEventListener("click", () => {
  calculator.history = [];
  updateHistory();
});

document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    calculator.appendNumber(e.key);
    updateDisplay();
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    calculator.chooseOperation(e.key);
    updateDisplay();
  }
  if (e.key === "Enter" || e.key === "=") {
    calculator.calculate();
    updateDisplay();
    updateHistory();
  }
  if (e.key === "Backspace") {
    calculator.delete();
    updateDisplay();
  }
  if (e.key === "Escape") {
    calculator.clear();
    updateDisplay();
  }
});

function updateDisplay() {
  const display = calculator.updateDisplay();
  currentOperandElement.textContent = display.current;
  previousOperandElement.textContent = display.previous;
}

function updateHistory() {
  historyList.innerHTML = "";
  calculator.history
    .slice()
    .reverse()
    .forEach((item) => {
      const historyItem = document.createElement("div");
      historyItem.classList.add("history-item");
      historyItem.innerHTML = `
            <div class="operation">${item.operation}</div>
            <div class="result">= ${calculator.getDisplayNumber(
              item.result
            )}</div>
            <div class="operation" style="font-size: 0.75rem; margin-top: 5px;">${
              item.timestamp
            }</div>
        `;
      historyList.appendChild(historyItem);
    });
}

updateDisplay();
