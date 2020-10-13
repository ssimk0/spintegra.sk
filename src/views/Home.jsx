import React, {useEffect} from 'react';
import {SET_PAGE_TITLE, useAppContext} from '../context/app';
import i18n from "../utils/i18n";

function Home() {
    const {dispatch} = useAppContext();

    useEffect(() => {
        dispatch({type: SET_PAGE_TITLE, value: i18n.t("pages.home.menuName")});
    });

    return (
        <div className="home">
            <div className="bg-gray-800 lg:h-screen overflow-hidden">
                <img src="/title.jpg" alt="title" className="lg:opacity-75"/>
            </div>
            <div className="py-16">
                <div className="container mx-auto">
                    <div className="mx-4">
                        <span className="text-3xl border-b-4 py-2 border-orange-500">Kto sme ?</span>
                        <p className="py-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim maiores mollitia qui quam
                            labore hic asperiores provident maxime earum eum.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-purple-200 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 container mx-auto">
                    <div className="card">
                        <img src="/icons/001-renovation.svg" alt="rekonstrukcia" className="w-24 py-2"/>
                        <span className="title">Rekonstrukcia</span>
                        <p className="py-4">
                            Consectetur adipisicing elit. Numquam repellendus aut labore
                        </p>

                    </div>
                    <div className="card">
                        <img src="/icons/004-house-plan.svg" alt="navrh rieseni" className="w-24 py-2"/>
                        <span className="title">Navrh Riešeni</span>
                        <p className="py-4">
                            Consectetur adipisicing elit. Numquam repellendus aut labore
                        </p>

                    </div>
                    <div className="card">
                        <img src="/icons/003-bulldozer.svg" alt="stavebne prace" className="w-24 py-2"/>
                        <span className="title">Stavebne Prace</span>
                        <p className="py-4">
                            Consectetur adipisicing elit. Numquam repellendus aut labore
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-16">
                <div className="container mx-auto">
                    <div className="mx-4">
                        <span className="text-3xl border-b-4 py-2 border-orange-500">Potrebujete nase sluzby ?</span>
                        <p className="py-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim maiores mollitia qui quam
                            labore hic asperiores provident maxime earum eum.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 py-16">
                <div className="container mx-auto">
                    <div className="text-center">
                        <span className="text-3xl border-b-4 py-2 border-orange-500">Nase projekty</span>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="p-8">
                                <div className="project-overlay relative cursor-pointer">
                                    <img src="/title.jpg" alt="title"/>
                                    <span className="project-text absolute top-0 left-0 w-full h-full text-white p-8">
                                        projekt jedna
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="project-overlay relative cursor-pointer">
                                    <img src="/title.jpg" alt="title"/>
                                    <span className="project-text absolute top-0 left-0 w-full h-full text-white p-8">
                                        projekt jedna
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="project-overlay relative cursor-pointer">
                                    <img src="/title.jpg" alt="title"/>
                                    <span className="project-text absolute top-0 left-0 w-full h-full text-white p-8">
                                        projekt jedna
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="project-overlay relative cursor-pointer">
                                    <img src="/title.jpg" alt="title"/>
                                    <span className="project-text absolute top-0 left-0 w-full h-full text-white p-8">
                                        projekt jedna
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="project-overlay relative cursor-pointer">
                                    <img src="/title.jpg" alt="title"/>
                                    <span className="project-text absolute top-0 left-0 w-full h-full text-white p-8">
                                        projekt jedna
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="project-overlay relative cursor-pointer">
                                    <img src="/title.jpg" alt="title"/>
                                    <span className="project-text absolute top-0 left-0 w-full h-full text-white p-8">
                                        projekt jedna
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
