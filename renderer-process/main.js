import { Day } from './components/day/day.js';
import { Carousel } from './components/carousel/carousel.js';

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        const carousel = new Carousel();
        carousel.populateNewsCarousel(data.articles);
    });

const mainContent = document.querySelector('section.main-content');

const currentDate = new Date();
debugger;
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

for (let i = 1; i <= maxDate; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    mainContent.appendChild(new Day(dayDate));
}

const buttonOpenModal = document.getElementById('open-modal');
const modalConatiner = document.querySelector('.modal-container');

buttonOpenModal.addEventListener('click', () => {
    modalConatiner.hidden = false;
});

// ukazkovy kod:
const text = 'ashdf';
const cislo = 3;

const automobil = {
    pocetMistKSezeni: 5,
    barvaKaroserie: 'cervena'
};

console.log(automobil.barvaKaroserie);

class Operenec {

    constructor(volani) {
        this.zvuk = volani;
    }

    vydejZvuk() {
        console.log('delka zvuku', this.zvuk.length);
        console.log(this.zvuk);
    }

}

class Kacer extends Operenec {
    constructor() {
        super('kva kva');
        console.log(this.zvuk);
    }

    plavPoJezirku() {
        console.log('plavu plavu');
    }
}

class Kohout extends Operenec {
    hlasVychodSlunce() {
        console.log('vychazi');
    }
}

const kacer = new Kacer();

kacer.vydejZvuk();

const kohout = new Kohout('kikiriki');

kohout.vydejZvuk();
