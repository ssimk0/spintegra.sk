import React, {useEffect} from 'react';
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory} from "react-router-dom";
import i18n from "utils/i18n";
import UploadCategoryForm from "../../components/Gallery/UploadCategoryForm";


function CreateUploadCategory({galleryService}) {
    const {dispatch} = useAppContext();
    const history = useHistory();

    const handleCreate = values => {
        galleryService.create({...values}).then(() => {
            history.push(`/gallery`)
        })
    };

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t('pages.gallery.create')});
    }, [dispatch])

    return (
        <UploadCategoryForm onSubmit={handleCreate}/>
    )
}

export default CreateUploadCategory;
