import React, {useEffect, useState} from 'react';
import PageForm from "../components/Page/PageForm";
import {SET_PAGE_TITLE, useAppContext} from "../context/app";
import {useParams, useHistory} from "react-router-dom";
import Loader from "../components/Loader";
import pages from '../api/pages';


function EditPage({pageService}) {
    const [page, setPage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const {dispatch} = useAppContext();
    const history = useHistory();

    const {slug, category} = useParams();

    const handleEdit = values => {
       pages.edit(category, {...page, ...values}).then(() => {
           history.push(`/pages/${category}/${slug}`)
       })
    };

    useEffect(() => {
        pageService.getPage(slug, category).then((page) => {
            setPage(page);
            setLoading(false);

            dispatch({type: SET_PAGE_TITLE, value: page.title});
        })
    }, [pageService, dispatch, slug, category])

    return isLoading ? <Loader/> : (
        <PageForm page={page} mode="edit" onSubmit={handleEdit}/>
    )
}

export default EditPage;
