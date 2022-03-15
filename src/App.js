// import "./CSS/common.css";
// import { NavBar } from "./components/NavBar";
// import { NavRoutes } from "./routes/NavRoutes";
// import MockAPI from "./components/MockAPI";
// function App() {
// 	return (
// 		<div className="App">
// 			{/* <MockAPI /> */}
// 			<NavBar />
// 			<NavRoutes />
// 		</div>
// 	);
// }

// export default App;

// import Mockman from "mockman-js";
import { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
// import {  } from "react-router";
import axios from "axios";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Cart } from "./components/Cart.jsx";
import { useEffect } from "react";
export const loginSignup = createContext(null);
function App() {
	const [details, setDetails] = useState(() => {
		const token = localStorage.getItem("token");

		if (token) return { token, isAuth: true };

		return { token: "", isAuth: false };
	});
	useEffect(() => {
		console.log(details);
	}, []);

	const login = async () => {
		const res = await axios.post("/api/auth/login", {
			email: "adarshbalika@gmail.com",
			password: "adarshBalika123",
		});
		console.log("in login ", res.data.encodedToken);
		localStorage.setItem("token", res.data.encodedToken);
		localStorage.setItem("isAuth", true);
		setDetails({ token: res.data.encodedToken, isAuth: true });
	};
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isAuth");
		console.log("inside logout", details);
		setDetails({ token: "", isAuth: false });
	};
	return (
		<loginSignup.Provider value={details}>
			<BrowserRouter>
				<div className="App">
					{/* <Mockman colorScheme = "light"/> */}
					<button onClick={login}>Login</button>
					<Link to="/user"> get user </Link>
					<Link to="/" onClick={logout}>
						{" "}
						LogOut{" "}
					</Link>
					<Link to="/profile"> get profile </Link>
					<Link to="/cart"> get cart </Link>

					<Routes>
						<Route path="/" element={<h1>Hello world default wala</h1>} />
						{/* <Home path = "/user" isAuth = {details.isAuth} element = {<h1>Hello world element wala</h1>} /> */}
						<Route path="/" element={<ProtectedRoute />}>
							<Route
								path="/user"
								element={<h1>U r successfully logged in</h1>}
							/>
							<Route path="/profile" element={<h1>This is profile</h1>} />
							<Route path="/cart" element={<Cart />} />
						</Route>
						<Route path="/autherror" element={<h1>Auth error</h1>} />
					</Routes>
					{details.isAuth && <h1>HEHE</h1>}
				</div>
			</BrowserRouter>
		</loginSignup.Provider>
	);
}

export default App;
