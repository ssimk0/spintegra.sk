import React, {useContext, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

import Home from './views/Home';
import {AppContext} from './context/app';
import {Helmet} from "react-helmet";
import Page from "./views/Page";
import NewsService from "./service/newsService";
import PageService from "./service/pageService";
import News from "./views/News";

function App() {
    const {state} = useContext(AppContext);
    const [show, setShow] = useState(false);

    let menuClass = "w-full lg:block px-6 flex-grow lg:flex lg:items-center lg:w-auto ";

    menuClass += show ? "block" : "hidden"

    return (
        <Router>
            <Helmet>
                <title>Integra - {state.title}</title>
            </Helmet>
            <div>
                <nav className="flex items-center justify-between flex-wrap py-6 shadow sm:shadow-md">
                    <div className="block lg:hidden ml-4">
                        <button onClick={() => setShow(!show)}
                            className="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-500 hover:text-blue-800 hover:border-blue-800">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className={menuClass}>
                        <ul className="text-sm lg:flex-grow text-center lg:text-left">
                            <li className="mr-4">
                                <NavLink to="/" className="block lg:inline-block lg:mt-0 text-blue-500 hover:text-blue-800">Home</NavLink>
                                <NavLink to="/articles" className="lg:ml-4 block lg:inline-block lg:mt-0 text-blue-500 hover:text-blue-800">Aktuality</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mx-auto p-4">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/articles">
                            <News newsService={NewsService}/>
                        </Route>
                        <Route exact path="/pages/:category/:slug">
                            <Page pageService={PageService}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
