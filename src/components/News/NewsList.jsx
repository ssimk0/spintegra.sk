import React from "react";


function NewsList(props) {
    const { news } = props;
    let newsList = [];

    if (news && news.length) {
        newsList = news.map((newsItem) => (
            <li className="grid-cols-12" key={newsItem.id}>
                <h4 className="title text-2xl">{newsItem.title}</h4>
                <p className="break-words" dangerouslySetInnerHTML={{__html: newsItem.short}}>
                </p>
            </li>
        ))
    }

    return (
        <div id="news" className="grid">
            <ul className="grid-cols-12">
                {newsList}
            </ul>
        </div>
    );
}


export default NewsList;
