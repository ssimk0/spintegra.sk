import React, {useState} from "react";
import ImageUploader from 'react-images-upload';
import i18n from "../../utils/i18n";

function UploadForm({onSubmit}) {
    const [images, setImages] = useState([]);

    return (
        <form className="container mx-auto py-4" onSubmit={(e) => {
            e.preventDefault();
            onSubmit(images);
        }}>
            <ImageUploader
                withIcon={true}
                name="images"
                label={i18n.t('form.gallery.infoText')}
                buttonText={i18n.t('form.gallery.UploadForm')}
                fileSizeError={i18n.t('form.errorMessages.fileSize')}
                fileTypeError={i18n.t('form.errorMessage.fileExtension')}
                onChange={setImages}
                onDelete={setImages}
                withPreview={true}
                imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                fileContainerStyle={
                    {"boxShadow": "none"}
                }
            />

            <div>
                <button type="submit" className="btn" >{i18n.t('form.gallery.Submit')}</button>
            </div>
        </form>
    );
}

export default UploadForm
