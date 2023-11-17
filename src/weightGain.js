'use strict'
import {Person} from "./modules/person.js";
import {Stat} from "./modules/stat.js";
const d = document;

if(!localStorage.getItem('user-bmr')) {
    new Person('.app-window').create();
} else {
    new Stat('.app-window').create();
}


