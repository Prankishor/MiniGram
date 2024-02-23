import React, { useState } from 'react'
import { signUp } from '../services/user-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function Signup() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
    })

    const [error, setError] = useState({
        errors: {},
        isError: false,
    });

    const handleChange = (event, property) => {
        setUserData({ ...userData, [property]: event.target.value });
    };

    const handleReset = () => {
        setUserData({
            name: "",
            email: "",
            password: "",
            about: "",
        })
    }

    const handleSignup = () => {
        //console.log(userData)
        toast.info("Setting up your profile...")
        signUp(userData).then((res) => {
            //console.log(res)
            toast.success("Registered Successfully !")
            setUserData({
                name: "",
                email: "",
                password: "",
                about: "",
            })
        }).catch((e) => {
            console.log(e.response.data)
            console.log("Error log")
            setError({
                errors: e,
                isError: true,
            });

            toast.error(error.errors?.response?.data?.name)
            toast.error(error.errors?.response?.data?.email)
            toast.error(error.errors?.response?.data?.password)

        })
    }

    return (
        <div className='container'>
            <ResponsiveAppBar />
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Name'
                        onChange={(e) => handleChange(e, "name")}
                        value={userData.name} />
                </div>
                <div className='input'>
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => handleChange(e, "email")}
                        value={userData.email} />
                </div>
                <div className='input'>
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => handleChange(e, "password")}
                        value={userData.password} />
                </div>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='About me'
                        onChange={(e) => handleChange(e, "about")}
                        value={userData.about} />
                </div>
            </div>
            <div className='submit-container'>
                <div className='submit' onClick={handleSignup}>Sign Up</div>
            </div>
            <div className='reset-container'>
                <div className='reset' onClick={handleReset}>Clear</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup