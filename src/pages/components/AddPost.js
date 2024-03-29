import React, { useEffect } from 'react'
import { useState } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar';
import { ToastContainer, toast } from 'react-toastify';
import { loadAllCategories } from '../../services/category-service';
import { createPost, uploadPostImage } from '../../services/post-service';
import { getCurrentUserDetail } from '../../auth';
//import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function AddPost() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined)
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        category: "",
    })
    const [image, setImage] = useState(null)


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

        if (image === null) {
            toast.error("Please upload an image");
            return
        }

        if (image.type !== 'image/png' && image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
            toast.error("Please choose a valid image (JPG/JPEG/PNG)")
            return
        }

        toast.info("Posting your content, please wait...")
        postData['userId'] = user.id
        createPost(postData).then((data) => {
            toast.info("Uploading your pixels...")
            uploadPostImage(image, data.postId).then((data) => {
                //toast.success("Uploading...")
                toast.success("Post Uploaded!")
                navigate("/dashboard/feed")

            }).catch(e => {
                toast.error("Picture couldn't be uploaded!")
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }

    const handleFileChange = (e) => {
        //console.log(e.target.files[0])
        setImage(e.target.files[0])
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
                    <input
                        type='file'
                        onChange={handleFileChange}
                    />
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
                <div className='submit' onClick={createBlog}>Post</div>
            </div>
            <div className='reset-container'>
                <div className='reset' onClick={handleReset}>Clear</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddPost
