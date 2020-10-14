import React from "react";
import {Link} from "react-router-dom";
import i18n from "../../utils/i18n";


function ArticleView({article, user}) {
    let editLink

    if (user && (user.can_edit || user.is_admin)) {
        editLink = (
            <div className="text-right">
                <Link to={`/articles/${article.slug}/edit`} className="btn">{i18n.t('articles.link.edit')}</Link>
            </div>
        )
    }

    return (
        <div id="article" className="container mx-auto py-4">
            <div className="text-right">
                {editLink}
            </div>
            <span className="title text-3xl">{article.title}</span>
            {article.image ? <img src={article.image} alt={article.title} className="w-full pt-8"/> : ''}
            <div className="content pt-4" dangerouslySetInnerHTML={{__html: article.body}}>
            </div>
        </div>
    );
}


export default ArticleView;
