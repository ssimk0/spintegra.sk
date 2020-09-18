import React, {useEffect, useState} from 'react';
import {SET_PAGE_TITLE, useAppContext} from '../context/app';
import Loader from "../components/Loader";
import ArticleList from "../components/Articles/ArticleList";
import i18n from "../utils/i18n";

// TODO: add pagination
function News({articleService}) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const {dispatch} = useAppContext();


    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.articles.menuName")});

        articleService.getArticles().then((data) => {
            setArticles(data.articles);
            setLoading(false);
        })
    }, [articleService, dispatch])

    return isLoading ? <Loader/> : <ArticleList articles={articles}/>
}

export default News;
