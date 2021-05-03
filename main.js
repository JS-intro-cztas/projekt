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
        const newsDiv = createDivForNews(newsValue);
        header.appendChild(newsDiv);
    }
  checkButtonsVisibility();
}

function checkButtonsVisibility() {
  buttonLeft.hidden = carouselItemStart === 0;
  buttonRight.hidden = carouselItemStart >= (articles.length - carouselItemCount);
}

function createDivForNews(newsContents) {
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), transparent), url(${newsContents.image})`;

    const title = document.createElement('span');
    title.classList.add('news-article__title');
    title.innerText = newsContents.title;

    newsArticle.appendChild(title);

    return newsArticle;
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
