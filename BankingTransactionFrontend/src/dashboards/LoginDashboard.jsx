import React, { useState, useEffect } from 'react'
import { useTheme } from '../utilities/ThemeContext'; // ThemeContext dosyanızın doğru yolu
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomepageDashboard from './HomepageDashboard';
import Login from '../pages/Login';

export default function LoginDashboard() {

    const { theme } = useTheme();

    useEffect(() => {
        const themeLink = document.getElementById('theme-link');
        if (themeLink) {
            themeLink.href = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;
        } else {
            const newThemeLink = document.createElement('link');
            newThemeLink.id = 'theme-link';
            newThemeLink.rel = 'stylesheet';
            newThemeLink.href = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;
            document.head.appendChild(newThemeLink);
        }
    }, [theme]);


    return (

        <div >
            <Router>
                <Routes>
                    <Route exact path="/home/*" element={<HomepageDashboard />} />
                    <Route exact path="/" element={<Login />} />
                </Routes>
            </Router>
        </div>

    );


}
