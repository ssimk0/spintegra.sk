import React from "react";


function ArticleList(props) {
    const { articles } = props;
    let articleList = [];

    if (articles && articles.length) {
        articleList = articles.map((newsItem) => (
            <li className="grid-cols-12 article" key={newsItem.id}>
                <h4 className="title text-2xl">{newsItem.title}</h4>
                <p className="break-words" dangerouslySetInnerHTML={{__html: newsItem.short}}>
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
