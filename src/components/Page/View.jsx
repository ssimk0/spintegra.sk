import React from "react";


function PageView(props) {
    const { page } = props;

    return (
        <div id="page">
            <h2 className="title">{page.title}</h2>
            <hr/>
            <div className="content" dangerouslySetInnerHTML={{__html: page.body}}>
            </div>
        </div>
    );
}


export default PageView;
