import React, {useEffect, useState} from 'react';
import PageForm from "../../components/Page/PageForm";
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory, useParams} from "react-router-dom";
import Loader from "../../components/Loader";
import pages from '../../api/pages';
import i18n from "../../utils/i18n";


function EditPage({pageService}) {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const {dispatch} = useAppContext();
    const history = useHistory();

    const {slug, category} = useParams();

    const handleEdit = values => {
        pages.edit(category, {...page, ...values}).then(() => {
            history.push(`/pages/${category}/${slug}`)
        })
    };

    useEffect(() => {
        setLoading(true)
        pageService.getPage(slug, category).then((page) => {
            setPage(page);
            setLoading(false)
            dispatch({type: SET_PAGE_TITLE, value: `${i18n.t('pages.page.edit')}: ${page.title}`});
        })
    }, [pageService, dispatch, slug, category])

    return loading ? <Loader/> : (
        <PageForm page={page} onSubmit={handleEdit}/>
    )
}

export default EditPage;
