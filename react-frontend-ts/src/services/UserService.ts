import axios from 'axios'

const BACKEND_URL = 'http://localhost:8080' 
const GET_USERS_URL = '/demo/users';
const GET_MESSAGES_URL = '/demo/messages';
const POST_USERS_URL = '/demo/createuser';
const GET_USER_URL = '/demo/getuser';
const GET_USER_ID_URL = '/demo/getuserId';
const FIND_USERS_URL = '/demo/findusers';
const REMOVE_USER_URL = '/demo/removeuser';

class UserService {

    getUsers(){
        return axios.get(BACKEND_URL+GET_USERS_URL);
    }

    getMessages(){
        return axios.get(BACKEND_URL+GET_MESSAGES_URL);
    }

    createUser(user: IUser) {
        return axios.post(BACKEND_URL+POST_USERS_URL, {
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            address: user.address,
            pays: 'france',
            company: user.company,
        });
    }

    removeUser(id: number) {
        return axios.post(BACKEND_URL+REMOVE_USER_URL, {
            id: id,
        });
    }

    getUser(user: IUser) {
        return axios.post(BACKEND_URL+GET_USER_URL, {
            firstname: user.firstname,
            lastname: user.lastname,
        });
    }

    getUserId(id: number) {
        return axios.post(BACKEND_URL+GET_USER_ID_URL, {
            id: id,
        });
    }

    findUsers(user: IUser) {
        return axios.post(BACKEND_URL+FIND_USERS_URL, {
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            company: user.company,
        });
    }
}

export default new UserService();