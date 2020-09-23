import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SET_PAGE_TITLE, useAppContext} from '../../context/app';
import Loader from "../../components/Loader";
import ArticleView from "../../components/Articles/View";


function Article({articleService}) {
    const [article, setArticle] = useState(null);
    const {state, dispatch} = useAppContext();

    const {slug} = useParams();

    useEffect(() => {
        articleService.getArticle(slug).then((article) => {
            setArticle(article);

            dispatch({type: SET_PAGE_TITLE, value: article.title});
        })
    }, [articleService, dispatch, slug])

    return article === null ? <Loader/> : <ArticleView article={article} user={state.user}/>
}

export default Article;
