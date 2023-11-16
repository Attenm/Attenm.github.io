
const wrapper = d.querySelector('.counter__body');

const input = wrapper.querySelector('input');

const output = wrapper.querySelector('.display__result');

input.addEventListener('input', (event) => {
    const regExp = /\D\./g;
    event.target.value = event.target.value.replace(regExp, '');
})


input.addEventListener('change', (event) => {
    let value = +event.target.value;
    let valuePerSec = value / 60 / 60;

    let result = 0;
    setInterval(() => {
        result += valuePerSec;
        output.innerText = result.toFixed(2);
    }, 1000);

})
