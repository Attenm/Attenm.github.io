import { Person } from "./person.js";

export class Stat {
    constructor(wrapper) {
        this.wrapper = document.querySelector(wrapper);
        this.bmr = +localStorage.getItem('user-bmr');
        this.bmi = +localStorage.getItem('user-bmi');
    }

    generateText() {
        let html = `
        <div class="info">
            <div class="text-box">
                <h3>Ваш индекс массы тела:</h3>
                <div>${this.bmi}</div>
            </div>
        </div>`
        this.wrapper.insertAdjacentHTML('beforeend', html);
        
        this.info = document.querySelector('.info');
    }

    addButtonEdit(){
        let html = `<div class="edit-btn">&#9998;</div>`;
        this.info.insertAdjacentHTML('afterbegin', html);

        this.editBtn = this.wrapper.querySelector('.edit-btn');
        this.editBtn.addEventListener('click', this.editInfo.bind(this));
    }

    editInfo() {
        localStorage.removeItem('user-bmr');
        localStorage.removeItem('user-bmi');
        
        this.info.remove();
        new Person('.app-window').create();
    }

    create() {
        this.generateText();
        this.addButtonEdit();
    }
}