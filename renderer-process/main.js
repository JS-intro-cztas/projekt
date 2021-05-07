import { NewsArticle } from './components/news-article/news-article.js';

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
        const newsArticle = new NewsArticle();
        const newsDiv = newsArticle.createDivForNews(newsValue);
        header.appendChild(newsDiv);
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
        console.log(this.zvuk);
    }

}

class Kacer extends Operenec {
    plavPoJezirku() {
        console.log('plavu plavu');
    }
}

class Kohout extends Operenec {
    hlasVychodSlunce() {
        console.log('vychazi');
    }
}

const kacer = new Kacer('kva kva');

kacer.vydejZvuk();
kacer.plavPoJezirku();

const kohout = new Kohout('kikiriki');

kohout.vydejZvuk();
kohout.hlasVychodSlunce();
