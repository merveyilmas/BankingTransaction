import React from 'react';
import { Button } from 'primereact/button';
import { useTheme } from '../utilities/ThemeContext';
import "../styles/Footer.css"


export default function Footer() {

    const { theme, switchTheme } = useTheme();

    const navigateToURL = (url) => {
        window.location.href = url;
    };

    return (
        <>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-socials">
                        <Button icon="pi pi-facebook" className="p-button-rounded p-button-secondary" tooltip="Facebook"
                            onClick={() => navigateToURL('')} />
                        <Button icon="pi pi-twitter" className="p-button-rounded p-button-secondary" tooltip="X"
                            onClick={() => navigateToURL('')} />
                        <Button icon="pi pi-instagram" className="p-button-rounded p-button-secondary" tooltip="Instagram"
                            onClick={() => navigateToURL('')} />
                        <Button icon="pi pi-linkedin" className="p-button-rounded p-button-secondary" tooltip="LinkedIn"
                            onClick={() => window.open('https://www.linkedin.com/in/merve-yilmas/', '_blank')} />
                    </div>
                    <div className="footer-bottom">
                        <p style={{ marginTop: '1%', marginBottom: "0.2%" }}>&copy; 2024 <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Banking App</a></p>
                        <p> Developed By Merve</p>
                    </div>
                </div>
            </div>
        </>
    );
}

