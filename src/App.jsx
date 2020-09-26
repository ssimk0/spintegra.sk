import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

import Home from './views/Home';
import {SET_MENU_ITEMS, SET_USER_INFO, useAppContext} from './context/app';
import Page from "./views/Page/Page";
import ArticleService from "./service/article";
import PageService from "./service/page";
import Articles from "./views/Article/Articles";
import Loader from "./components/Loader";
import Login from "./views/User/Login";
import UserService from "./service/user";
import EditPage from "./views/Page/EditPage";
import i18n from "./utils/i18n";
import CreateArticle from "./views/Article/CreateArticle";
import EditArticle from "./views/Article/EditArticle";
import Article from "./views/Article/Article";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ForgotPassword from "./views/User/ForgotPassword";
import ForgotPasswordSuccess from "./views/User/ForgotPasswordSuccess";
import ResetPassword from "./views/User/ResetPassword";

function loadMenuItems(pageService, menuItems) {
    if (menuItems.length === 0) {
        return pageService.getPagesByCategory("menu")
    }
    return Promise.resolve(menuItems)
}

function App({pageService, userService}) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const {dispatch, state} = useAppContext();

    useEffect(() => {
        if (state.user == null && state.token != null && state.menuItems.length) {
            setLoading(true);
            userService.userInfo().then((userInfo) => {
                loadMenuItems(pageService, state.menuItems).then((response) => {
                    dispatch({type: SET_MENU_ITEMS, value: response})
                    dispatch({type: SET_USER_INFO, value: userInfo})
                    setLoading(false);
                });
            });
        } else {
            setLoading(true);
            loadMenuItems(pageService, state.menuItems).then((response) => {
                dispatch({type: SET_MENU_ITEMS, value: response})
                setLoading(false);
            })
        }

    }, [dispatch, pageService, state.menuItems, state.user, state.token, userService]);

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

    return !loading ? (
        <Router forceRefresh={true}>
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
                        <ProtectedRoute neededPerm="notLogged" path="/login">
                            <Login userService={UserService}/>
                        </ProtectedRoute>
                        <ProtectedRoute neededPerm="notLogged" path="/forgot-password/success">
                            <ForgotPasswordSuccess userService={UserService}/>
                        </ProtectedRoute>
                        <ProtectedRoute neededPerm="notLogged" path="/forgot-password">
                            <ForgotPassword userService={UserService}/>
                        </ProtectedRoute>
                        <ProtectedRoute neededPerm="notLogged" path="/reset-password">
                            <ResetPassword userService={UserService}/>
                        </ProtectedRoute>
                        <ProtectedRoute neededPerm="editor" path="/articles/create">
                            <CreateArticle articleService={ArticleService}/>
                        </ProtectedRoute>
                        <Route path="/articles" exact>
                            <Articles articleService={ArticleService}/>
                        </Route>
                        <ProtectedRoute neededPerm="editor" path="/articles/:slug/edit">
                            <EditArticle articleService={ArticleService}/>
                        </ProtectedRoute>
                        <Route path="/articles/:slug">
                            <Article articleService={ArticleService}/>
                        </Route>
                        <ProtectedRoute neededPerm="editor" path="/pages/:category/:slug/edit">
                            <EditPage pageService={PageService}/>
                        </ProtectedRoute>
                        <Route path="/pages/:category/:slug" >
                            <Page pageService={PageService}/>
                        </Route>
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    ) : <Loader/>;
}

export default App;
