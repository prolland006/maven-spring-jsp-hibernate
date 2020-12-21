import axios from 'axios'

const BACKEND_URL = 'http://localhost:8080' 
const GET_USERS_URL = '/demo/users';
const POST_USERS_URL = '/demo/createuser';
const GET_USER_URL = '/demo/getuser';
const FIND_USERS_URL = '/demo/findusers';

class UserService {

    getUsers(){
        return axios.get(BACKEND_URL+GET_USERS_URL);
    }

    createUser(user: IUser) {
        return axios.post(BACKEND_URL+POST_USERS_URL, {
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            address: user.address,
            pays: 'france',
        });
    }

    getUser(user: IUser) {
        return axios.post(BACKEND_URL+GET_USER_URL, {
            firstname: user.firstname,
            lastname: user.lastname,
        });
    }

    findUsers(user: IUser) {
        return axios.post(BACKEND_URL+FIND_USERS_URL, {
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
        });
    }
}

export default new UserService();