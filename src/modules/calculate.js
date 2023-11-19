import personParams from "./person-params.js";
import {Stat} from "./stat.js"

export class CalculateWeek {
    constructor(wrapper) {
        this.wrapper = document.querySelector(wrapper);
        this.normalConsumption = personParams.bmr;
        this.weight = personParams.weight;
        this.age = personParams.age;
        this.height = personParams.height;
        this.oneGramOfFat = 7.7;
        this.totalKcal = 2500;
        this.excess = this.totalKcal - this.normalConsumption;
        
    }
    
    createPage() {
        this.wrapper.insertAdjacentHTML('afterbegin', '<div class="result__page"></div>');
        this.page = this.wrapper.querySelector('.result__page');
    }
    
    loop(week = [1, 2, 3, 4, 5, 6, 7]) {
        //Записали вес:
        let weight = this.weight;
        //Записали БМС:
        let bmr = this.normalConsumption;
        //излишек
        let excess = this.excess;
        let added = 0;

        let newWeek = week.map( day => {
            //Переопределяем БМС:
            bmr = ((13.7516 * weight) + (5.0033 * this.height) - (6.755 * this.age) + 66.473);
            
            //переопределяем излишек
            excess = this.totalKcal - bmr;

            // Прибавка: 
            added += (this.excess / this.oneGramOfFat) / 1000;
            // Добавляем вес:
            weight = this.weight + added;
            
            return {
                    day : `${day}`,
                    currentWeight : `${weight.toFixed(1)}`,
                    need : `${bmr.toFixed()}`,
                    added : `${added.toFixed(3)}`
                };
        });
        return newWeek;
    }

    addBtnExit() {
        this.page.insertAdjacentHTML('afterbegin', '<div class="exit">Вернуться на главную</div>');
        this.page.querySelector('.exit').addEventListener('click', () => {
            new Stat('.app-window').create();
            this.page.remove();
        })
    }

    generateTable(html = ''){
        html = `<table class="weeek__table">
            <thead>
                <tr>
                    <th>День:</th>
                    <th>Обмен вещ-в (Ккал.)</th>
                    <th>Прибавка за период (гр)</th>
                    <th>Вес общ.</th>
                </tr>
            </thead>
            <tbody>`;

        this.loop().forEach(elem => {
            html +=`<tr>
            <td>${elem.day}</td>
            <td>${elem.need}</td>
            <td>${elem.added}</td>
            <td>${elem.currentWeight}</td>
            </tr>`                    
        }); 
            
        html += `</tbody>
        </table>`;

        this.page.insertAdjacentHTML('beforeend', html);
    }

    create() {
        this.createPage();
        this.addBtnExit();
        this.generateTable();
    }
}

export class CalculateYear extends CalculateWeek {
    constructor(wrapper){
        super(wrapper)
    }

    generateTable(){

    }
}