import users from '../api/users';

const UserService = {
    login({email, password}) {
        return users.login({email, password});
    },
    userInfo() {
        return users.info();
    },
    forgotPassword(email) {
        return users.forgotPassword(email);
    },
    resetPassword({password, confirm, token}) {
        return users.resetPassword({
            password,
            password_confirmation: confirm
        }, token);
    }
}

export default UserService;
