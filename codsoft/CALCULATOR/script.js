// script.js
const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      // Clear everything
      currentInput = '';
      operator = '';
      firstOperand = '';
      secondOperand = '';
      expression = '';
      display.value = '';
      expressionDisplay.textContent = '';
    } else if (value === '=') {
      // Perform calculation
      if (firstOperand && operator && currentInput) {
        secondOperand = currentInput;
        expression = `${firstOperand} ${operator} ${secondOperand}`;
        const result = calculate(firstOperand, secondOperand, operator);
        display.value = result;
        expressionDisplay.textContent = `${expression} =`;
        currentInput = result;
        operator = '';
        firstOperand = '';
        secondOperand = '';
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Handle operator input
      if (currentInput) {
        firstOperand = currentInput;
        operator = value;
        expression = `${firstOperand} ${operator}`;
        currentInput = '';
        display.value = '';
        expressionDisplay.textContent = expression;
      }
    } else {
      // Handle number and decimal input
      currentInput += value;
      display.value = currentInput;
      expressionDisplay.textContent = `${firstOperand} ${operator} ${currentInput}`;
    }
  });
});

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return 0;
  }
}