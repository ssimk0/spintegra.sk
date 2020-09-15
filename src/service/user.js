import users from '../api/users';

const UserService = {
    login({email, password}) {
        return users.login({email, password});
    },
    userInfo() {
        return users.info();
    }
}

export default UserService;
