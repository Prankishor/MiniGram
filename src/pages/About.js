import React from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar';
function About() {
    return (
        <div>
            <ResponsiveAppBar />
            <div className='posts_heading'>About</div>
            <div className='post_container'>
                <br></br>
                <div>Developer: Prankishore Talukdar</div>
                <div>Technology Stack</div>
                <div>Frontend: React.js</div>
                <div>Backend: Springboot</div>
                <div>Databases: MySQL</div>
                <div>Authentication & Authorization: <br></br>Spring Security / JSON Web Tokens</div>
                <div>Contact: prankishortalukdar0@gmail.com</div>
                <div>Check out other projects from the developer: </div>
                <br></br>
                <div><a href='https://master--flourishing-kashata-a3ab86.netlify.app/' target='blank'>FitMe</a></div>
                <br></br>
                <div><a href='https://prankishor.github.io/myportfolio/' target='blank'>Portfolio</a></div>
            </div>
        </div>
    )
}

export default About








