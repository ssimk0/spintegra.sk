import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SET_PAGE_TITLE, useAppContext} from '../../context/app';
import Loader from "../../components/Loader";
import PageView from "../../components/Page/View";


function Page({pageService}) {
    const [page, setPage] = useState(null);
    const {state, dispatch} = useAppContext();

    const {slug, category} = useParams();

    useEffect(() => {
        if (page === null) {
            pageService.getPage(slug, category).then((response) => {
                setPage(response);
                dispatch({type: SET_PAGE_TITLE, value: response.title});
            })
        }

    }, [pageService, page, slug, category, dispatch])


    return page === null ? <Loader/> : <PageView page={page} user={state.user}/>
}

export default Page;
