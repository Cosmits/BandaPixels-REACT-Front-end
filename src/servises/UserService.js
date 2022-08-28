import instanceAxios from "../axiosInstans/axios";

class UserService {


    static async info() {
        return instanceAxios.get('/api/info')
    }

    static async latency(email, password) {
        return instanceAxios.get('/api/latency' )
    }
}

export default UserService