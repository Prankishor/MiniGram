import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { getCurrentUserDetail } from '../auth';
import { deletePostById, loadPostUserWise } from '../services/post-service';
import { BASE_URL } from '../services/constants';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function MyFeed() {
    //const [user, setUser] = useState({})

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        loadPostData();
    }, [])

    const loadPostData = () => {
        loadPostUserWise(getCurrentUserDetail().id).then((data) => {
            console.log(data);
            setPosts([...data].reverse());
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }
    const printDate = (num) => {
        return new Date(num).toLocaleString()
    }

    const handleComments = (id) => {
        navigate(`/dashboard/showPost/${id}`);
    }

    const handleDelete = (id) => {
        deletePostById(id).then(() => {
            toast.success("Post deleted!")
            loadPostData()
        }).catch((e) => {
            console.log(e);
            toast.error("Couldn't delete post")
        })
    }

    return (
        <div>
            <ResponsiveAppBar />
            <div className='posts_heading'>My Posts</div>
            <div className='post_container'>
                {loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : posts?.length > 0 ? (
                    <>
                        {posts.map((post) => (
                            <div key={post.postId} className='post_card'>
                                <div className='post_img'>
                                    <img src={BASE_URL + '/api/post/image/' + post.imageName} alt='Blog' />
                                </div>
                                <div className='post_title'>
                                    <h2>{post.title}</h2>
                                </div>
                                <div className='post_content'>
                                    <p>{post.content}</p>
                                </div>
                                <div className='post_user'>
                                    <p>Posted by : <b>{post.user?.name}</b></p>
                                </div>
                                <div className='post_date'>
                                    <p>{printDate(post.addedDate)}</p>
                                </div>

                                <div className='comments_container'>
                                    <div className='comments_button' onClick={() => handleComments(post.postId)}>Show Comments ({post.comments.length})</div>
                                </div>
                                <div className='delete_container'>
                                    <div className='delete_button' onClick={() => handleDelete(post.postId)}>Delete</div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div>
                        <h1>No blogs available</h1>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default MyFeed
