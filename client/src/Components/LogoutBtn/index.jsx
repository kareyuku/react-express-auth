import { useAuthUpdate, logout } from '../../Context/AuthContext/AuthContext';

import './logoutBtn.css';

const afterLogout = "/login"

function LogoutBtn()
{

    const authUpdate = useAuthUpdate();

    const logoutClick = () => {
        logout();
        authUpdate({})
        document.location = afterLogout
    }

    return (
        <button className='logoutBtn' onClick={logoutClick}>
            Logout
        </button>
    )

}

export default LogoutBtn;