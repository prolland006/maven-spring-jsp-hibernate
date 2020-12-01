import axios from 'axios'

const BACKEND_URL = 'http://localhost:8080' 
const GET_USERS_URL = '/demo/users';
const POST_USERS_URL = '/demo/createuser';

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
}

export default new UserService();