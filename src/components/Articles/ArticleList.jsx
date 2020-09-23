import React from "react";
import {Link} from "react-router-dom";


function ArticleList(props) {
    const { articles } = props;
    let articleList = [];

    if (articles && articles.length) {
        articleList = articles.map((article) => (
            <li className="grid-cols-12 article" key={article.id}>
                <h4 className="title text-2xl"><Link to={`/articles/${article.slug}`}>{article.title}</Link></h4>
                <p className="break-words" dangerouslySetInnerHTML={{__html: article.short}}>
                </p>
            </li>
        ))
    }

    return (
        <div id="news" className="grid">
            <ul className="grid-cols-12">
                {articleList}
            </ul>
        </div>
    );
}


export default ArticleList;
