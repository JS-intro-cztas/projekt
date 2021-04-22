const header = document.querySelector('header.header-news');

const carouselItemCount = 4;

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        populateNewsCarousel(data.articles);
    });

function populateNewsCarousel(news) {
    for(let i = 0; i < carouselItemCount; i ++) {
        const newsValue = news[i];
        const newsDiv = createDivForNews(newsValue);
        header.appendChild(newsDiv);
    }
}

function createDivForNews(newsContents) {
    const newsArticle = document.createElement('div');
    newsArticle.innerText = newsContents.title;
    return newsArticle;
}
