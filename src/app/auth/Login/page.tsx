"use client"
import LoginForm from "@/app/component/Form/LoginForm";
import { showErrorToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/app/services/api";
import { ToastContainer } from "react-toastify";


const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const router = useRouter();

    const handleLogin = async (username: string, password: string) => {
        setUserNameError('');
        setPasswordError('');
        if (!username) {
            setUserNameError('UserName is required.');
        }
        else if (!password) {
            setPasswordError('Password is required.');
        }
        else if (!username || !password) {
            return
        }
        else {

        }
        try {
            const values = {
                userName: username,
                password: password,
            };
            debugger;
            const response = await api.get(`/Login/Login?userName=${username}&password=${password}`)
            debugger
            const responsedata = response.data;
            debugger
            if (response.status != 200) {
                setErrorMessage('Login failed.');
                showErrorToast('Login Failed');
            }
            else {
                debugger
                localStorage.setItem('userName', responsedata.userName);
                localStorage.setItem('userRole', responsedata.role);
                localStorage.setItem('authToken', responsedata.accessToken);
                localStorage.setItem('userID', responsedata.userId);
                debugger
                router.push('/pages/admin');
            }

        } catch (error: any) {
            setErrorMessage('An Error occured');
            showErrorToast('An Error occured');
        }
    };
    return (
        <div>
            <div>

                <LoginForm
                    onSubmit={handleLogin}
                    usernameError={usernameError}
                    passwordError={passwordError}
                />
            </div>
            <ToastContainer />
        </div>

    )
};
export default LoginPage;