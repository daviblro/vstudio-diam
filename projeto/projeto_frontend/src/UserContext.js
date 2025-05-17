import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Atualiza o localStorage e o estado global
    const updateUser = (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/check-auth/", { withCredentials: true });
                if (!res.data || !res.data.id) {
                    updateUser(null); // Usuário inválido, força logout
                }
            } catch (error) {
                updateUser(null);
            }
        }, 30000); // a cada 30 segundos

        return () => clearInterval(interval);
    }, []);
      

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
