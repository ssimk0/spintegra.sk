import pages from '../api/pages';


export default {
    getPage(slug, category) {
        return pages.detail(slug, category);
    }
}
