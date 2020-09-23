import React, {useEffect} from 'react';
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory} from "react-router-dom";
import i18n from "utils/i18n";
import ArticleForm from "components/Articles/ArticleForm";


function CreateArticle({articleService}) {
    const {dispatch} = useAppContext();
    const history = useHistory();

    const handleCreate = values => {
        articleService.create({...values}).then(() => {
            history.push(`/articles`)
        })
    };

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t('pages.articles.create')});
    }, [dispatch])

    return (
        <ArticleForm onSubmit={handleCreate}/>
    )
}

export default CreateArticle;
