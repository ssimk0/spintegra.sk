import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SET_PAGE_TITLE, useAppContext} from '../../context/app';
import Loader from "../../components/Loader";
import PageView from "../../components/Page/View";


function Page({pageService}) {
    const [page, setPage] = useState(null);
    const {state, dispatch} = useAppContext();
    const {slug, category, parent_slug} = useParams();

    let p = null;

    useEffect(() => {
        if (page === null || (page && page.slug !== parent_slug)) {
            pageService.getPage(parent_slug, category).then((response) => {
                setPage(response);
                dispatch({type: SET_PAGE_TITLE, value: response.title});
            })
        }

    }, [pageService, page, parent_slug, category, dispatch])

    if (page !== null && slug) {
        p = page.children.find(page => page.slug === slug)
    }

    return page === null ? <Loader/> : <PageView page={p || page} parent_page={page} parent_slug={parent_slug} user={state.user}/>
}

export default Page;
