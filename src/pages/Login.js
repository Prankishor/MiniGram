import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../services/user-service';
import { doLogin } from '../auth';
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from './components/ResponsiveAppBar';

function Login() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event, property) => {
        setUserData({ ...userData, [property]: event.target.value });
    };

    const handleReset = () => {
        setUserData({
            username: "",
            password: "",
        })
    }

    const handleLogIn = () => {
        console.log("User Data: ")
        console.log(userData)

        if (userData.username === "" || userData.password === "") {
            toast.error("Username or Password cannot be empty!")
        }

        login(userData).then((token) => {
            console.log("Login log")
            console.log(token)
            doLogin(token, () => {
                console.log("JWT Token saved in local storage")
                navigate("/dashboard/feed")
            })
            toast.success("Logged In Successfully!")

            //Redirect to user dashboard page


        }).catch((e) => {
            toast.error("Invalid Credentials")
        })
    }

    return (
        <div className='container'>
            <ResponsiveAppBar />
            <div className='header'>
                <div className='text'>Log in</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => handleChange(e, "username")}
                        value={userData.username} />
                </div>
                <div className='input'>
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => handleChange(e, "password")}
                        value={userData.password} />
                </div>
            </div>
            <div className='submit-container'>
                <div className='submit' onClick={handleLogIn}>Log in</div>
            </div>
            <div className='reset-container'>
                <div className='reset' onClick={handleReset}>Clear</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
