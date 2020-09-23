import i18n from "../utils/i18n";
import React from "react";


function NotFound() {
    return (
        <div>
            {i18n.t('errors.notFound')}
        </div>
    )
}

export default NotFound
