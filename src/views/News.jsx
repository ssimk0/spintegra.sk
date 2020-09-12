import React, {useEffect, useState} from 'react';
import {SET_PAGE_TITLE, useAppContext} from '../context/app';
import Loader from "../components/Loader";
import NewsList from "../components/News/NewsList";


function News({newsService}) {
    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const {dispatch} = useAppContext();


    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: "Aktuality"});

        newsService.getNews().then((news) => {
            setNews(news);
            setLoading(false);
        })
    }, [newsService, dispatch])

    return isLoading ? <Loader/> : <NewsList news={news}/>
}

export default News;
