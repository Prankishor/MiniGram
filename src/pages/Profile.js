import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { getCurrentUserDetail } from '../auth';
import noimage from '../assets/noimage.jpg'

function Profile() {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        console.log(getCurrentUserDetail());
        setUser(getCurrentUserDetail())
        setLoading(false)
    }, [])
    return (
        <div>
            <ResponsiveAppBar />
            <div className='posts_heading'>My Profile</div>
            <div className='post_container'>
                {loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : user ? (
                    <>

                        <div className='post_card'>
                            <div className='post_img'>
                                <img src={noimage} alt='Profile' />
                            </div>
                            <div className='post_title'>
                                <h2>{user.name}</h2>
                            </div>
                            <div className='post_content'>
                                <p>{user.email}</p>
                            </div>
                            <div className='post_user'>
                                <p>{user.about}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <h1>No data available</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
