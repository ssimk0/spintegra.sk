import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

import Home from './views/Home';
import {SET_MENU_ITEMS, useAppContext} from './context/app';
import Page from "./views/Page";
import NewsService from "./service/news";
import PageService from "./service/page";
import News from "./views/News";
import Loader from "./components/Loader";
import Login from "./views/Login";
import UserService from "./service/user";
import EditPage from "./views/EditPage";
import i18n from "./utils/i18n";

function App({pageService}) {
    const [show, setShow] = useState(false);
    const {dispatch, state} = useAppContext();

    useEffect(() => {
        if (state.menuItems.length === 0) {
            pageService.getPagesByCategory("menu").then((response) => {
                dispatch({type: SET_MENU_ITEMS, value: response})
            })
        }
    }, [dispatch, pageService, state.menuItems.length]);

    useEffect(() => {
        document.title = "Integra - " + state.title
    }, [state.title]);

    let menuClass = "w-full lg:block px-6 flex-grow lg:flex lg:items-center lg:w-auto ";

    menuClass += show ? "block" : "hidden"
    let menuList = [];

    if (state.menuItems.length) {
        menuList = state.menuItems.map((menuItem) => {
            return (
                <li className="lg:mr-4 block lg:inline-block" key={`page-${menuItem.id}`}>
                    <NavLink to={`/pages/menu/${menuItem.slug}`}
                             className="lg:mt-0 text-blue-500 hover:text-blue-800">
                        {menuItem.title}
                    </NavLink>
                </li>
            )
        })
    }

    return menuList.length ? (
        <Router>
            <div>
                <nav className="flex items-center justify-between flex-wrap py-6 shadow sm:shadow-md">
                    <div className="block lg:hidden ml-4">
                        <button onClick={() => setShow(!show)}
                                className="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-500 hover:text-blue-800 hover:border-blue-800">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className={menuClass}>
                        <ul className="text-sm lg:flex-grow text-center lg:text-left">
                            <li className="lg:mr-4 block lg:inline-block">
                                <NavLink to="/"
                                         className="lg:mt-0 text-blue-500 hover:text-blue-800">{i18n.t("pages.home.menuName")}</NavLink>
                            </li>
                            <li className="lg:mr-4 block lg:inline-block">
                                <NavLink to="/articles"
                                         className="lg:mt-0 text-blue-500 hover:text-blue-800">{i18n.t("pages.articles.menuName")}</NavLink>
                            </li>
                            {menuList}
                        </ul>
                    </div>
                </nav>
                <div className="container mx-auto p-4">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/Login">
                            <Login userService={UserService}/>
                        </Route>
                        <Route path="/articles">
                            <News newsService={NewsService}/>
                        </Route>
                        <Route path="/pages/:category/:slug/edit">
                            <EditPage pageService={PageService}/>
                        </Route>
                        <Route path="/pages/:category/:slug">
                            <Page pageService={PageService}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    ) : <Loader/>;
}

export default App;
