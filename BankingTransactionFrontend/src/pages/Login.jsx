import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import UserService from '../services/UserService';
import { jwtDecode } from 'jwt-decode';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useDispatch } from 'react-redux'
import { getUsername } from '../store/actions/UserAction';
import "../styles/Login.css"

export default function Login() {

    const toast = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userService = new UserService();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const [registerData, setRegisterData] = useState({
        registerUsername: '',
        registerEmail: '',
        registerPassword: '',
        confirmPassword: ''
    });
    const [registerError, setRegisterError] = useState('');

    const validateForm = () => {
        let isValid = true;
        if (!username) {
            setUsernameError('Username is required.');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }

        const loginDatas = {
            "usernameOrEmail": username,
            "password": password
        };

        await userService.login(loginDatas).then(result => {
            if (result.status === 200) {
                const token = result.data;
                sessionStorage.setItem('token', token.accessToken);

                const decodedUserNameFromToken = jwtDecode(token.accessToken);
                //sessionStorage.setItem('username', decodedUserNameFromToken.sub);

                dispatch(getUsername(decodedUserNameFromToken.sub));

                navigate("/home");                
                toast.current.show({ severity: 'success', summary: 'Success', detail: result.data.message, life: 3000 });
            }
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
        });
    };

    const handleRegister = async () => {
        const { registerUsername, registerEmail, registerPassword, confirmPassword } = registerData;

        if (!registerUsername || !registerEmail || !registerPassword || !confirmPassword) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'All fields are required', life: 3000 });
            return;
        }

        if (registerPassword !== confirmPassword) {
            setRegisterError('Passwords do not match.');
            return;
        } else {
            setRegisterError('');
        }

        const registrationData = {
            "username": registerUsername,
            "email": registerEmail,
            "password": registerPassword
        };

        await userService.registerNewUser(registrationData).then(result => {

            if (result.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'User registered successfully', life: 3000 });
                setShowRegisterModal(false);
            }

        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: "Occured an error!", life: 3000 });
        });

    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url("/login.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Toast ref={toast} />

            <div className="login-page-container">
                <Card className="login-page-card">
                    <div className="login-page-field">

                        <div className="login-page-logo-container">
                            <Image src="/login-logo.png" alt="Image" width="100%" />
                        </div>

                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-page-input"
                            placeholder='Enter Username'
                        />
                        {usernameError && <small className="login-page-error">{usernameError}</small>}
                    </div>

                    <div className="login-page-field ">
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-page-input"
                            placeholder='Enter Password'
                        />
                        {passwordError && <small className="p-error">{passwordError}</small>}
                    </div>

                    <div className="login-page-button-container">
                        <Button
                            label="Login"
                            onClick={handleLogin}
                            className="login-page-button"
                        />
                    </div>

                    <div className="login-page-or-text">
                        or
                    </div>

                    <div className="login-page-register-link">
                        <a href="#" onClick={() => setShowRegisterModal(true)}>Register</a>
                    </div>
                </Card>
            </div>

            <Dialog header="Register" visible={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
                <div className="login-page-field">
                    <InputText
                        id="registerUsername"
                        value={registerData.registerUsername}
                        onChange={(e) => setRegisterData({ ...registerData, registerUsername: e.target.value })}
                        placeholder="Username"
                    />
                </div>
                <div className="login-page-field">
                    <InputText
                        id="registerEmail"
                        value={registerData.registerEmail}
                        onChange={(e) => setRegisterData({ ...registerData, registerEmail: e.target.value })}
                        placeholder="Email"
                    />
                </div>
                <div className="login-page-field">
                    <Password
                        id="registerPassword"
                        value={registerData.registerPassword}
                        onChange={(e) => setRegisterData({ ...registerData, registerPassword: e.target.value })}
                        placeholder="Password"
                    />
                </div>
                <div className="login-page-field">
                    <Password
                        id="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        placeholder="Confirm Password"
                    />
                </div>
                {registerError && <small className="login-page-error">{registerError}</small>}
                <div className='login-page-button-container'>
                    <Button label="Register" onClick={handleRegister} />
                </div>
            </Dialog>
        
        </div>
    )
}
