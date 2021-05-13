import { NewsArticle } from './components/news-article/news-article.js';
import { Day } from './components/day/day.js';

const header = document.querySelector('header.header-news > div.header-news__container');

const carouselItemCount = 2;
let carouselItemStart = 0;
let articles;

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        articles = data.articles;
        populateNewsCarousel(data.articles, carouselItemStart);
    });

function populateNewsCarousel(news, startAt) {
    header.innerText = '';
    for(let i = startAt; i < (startAt + carouselItemCount); i ++) {
        const newsValue = news[i];
        const newsArticle = new NewsArticle(newsValue);
        header.appendChild(newsArticle);
    }
  checkButtonsVisibility();
}

function checkButtonsVisibility() {
  buttonLeft.hidden = carouselItemStart === 0;
  buttonRight.hidden = carouselItemStart >= (articles.length - carouselItemCount);
}

const buttonLeft = document.querySelector('#carousel-button-left');

const buttonRight = document.querySelector('#carousel-button-right');

buttonLeft.addEventListener('click', () => {
    carouselItemStart --;
    populateNewsCarousel(articles, carouselItemStart);
});

buttonRight.addEventListener('click', () => {
    carouselItemStart ++;
    populateNewsCarousel(articles, carouselItemStart);
});

const mainContent = document.querySelector('section.main-content');
for (let i = 1; i < 31; i++) {
    mainContent.appendChild(new Day(i));
}

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
