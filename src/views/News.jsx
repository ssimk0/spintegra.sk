import React, {useEffect, useState} from 'react';
import {SET_PAGE_TITLE, useAppContext} from '../context/app';
import Loader from "../components/Loader";
import ArticleList from "../components/Articles/ArticleList";
import i18n from "../utils/i18n";
import Pagination from "../components/Pagination/Pagination";
import {useLocation} from 'react-router-dom';


function News({articleService}) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const {dispatch} = useAppContext();
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page");

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.articles.menuName")});

        articleService.getArticles({p: page || 1}).then((data) => {
            setArticles(data);
            setLoading(false);
        })
    }, [articleService, dispatch, page])

    return isLoading ? <Loader/> : (
        <div>
            <ArticleList articles={articles.articles}/>
            <Pagination page={articles.page} total_pages={articles.total_pages}/>
        </div>
    )
}

export default News;
