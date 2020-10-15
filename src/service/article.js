import articles from '../api/articles';
import {uploadImage} from "../utils/uploadImage";

const ArticleService = {
    getArticles(params) {
        return articles.list({p: params && params.p ? params.p : 1, s: 9});
    },
    getArticle(slug) {
        return articles.detail({slug});
    },
    create({body, title, short, published, image}) {
        if (image && image.length) {
            return uploadImage(image[0]).then((r) => {
                console.log(image);
                return articles.create({body, title, short, published, image: r.data.link});
            })
        }

        return articles.create({body, title, short, published});
    },
    edit({id, body, title, short, published, image}) {
        if (image && image.length) {
            return uploadImage(image[0]).then((r) => {
                console.log(r);
                return articles.edit({id, body, title, short, published, image: r.data.file});
            })
        }

        return articles.edit({id, body, title, short, published});
    }
}

export default ArticleService;
