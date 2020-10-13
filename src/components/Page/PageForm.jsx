import React, {Suspense, useState} from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import i18n from "../../utils/i18n";
import {useForm} from "react-hook-form";
import {uploadImage} from "../../utils/uploadImage";

import { EditorState} from 'draft-js';
import Loader from "../Loader";
import {fromDraftStateToHtml, fromHtmlToDraftState} from "../../utils/editor";

const Editor = React.lazy(() => import('react-draft-wysiwyg').then(module => {
    return {default: module.Editor}
}));


function PageForm({page, onSubmit}) {
    const {handleSubmit, register, errors} = useForm();
    let content = EditorState.createEmpty();
    if (page && page.body) {
        content = fromHtmlToDraftState(page.body);
    }

    const [contentState, onEditorStateChange] = useState(content);

    return (
        <div className="page-form container mx-auto py-4">
            <form onSubmit={handleSubmit((v) => onSubmit({...v, body: fromDraftStateToHtml(contentState)}))}
                  className="rounded px-8 pt-6 pb-8 mb-4">
                <div className="form-group">
                    <label>
                        {i18n.t("form.pages.Title")}
                    </label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={page ? page.title : ''}
                        placeholder={i18n.t("form.pages.Title")}
                        ref={register({
                            required: i18n.t("form.validationMessages.required", {field: i18n.t("form.pages.Title")}),
                        })}
                    />
                    <span className="input-error">
                        {errors.title && errors.title.message}
                    </span>
                </div>
                <Suspense fallback={<Loader/>}>
                    <Editor
                        editorState={contentState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        uploadEnabled={true}
                        uploadCallback={uploadImage}
                        onEditorStateChange={onEditorStateChange}
                    />
                </Suspense>
                <button type="submit" className="btn">{i18n.t("form.pages.Submit")}</button>
            </form>
        </div>
    )
}


export default PageForm;
