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
import Upload from "./views/Gallery/Upload";
import GalleryService from "./service/gallery";
import CreateUploadCategory from "./views/Gallery/CreateUploadCategory";
import CategoryList from "./views/Gallery/CategoryList";
import CategoryUploads from "./views/Gallery/CategoryUploads";
import CreateSubPage from "./views/Page/CreateSubPage";

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

    let menuClass = "w-full lg:block px-6 flex-grow lg:flex lg:items-end lg:w-auto ";

    menuClass += show ? "block" : "hidden"
    let menuList = [];

    if (state.menuItems.length) {
        menuList = state.menuItems.map((menuItem) => {
            return (
                <li className="lg:mr-4 block lg:inline-block" key={`page-${menuItem.id}`}>
                    <NavLink to={`/pages/menu/${menuItem.slug}`}
                             className="lg:mt-0 text-white hover:text-orange-600">
                        {menuItem.title}
                    </NavLink>
                </li>
            )
        })
    }

    return !loading ? (
        <Router>
            <div>
                <div className="absolute top-0 right-0 left-0 z-50 main-menu">
                    <nav className="flex items-center justify-between flex-wrap py-6">
                        <div className="block lg:hidden ml-4">
                            <button onClick={() => setShow(!show)}
                                    className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-orange-600">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex lg:ml-4 px-6 items-center mr-4">
                            <img src="/logo.png" alt="logo" className="lg:w-16 w-12"/>
                            <span className="text-orange-600 text-shadow text-2xl font-bold ml-4">Integra</span>
                        </div>
                        <div className={menuClass}>
                            <ul className="text-sm lg:flex-grow text-center lg:text-right ">
                                <li className="lg:mr-4 block lg:inline-block">
                                    <NavLink to="/" exact
                                             className="lg:mt-0 text-white hover:text-orange-600">{i18n.t("pages.home.menuName")}</NavLink>
                                </li>
                                <li className="lg:mr-4 block lg:inline-block">
                                    <NavLink to="/articles"
                                             className="lg:mt-0 text-white hover:text-orange-600">{i18n.t("pages.articles.menuName")}</NavLink>
                                </li>
                                <li className="lg:mr-4 block lg:inline-block">
                                    <NavLink to="/gallery"
                                             className="lg:mt-0 text-white hover:text-orange-600">{i18n.t("pages.gallery.menuName")}</NavLink>
                                </li>
                                {menuList}
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="mt-24">
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
                        <ProtectedRoute neededPerm="editor" path="/pages/:category/:id/create">
                            <CreateSubPage pageService={PageService}/>
                        </ProtectedRoute>

                        <Route path="/pages/:category/:parent_slug/:slug">
                            <Page pageService={PageService}/>
                        </Route>
                        <Route path="/pages/:category/:parent_slug">
                            <Page pageService={PageService}/>
                        </Route>

                        <ProtectedRoute neededPerm="editor" path="/gallery/:category/upload">
                            <Upload galleryService={GalleryService}/>
                        </ProtectedRoute>

                        <ProtectedRoute neededPerm="editor" path="/gallery/create">
                            <CreateUploadCategory galleryService={GalleryService}/>
                        </ProtectedRoute>

                        <Route path="/gallery/:category">
                            <CategoryUploads galleryService={GalleryService}/>
                        </Route>

                        <Route path="/gallery">
                            <CategoryList galleryService={GalleryService}/>
                        </Route>


                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </div>
                <div className="text-center bg-gray-900">
                    <p className="text-white py-8">
                        Copyright © {(new Date()).getFullYear()}
                    </p>
                </div>
            </div>
        </Router>
    ) : <Loader/>;
}

export default App;
