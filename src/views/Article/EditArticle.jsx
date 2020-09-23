import React, {useEffect, useState} from 'react';
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory, useParams} from "react-router-dom";
import i18n from "utils/i18n";
import ArticleForm from "components/Articles/ArticleForm";
import Loader from "../../components/Loader";


function EditArticle({articleService}) {
    const {dispatch} = useAppContext();
    const history = useHistory();
    const {slug} = useParams();
    const [article, setArticle] = useState(null);

    const handleCreate = values => {
        articleService.edit({...values, id: article.id}).then(() => {
            history.push(`/articles`)
        })
    };

    useEffect(() => {
        articleService.getArticle(slug).then((article) => {
            setArticle(article)
            dispatch({type: SET_PAGE_TITLE, value: `${i18n.t('pages.articles.edit')}: ${article.title}`});
        })


    }, [dispatch, slug, articleService])

    return article === null ? <Loader/> : (
        <ArticleForm onSubmit={handleCreate} article={article}/>
    )
}

export default EditArticle;
