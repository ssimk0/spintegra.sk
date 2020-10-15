import React, {useEffect, useState} from "react";
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import i18n from "../../utils/i18n";
import {Link, useParams} from 'react-router-dom';
import Loader from "../../components/Loader";
import ImageGallery from "react-image-gallery";

function CategoryUploads({galleryService}) {
    const [uploads, setUploads] = useState(null);
    const {state, dispatch} = useAppContext();
    const {category} = useParams();
    const gallery = React.createRef();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.articles.menuName")});

        galleryService.getCategoryUploads(category).then((data) => {
            setUploads(data);
        })
    }, [galleryService, dispatch, category])

    const handleClick = (e) => {
        e.preventDefault()
        gallery.current.toggleFullScreen()
    }

    return uploads === null ? <Loader/> : (
        <div className="py-4">
            {state.user && (state.user.can_edit || state.user.is_admin) ?
                (<div className="text-right block pb-4">
                    <Link className="btn" to={`/gallery/${category}/upload`}>
                        {i18n.t("gallery.link.upload")}
                    </Link>
                </div>) : null
            }
            <ImageGallery
                items={uploads.upload.map((upload) => ({...upload, original: upload.file}))}
                infinite={false}
                lazyLoad={true}
                onClick={(e) => handleClick(e)}
                showFullscreenButton={false}
                showPlayButton={false}
                ref={gallery}
            />
        </div>
    )
}

export default CategoryUploads
