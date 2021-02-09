import axios from 'axios'

const BACKEND_URL = 'http://localhost:8080' 
const GET_MESSAGES_URL = '/demo/messages';
const POST_MESSAGES_URL = '/demo/createmessage';

class MessageService {

    getMessages(){
        return axios.get(BACKEND_URL+GET_MESSAGES_URL);
    }

    createMessage(message: IMessage) {
        return axios.post(BACKEND_URL+POST_MESSAGES_URL, {
            description: message.description,
            time: message.time,
        });
    }
}

export default new MessageService();