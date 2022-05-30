import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AuthProvider } from './Context/AuthContext/AuthContext';
import AuthContent from './Components/AuthContent';

import Login from './Pages/Login';
import DashboardPage from './Pages/Dashboard';
import RegisterPage from './Pages/Register';

function App() {

  return (
    <Router>

      <AuthProvider>

      <Routes>
            
          <Route path={"/dashboard"} element={<AuthContent><DashboardPage/></AuthContent>} />
          <Route path={"/login"} element={<Login/>} />
          <Route path={"/register"} element={<RegisterPage/>} />

      </Routes>

      </AuthProvider>

    </Router>
  );
}

export default App;
