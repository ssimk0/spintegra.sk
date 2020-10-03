import gallery, {GALLERY_TYPE} from "../api/gallery";

const GalleryService = {
    upload(images, category) {
        return Promise.all(
            images.map((image) => {
                const formData = new FormData();
                formData.append('file', image)
                return gallery.upload(formData, category);
            }));
    },
    getCategoryUploads(category) {
        return gallery.listUploads({
            type: GALLERY_TYPE,
            category
        });
    },
    getUploadsCategories() {
        return gallery.list(GALLERY_TYPE);
    },
    create({name, description}) {

        return gallery.createCategory({
            name,
            description,
            type: GALLERY_TYPE,
            subPath: name.toLowerCase().replace(' ', '-')
        })
    }
};

export default GalleryService;
