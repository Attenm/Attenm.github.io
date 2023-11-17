
const wrapper = d.querySelector('.counter__body');

const input = wrapper.querySelector('input');

const output = wrapper.querySelector('.display__result');

input.addEventListener('input', (event) => {
    const regExp = /[^0-9.]/g;
    event.target.value = event.target.value.replace(regExp, '');
})


let timer;
input.addEventListener('change', (event) => {

    let timerStart = function() {
        timer = setInterval(() => {
            result += valuePerSec;
            output.innerText = result.toFixed(2);
        }, 1000);
    }

    let value = +event.target.value;
    let valuePerSec = value / 60 / 60;
    let result = 0;
    
    if (timer) {
        clearTimeout(timer);
        output.innerText = result.toFixed(2);
        timerStart();
    } else {
        timerStart();
    }
})



