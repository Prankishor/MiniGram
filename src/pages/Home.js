import React from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import minigramlogo from '../assets/minigramlogo.png'
function Home() {
    return (
        <div>
            <ResponsiveAppBar />
            <div className='home_container'>
                <h1>MiniGram</h1>
                <span className='subhead'>Your own mini circled social media platform.</span>
                <img src={minigramlogo} alt='logo' />
                <span>MiniGram v1</span>
                <br></br>
                <span>Developerd by Prankishore Talukdar</span>
                <span>Powered by React.js</span>
            </div>
        </div>
    )
}

export default Home
