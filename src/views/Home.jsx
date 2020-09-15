import React, {useEffect} from 'react';
import {useAppContext, SET_PAGE_TITLE} from '../context/app';

function Home() {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: 'Domov'});
    });

    return (
        <div>Home route

        </div>
    );
}

export default Home;
