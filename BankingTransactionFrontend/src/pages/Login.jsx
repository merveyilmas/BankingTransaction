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

export default function Login() {
    const toast = useRef(null);
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
                sessionStorage.setItem('username', decodedUserNameFromToken.sub);
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

            if(result.status === 200){
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'User registered successfully', life: 3000 });
                setShowRegisterModal(false);
            }
            
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: "Occured an error!", life: 3000 });
        });

    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundImage: 'url("/login2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Toast ref={toast} />

            <div className="login-container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Card style={{ width: '100%', maxWidth: '40%' }}>
                    <div className="p-field">
                        <div style={{ width: '100%', maxWidth: '80%', overflow: 'hidden', borderRadius: '15px', marginBottom: '2%' }}>
                            <Image src="/logo1.png" alt="Image" width="100%" className="p-inputtext-sm p-d-block p-mb-2" />
                        </div>

                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-inputtext-sm p-d-block p-mb-2"
                            placeholder='Enter Username'
                            style={{ width: '90%' }}
                        />
                        {usernameError && <small className="p-error">{usernameError}</small>}
                    </div>
                    <div className="p-field p-mb-4">
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            className="p-inputtext-sm p-d-block"
                            placeholder='Enter Password'
                            style={{ width: '90%' }}
                        />
                        {passwordError && <small className="p-error">{passwordError}</small>}
                    </div>
                    <div className="button-container">
                        <Button
                            label="Login"
                            onClick={handleLogin}
                            className="p-button-sm"
                            style={{ width: '90%', backgroundColor: '#2b12d0', borderColor: '#2b12d0' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                        or
                    </div>

                    <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
    <a href="#" onClick={() => setShowRegisterModal(true)} style={{ color: 'black' }}>Register</a>
</div>

                </Card>
            </div>

            <Dialog header="Register" visible={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
                <div className="p-field">
                    <InputText
                        id="registerUsername"
                        value={registerData.registerUsername}
                        onChange={(e) => setRegisterData({ ...registerData, registerUsername: e.target.value })}
                        placeholder="Username"
                    />
                </div>
                <div className="p-field">
                    <InputText
                        id="registerEmail"
                        value={registerData.registerEmail}
                        onChange={(e) => setRegisterData({ ...registerData, registerEmail: e.target.value })}
                        placeholder="Email"
                    />
                </div>
                <div className="p-field">
                    <Password
                        id="registerPassword"
                        value={registerData.registerPassword}
                        onChange={(e) => setRegisterData({ ...registerData, registerPassword: e.target.value })}
                        placeholder="Password"
                    />
                </div>
                <div className="p-field">
                    <Password
                        id="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        placeholder="Confirm Password"
                    />
                </div>
                {registerError && <small className="p-error">{registerError}</small>}
                <div className='button-container'>
                    <Button label="Register" onClick={handleRegister} />
                </div>

            </Dialog>

            <style jsx>{`
                .p-field {
                    margin-bottom: 2%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-image: 'url("/login1.jpg")'; 
                    background-size: 'cover';
                    background-repeat: 'no-repeat';
                }

                .p-field input,
                .p-field .p-password input {
                    width: 100%;
                }

                .button-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 1rem;
                    width: 100%;
                }

                .button-container button {
                    width: 100%;
                }

                .p-error {
                    color: red;
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                }
            `}</style>
        </div>
    );
}
