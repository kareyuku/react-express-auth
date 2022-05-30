import { useState } from "react";
import { fetchRegister } from "../../Context/AuthContext/AuthContext";

import { FaUser, FaKey } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const registerClick = async () => {
        const data = await fetchRegister({username, email, password});
        if(data.err) return alert(data.err);
        document.location = '/login';
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

                <label><HiMail/></label>

                <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                maxLength={256}
                onChange={(e) => {setEmail(e.target.value)}}
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

            <button onClick={registerClick}>Register</button>

        </div>

    )
}

export default RegisterPage;