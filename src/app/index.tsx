import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function App() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        // Simulate auth check
        const checkAuth = async () => {
            const userIsAuthorized = await checkUserAuthorization();
            setIsAuthorized(userIsAuthorized);
        };

        checkAuth();
    }, []);

    if (isAuthorized === null) {
        return null;
    }

    return isAuthorized ? (
        <Redirect href="/home" />
    ) : (
        <Redirect href="/login" />
    );
}

async function checkUserAuthorization() {
    return false; // Example: Update to check real user authorization state
}
