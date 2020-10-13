import React, {useEffect} from 'react';

import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import {useHistory} from 'react-router-dom';
import LoginForm from "../../components/Auth/LoginForm";
import i18n from "../../utils/i18n";

const Login = ({userService}) => {
    let history = useHistory();
    const {state, dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.login.menuName")})

        if (state.token != null) {
            history.push('/');
        }
    }, [dispatch, state.token, history])

    return (
        <div className="container mx-auto py-4">
            <div className="w-full max-w-md mx-auto">
                <LoginForm userService={userService}/>
            </div>
        </div>
    );
}

export default Login;
