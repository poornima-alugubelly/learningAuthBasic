import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { loginSignup } from "../App";

const ProtectedRoute = () => {
	const { isAuth } = useContext(loginSignup);
	// return <Route path={path} element={isAuth ? element : <Navigate to="/" />} />;
	return isAuth ? <Outlet /> : <Navigate to="/autherror" />;
};

export { ProtectedRoute };
