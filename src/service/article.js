import articles from '../api/articles';

const ArticleService = {
    getArticles(params) {
        return articles.list({p: params && params.p ? params.p : 1});
    },
    getArticle(slug) {
        return articles.detail({slug});
    },
    create({body, title, short, published}) {
        return articles.create({body, title, short, published});
    },
    edit({id, body, title, short, published}) {
        return articles.edit({id, body, title, short, published});
    }
}

export default ArticleService;
