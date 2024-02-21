import React, { useEffect } from 'react'
import { useState } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar';
import { ToastContainer, toast } from 'react-toastify';
import { loadAllCategories } from '../../services/category-service';
import { createPost } from '../../services/post-service';
import { getCurrentUserDetail } from '../../auth';
//import { Navigate } from 'react-router-dom'
//import { useNavigate } from 'react-router-dom';

function AddPost() {

    //const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined)
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        category: "",
    })


    useEffect(() => {

        setUser(getCurrentUserDetail())
        loadAllCategories().then(data => {
            setCategories([...data])
        }).catch(e => {
            console.log(e)
        })
    }, [])


    const handleChange = (event, property) => {
        setPostData({ ...postData, [property]: event.target.value });
    };

    const handleCategoryChange = (event) => {
        setPostData({ ...postData, category: event.target.value })
    }

    const handleReset = () => {
        setPostData({
            title: "",
            content: "",
            category: "",
        })
    }

    const createBlog = () => {
        if (postData.title.trim() === '' || postData.content.trim() === '' || postData.category === 0) {
            toast.error("Fields cannot be empty!")
            return
        }

        postData['userId'] = user.id
        createPost(postData).then((data) => {
            //navigate('/dashboard/feed');
            toast.success("Post Created!")
            // setTimeout(() => {
            //     navigate('/dashboard/feed');
            // }, 1000);

        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className='container'>
            <ResponsiveAppBar />
            <div className='header'>
                <div className='text'>What's on your mind?</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Title'
                        onChange={(e) => handleChange(e, "title")}
                        value={postData.name} />
                </div>
                <div className='input_textarea'>
                    <textarea
                        maxLength="500"
                        placeholder='Content'
                        onChange={(e) => handleChange(e, "content")}
                        value={postData.content} />
                </div>
                <div className='input'>
                    <select defaultValue={0} placeholder='Category' onChange={handleCategoryChange}>
                        <option disabled value={0} >--Select category--</option>
                        {
                            categories.map((cat, index) => {
                                return <option key={cat.id} value={cat.id} >{cat.categoryName}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='submit-container'>
                <div className='submit' onClick={createBlog}>Publish</div>
            </div>
            <div className='reset-container'>
                <div className='reset' onClick={handleReset}>Clear</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddPost
