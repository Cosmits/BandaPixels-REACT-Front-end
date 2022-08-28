import React, {useState} from 'react';
import './styles/App.css'
import PostUser from "./components/PostUser";
import MyButton from "./components/button/MyButton";
import MyInput from "./components/input/MyInput";
import MySelect from "./components/select/MySelect";
import AuthService from "./servises/AuthService";
import userService from "./servises/UserService";

function App() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [selectData, setSelectData] = useState('')

    const [post, setPost] = useState({id: 1, header: "Заголовок", content: 'Содержание'})

    const loginButton = async (e) => {
        e.preventDefault()

        try {
            const response = await AuthService.login(login, password)
            // console.log(response)
            localStorage.setItem('AccessToken', response.data.token)
            const str = response.data.token
            const newPost = {
                id: 1,
                header: 'Authorization',
                content: "Token: " + str.substr(0, 7) + '...' + str.substr(-7, 7)
            }
            setPost(newPost)
        } catch (error) {
            localStorage.removeItem('AccessToken')
            const newPost = {
                id: 1,
                header: 'Authorization Error',
                content: error.response.data.errors[0].msg
            }
            setPost(newPost)
            console.log(error.toJSON())
        }
    }

    const registrationButton = async (e) => {
        e.preventDefault()

        try {
            const response = await AuthService.registration(login, password)
            // console.log(response)
            localStorage.setItem('AccessToken', response.data.token)
            const str = response.data.new_user.token
            const newPost = {
                id: 1,
                header: 'Registration',
                content: "ID: " + response.data.new_user.id +" \n"+
                    "Id_type: " + response.data.new_user.id_type +" \n"+
                    "Token: " + str.substr(0, 7) + '...' + str.substr(-7, 7)
            }
            setPost(newPost)
        } catch (error) {
            localStorage.removeItem('AccessToken')
            const newPost = {
                id: 1,
                header: 'Registration Error',
                content: error.response.data.errors[0].msg
            }
            setPost(newPost)

            console.log(error.toJSON())
        }

    }

    const logoutButton = async (e) => {
        e.preventDefault()
        try {

            const response = await AuthService.logout(selectData)
            // console.log(selectData)
            const newPost = {
                id: 1,
                header: 'Logout',
                content: "message: " + response.data.message
            }
            setPost(newPost)
        } catch (error) {
            localStorage.removeItem('AccessToken')
            const newPost = {
                id: 1,
                header: 'Logout Error',
                content: error.response.data.errors[0].msg
            }
            setPost(newPost)

            console.log(error.toJSON())
        }
    }

    const infoButton = async (e) => {
        e.preventDefault()
        try {
            const response = await userService.info()
            // console.log(response)
            const newPost = {
                id: 1,
                header: 'Info',
                content: "ID: " + response.data.id +" \n"+
                    "Id_type: " + response.data.id_type +" \n"
            }
            setPost(newPost)
        } catch (error) {
            localStorage.removeItem('AccessToken')
            const newPost = {
                id: 1,
                header: 'Info Error',
                content: error.response.data.errors[0].msg
            }
            setPost(newPost)

            console.log(error.toJSON())
        }
    }

    const latencyButton = async (e) => {
        e.preventDefault()
        try {
            const response = await userService.latency()
            // console.log(response)
            const newPost = {
                id: 1,
                header: 'Latency',
                content: "message: " + response.data.message
            }
            setPost(newPost)
        } catch (error) {
            localStorage.removeItem('AccessToken')
            const newPost = {
                id: 1,
                header: 'Latency Error',
                content: error.response.data.errors[0].msg
            }
            setPost(newPost)

            console.log(error.toJSON())
        }
    }


    return (
        <div className="App">
            <h1>Форма для теста BackEnd API server</h1>
            <div>
                <MyInput
                    type="text"
                    placeholder="phone or email"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                ></MyInput>
                <MyInput
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                ></MyInput>

            </div>
            <MyButton onClick={loginButton}>SingIn</MyButton>
            <MyButton onClick={registrationButton}>SingUp</MyButton>

            <PostUser post={post}/>
            <div>
                <MyButton onClick={infoButton}>info</MyButton>
                <MyButton onClick={latencyButton}>latency</MyButton>
            </div>
            <div>
                <MyButton onClick={logoutButton}>Logout</MyButton>
                <MySelect
                    defaultValue="Select param"
                    options={[
                        {value: false, name: 'Del my token'},
                        {value: true, name: 'Del all tokens'},
                    ]}
                    value={selectData}
                    onChange={sort => setSelectData(sort)}
                >
                </MySelect>
            </div>
        </div>
    );
}

export default App;
