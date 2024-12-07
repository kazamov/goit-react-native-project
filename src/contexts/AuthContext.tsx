import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { router } from 'expo-router';

interface AuthContextType {
    isAuthenticated: boolean | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        // Simulate auth check
        const checkAuth = async () => {
            const userIsAuthorized = await checkUserAuthorization();
            setIsAuthenticated(userIsAuthorized);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated === null) {
            return;
        }

        if (isAuthenticated) {
            router.navigate('/(tabs)/posts');
        } else {
            router.navigate('/(auth)/login');
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login: () => {
                    setIsAuthenticated(true);
                },
                logout: () => {
                    setIsAuthenticated(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

async function checkUserAuthorization() {
    return false; // Example: Update to check real user authorization state
}

export { AuthContext, AuthProvider, useAuth };
