import React, {useEffect} from 'react';
import PageForm from "../../components/Page/PageForm";
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory, useParams} from "react-router-dom";
import pages from '../../api/pages';
import i18n from "../../utils/i18n";


function CreateSubPage({pageService}) {
    const {dispatch} = useAppContext();
    const history = useHistory();

    const {id, category} = useParams();

    const handleCreate = values => {
        pages.create(category, {
            ...values, parent: {
                id: parseInt(id)
            }
        }).then((response) => {
            history.push(`/`)
        })
    };

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t('pages.page.create')});
    }, [pageService, dispatch, id, category])

    return (
        <PageForm onSubmit={handleCreate}/>
    )
}

export default CreateSubPage;
