import React from "react";
import {Link} from "react-router-dom";
import i18n from "../../utils/i18n";


function PageView({page, user}) {
    let editLink

    if (user && (user.can_edit || user.is_admin)) {
        editLink = (
            <div className="text-right">
                <Link to={`/pages/${page.page_category.slug}/${page.slug}/edit`}
                      className="btn">{i18n.t('articles.link.edit')}</Link>
            </div>
        )
    }

    return (
        <div id="page">
            <div className="text-right">
                {editLink}
            </div>
            <h2 className="title">{page.title}</h2>
            <hr/>
            <div className="content" dangerouslySetInnerHTML={{__html: page.body}}>
            </div>
        </div>
    );
}


export default PageView;
