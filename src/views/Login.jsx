import React, {useEffect} from 'react';

import {SET_PAGE_TITLE, useAppContext} from "../context/app";
import {useHistory} from 'react-router-dom';
import LoginForm from "../components/Auth/LoginForm";

const Login = ({userService}) => {
    let history = useHistory();
    const {state, dispatch} = useAppContext();

    if (state.token != null) {
        history.push('/');
    }

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: "Prihlásenie"})
    }, [dispatch])

    return (
        <div>
            <div className="w-full max-w-md mx-auto">
                <LoginForm userService={userService}/>
            </div>
        </div>
    );
}

export default Login;
