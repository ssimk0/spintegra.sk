import React, {useReducer, useContext} from "react";
import localStorageBackwardCompatibilityInit from '../utils/localStorage';

localStorageBackwardCompatibilityInit();

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const SET_MENU_ITEMS = 'SET_MENU_ITEMS';

let reducer = (state, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state, user: {
                    ...state.user,
                    ...action.value
                }
            };
        case SET_TOKEN:
            localStorage.setItem("token", action.value);
            return {...state, token: action.value};
        case SET_PAGE_TITLE:
            if (state.title === action.value) {
                return state
            }
            return {...state, title: action.value}
        case SET_MENU_ITEMS:
            return {...state, menuItems: action.value}
        default:
            return state;
    }
};

const initialState = {user: null, token: localStorage.getItem("token") || null, title: "", menuItems: []}

const AppContext = React.createContext(initialState);

function AppProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
}

const useAppContext = () => useContext(AppContext);

export {AppContext, AppProvider, reducer, initialState, useAppContext};
