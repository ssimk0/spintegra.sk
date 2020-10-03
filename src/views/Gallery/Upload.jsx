import React, {useEffect} from 'react';
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory, useParams} from "react-router-dom";
import i18n from "utils/i18n";
import UploadForm from "components/Gallery/UploadForm";
import {GALLERY_TYPE} from "../../api/gallery";


function Upload({galleryService}) {
    const {dispatch} = useAppContext();
    const history = useHistory();
    const {category} = useParams();

    const handleCreate = images => {
        galleryService.upload(images, category).then(() => {
            history.push(`/gallery`)
        })
    };

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t('pages.upload.upload')});
    }, [dispatch])

    return (
        <UploadForm onSubmit={handleCreate} type={GALLERY_TYPE} category={category}/>
    )
}

export default Upload;
