import i18n from "../../utils/i18n";
import React from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

function ForgotPasswordForm({userService}) {
    const {handleSubmit, register, errors} = useForm();
    const history = useHistory();

    const onSubmit = ({email}) => {
        userService.forgotPassword(email).then(() => {
            history.push('/forgot-password/success');
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="form-group">
                <label>
                    {i18n.t("form.forgotPassword.Email")}
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder={i18n.t("form.login.Email")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.forgotPassword.Email")}),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: i18n.t("form.validationMessages.invalid_format", {field: i18n.t("form.forgotPassword.Email")})
                        }
                    })}
                />
                <span className="input-error">
                    {errors.email && errors.email.message}
                </span>
            </div>

            <button type="submit" className="btn">{i18n.t("form.forgotPassword.Submit")}</button>
        </form>
    )
}

export default ForgotPasswordForm;
