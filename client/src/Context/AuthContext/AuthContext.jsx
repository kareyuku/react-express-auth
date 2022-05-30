import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

const authURL = "http://localhost:666/auth/login";
const registerURL = "http://localhost:666/auth/register";
const logoutURL = "http://localhost:666/auth/logout"

export async function fetchLogin(data) {
    const loginSession = await axios.post(authURL, data, { withCredentials: true }).catch(err => err?.response?.data?.err)
    return loginSession;
}

export async function fetchRegister(data) {
    const registerSession = await axios.post(registerURL, data, { withCredentials: true }).catch(err => err?.response?.data);
    console.log(registerSession)
    return registerSession;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}

export function AuthProvider({children}) {
    const [user, setUser] = useState({loading: true});

    const updateUser = (data) => {
        setUser(data);
    }

    const checkLogin = async () => {

        const loginSession = await fetchLogin({});

        const { data } = loginSession;

        if(data?.data?.username)
        {
            setUser({loading: false, username: data?.data?.username, id: data?.data?.id})
        } else {
            setUser({loading: false})
        }

    }

    useEffect( () => {
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={user}>
            <AuthUpdateContext.Provider value={updateUser}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )

}

export async function logout() {
    await axios.post(logoutURL, {}, { withCredentials: true }).catch(err => "error");
    return "logged out";
}