import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);
    return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
