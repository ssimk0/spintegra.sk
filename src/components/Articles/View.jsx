import React from "react";


function ArticleView(props) {
    const { article } = props;

    return (
        <div id="article">
            <h2 className="title">{article.title}</h2>
            <hr/>
            <div className="content" dangerouslySetInnerHTML={{__html: article.body}}>
            </div>
        </div>
    );
}


export default ArticleView;
