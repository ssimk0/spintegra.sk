import React from 'react';
import i18n from "../../utils/i18n";
import {useHistory} from 'react-router-dom';

function Pagination({page, total_pages}) {
    const disabledPrev = page === 1;
    const disabledNext = page === total_pages;
    const history = useHistory();
    const changePage = (count) => {
        history.push(`${history.location.pathname}?page=${page + count}`)
    }

    return (
        <div className="pagination">
            {disabledPrev && disabledNext ? null :
                (<div className="pt-6 pb-4">
                    <hr className="flex border-gray-600 "/>
                </div>)
            }
            <nav className="grid grid-cols-2 ">
                {disabledPrev ? <div/> :
                    (<button
                        onClick={() => changePage(-1)}
                        className="prev font-semibold text-gray-500 hover:text-gray-600 transition ease-in-out duration-150"
                        aria-label={i18n.t("pagination.Prev")}>
                        ← {i18n.t("pagination.Prev")}
                    </button>)
                }
                {disabledNext ? <div/> :
                    (<button
                        onClick={() => changePage(1)}
                        className="next font-semibold  text-gray-500 hover:text-gray-600 transition ease-in-out duration-150"
                        aria-label={i18n.t("pagination.Next")}>
                        {i18n.t("pagination.Next")} →
                    </button>)
                }
            </nav>
        </div>
    )
}

export default Pagination
