import { Stat } from "./stat.js";
export class Person {
    constructor(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    }

    allowOnlyNumbers() {
        let allInputs = this.wrapper.querySelectorAll('input');
        
        let regExp = /[^0-9.]/g;

        allInputs.forEach( input => {
            input.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(regExp, '');
            })
        })
    }

    createPersonHtml(){
        let person = [
            {text: 'Ваш возраст:', id: 'age'},
            {text: 'Ваш рост:', id: 'height'},
            {text: 'Ваш вес:', id: 'weight'}
        ];

        this.wrapper.insertAdjacentHTML('afterbegin', '<div class="person-info">Укажите данные:</div>');
        this.personInfo = this.wrapper.querySelector('.person-info') 
        
        person.forEach(element => {
            let html = `<p>${element.text}</p>
            <input type="text" name="" id="${element.id}">`;
            this.personInfo.insertAdjacentHTML('beforeend', html);
        });

        this.allowOnlyNumbers();
    }
    
    createBtnSave() {
        let btn = '<div class="save">Сохранить</div>'
        this.personInfo.insertAdjacentHTML('beforeend', btn);
        this.btn = this.personInfo.querySelector('.save')

        this.btn.addEventListener('click', this.saveInfo.bind(this));
    }

    saveInfo() {
        let inpAge = this.personInfo.querySelector('#age');
        let inpWeight = this.personInfo.querySelector('#weight');
        let inpHeight = this.personInfo.querySelector('#height');

        
        this.age = +inpAge.value;
        this.weight = +inpWeight.value;
        this.height = +inpHeight.value;
        
        if(!this.age || !this.height || !this.weight) {
            return;
        }

        this.bmr = ((13.7516 * this.weight) + (5.0033 * this.height) - (6.755 * this.age) + 66.473);
        this.bmr = Math.round(this.bmr);

        this.bmi = this.weight / ((this.height / 100)**2);
        localStorage.setItem('user-bmr', this.bmr);
        localStorage.setItem('user-bmi', this.bmi.toFixed(2));
        this.hideWindow();
        new Stat('.app-window').create()
    }

    hideWindow() {
        this.personInfo.remove();
    }

    create() {
        this.createPersonHtml();
        this.createBtnSave();
    }
}