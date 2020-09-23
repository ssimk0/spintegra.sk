import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SET_PAGE_TITLE, useAppContext} from '../../context/app';
import Loader from "../../components/Loader";
import PageView from "../../components/Page/View";


function Page({pageService}) {
    const [page, setPage] = useState(null);
    const {dispatch} = useAppContext();

    const {slug, category} = useParams();

    useEffect(() => {
        pageService.getPage(slug, category).then((page) => {
            setPage(page);

            dispatch({type: SET_PAGE_TITLE, value: page.title});
        })
    }, [pageService, dispatch, slug, category])

    return page === null ? <Loader/> : <PageView page={page}/>
}

export default Page;
