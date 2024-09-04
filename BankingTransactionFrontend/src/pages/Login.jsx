import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { useNavigate, Link } from "react-router-dom";
import UserService from '../services/UserService';
import { jwtDecode } from 'jwt-decode';
import { Toast } from 'primereact/toast';

export default function Login() {

    const toast = useRef(null);
    const navigate = useNavigate();
    const userService = new UserService()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        // console.log('Username:', username);
        // console.log('Password:', password);

        const loginDatas = {
            "usernameOrEmail": username,
            "password": password
        }

        await userService.login(loginDatas).then(result => {

            if (result.status === 200) {

                const token = result.data;         
              
                sessionStorage.setItem('token', token.accessToken);
                console.log("Stored token:", sessionStorage.getItem('token'));

                const decodedUserNameFromToken = jwtDecode(token.accessToken);
                console.log(decodedUserNameFromToken)

                sessionStorage.setItem('username', decodedUserNameFromToken.sub);

                navigate("/home")
                toast.current.show({ severity: 'success', summary: 'Success', detail: result.data.message, life: 3000 });
            }
        }).catch(error => {
            console.log("***********")
            console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
        })

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
                    </div>
                    <div className="button-container">
                        <Button
                            label="Login"
                            onClick={handleLogin}
                            className="p-button-sm"
                            style={{ width: '90%', backgroundColor: '#2b12d0', borderColor: '#2b12d0' }}
                        />
                    </div>
                </Card>
            </div>

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
                    
            `}</style>
        </div>

    );
}
