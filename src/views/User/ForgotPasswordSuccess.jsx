import React, {useEffect} from 'react';

import {SET_PAGE_TITLE, useAppContext} from "../../context/app";
import i18n from "../../utils/i18n";

const ForgotPasswordSuccess = () => {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.forgotPassword.menuName")})

    }, [dispatch])

    return (
        <div>
            <div className="w-full max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                     className="fill-current text-orange-400 mb-4 mx-auto w-6/12"
                     id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512"
                >
                    <g>
                        <g>
                            <path
                                d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.331,26.629,74.98,74.98C26.628,123.332,0,187.62,0,256    s26.628,132.667,74.98,181.019C123.332,485.371,187.619,512,256,512c68.38,0,132.667-26.629,181.019-74.981    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30    s226,101.383,226,226S380.617,482,256,482z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M378.305,173.859c-5.857-5.856-15.355-5.856-21.212,0.001L224.634,306.319l-69.727-69.727    c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l80.333,80.333c2.929,2.929,6.768,4.393,10.606,4.393    c3.838,0,7.678-1.465,10.606-4.393l143.066-143.066C384.163,189.215,384.163,179.717,378.305,173.859z"/>
                        </g>
                    </g>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                    <g/>
                </svg>
                {i18n.t('forgotPassword.success')}
            </div>
        </div>
    );
}

export default ForgotPasswordSuccess;
