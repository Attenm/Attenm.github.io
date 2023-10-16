'use strict'

let d = document;

let operations = ['+', '-', '/', '*'];
let currentOperation = '+';

let buttonsGroup = d.querySelectorAll('.button');

buttonsGroup.forEach( button => {
    button.addEventListener('click', () => {

        let buttonValue = button.innerHTML;
        
        if (operations.includes(buttonValue)) {
            buttonsGroup.forEach(button => button.classList.remove('button--active'));

            currentOperation = buttonValue;
            button.classList.add('button--active');
        }
    })   
})


let calculate = function() {
    let firstInputValue = d.querySelector('#first').value;
    let secondInputValue = d.querySelector('#second').value;
    let output = d.querySelector('#output');
    
    firstInputValue === '' ? firstInputValue = 0 : firstInputValue;
    secondInputValue === '' ? secondInputValue = 0 : secondInputValue;

    let summ = 0;
    switch (currentOperation) {
        case '+' : summ = parseFloat(firstInputValue) + parseFloat(secondInputValue);
        break;
        case '-' : summ = firstInputValue - secondInputValue;
        break;
        case '*' : summ = firstInputValue * secondInputValue;
        break;
        case '/' : summ = firstInputValue / secondInputValue;
        break;
    } 
    output.value = summ;
}

let clearAll = function() {
    d.querySelector('#first').value = '';
    d.querySelector('#second').value = '';
    d.querySelector('#output').value = 0;
}

d.querySelector('.equal_button').addEventListener('click', calculate);
d.querySelector('#ac').addEventListener('click', clearAll);





