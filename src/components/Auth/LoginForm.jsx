import apiSetup from "../../api";
import {SET_TOKEN, SET_USER_INFO, useAppContext} from "../../context/app";
import i18n from "../../utils/i18n";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import Error from "../Error/Error";

function LoginForm({userService}) {
    const {handleSubmit, register, errors} = useForm();
    const [err, setErr] = useState(null);
    const {dispatch} = useAppContext();
    const history = useHistory();

    const onSubmit = values => {
        userService.login(values).then((token) => {
            apiSetup(token.token);
            userService.userInfo().then((info) => {
                dispatch({type: SET_USER_INFO, value: info});
                dispatch({type: SET_TOKEN, value: token.token});

                history.push('/');
            });
        }, (err) => {

            if (err.status === 403) {
                setErr(i18n.t("errors.login"))
            } else {
                setErr(i18n.t("errors.unknown"))
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Error error={err}/>
            <div className="form-group">
                <label>
                    {i18n.t("form.login.Email")}
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder={i18n.t("form.login.Email")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.login.Email")}),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: i18n.t("form.validationMessages.invalid_format", {field: i18n.t("form.login.Email")})
                        }
                    })}
                />
                <span className="input-error">
                    {errors.email && errors.email.message}
                </span>
            </div>
            <div className="form-group">
                <label>
                    {i18n.t("form.login.Password")}
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder={i18n.t("form.login.Password")}
                    ref={register({
                        required: i18n.t("form.validationMessages.required", {field: i18n.t("form.login.Password")}),
                        message: i18n.t("form.validationMessages.required", {field: i18n.t("form.login.Password")})
                    })}
                />
                <span className="input-error">
                    {errors.password && errors.password.message}
                </span>
            </div>
            <p className="mb-2">
                <Link to="/forgot-password"
                      className="text-blue-500 hover:text-blue-800 ">{i18n.t('pages.forgotPassword.menuName')}</Link>
            </p>
            <button type="submit" className="btn">{i18n.t("form.login.Submit")}</button>
        </form>
    )
}

export default LoginForm;
