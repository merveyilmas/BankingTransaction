import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'lara-light-blue'; // Eğer tema yoksa varsayılan temayı kullan
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const switchTheme = (checked) => {
        const newTheme = checked ? 'lara-dark-blue' : 'lara-light-blue';
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
