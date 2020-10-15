import React, {useEffect} from 'react';
import ResetPasswordForm from "../../components/Auth/ResetPasswordForm";
import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import i18n from "../../utils/i18n";


function ResetPassword({userService}) {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.resetPassword.title")})

    }, [dispatch])

    return (
        <div className="container mx-auto py-4">
            <ResetPasswordForm userService={userService}/>
        </div>
    )
}

export default ResetPassword
