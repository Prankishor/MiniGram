import React from 'react'
import noImage from '../../assets/noimage.jpg'
function Card() {
    return (
        <div className='post_container'>
            <div className='post_card'>
                <div className='post_img'>
                    <img src={noImage} alt='Post' />
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
    )
}

export default Card
