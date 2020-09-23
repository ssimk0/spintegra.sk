import React from "react";
import {Link} from "react-router-dom";
import i18n from "../../utils/i18n";


function ArticleList({articles, user}) {
    let articleList = [];
    let createLink;

    if (articles && articles.length) {
        articleList = articles.map((article) => (
            <li className="grid-cols-12 article" key={article.id}>
                <h4 className="title text-2xl"><Link to={`/articles/${article.slug}`}>{article.title}</Link></h4>
                <p className="break-words" dangerouslySetInnerHTML={{__html: article.short}}>
                </p>
            </li>
        ))
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
            <ul className="grid-cols-12">
                {articleList}
            </ul>
        </div>
    );
}


export default ArticleList;
