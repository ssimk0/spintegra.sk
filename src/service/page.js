import pages from '../api/pages';


const PageService = {
    getPage(slug, category) {
        return pages.detail(slug, category);
    },
    getPagesByCategory(category) {
        return pages.byCategorySlug(category);
    },

}

export default PageService
