import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import LaunchVideo from "./components/LaunchVideo";
import Header from './components/Header';

function App() {
	const user = localStorage.getItem("token");

	return (
		<div>
		<Header/>
		<Routes>
			<Route path="/home" element={<LaunchVideo/>}/>
			{user && <Route path="/main" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/main" exact element={<Main />}/>
			<Route path="/" element={<Navigate replace to="/home" />} />
		</Routes>
		</div>

	);
}

export default App;

