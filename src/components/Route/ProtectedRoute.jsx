import {Route, Redirect} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../context/app";

export function isAllowed(permType, user) {
    if (permType === 'admin') {
        return user && user.is_admin
    } else if (permType === 'editor') {
        return user && user.can_edit
    } else if (permType === 'logged') {
        return user !== null
    } else if (permType === 'notLogged') {
        return user === null
    }

    return false;
}

function ProtectedRoute({children, neededPerm, ...rest}) {
    const {state} = useAppContext();

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAllowed(neededPerm, state.user) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/not-found",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute
