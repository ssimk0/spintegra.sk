import React from "react";
import i18n from "../../utils/i18n";
import {useForm} from "react-hook-form";

function UploadCategoryForm({onSubmit}) {
    const {handleSubmit, register, errors} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 container mx-auto">
            <div className="form-group">
                <label>
                    {i18n.t("form.gallery.Name")}
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder={i18n.t("form.gallery.Name")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.gallery.Name")}),
                    })}
                />
                <span className="input-error">
                    {errors.email && errors.email.message}
                </span>
            </div>

            <div className="form-group">
                <label>
                    {i18n.t("form.gallery.Desc")}
                </label>
                <input
                    type="text"
                    name="description"
                    placeholder={i18n.t("form.gallery.Desc")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.gallery.Desc")}),
                    })}
                />
                <span className="input-error">
                    {errors.email && errors.email.message}
                </span>
            </div>

            <div>
                <button type="submit" className="btn" >{i18n.t('form.gallery.Create')}</button>
            </div>
        </form>
    );
}

export default UploadCategoryForm
