'use strict'

let d = document;

let operations = ['+', '-', '/', '*'];
let currentOperation = '+';

let buttonsGroup = d.querySelectorAll('.button');

const delClassActive = function() {
    buttonsGroup.forEach( button => button.classList.remove('button--active'))
}

buttonsGroup.forEach( button => {
    button.addEventListener('click', () => {

        let buttonValue = button.innerHTML;
        
        if (operations.includes(buttonValue)) {
            delClassActive();
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

    if(isNaN(summ)) {
        output.value = 'Enter the correct value'
    }
}

let clearAll = function() {
    d.querySelector('#first').value = '';
    d.querySelector('#second').value = '';
    d.querySelector('#output').value = 0;
}

d.querySelector('.equal_button').addEventListener('click', calculate);
d.querySelector('#ac').addEventListener('click', clearAll);
d.querySelector('#ac').addEventListener('click', delClassActive);

//reset opeartion;
d.querySelector('#ac').addEventListener('click', () => currentOperation = '+');


// Перехід на наступний інпут якщо натиснуто Enter

d.querySelector('#first').addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        d.querySelector('#second').focus();
    }
})






