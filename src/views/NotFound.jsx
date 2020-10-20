import i18n from "../utils/i18n";
import React from "react";


function NotFound() {
    return (
        <div className="container py-4 mx-auto text-center">
            {i18n.t('errors.notFound')}
        </div>
    )
}

export default NotFound
