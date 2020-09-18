import React, {useEffect} from 'react';
import {useAppContext, SET_PAGE_TITLE} from '../context/app';
import i18n from "../utils/i18n";

function Home() {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.home.menuName")});
    });

    return (
        <div>Home route

        </div>
    );
}

export default Home;
