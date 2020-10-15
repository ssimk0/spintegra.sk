import React, {Suspense, useState} from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import i18n from "../../utils/i18n";
import {useForm} from "react-hook-form";
import {uploadImage} from "../../utils/uploadImage";

import {EditorState} from 'draft-js';
import Loader from "../Loader";
import {fromDraftStateToHtml, fromHtmlToDraftState} from "../../utils/editor";
import ImageUploader from "react-images-upload";

const Editor = React.lazy(() => import('react-draft-wysiwyg').then(module => {
    return {default: module.Editor}
}));


function ArticleForm({article = {}, onSubmit}) {
    const {handleSubmit, register, errors} = useForm();
    const [image, setImage] = useState([]);

    let content = EditorState.createEmpty()
    let short = EditorState.createEmpty()

    if (article && article.body) {
        content = fromHtmlToDraftState(article.body);
    }


    if (article && article.short) {
        short = fromHtmlToDraftState(article.short);
    }

    const [bodyState, onBodyStateChange] = useState(content);
    const [shortState, onShortStateChange] = useState(short);
    return (
        <div className="article-form container mx-auto py-4">
            <form onSubmit={handleSubmit((v) => onSubmit({
                ...v,
                published: true,
                image: image,
                body: fromDraftStateToHtml(bodyState),
                short: fromDraftStateToHtml(shortState)
            }))}
                  className="rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group">
                    <label>
                        {i18n.t("form.article.Title")}
                    </label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={article.title}
                        placeholder={i18n.t("form.article.Title")}
                        ref={register({
                            required: i18n.t("form.validationMessages.required", {field: i18n.t("form.article.Title")}),
                        })}
                    />
                    <span className="input-error">
                        {errors.title && errors.title.message}
                    </span>
                </div>
                <div className="form-group">
                    <label>{i18n.t("form.article.Image")}</label>
                    <ImageUploader
                        withIcon={true}
                        name="images"
                        label={i18n.t('form.gallery.infoText')}
                        buttonText={i18n.t('form.gallery.UploadForm')}
                        fileSizeError={i18n.t('form.errorMessages.fileSize')}
                        fileTypeError={i18n.t('form.errorMessage.fileExtension')}
                        onChange={setImage}
                        onDelete={setImage}
                        singleImage={true}
                        withPreview={true}
                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                        fileContainerStyle={
                            {"boxShadow": "none"}
                        }
                    />
                </div>
                <Suspense fallback={<Loader/>}>
                    <label>
                        {i18n.t("form.article.Content")}
                    </label>
                    <Editor
                        editorState={bodyState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        uploadEnabled={true}
                        uploadCallback={uploadImage}
                        onEditorStateChange={onBodyStateChange}
                    />
                </Suspense>
                <Suspense fallback={<Loader/>}>
                    <label>
                        {i18n.t("form.article.Short")}
                    </label>
                    <Editor
                        editorState={shortState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        uploadEnabled={true}
                        uploadCallback={uploadImage}
                        onEditorStateChange={onShortStateChange}
                    />
                </Suspense>
                <div className="pt-2">
                    <button type="submit" className="btn">{i18n.t("form.article.Submit")}</button>
                </div>
            </form>
        </div>
    )
}


export default ArticleForm;
