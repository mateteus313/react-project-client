import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export function PrivateRoute({children}){
    const cookie = new Cookies();

    const user = cookie.get('user');

    return user ? children : <Navigate to="/" />;
}