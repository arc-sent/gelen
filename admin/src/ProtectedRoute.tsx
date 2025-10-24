import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const url = import.meta.env.VITE_URL;

    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        axios.get(`${url}/auth`, { withCredentials: true })
            .then(() => setAuthorized(true))
            .catch(() => setAuthorized(false));
    }, []);

    if (authorized === null) return <div>Загрузка...</div>;
    if (authorized === false) return <Navigate to="/" replace />;

    return children;
}
