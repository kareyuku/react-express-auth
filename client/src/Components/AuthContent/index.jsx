// AuthContent is for protecting childrens from rendering content to not authenticated users

import { useAuth } from "../../Context/AuthContext/AuthContext";

const AuthContent = ({children}) => {

    const authData = useAuth();

    console.log(authData)

    return (
        <>
            {authData?.username && children}
            {!authData?.username && !authData?.loading && "Oh, did you forget to login? Okay, don't worry, I'm teleporting you to /login"}
        </>
    )

}

export default AuthContent;