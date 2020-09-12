import React, {useContext, useEffect} from 'react';
import {AppContext, SET_PAGE_TITLE} from '../context/app';

function Home() {
    const {dispatch} = useContext(AppContext);

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: 'Domov'});
    });

    return (
        <div>Home route

        </div>
    );
}

export default Home;
