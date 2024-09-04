import React, { useState, useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Menu } from 'primereact/menu';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from '../utilities/ThemeContext'; // ThemeContext dosyanızın yolu
import SessionInfo from "../enums/SessionInfo";


export default function Navbar() {

    const menuRef = useRef(null);
    const navigate = useNavigate();

    const { theme, switchTheme } = useTheme();


    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/home/');
            }
        }

    ];

    const profileItems = [
        {
            items: [
                {
                    template: () => {
                        return (
                            <div style={{ marginLeft: '4%' }}>
                                <span style={{ marginLeft: '10px' }}> Change Thema</span>

                                <div style={{ display: 'flex', alignItems: 'center', padding: '5px', marginLeft: '6%' }}>
                                    <span style={{ marginRight: '10px' }}><i className="pi pi-sun"></i></span>
                                    <link id="theme-link" rel="stylesheet" href={`https://unpkg.com/primereact/resources/themes/${theme}/theme.css`} />
                                    <InputSwitch checked={theme === 'lara-dark-blue'} onChange={(e) => switchTheme(e.value)} />
                                    <span style={{ marginLeft: '10px' }}><i className="pi pi-moon"></i></span>

                                </div>
                            </div>

                        );
                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        // localStorage'dan sil
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('username');
                        navigate('/');
                    },
                    style: { padding: '5px' }
                }
            ]
        }
    ];

    const start = <img alt="logo_alt" src="/logo2-1.png" height="40" className="mr-2" ></img>;

    const end = (

        <div className="flex align-items-center gap-5">

            <div >

                <div
                    onClick={(e) => menuRef.current.toggle(e)}
                    style={{ cursor: 'pointer', display: 'inline-block', display: "flex", alignItems: "center", gap: "0.5em" }}
                >

                    <span className="p-inputgroup-addon" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                        <i className="pi pi-user"></i>
                    </span>


                    <span className="font-bold"> {sessionStorage.getItem("username")} </span>

                </div>
                <Menu model={profileItems} popup ref={menuRef} />
            </div>
        </div>

    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
