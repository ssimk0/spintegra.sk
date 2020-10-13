import React, {useEffect} from 'react';

import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import i18n from "../../utils/i18n";

const ForgotPassword = ({userService}) => {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.forgotPassword.menuName")})

    }, [dispatch])

    return (
        <div className="container mx-auto py-4">
            <div className="w-full max-w-md mx-auto">
                <ForgotPasswordForm userService={userService}/>
            </div>
        </div>
    );
}

export default ForgotPassword;
