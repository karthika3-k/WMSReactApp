"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const [loading, setLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();
        useEffect(() => {
            const checkAuthentication = async () => {
                const accessToken = localStorage.getItem("authToken");
                if (accessToken) {
                    debugger;
                    // Optionally validate the token (e.g., decode a JWT or make an API call)
                    setIsAuthenticated(true);
                } else {
                    router.push('/');
                }
                setLoading(false);
            };

            checkAuthentication();
        }, [router]);

        if (loading) {
            // Replace with a spinner or skeleton loader
            return <div className="loading">Loading...</div>;
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
    return AuthComponent;
};