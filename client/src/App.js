import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Singup';
import Login from './components/Login';
import LaunchVideo from './components/LaunchVideo';
import Header from './components/Header';

function App() {
  const user = localStorage.getItem('token');

  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <LaunchVideo />
            </>
          }
        />
        <Route
          path="/main"
          element={user ? <Main /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <Signup />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
