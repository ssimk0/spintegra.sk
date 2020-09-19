import articles from '../api/articles';

const NewsService = {
    getArticles(params) {
        return articles.list(params);
    }
}

export default NewsService;
