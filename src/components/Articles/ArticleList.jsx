import React from "react";
import {Link} from "react-router-dom";
import i18n from "../../utils/i18n";


function ArticleList({articles, user}) {
    let articleList = [];
    let createLink;

    if (articles && articles.length) {
        articleList = articles.map((article) => {
                return (
                    <div className="grid grid-rows-2 article p-4" key={article.id}>
                        <div className="p-4">
                            <Link to={`/articles/${article.slug}`}>
                                <img src={article.image || './fallback.jpg'} alt={article.title}/>
                            </Link>
                        </div>
                        <div className='p-4'>
                            <h4 className="title text-2xl"><Link to={`/articles/${article.slug}`}>{article.title}</Link></h4>
                            <p className="break-words" dangerouslySetInnerHTML={{__html: article.short}}>
                            </p>
                        </div>
                    </div>
                )
            }
        )
    }

    if (user && (user.can_edit || user.is_admin)) {
        createLink = (
            <div className="text-right">
                <Link to="/articles/create" className="btn">{i18n.t('articles.link.create')}</Link>
            </div>
        )
    }

    return (
        <div id="news" className="grid">
            {createLink}
            <div className="grid grid-cols-3">
                {articleList}
            </div>
        </div>
    );
}


export default ArticleList;
