import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SET_PAGE_TITLE, useAppContext} from '../context/app';
import Loader from "../components/Loader";
import PageView from "../components/Page/view";


function Page({pageService}) {
    const [page, setPage] = useState({});
    const [isLoading, setLoading] = useState(true);
    const {dispatch} = useAppContext();

    const {slug, category} = useParams();

    useEffect(() => {
        pageService.getPage(slug, category).then((page) => {
            setPage(page);
            setLoading(false);

            dispatch({type: SET_PAGE_TITLE, value: page.title});
        })
    }, [pageService, dispatch, slug, category])

    return isLoading ? <Loader/> : <PageView page={page}/>
}

export default Page;
