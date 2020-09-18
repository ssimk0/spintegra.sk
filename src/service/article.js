import articles from '../api/articles';

const NewsService = {
    getArticles() {
        return articles.list();
    }
}

export default NewsService;
