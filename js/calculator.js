class Calculator {
  constructor() {
    this.previousOperand = "";
    this.currentOperand = "0";
    this.operation = undefined;
    this.history = [];
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "0";
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === "0") return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") this.currentOperand = "0";
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }

  calculate() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) {
          alert("Error: División por cero");
          this.clear();
          return;
        }
        computation = prev / current;
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    this.addToHistory(
      `${this.previousOperand} ${this.operation} ${this.currentOperand}`,
      computation
    );

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  addToHistory(operation, result) {
    this.history.push({
      operation: operation,
      result: result,
      timestamp: new Date().toLocaleTimeString(),
    });
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("es-ES", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    return {
      current: this.getDisplayNumber(this.currentOperand),
      previous:
        this.operation != null
          ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
          : "",
    };
  }
}
