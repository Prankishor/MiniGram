import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { loadAllPosts } from '../services/post-service';
import noImage from '../assets/noimage.jpg'
function Feed() {
    const [postContent, setPostContent] = useState([])

    useEffect(() => {
        loadAllPosts().then((data) => {
            //let posts = JSON.stringify(data)
            //console.log(data.content[0])
            setPostContent(data)
            //console.log(postContent.content[0])

            postContent.map((d) => {
                console.log(d.content)
                return d
            })
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return (
        <div>
            <ResponsiveAppBar />
            <div className='post_container'>
                <div className='post_card'>
                    <div className='post_img'>
                        <img src={noImage} alt='Post Image' />
                    </div>
                    <div className='post_title'>
                        <h2>Post Title</h2>
                    </div>
                    <div className='post_content'>
                        <p>Post Content</p>
                    </div>
                    <div className='post_date'>
                        <span>Post Date</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Feed
