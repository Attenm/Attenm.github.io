'use strict'

let d = document;

let operations = ['+', '-', '/', '*'];
let currentOperator = '+';

let buttonsGroup = d.querySelectorAll('.button');

const delClassActive = function() {
    buttonsGroup.forEach( button => button.classList.remove('button--active'))
}

buttonsGroup.forEach( button => {
    button.addEventListener('click', () => {

        let buttonValue = button.innerHTML;
        
        if (operations.includes(buttonValue)) {
            delClassActive();
            currentOperator = buttonValue;
            button.classList.add('button--active');
        }
    })   
})

const setCurrentOperation = (operator, firstValue, secondValue, summ) => {
    const object = {
        operator: operator,
        firstValue: firstValue,
        secondValue: secondValue,
        summ: summ
    };
    return object;
};

const createHistorylist = function() {
    let calculator = d.querySelector('.calculator');
    let ul = d.createElement('ul');
    ul.classList.add('calculations-history'); 
    calculator.insertAdjacentElement('afterend', ul);

    let historyBox = d.querySelector('.calculations-history');
    let closeButton = d.createElement('div');
    closeButton.insertAdjacentHTML('afterbegin', '&#9587;');
    closeButton.classList.add('calculations-history__button-close')
    historyBox.insertAdjacentElement('afterbegin', closeButton);

    d.querySelector('.calculations-history__button-close').addEventListener('click', () => {
        d.querySelector('.calculations-history').remove();
    });
}

const createHistoryItem = function(obj) {
    let ul = d.querySelector('.calculations-history');
    let indexofItem = ul.children.length;
    let liTemp = d.createElement('li');
    liTemp.classList.add('calculations-history__item');
    liTemp.insertAdjacentHTML('afterbegin', `(${indexofItem})  ${obj.firstValue} ${obj.operator} ${obj.secondValue} = ${obj.summ}`);
    ul.insertAdjacentElement('afterbegin', liTemp);
}

let calculate = function() {
    let firstInputValue = d.querySelector('#first').value;
    let secondInputValue = d.querySelector('#second').value;
    let output = d.querySelector('#output');
    
    firstInputValue === '' ? firstInputValue = 0 : firstInputValue;
    secondInputValue === '' ? secondInputValue = 0 : secondInputValue;

    let summ = 0;
    switch (currentOperator) {
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

    let currentOperation = setCurrentOperation(currentOperator, firstInputValue, secondInputValue, summ);
    
    if(!d.querySelector('.calculations-history')){
        createHistorylist();
    };

    createHistoryItem(currentOperation)

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
d.querySelector('#ac').addEventListener('click', () => currentOperator = '+');

// Перехід на наступний інпут якщо натиснуто Enter

d.querySelector('#first').addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        d.querySelector('#second').focus();
    }
})
