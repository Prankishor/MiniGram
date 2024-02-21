import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createComment, loadPost } from '../../services/post-service'
import ResponsiveAppBar from './ResponsiveAppBar';
import { BASE_URL } from '../../services/constants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShowPost = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({
        content: ''
    });
    const history = useNavigate();

    useEffect(() => {
        setLoading(true);
        //load post
        loadPost(postId).then((data) => {
            console.log(data)
            setPost(data)
            setComments(data.comments)
            setLoading(false);
        }).catch((e) => {
            console.log(e)
            setLoading(false);
        })
    }, [postId])

    const printDate = (num) => {
        return new Date(num).toLocaleString()
    }

    const handleAddComment = () => {
        if (newComment.content.trim() === "") {
            toast.error("No text found in comment box")
            return
        }

        createComment(newComment, post.postId).then((data) => {
            console.log(data)
            toast.success("Comment added")
            setComments([...comments, data.data])
            setNewComment({ content: '' })
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleCommentChange = (event) => {
        setNewComment({ content: event.target.value })
    }

    const goBack = () => {
        history(-1);
    };

    return (
        <div>
            <ResponsiveAppBar />
            <ToastContainer />
            <div className='showpost_container'>
                {loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) :

                    <div className='post_card'>
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
                            <p>Author : <b>{post.user?.name}</b></p>
                        </div>
                        <div className='post_date'>
                            <p>{printDate(post.addedDate)}</p>
                        </div>

                        <div className='comments_card'>

                            <div className='comment_label'>
                                <b><u>Comments({comments.length})</u></b>
                            </div>

                            <div className='comment_text'>
                                <input type="text" placeholder='Type here' value={newComment.content} onChange={(e) => handleCommentChange(e)}>
                                </input>
                            </div>
                            <div className='add_comment' onClick={() => handleAddComment()}>Add Comment</div>
                            {comments.length > 0 ? comments.map((comment) => {
                                return <div className='comments' key={comment.id}>
                                    <p>{comment.content}</p>
                                </div>
                            }) :
                                <div><p>No Comments</p></div>}
                        </div>
                    </div>
                }

            </div>

            <div className='back_container'>
                <div className='back' onClick={goBack}>Back</div>
            </div>
        </div>
    )
}

export default ShowPost
