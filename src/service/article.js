import articles from '../api/articles';

const ArticleService = {
    getArticles(params) {
        return articles.list({p: params && params.p ? params.p : 1});
    },
    create({body, title, short, published}) {
        return articles.create({body, title, short, published});
    }
}

export default ArticleService;
