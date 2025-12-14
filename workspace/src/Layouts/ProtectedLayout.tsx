import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return ( <>{children}</>);
} 

export default ProtectedLayout;
