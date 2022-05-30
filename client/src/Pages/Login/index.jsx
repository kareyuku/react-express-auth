import { useState } from "react";
import { useAuth, useAuthUpdate, logout, fetchLogin } from "../../Context/AuthContext/AuthContext";

import { FaUser, FaKey } from 'react-icons/fa';

import './login.css';

const afterLogin = '/dashboard';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authData = useAuth();
    const authUpdate = useAuthUpdate();

    const loginClick = async () => {

        const {data} = await fetchLogin({ username, password });

        if(data.data?.username) {
            const { username, id } = data.data;
            authUpdate({ username, id});
            document.location = afterLogin;
        }

    }

    return (

        <div className="auth__container">

            <div className="input__container">

                <label><FaUser/></label>

                <input 
                type="text"
                name="username"
                placeholder="Username"
                maxLength={30}
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                />

            </div>

            <div className="input__container">

                <label><FaKey/></label>

                <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                maxLength={256}
                onChange={(e) => {setPassword(e.target.value)}}
                />

            </div>

            <button
            onClick={loginClick}
            >
                Login
            </button>

        </div>

    )
}

export default Login;