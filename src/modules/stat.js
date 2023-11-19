import {Person} from "./person.js";
import personParams from "./person-params.js";
import {CalculateWeek, CalculateYear} from "./calculate.js"

export class Stat {
    constructor(wrapper) {
        this.wrapper = document.querySelector(wrapper);
        this.weight = personParams.weight;
        this.bmr = personParams.bmr;
        this.bmi = personParams.bmi;
        this.personInfo = {'Вес:':this.weight + ' кг', 'БМС:':this.bmr + ' Ккал', 'ИМТ:':this.bmi};
        this.buttons = {
            class : 'btn__forecast',
            else:
                [
                {id: 'btn__gain__week',
                    content: 'Спрогнозировать набор массы за неделю',},
                {id: 'btn__gain__year',
                    content: 'Спрогнозировать набор массы за год',},
                {id: 'btn__loose__week',
                    content: 'Спрогнозировать потерю массы за неделю',},
                {id: 'btn__loose__year',
                    content: 'Спрогнозировать потерю массы за год',}
                ]
            }
    }

    createInfo(html =''){
        for( let key in this.personInfo){
            html += `<div class="header__tile"><p>${key}</p><p>${this.personInfo[key]}</p></div>`
        }
        this.header.insertAdjacentHTML('afterbegin', html);
    }

    fillHeader() {
        this.createInfo();
        this.addButtonEdit()
    }

    generateHeader() {
        let html = `<div class="main__page"><div class="header__info"></div><div>`
        this.wrapper.insertAdjacentHTML('beforeend', html);
        
        this.mainPage = this.wrapper.querySelector('.main__page');
        this.header = this.mainPage.querySelector('.header__info');
    }

    addButtonEdit(){
        let html = `<div class="edit-btn">&#9998;</div>`;
        this.header.insertAdjacentHTML('beforeend', html);

        this.editBtn = this.mainPage.querySelector('.edit-btn');
        this.editBtn.addEventListener('click', this.editInfo.bind(this));
    }

    editInfo() {
        localStorage.removeItem('user-bmr');
        localStorage.removeItem('user-bmi');
        
        this.mainPage.remove();
        new Person('.app-window').create();
    }

    addForecastContainer() {
        let html = `<div class="forecast__container"></div>`;
        this.mainPage.insertAdjacentHTML('beforeend', html)
        this.forecastContainer = this.mainPage.querySelector('.forecast__container');

        this.forecastContainer.addEventListener('click', this.showCalculations.bind(this));
    }

    showCalculations(e) {
        switch (true) {
            case e.target.matches('#btn__gain__week'):
            case e.target.matches('#btn__loose__week'):
                this.mainPage.remove()
                new CalculateWeek(".app-window").create();
            break;

            case e.target.matches('#btn__gain__year'):                
            case e.target.matches('#btn__loose__year'):
                //new CalculateYear(".app-window").create();
                // this.mainPage.remove()
            break;
        }
    }

    generateButtons(html = '') {
        this.buttons.else.forEach( btn => {
            html += `<div class="${this.buttons.class}" id="${btn.id}">${btn.content}</div>`
        })
        this.forecastContainer.insertAdjacentHTML('beforeend', html);
    }

    create() {
        this.generateHeader();
        this.fillHeader();
        this.addForecastContainer();
        this.generateButtons();
    }
}