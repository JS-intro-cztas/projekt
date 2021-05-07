export class NewsArticle {

    createDivForNews(newsContents) {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');
        newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), transparent), url(${newsContents.image})`;

        const title = document.createElement('span');
        title.classList.add('news-article__title');
        title.innerText = newsContents.title;

        newsArticle.appendChild(title);

        return newsArticle;
    }

}