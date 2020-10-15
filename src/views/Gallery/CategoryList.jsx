import React, {useEffect, useState} from 'react';
import {SET_PAGE_TITLE, useAppContext} from '../../context/app';
import Loader from "../../components/Loader";
import i18n from "../../utils/i18n";
import UploadCategoryItem from "../../components/Gallery/UploadCategoryItem";
import {Link} from "react-router-dom";


function CategoryList({galleryService}) {
    const [categories, setCategories] = useState(null);
    const {state, dispatch} = useAppContext();
    let categoryList = [];

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.articles.menuName")});

        galleryService.getUploadsCategories().then((data) => {
            setCategories(data);
        })
    }, [galleryService, dispatch])

    if (categories !== null) {
        categoryList = categories.map((category) => (<UploadCategoryItem category={category} key={category.id}/>))
    }

    return categories === null ? <Loader/> : (
        <div className="container mx-auto py-4">
            {state.user && (state.user.can_edit || state.user.is_admin) ?
                (<div className="text-right">
                    <Link className="btn" to="/gallery/create">{i18n.t("gallery.link.create")}</Link>
                </div>) : null
            }
            <div className="grid grid-flow-col grid-cols-3 ">
                {categoryList}
            </div>
        </div>
    )
}

export default CategoryList;
