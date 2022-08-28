import instanceAxios from "../axiosInstans/axios";


class AuthService {

    static async login(email, password) {
        return instanceAxios.post('/signin', {id:email, password})
    }

    static async registration(email, password) {
        return instanceAxios.post('/signup', {id:email, password})
    }

    static async logout(param) {
        return instanceAxios.get(`/api/logout?all=${param}`)
    }

}

export default AuthService