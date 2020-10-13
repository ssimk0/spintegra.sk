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
            <h2 className="title">{article.title}</h2>
            <hr/>
            <div className="content" dangerouslySetInnerHTML={{__html: article.body}}>
            </div>
        </div>
    );
}


export default ArticleView;
