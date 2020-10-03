import React from "react";
import i18n from "../../utils/i18n";
import {Link} from "react-router-dom";

function UploadCategoryItem({category}) {
    return (
        <div>
            <Link to={`/gallery/${category.slug}`}>
                <img className="py-3 px-3" src={category.thumbnail}
                     alt={i18n.t("gallery.uploadImagePlaceholder")}/>
            </Link>
            {category.name}
            {category.description}
        </div>
    )
}

export default UploadCategoryItem;
