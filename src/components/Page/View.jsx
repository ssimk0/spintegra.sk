import React from "react";
import {Link, NavLink} from "react-router-dom";
import i18n from "../../utils/i18n";


function PageView({page, parent_page, user, parent_slug}) {
    let editLink
    let createLink
    let sideMenu

    if (user && (user.can_edit || user.is_admin)) {
        editLink = (
            <Link to={`/pages/${page.page_category.slug}/${page.slug}/edit`}
                  className="btn">{i18n.t('page.link.edit')}</Link>
        )
        if (parent_page.slug === page.slug) {
            createLink = (
                <Link to={`/pages/${page.page_category.slug}/${page.id}/create`}
                      className="btn mr-4">{i18n.t('page.link.create')}</Link>
            )
        }
    }

    if (parent_page && parent_page.children && parent_page.children.length) {
        let linkClass = "px-4 py-2"
        sideMenu = (
            <div>
                <ul className="text-left">
                    <li className={linkClass}>
                        <NavLink to={`/pages/${parent_page.page_category.slug}/${parent_slug}`}
                                 exact>{parent_page.title}</NavLink>
                    </li>
                    {parent_page.children.map((child) => (<li className={linkClass} key={child.id}><NavLink
                        to={`/pages/${child.page_category.slug}/${parent_slug}/${child.slug}`}>{child.title}</NavLink>
                    </li>))}

                </ul>
            </div>
        )
    }

    return (
        <div id="page" className="container mx-auto py-4">
            <div>
                <div className="text-right">
                    {createLink}
                    {editLink}
                </div>
            </div>
            <div className="grid grid-cols-4">
                {sideMenu}
                <div className="col-span-2">

                    <span className="title">{page.title}</span>
                    <div className="content pt-4" dangerouslySetInnerHTML={{__html: page.body}}>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PageView;
