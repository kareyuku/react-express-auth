import { useState } from 'react';

import { useAuth } from '../../Context/AuthContext/AuthContext';
import LogoutBtn from '../../Components/LogoutBtn';

function DashboardPage() {

    const authData = useAuth();

    return (

        <div>

            Welcome, {authData.username}

            <LogoutBtn/>

        </div>

    )

}

export default DashboardPage;