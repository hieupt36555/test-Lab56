import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    element: JSX.Element;
}


export const PrivateRoute: React.FC<PrivateRouteProps>  = ({element}) => {
    const isCheck = !!localStorage.getItem('accessToken');
    return isCheck ? element : <Navigate to="/login" />
}