import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import i18n from "../../utils/i18n";
import React from "react";


function ResetPasswordForm({userService}) {
    const {handleSubmit, register, errors, getValues} = useForm();
    const history = useHistory();

    const query = new URLSearchParams(history.location.search);
    const token = query.get("token");

    const onSubmit = ({password, confirm}) => {
        userService.resetPassword({password, confirm, token}).then(() => {
            history.push('/login');
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="form-group">
                <label>
                    {i18n.t("form.resetPassword.Password")}
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder={i18n.t("form.resetPassword.Password")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.resetPassword.Password")}),
                    })}
                />
                <span className="input-error">
                    {errors.password && errors.password.message}
                </span>
            </div>

            <div className="form-group">
                <label>
                    {i18n.t("form.resetPassword.PasswordConfirm")}
                </label>
                <input
                    type="password"
                    name="confirm"
                    placeholder={i18n.t("form.resetPassword.PasswordConfirm")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.resetPassword.PasswordConfirm")}),
                        validate: {
                            confirm: (value) => {
                                return value === getValues('password') || i18n.t('form.validationMessages.confirm');
                            }
                        }
                    })}
                />
                <span className="input-error">
                    {errors.confirm && errors.confirm.message}
                </span>
            </div>

            <button type="submit" className="btn">{i18n.t("form.resetPassword.Submit")}</button>
        </form>
    )
}

export default ResetPasswordForm
